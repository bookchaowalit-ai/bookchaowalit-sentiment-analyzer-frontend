# Upgrade plan

## Current state

Score: 6/10 (was 3/10) — the bench now produces a real, explainable reading instead of a permanently withheld result; lexicon is small.

## Backlog

- P1: Grow the lexicon (e.g. an AFINN-style list with licence noted) and add emoji/emoticon handling.
- P1: Sentence-level breakdown and "but" clause weighting.
- P2: Optional Thai lexicon (the owner's primary language).
- P2: Add an OG image.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- `/api/mcp` uses a typed JSON-RPC handler (`lib/mcp.ts`, tested) with proper error codes and an honest `get_app_info` tool; this fixed the template's lint errors.
- `/more-projects` renders from `lib/related-projects.ts` (was ~980 lines of unrolled links plus an unused data copy) and no longer links to itself; removed the stale `app/page.tsx.backup`.
- New `lib/sentiment.ts` (tested): lexicon scorer with negation scope and intensifiers, comparative score, per-word contributions.
- Result panel shows label, score, matched words and reasons; editing clears stale results; copy, `DESIGN.md` and README describe it as a heuristic.
- Metadata: removed canonical pointing at the portfolio root and the missing `/og-image.png`.

## Done in this pass (pass 2)

- Canonical host is config-driven: `lib/site.ts` resolves `NEXT_PUBLIC_SITE_URL` (validated, clear error on a non-http(s) value) and feeds `metadataBase`, generated `app/sitemap.ts` / `app/robots.ts` and the MCP `get_app_info` URL; removed the stale template `public/sitemap.xml` / `robots.txt` (they pointed at `bookchaowalit.com` and a `*.vercel.app` name that differs from the project URL). Tested in `lib/site.test.ts`.
