# bounty-gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Rizaladii/bounty-gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Rizaladii/bounty-gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme starring make.fun's ghost, posted on X.

## What this is

This repository is my entry for make.fun's "Post a GTA 6 meme on X" bounty. The joke itself lives on X; what lives here is the paper trail that proves the post exists. `POST.json` holds the link to the post, and `main.ts` is the tiny program that hands that link to the grader.

The program does exactly one job and nothing else: it reads `POST.json`, checks that the file is real JSON with a `url` in it, and copies the file's exact bytes into the output folder. If anything about the file looks wrong, it says so and exits with an error instead of passing a broken link along.

## Run it

Node 22, no dependencies, no network calls:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out ~/workspace/node22/bin/node main.ts
```

On success the command prints nothing and `out/POST.json` is byte-for-byte identical to `POST.json`. The `out/` folder is gitignored, so it never ends up in the repository.

## Files

- `main.ts` — the entrypoint; reads, validates, and copies `POST.json`.
- `POST.json` — the URL of the meme post on X.
- `LICENSE` — MIT.

---

<sub>Entered on [make.fun](https://make.fun/?ref=f4mz6c1w&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
