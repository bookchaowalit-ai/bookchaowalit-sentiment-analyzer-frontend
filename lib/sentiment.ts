/**
 * Small, inspectable lexicon scorer. It is a heuristic, not a trained model:
 * each known word has a hand-set weight from -3 to +3, a preceding negator
 * (within 3 tokens) flips it, and a preceding intensifier scales it. With a
 * contrast word ("but", "however", "although"…), the clause after the last one
 * carries more weight (×1.5) and the clause before it less (×0.5).
 */
export const LEXICON: Record<string, number> = {
  love: 3, loved: 3, amazing: 3, excellent: 3, fantastic: 3, wonderful: 3, perfect: 3, brilliant: 3,
  great: 2, good: 2, happy: 2, glad: 2, like: 1, liked: 1, nice: 2, enjoy: 2, enjoyed: 2, helpful: 2,
  fast: 1, easy: 1, clear: 1, smooth: 1, recommend: 2, thanks: 1, thank: 1, fine: 1, calm: 1, fun: 2,
  hate: -3, hated: -3, awful: -3, terrible: -3, horrible: -3, worst: -3, disaster: -3,
  bad: -2, sad: -2, angry: -2, annoyed: -2, broken: -2, bug: -1, bugs: -1, slow: -1, confusing: -2,
  difficult: -1, hard: -1, poor: -2, disappointed: -2, disappointing: -2, useless: -2, fail: -2,
  failed: -2, wrong: -1, problem: -1, problems: -1, worried: -1, late: -1, boring: -2, crash: -2,
};

export const NEGATORS = new Set(["not", "no", "never", "none", "nobody", "nothing", "neither", "nor", "cannot", "without", "dont", "doesnt", "didnt", "isnt", "wasnt", "arent", "wont", "cant", "couldnt", "shouldnt"]);
export const INTENSIFIERS: Record<string, number> = { very: 1.5, really: 1.5, so: 1.3, extremely: 2, super: 1.5, totally: 1.5, quite: 1.2, slightly: 0.5, somewhat: 0.7 };

export const CONTRASTS = new Set(["but", "however", "yet", "although", "though"]);
export const BEFORE_CONTRAST = 0.5;
export const AFTER_CONTRAST = 1.5;

export type Contribution = { word: string; value: number; note?: string };
export type Label = "positive" | "negative" | "neutral" | "empty";
export type Analysis = { label: Label; score: number; comparative: number; tokens: number; contributions: Contribution[] };

/** Own-property lookup: "constructor" must not resolve to Object.prototype.constructor. */
function weightOf(table: Record<string, number>, word: string): number | undefined {
  return Object.hasOwn(table, word) ? table[word] : undefined;
}

/**
 * NFKC folds full-width letters ("ｇｏｏｄ"); every apostrophe-like mark
 * (’ ‘ ʼ ′ ') is dropped so "donʼt" stays the negator "dont".
 */
export function tokenize(text: string): string[] {
  return text.normalize("NFKC").toLowerCase().replace(/['‘’ʼ′`]/g, "").split(/[^a-z0-9]+/).filter(Boolean);
}

export const NEUTRAL_BAND = 0.05;

export function analyze(text: string): Analysis {
  const words = tokenize(text);
  if (words.length === 0) return { label: "empty", score: 0, comparative: 0, tokens: 0, contributions: [] };
  const contributions: Contribution[] = [];
  let score = 0;
  let pivot = -1;
  words.forEach((word, index) => { if (CONTRASTS.has(word)) pivot = index; });
  words.forEach((word, index) => {
    const base = weightOf(LEXICON, word);
    if (base === undefined) return;
    let value = base;
    const notes: string[] = [];
    const previous = words[index - 1];
    const boost = previous ? weightOf(INTENSIFIERS, previous) : undefined;
    if (previous && boost !== undefined) {
      value *= boost;
      notes.push(`${previous} ×${boost}`);
    }
    // A negator does not reach across the contrast word ("not bad, but slow").
    const windowStart = Math.max(0, index - 3, pivot >= 0 && pivot < index ? pivot + 1 : 0);
    if (words.slice(windowStart, index).some((token) => NEGATORS.has(token))) {
      value = -value;
      notes.push("negated");
    }
    if (pivot >= 0 && index !== pivot) {
      const weight = index < pivot ? BEFORE_CONTRAST : AFTER_CONTRAST;
      value *= weight;
      notes.push(`${index < pivot ? "before" : "after"} “${words[pivot]}” ×${weight}`);
    }
    value = Math.round(value * 100) / 100;
    score += value;
    contributions.push(notes.length ? { word, value, note: notes.join(", ") } : { word, value });
  });
  score = Math.round(score * 100) / 100;
  const comparative = Math.round((score / words.length) * 1000) / 1000;
  const label: Label = comparative > NEUTRAL_BAND ? "positive" : comparative < -NEUTRAL_BAND ? "negative" : "neutral";
  return { label, score, comparative, tokens: words.length, contributions };
}
