# Playoff model

Monte Carlo playoff odds for GIPP. Everything is regenerated from `sim.py`.

- `sim.py` — results, fixtures, standings rebuild, 200k-sim Poisson model (two scenarios: Nov 17 leftover games count / don't count). Writes `out.json`.
- `build.py` — injects `out.json` into `template.html`, writes `../public/playoff-picture.html`.
- `template.html` — the page. All numbers come from the embedded model data.

To update after a round: add results to `RESULTS` in `sim.py`, remove them from `FIXTURES`, then

    python3 sim.py && python3 build.py ../public/playoff-picture.html
