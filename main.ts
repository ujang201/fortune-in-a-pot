// Fortune in a Pot — a single kind, funny fortune for the houseplant
// on the windowsill. The program writes exactly one line to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The fortune itself: a prediction for this plant, in this window.
const FORTUNE =
  "By spring your tallest leaf will touch the glass, and the whole windowsill will lean in to hear your news.";

// The bounty allows one line of 1 to 120 characters.
const MAX_CHARS = 120;

function checkFortune(text) {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`fortune is ${chars.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
}

function main() {
  checkFortune(FORTUNE);
  const outDir = resolve(process.env.OUTPUT_DIR ?? "/output");
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the fortune, nothing more.
  const target = join(outDir, "entry.txt");
  writeFileSync(target, FORTUNE, "utf8");
  // Read it back: what the judge sees must be exactly what was written.
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== FORTUNE) {
    throw new Error("entry.txt did not round-trip exactly");
  }
  console.log(`wrote entry.txt (${[...FORTUNE].length} characters)`);
  console.log(FORTUNE);
}

main();
