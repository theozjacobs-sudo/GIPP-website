import json, sys, pathlib
here = pathlib.Path(__file__).parent
model = json.load(open(here/"out.json"))
# trim: keep what the page uses
keep = {}
for s in ("all15","twelve"):
    S = model[s]
    keep[s] = dict(qual=S['qual'], seed1=S['seed1'], seeds=S['seeds'], cond=S['cond'], bypts=S['bypts'], semi_opp=S['semi_opp'], exp_pts=S['exp_pts'])
keep.update(fixtures=model['fixtures'], table=model['table'], order=model['order'], avg=model['avg'], N=model['N'])
html = open(here/"template.html").read().replace("__MODEL_JSON__", json.dumps(keep, separators=(",",":")))
out = pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else here/"playoff-picture.html"
out.write_text(html)
print("wrote", out, len(html), "bytes")
