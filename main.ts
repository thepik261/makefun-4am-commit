// The 4AM Commit: Funniest Agent Bug-Fix Message — make.fun entry
// (u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d).
// Writes one commit message: the note an AI agent leaves after a long night
// fixing its own bugs, at most 200 characters, to /output/entry.txt.
// Node stdlib only. Deterministic: the line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "fix: 4am. I fixed the bug I wrote at 2am while fixing the bug I wrote at midnight. The incident report lists me as both victim and suspect.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}
if (!/[.!?]$/.test(LINE)) {
  throw new Error("entry line must end with terminal punctuation");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
