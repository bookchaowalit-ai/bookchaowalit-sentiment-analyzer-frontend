import { describe, expect, it } from "vitest";
import { analyze, tokenize } from "./sentiment";

describe("tokenize", () => {
  it("lowercases, strips apostrophes and punctuation", () => {
    expect(tokenize("Don't STOP, it's great!")).toEqual(["dont", "stop", "its", "great"]);
  });
});

describe("analyze", () => {
  it("labels clear positive and negative text", () => {
    expect(analyze("I love this, it is great").label).toBe("positive");
    expect(analyze("This is terrible and slow").label).toBe("negative");
  });

  it("returns neutral when nothing in the lexicon matches", () => {
    expect(analyze("The meeting is at noon on Tuesday")).toMatchObject({ label: "neutral", score: 0, contributions: [] });
    expect(analyze("   ").label).toBe("empty");
  });

  it("flips negated words and scales intensified ones", () => {
    expect(analyze("not good").contributions).toEqual([{ word: "good", value: -2, note: "negated" }]);
    expect(analyze("I don't like it").contributions[0]).toMatchObject({ word: "like", value: -1 });
    expect(analyze("very bad").contributions).toEqual([{ word: "bad", value: -3, note: "very ×1.5" }]);
  });

  it("reports a length-normalised comparative score", () => {
    const result = analyze("good good bad okay");
    expect(result.score).toBe(2);
    expect(result.comparative).toBe(0.5);
    expect(result.tokens).toBe(4);
  });
});

describe("negation scope", () => {
  it("does not treat ordinary words ending in -nt as negators", () => {
    expect(analyze("I want a great client").contributions).toEqual([{ word: "great", value: 2 }]);
  });
});

describe("contrast clauses", () => {
  it("weights the clause after the last contrast word more", () => {
    const result = analyze("The app is good but slow");
    expect(result.contributions).toEqual([
      { word: "good", value: 1, note: "before “but” ×0.5" },
      { word: "slow", value: -1.5, note: "after “but” ×1.5" },
    ]);
    expect(result.score).toBe(-0.5);
  });

  it("flips the overall reading when the praise comes last", () => {
    expect(analyze("Setup was confusing, however support was great").score).toBe(2);
  });

  it("does not let a negator reach across the contrast word", () => {
    expect(analyze("not bad but slow").contributions).toEqual([
      { word: "bad", value: 1, note: "negated, before “but” ×0.5" },
      { word: "slow", value: -1.5, note: "after “but” ×1.5" },
    ]);
  });

  it("leaves sentences without a contrast word unchanged", () => {
    expect(analyze("very bad").contributions).toEqual([{ word: "bad", value: -3, note: "very ×1.5" }]);
  });
});

describe("edge cases", () => {
  it("does not read Object.prototype names as lexicon words (score stayed NaN)", () => {
    const result = analyze("The constructor was great");
    expect(result.score).toBe(2);
    expect(result.label).toBe("positive");
    expect(analyze("constructor").label).toBe("neutral");
    expect(analyze("constructor good").score).toBe(2);
  });

  it("treats modifier-letter and left-quote apostrophes like ' in negators", () => {
    expect(analyze("I donʼt like it").score).toBe(-1);
    expect(analyze("I don‘t like it").score).toBe(-1);
  });

  it("folds full-width letters", () => {
    expect(tokenize("ｇｏｏｄ")).toEqual(["good"]);
    expect(analyze("ｇｏｏｄ").label).toBe("positive");
  });
});
