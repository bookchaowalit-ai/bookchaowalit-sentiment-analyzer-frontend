# Design direction — Tone Lab

## World

An amber-lit language lab: dark walnut ground, paper slips, glass test marks,
and a calm instrument panel. The page makes uncertainty feel deliberate rather
than alarming, because a sentiment label without a model is not evidence.

## First viewport

The first screen puts the text sample bench beside a clearly withheld result.
The visitor can type locally and pin a sample for review, but the interface says
that nothing is sent and no inference is being claimed.

## Palette and material

- Walnut `#1b1815` is the lab ground.
- Paper `#f2eadc` is the reading surface.
- Safelight amber `#e5a85d` marks focus and activity.
- Terracotta `#c8795f` marks withheld or unavailable inference.
- Fine rules and specimen marks reference a print lab, not a generic dashboard.

## Type

`Libre Baskerville` gives the language surface a patient editorial voice.
`Manrope` keeps controls and explanations clear. `DM Mono` carries character
counts, endpoint state, and specimen labels.

## Interaction and states

The textarea updates a local character count. Pinning records only the local
sample state and changes the status line; it never calls a model. The result
panel has explicit `NO INFERENCE`, `CONFIDENCE WITHHELD`, and `ENDPOINT ABSENT`
states.

## Responsive rules

Desktop places input and result on one workbench. On mobile the input remains
first, the result follows, and both preserve generous reading width and visible
focus.
