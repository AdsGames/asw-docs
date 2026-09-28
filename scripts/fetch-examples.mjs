// Download the playable examples for the ASW release these docs describe.
//
// The release's asw-examples.zip is unpacked to md/public/play/<name>/, where
// the PlayableExample component loads it. The version is "aswVersion" in
// package.json. Nothing is downloaded when that version is already there.
//
// A failed download stops the build in CI. Locally it only warns, so the docs
// still run offline; the examples then cannot be played.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "md", "public", "play");
const versionFile = path.join(dest, ".version");

const { aswVersion } = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8"),
);
const url = `https://github.com/AdsGames/asw/releases/download/${aswVersion}/asw-examples.zip`;

async function main() {
  if (
    fs.existsSync(versionFile) &&
    fs.readFileSync(versionFile, "utf8").trim() === aswVersion
  ) {
    console.log(`Examples for ASW ${aswVersion} are already in md/public/play`);
    return;
  }

  console.log(`Downloading examples for ASW ${aswVersion}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "asw-examples-"));
  try {
    const zip = path.join(temp, "asw-examples.zip");
    fs.writeFileSync(zip, Buffer.from(await response.arrayBuffer()));
    execFileSync("unzip", ["-q", zip, "-d", temp]);

    fs.rmSync(dest, { recursive: true, force: true });
    // Copy rather than rename: the temp folder can be on another filesystem
    fs.cpSync(path.join(temp, "asw-examples"), dest, { recursive: true });
    fs.writeFileSync(versionFile, `${aswVersion}\n`);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }

  const count = fs
    .readdirSync(dest, { withFileTypes: true })
    .filter((e) => e.isDirectory()).length;
  console.log(`Unpacked ${count} examples to md/public/play`);
}

main().catch((error) => {
  if (process.env.CI) {
    console.error(`Could not download the examples: ${error.message}`);
    process.exit(1);
  }
  console.warn(
    `Warning: could not download the examples (${error.message}). They will not be playable.`,
  );
});
