# Tone Lab — Sentiment Analyzer

A transparent sentiment bench that runs in the browser. Type a sample, press
Analyze, and see a positive / negative / neutral reading with every
contributing word and its weight.

## How it works

`lib/sentiment.ts` scores text with a small hand-weighted lexicon (-3..+3),
flips words preceded by a negator (within 3 tokens), and scales words preceded
by an intensifier. The label comes from the length-normalised score.

## Honesty

- Heuristic, not a trained model; sarcasm and domain language are out of reach.
- No confidence percentage is reported. Text never leaves the browser.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same checks on every push (`.github/workflows/ci.yml`).
