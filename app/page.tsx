"use client";

import Link from "next/link";
import { useState } from "react";
import { analyze, type Analysis } from "@/lib/sentiment";

export default function Home() {
  const [sample, setSample] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const count = sample.length;
  const run = () => setResult(analyze(sample));
  const labelText = result ? (result.label === "empty" ? "NO TEXT" : result.label.toUpperCase()) : "NOT RUN";

  return (
    <main className="tone-shell">
      <header className="tone-header">
        <Link href="/" className="tone-brand"><span className="tone-mark">T /</span> TONE LAB</Link>
        <nav aria-label="Sentiment analyzer navigation"><Link href="/more-projects">More projects</Link><a href="https://github.com/bookchaowalit-ai/book-ai" target="_blank" rel="noreferrer">Source ↗</a></nav>
      </header>

      <section className="tone-hero">
        <p className="tone-label">LANGUAGE / LEXICON HEURISTIC</p>
        <h1>Read the temperature. Withhold the verdict.</h1>
        <p className="tone-lede">A sentiment bench that shows its working: a small hand-weighted word list with negation and intensifiers, run entirely in your browser. It is a heuristic, not a trained model, so it reports matched words instead of a confidence score.</p>
      </section>

      <section className="tone-workbench" aria-labelledby="sample-title">
        <div className="sample-bench">
          <div className="bench-head"><div><p className="tone-label">01 / INPUT SAMPLE</p><h2 id="sample-title">Place a sentence on the bench.</h2></div><span className="local-badge">LOCAL ONLY</span></div>
          <label htmlFor="sample-text">Text sample</label>
          <textarea id="sample-text" value={sample} onChange={(event) => { setSample(event.target.value); setResult(null); }} placeholder="Paste or type a sentence, e.g. “The fix was not easy but the team was really helpful.”" />
          <div className="sample-controls"><span>{count.toString().padStart(3, "0")} characters · never sent</span><button type="button" onClick={run} disabled={!sample.trim()}>Analyze sample</button></div>
          <p className="bench-note">Text is scored locally and never sent anywhere.</p>
        </div>

        <aside className="result-bench" aria-live="polite">
          <div className="bench-head"><div><p className="tone-label">02 / RESULT PANEL</p><h2>{result ? "Lexicon reading." : "Waiting for a sample."}</h2></div><span className="result-dot" aria-hidden="true" /></div>
          <div className="result-state"><strong>{labelText}</strong><span>{result ? `SCORE ${result.score > 0 ? "+" : ""}${result.score}` : "PRESS ANALYZE"}</span></div>
          <dl className="result-facts"><div><dt>Comparative</dt><dd>{result ? result.comparative : "—"}</dd></div><div><dt>Matched words</dt><dd>{result ? `${result.contributions.length} of ${result.tokens}` : "—"}</dd></div><div><dt>Method</dt><dd>WORD LIST · NOT A MODEL</dd></div></dl>
          {result && result.contributions.length > 0 ? <ul className="contribution-list">{result.contributions.map((item, index) => <li key={`${item.word}-${index}`}><span>{item.word}{item.note ? <small> ({item.note})</small> : null}</span><b>{item.value > 0 ? "+" : ""}{item.value}</b></li>)}</ul> : null}
          <p className="result-note">{result && result.label === "neutral" && result.contributions.length === 0 ? "No word in this sample is in the lexicon, so it reads as neutral — that is absence of evidence, not a verdict." : "Sarcasm, context, and domain language are out of reach for a word list. Treat the label as a hint."}</p>
        </aside>
      </section>

      <section className="tone-legend" aria-label="Prototype states"><span><i className="legend-amber" />Input stays local</span><span><i className="legend-red" />Heuristic, not a model</span><span><i className="legend-line" />Every point is shown</span></section>
      <footer className="tone-footer"><span>bookchaowalit / AI domain</span><span>Calm interfaces for uncertain output</span><Link href="https://bookchaowalit.com">Portfolio ↗</Link></footer>
    </main>
  );
}
