# NoisEasier project page

This repository contains the official static demo page for **NoisEasier: Test-Time Noise Optimization for Text-to-Video Generation**.

## Structure

```text
.
├── index.html                 # Semantic page structure
├── assets/
│   ├── css/site.css           # Page styles
│   ├── data/examples.js       # Prompts and video paths
│   └── js/site.js             # Gallery, carousels, and lazy loading
└── videos/
    ├── gallery/               # Highlight results
    ├── MS/                    # T2V-Turbo (MS) comparisons
    ├── VC2/                   # T2V-Turbo (VC2) comparisons
    └── animatelcm/            # AnimateLCM comparisons
```

## Local preview

Run a static server from the repository root:

```bash
python3 -m http.server 4000
```

Then open <http://127.0.0.1:4000>.

## Editing results

Prompts and video paths are centralized in `assets/data/examples.js`. Each comparison sample uses this format:

```js
['Prompt text', 'path/to/baseline.mp4', 'path/to/noiseasier.mp4']
```

Set `itemsPerPage: 2` on a model group when its carousel should show two comparison samples per page.

Videos are assigned a source only when their card approaches the viewport. Keep new media inside the matching `videos/` subdirectory and avoid adding unrelated experiment or ablation outputs to the public demo.
