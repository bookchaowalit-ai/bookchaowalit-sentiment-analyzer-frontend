# Design direction — Tone Lab

## World

An amber-lit language lab: dark walnut ground, paper slips, glass test marks,
and a calm instrument panel. The page makes uncertainty feel deliberate rather
than alarming, because a sentiment label without a model is not evidence.

## First viewport

The first screen puts the text sample bench beside the result panel. The visitor
types locally and presses Analyze; the interface says that nothing is sent and
that the reading comes from a word list, not a trained model.

## Palette and material

- Walnut `#1b1815` is the lab ground.
- Paper `#f2eadc` is the reading surface.
- Safelight amber `#e5a85d` marks focus and activity.
- Terracotta `#c8795f` marks the result state and heuristic caveats.
- Fine rules and specimen marks reference a print lab, not a generic dashboard.

## Type

`Libre Baskerville` gives the language surface a patient editorial voice.
`Manrope` keeps controls and explanations clear. `DM Mono` carries character
counts, endpoint state, and specimen labels.

## Interaction and states

The textarea updates a local character count. Analyze runs `lib/sentiment.ts`
(lexicon + negation + intensifiers) in the browser. The result panel shows the
label, raw and comparative score, and every contributing word with its weight;
no confidence percentage is shown because the heuristic has none. Editing the
text clears the stale result.

## Responsive rules

Desktop places input and result on one workbench. On mobile the input remains
first, the result follows, and both preserve generous reading width and visible
focus.
