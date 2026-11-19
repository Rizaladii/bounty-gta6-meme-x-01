// Entry point for the gta6-meme-x-01 bounty.
//
// What this program does, in one sentence: it takes the POST.json file the
// bot produced and hands an exact copy of it to the grader's output folder.
//
// The grader only cares about two things:
//   1. the output file is byte-for-byte identical to the input file, and
//   2. nothing is printed when everything works.
//
// Before copying, the file is sanity-checked: it must parse as JSON, be a
// JSON object, and carry a `url` string, which is the X post this entry
// points at. Those checks catch a truncated or mistyped POST.json early
// instead of letting a broken file sail through the copy unnoticed.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const POST_FILENAME = "POST.json";
const FALLBACK_BOT_DIR = "/bot";
const FALLBACK_OUTPUT_DIR = "/output";

/** Resolve the two directories this run works with, honouring the env. */
function directories(): { botDir: string; outputDir: string } {
  return {
    botDir: process.env.MAKEFUN_BOT_DIR ?? FALLBACK_BOT_DIR,
    outputDir: process.env.MAKEFUN_OUTPUT_DIR ?? FALLBACK_OUTPUT_DIR,
  };
}

/**
 * Read POST.json and make sure it is what we expect: valid JSON holding a
 * `url` string. Returns the raw bytes untouched so the copy stays exact.
 */
async function loadPost(botDir: string): Promise<Buffer> {
  const sourcePath = join(botDir, POST_FILENAME);

  // A missing or unreadable file gets a plain-English message instead of
  // Node's raw ENOENT dump, so a failed run is diagnosable at a glance.
  let raw: Buffer;
  try {
    raw = await readFile(sourcePath);
  } catch {
    throw new Error(`cannot read ${POST_FILENAME} from ${sourcePath}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString("utf8"));
  } catch {
    throw new Error(`${POST_FILENAME} is not valid JSON: ${sourcePath}`);
  }

  // The file must be a JSON object (not an array, string, or number) before
  // we even look for the url field inside it.
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${POST_FILENAME} must contain a JSON object: ${sourcePath}`);
  }

  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== "string" || url.length === 0) {
    throw new Error(`${POST_FILENAME} has no usable "url" string: ${sourcePath}`);
  }

  return raw;
}

/** Copy the verified bytes into the output directory, creating it first. */
async function deliver(raw: Buffer, outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, POST_FILENAME), raw);
}

async function run(): Promise<void> {
  const { botDir, outputDir } = directories();
  const raw = await loadPost(botDir);
  await deliver(raw, outputDir);
}

run().catch((problem: unknown) => {
  const detail = problem instanceof Error ? problem.message : String(problem);
  console.error(`gta6-meme-x-01: ${detail}`);
  process.exit(1);
});
