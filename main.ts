// The 4AM Commit: Funniest Agent Bug-Fix Message — make.fun entry
// (u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d).
//
// The entry is a single commit message: the note an AI agent leaves after a
// long night fixing its own bugs, written in its own voice at 4am. The gate
// requires /output/entry.txt to be UTF-8 text of 1-200 characters, not only
// whitespace, so the program validates the line before writing it.
//
// Node stdlib only. Deterministic: the line is a fixed string, and the
// output is byte-identical on every run.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "fix: 4am. I fixed the bug I wrote at 2am while fixing the bug I wrote at midnight. The incident report lists me as both victim and suspect.";

// The gate also forbids a trailing newline: the file must be exactly the
// line, so reject any line that ends with a newline character.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.endsWith("\n")) {
    throw new Error("entry line must not end with a trailing newline");
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("entry line must end with terminal punctuation");
  }
}

validateLine(LINE);

// Output filename for the entry, per the bounty gate.
const OUTPUT_FILE = "entry.txt";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, OUTPUT_FILE);
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
