import itertools, json, sys
sys.argv=['x']; exec(open('sim.py').read().split('# ---------------- Monte Carlo')[0])
NOV17=[("Nov 17","TBC","99c Fresh FC","Corinthians"),("Nov 17","TBC","Pickup FC","First Touch FC"),("Nov 17","TBC","Wanderers","Ummah FC")]
ALL=FIXTURES+NOV17
# 1. fixture audit
from collections import Counter
c=Counter()
for _,h,a,_,_ in RESULTS: c[h]+=1; c[a]+=1
for _,_,h,a in ALL: c[h]+=1; c[a]+=1
print("games per team incl. all 15 remaining:", dict(c))
print("total games:", len(RESULTS)+len(ALL), "(45 needed for a 10-team round robin)")
# 2. exact worst case on points (ties counted AGAINST us, i.e. assume we lose every GD tiebreak)
mine=[f for f in ALL if GIPP in f[2:]]; others=[f for f in ALL if GIPP not in f[2:]]
base={k:T[k]['pts'] for k in TEAMS}
def apply(pts,h,a,o):
    if o==0: pts[h]+=3
    elif o==1: pts[h]+=1; pts[a]+=1
    else: pts[a]+=3
results={}
for mo in itertools.product(range(3),repeat=3):   # our three results
    p0=dict(base)
    for (_,_,h,a),o in zip(mine,mo): apply(p0,h,a,o)
    g=p0[GIPP]; worst=0; worst_case=None
    for oo in itertools.product(range(3),repeat=len(others)):
        p=dict(p0)
        for (_,_,h,a),o in zip(others,oo): apply(p,h,a,o)
        above=sum(1 for k in TEAMS if k!=GIPP and p[k]>=g)
        if above>worst: worst=above; worst_case=(dict(p),oo)
    results.setdefault(g,[]).append((mo,worst,worst_case))
for g in sorted(results, reverse=True):
    w=max(r[1] for r in results[g])
    print("GIPP on %d pts: worst case %d teams level or above -> %s" % (g,w,"CAN MISS" if w>=4 else "CLINCHED (even losing every tiebreak)"))
# show one concrete miss scenario at 15 and 16 if any
for g in (16,15,13):
    for mo,w,wc in results.get(g,[]):
        if w>=4:
            print("\nExample at %d pts, our results (99c,Wand,FT as W/D/L idx):"%g, mo)
            print("  final pts:", {SHORT:wc[0][k] for SHORT,k in [(k.split()[0],k) for k in TEAMS]})
            print("  other results:", [(h.split()[0],a.split()[0],"HDA"[o]) for (_,_,h,a),o in zip(others,wc[1])])
            break
