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
