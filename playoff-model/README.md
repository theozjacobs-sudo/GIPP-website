# Playoff model

Monte Carlo playoff odds for GIPP. Everything is regenerated from `sim.py`.

- `sim.py` — results, fixtures, standings rebuild, 200k-sim Poisson model, and an
  exact (brute-force) clinch check. Writes `out.json`. The DATA block near the top
  distinguishes four states per game: full scoreline known (`KNOWN`), winner known
  but score not reported (`WINNER_ONLY`), played but result not reported yet
  (`PENDING`, simulated), and still to play (`FUTURE`).
- `build.py` — injects `out.json` into `template.html`, writes `../public/playoff-picture.html`.
- `template.html` — the page. All numbers come from the embedded model data.

Two scenarios are produced: with and without the three unscheduled Nov 17
round-robin games counting toward seeding (a toggle on the page).

To update after a round: move each played game from `FUTURE`/`PENDING` into
`KNOWN` (with its score) or `WINNER_ONLY`, then

    python3 sim.py && python3 build.py ../public/playoff-picture.html
