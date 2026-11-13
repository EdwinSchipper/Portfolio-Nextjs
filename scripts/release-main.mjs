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

const sourceCommit = runGit(["rev-parse", "--short", "development"]);
const tempWorktree = mkdtempSync(join(tmpdir(), "release-main-"));

try {
  runGit(["worktree", "add", tempWorktree, "main"]);
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
      "Geen wijzigingen: branch 'main' is al synchroon met 'development' (zonder .agents/ en AGENTS.md)."
    );
    process.exit(0);
  }

  const commitTitle = `chore(release): synchroniseer main met development (${sourceCommit}) zonder agent-bestanden`;
  const commitBody = [
    "- Waarom: live release van geverifieerde wijzigingen op development zonder .agents/ en AGENTS.md in de openbare main-branch",
    `- Wat: exacte tree-synchronisatie vanuit development (${sourceCommit}) met uitsluiting van .agents/ en AGENTS.md`,
    "- Impact: main blijft vrij van agent-metadata; development en lokale werkmap blijven volledig intact",
  ].join("\n");

  runGit(["commit", "-m", commitTitle, "-m", commitBody], tempWorktree);
  console.log(
    `Commit aangemaakt op 'main' vanuit 'development' (${sourceCommit}), exclusief .agents/ en AGENTS.md.`
  );
  console.log("Controleer desgewenst met 'git log -1 main' en push handmatig met 'git push origin main'.");
} finally {
  try {
    runGit(["worktree", "remove", "--force", tempWorktree]);
  } catch {
    rmSync(tempWorktree, { recursive: true, force: true });
  }
}

