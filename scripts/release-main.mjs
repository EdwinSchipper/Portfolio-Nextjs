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

  const commitTitle = `chore(release): synchroniseer productie-branch main met development (${sourceCommit})`;
  const commitBody = [
    "- Waarom: live release van gevalideerde wijzigingen vanaf development naar main",
    `- Wat: productiesynchronisatie vanaf development (${sourceCommit}) op basis van origin/main`,
    "- Impact: release/main is gereed voor een schone Pull Request en productie-deployment via main",
  ].join("\n");

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
