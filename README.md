# Flood It

The flood-fill puzzle: a 14x14 board of six colors, and 25 moves to make it one color.
Each pick floods the top-left region with that color and absorbs matching neighbors.

- No signup, nothing to install - pure static HTML/JS
- Fewest-moves best is kept in `localStorage`
- `engine.js` holds the flood logic as pure functions, shared between the app and node tests

## Play

Open `index.html`, or visit the deployed site.

## Run locally

Any static server works:

```
python3 -m http.server
```

Then open http://localhost:8000/.

## Engine tests

The node test suite covers region detection (including row-wrap guards), flood merging,
no-op moves, solved detection, and solvability via random flood chains.
