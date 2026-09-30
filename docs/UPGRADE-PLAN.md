# Upgrade plan

## Current state

Score: 6/10 (was 3/10) — the bench now produces a real, explainable reading instead of a permanently withheld result; lexicon is small.

## Backlog

- P1: Grow the lexicon (e.g. an AFINN-style list with licence noted) and add emoji/emoticon handling.
- P1: Sentence-level breakdown (contrast weighting is done; it applies to the whole sample, not per sentence).
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
- Contrast clauses: with "but"/"however"/"yet"/"although"/"though", words before the last contrast word count ×0.5 and after it ×1.5, negators no longer reach across it, and each contribution shows the weight in its note. Tested in `lib/sentiment.test.ts`.

## Done in this pass (pass 3)
- Edge-case pass on `lib/sentiment.ts` (regression tests in `lib/sentiment.test.ts`):
  - Real bug: `LEXICON[word]` / `INTENSIFIERS[word]` were plain-object lookups,
    so any text containing "constructor" hit `Object.prototype.constructor`
    and the score became `NaN` (e.g. "The constructor was great" read neutral).
    Lookups are now own-property only.
  - "donʼt" (U+02BC) and "don‘t" were split into "don" + "t", losing the
    negation; all apostrophe-like marks are now removed before tokenizing.
  - Full-width letters ("ｇｏｏｄ") are NFKC-folded instead of dropped.
- Security deps: `next` 16.1.6 -> 16.3.8 (and `eslint-config-next`) clears critical GHSA-2xp9-vwfh-vxw4 (Image Optimization RCE) plus bundled postcss/sharp highs; lockfile regenerated with same-major `npm audit fix`. `npm audit --omit=dev`: C1/H3/M1/L0 [nanoid:h,next:c,postcss:h,sharp:h] -> C0/H0/M0/L0.
