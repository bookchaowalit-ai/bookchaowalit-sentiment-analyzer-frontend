"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [sample, setSample] = useState("");
  const [pinned, setPinned] = useState(false);
  const count = sample.length;

  return (
    <main className="tone-shell">
      <header className="tone-header">
        <Link href="/" className="tone-brand"><span className="tone-mark">T /</span> TONE LAB</Link>
        <nav aria-label="Sentiment analyzer navigation"><Link href="/more-projects">More projects</Link><a href="https://github.com/bookchaowalit-ai/book-ai" target="_blank" rel="noreferrer">Source ↗</a></nav>
      </header>

      <section className="tone-hero">
        <p className="tone-label">LANGUAGE / PROTOTYPE</p>
        <h1>Read the temperature. Withhold the verdict.</h1>
        <p className="tone-lede">A sentiment-analysis bench with the important part left visible: no model is connected, so no label, score, or confidence is being invented.</p>
      </section>

      <section className="tone-workbench" aria-labelledby="sample-title">
        <div className="sample-bench">
          <div className="bench-head"><div><p className="tone-label">01 / INPUT SAMPLE</p><h2 id="sample-title">Place a sentence on the bench.</h2></div><span className="local-badge">LOCAL ONLY</span></div>
          <label htmlFor="sample-text">Text sample</label>
          <textarea id="sample-text" value={sample} onChange={(event) => { setSample(event.target.value); setPinned(false); }} placeholder="Paste or type a sentence to inspect the interface state…" />
          <div className="sample-controls"><span>{count.toString().padStart(3, "0")} characters · never sent</span><button type="button" onClick={() => setPinned(true)} disabled={!sample.trim()}>{pinned ? "Sample pinned" : "Pin sample"}</button></div>
          <p className="bench-note" aria-live="polite">{pinned ? "Pinned locally for the next model contract." : "This field is a local design prototype; it has no inference action."}</p>
        </div>

        <aside className="result-bench" aria-live="polite">
          <div className="bench-head"><div><p className="tone-label">02 / RESULT PANEL</p><h2>Inference withheld.</h2></div><span className="result-dot" aria-hidden="true" /></div>
          <div className="result-state"><strong>NO<br />INFERENCE</strong><span>ENDPOINT ABSENT</span></div>
          <div className="confidence-rule" aria-label="Confidence unavailable"><span /><span /><span /><span /><span /></div>
          <dl className="result-facts"><div><dt>Label</dt><dd>WITHHELD</dd></div><div><dt>Confidence</dt><dd>WITHHELD</dd></div><div><dt>Model</dt><dd>NOT ON FILE</dd></div></dl>
          <p className="result-note">A visual result is not a result. Connect an evaluation-backed model before turning the empty instrument on.</p>
        </aside>
      </section>

      <section className="tone-legend" aria-label="Prototype states"><span><i className="legend-amber" />Input stays local</span><span><i className="legend-red" />Inference is unavailable</span><span><i className="legend-line" />Confidence is not guessed</span></section>
      <footer className="tone-footer"><span>bookchaowalit / AI domain</span><span>Calm interfaces for uncertain output</span><Link href="https://bookchaowalit.com">Portfolio ↗</Link></footer>
    </main>
  );
}
