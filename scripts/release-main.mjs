import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Executes a git command synchronously and returns trimmed stdout.
 */
function runGit(args, cwd = process.cwd()) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

/**
 * Finds the previous development commit hash referenced on origin/main, if any.
 */
function findPreviousDevelopmentCommit() {
  const recentMessages = runGit(["log", "origin/main", "-n", "10", "--format=%B"]);
  const match = recentMessages.match(/development \(([0-9a-f]{7,40})\)/);
  if (!match) return null;

  try {
    runGit(["cat-file", "-e", `${match[1]}^{commit}`]);
    return match[1];
  } catch {
    return null;
  }
}

/**
 * Builds an informative release commit message from the non-agent commits since origin/main.
 */
function buildReleaseCommitMessage(sourceCommit, tempWorktree) {
  const prevDevCommit = findPreviousDevelopmentCommit();
  const commits = prevDevCommit
    ? runGit([
        "log",
        `${prevDevCommit}..development`,
        "--no-merges",
        "--reverse",
        "--format=%H%x09%s",
        "--",
        ".",
        ":!.agents",
        ":!AGENTS.md",
      ])
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => {
          const [hash, ...subjectParts] = line.split("\t");
          return { hash, subject: subjectParts.join("\t") };
        })
    : [];

  if (commits.length === 1) {
    const fullMessage = runGit(["log", "-1", "--format=%B", commits[0].hash]);
    const [rawTitle, ...bodyLines] = fullMessage.split(/\r?\n/);
    const existingBody = bodyLines.join("\n").trim();
    const releaseFooter = `- Release-bron: development (${sourceCommit})`;
    const commitBody = existingBody ? `${existingBody}\n${releaseFooter}` : releaseFooter;
    return { commitTitle: rawTitle, commitBody };
  }

  if (commits.length > 1) {
    const cleanSummaries = commits.map(({ subject }) =>
      subject.replace(/^[a-z]+(?:\([^)]+\))?:\s*/i, "")
    );
    const shortList =
      cleanSummaries.length <= 2
        ? cleanSummaries.join(" en ")
        : `${cleanSummaries.slice(0, 2).join(", ")} (+${cleanSummaries.length - 2})`;
    const truncated =
      shortList.length > 90 ? `${shortList.slice(0, 87).trimEnd()}...` : shortList;
    const commitTitle = `chore(release): ${truncated}`;
    const commitLines = commits.map(
      ({ hash, subject }) => `  - ${subject} (${hash.slice(0, 7)})`
    );
    const commitBody = [
      "- Waarom: live release van gevalideerde wijzigingen vanaf development naar main",
      "- Wat:",
      ...commitLines,
      `- Impact: bundelt ${commits.length} gevalideerde wijzigingen klaar voor productie-deployment`,
      `- Release-bron: development (${sourceCommit})`,
    ].join("\n");
    return { commitTitle, commitBody };
  }

  const changedFiles = runGit(["diff", "--cached", "--name-only"], tempWorktree)
    .split(/\r?\n/)
    .filter(Boolean);
  const fileSummary =
    changedFiles.length > 0 ? changedFiles.slice(0, 4).join(", ") : "productiebestanden";
  return {
    commitTitle: `chore(release): werk ${fileSummary} bij vanuit development`,
    commitBody: [
      "- Waarom: live release van gevalideerde wijzigingen vanaf development naar main",
      `- Wat: gewijzigde bestanden: ${changedFiles.join(", ") || "geen"}`,
      `- Release-bron: development (${sourceCommit})`,
    ].join("\n"),
  };
}

const currentBranch = runGit(["branch", "--show-current"]);
if (currentBranch !== "development") {
  console.error(
    `Fout: voer dit script uit vanaf branch 'development' (huidige branch: '${currentBranch}').`
  );
  process.exit(1);
}

const dirtyFiles = runGit(["status", "--porcelain"]);
if (dirtyFiles) {
  console.error(
    "Fout: werkmap bevat nog niet-gecommitte wijzigingen. Commit of stash deze eerst."
  );
  process.exit(1);
}

runGit(["fetch", "origin", "main"]);

const sourceCommit = runGit(["rev-parse", "--short", "development"]);
const tempWorktree = mkdtempSync(join(tmpdir(), "release-main-"));

try {
  runGit(["worktree", "add", "-B", "release/main", tempWorktree, "origin/main"]);
  runGit(["read-tree", "--reset", "-u", "development"], tempWorktree);
  runGit(
    ["rm", "-rf", "--ignore-unmatch", ".agents", "AGENTS.md"],
    tempWorktree
  );

  let hasChanges = false;
  try {
    runGit(["diff", "--cached", "--quiet"], tempWorktree);
  } catch {
    hasChanges = true;
  }

  if (!hasChanges) {
    console.log(
      "Geen wijzigingen: 'origin/main' is al synchroon met 'development' (zonder .agents/ en AGENTS.md)."
    );
    process.exit(0);
  }

  const { commitTitle, commitBody } = buildReleaseCommitMessage(sourceCommit, tempWorktree);

  runGit(["commit", "-m", commitTitle, "-m", commitBody], tempWorktree);
  console.log(
    `Branch 'release/main' aangemaakt vanaf 'origin/main' met inhoud van 'development' (${sourceCommit}), exclusief .agents/ en AGENTS.md.`
  );
  console.log(
    "Push met 'git push -u --force-with-lease origin release/main' en open op GitHub een Pull Request van 'release/main' naar 'main'."
  );
} finally {
  try {
    runGit(["worktree", "remove", "--force", tempWorktree]);
  } catch {
    rmSync(tempWorktree, { recursive: true, force: true });
  }
}
