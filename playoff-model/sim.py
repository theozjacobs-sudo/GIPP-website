"""GIPP playoff model. Edit the data block, run `python3 sim.py && python3 build.py`."""
import json, itertools
import numpy as np

TEAMS = ["99c Fresh FC","Good Intent Poor Product FC","Relaunch FA","Sharples Wednesday","Corinthians",
         "AG Wave & Co","Pickup FC","Wanderers","First Touch FC","Ummah FC"]
GIPP = "Good Intent Poor Product FC"
idx = {k:i for i,k in enumerate(TEAMS)}
ASOF = "going into the Nov 10 round"

# ---------------- DATA ----------------
# Played, scoreline known: (date, home, away, hg, ag)
KNOWN = [
 ("Sep 8","99c Fresh FC","First Touch FC",4,0), ("Sep 8","Pickup FC","Relaunch FA",0,3), ("Sep 8",GIPP,"Corinthians",4,1), ("Sep 8","Sharples Wednesday","Wanderers",2,3),
 ("Sep 15","Corinthians","Wanderers",1,2), ("Sep 15",GIPP,"Sharples Wednesday",1,2), ("Sep 15","AG Wave & Co","First Touch FC",2,0), ("Sep 15","99c Fresh FC","Pickup FC",3,0), ("Sep 15","Relaunch FA","Ummah FC",5,0),
 ("Sep 22","Pickup FC","Ummah FC",5,0), ("Sep 22","Corinthians","Relaunch FA",1,0), ("Sep 22","99c Fresh FC","Wanderers",5,0), ("Sep 22","AG Wave & Co",GIPP,1,7), ("Sep 22","First Touch FC","Sharples Wednesday",0,3),
 ("Sep 29","AG Wave & Co","Sharples Wednesday",2,4), ("Sep 29","First Touch FC","Wanderers",2,2), ("Sep 29",GIPP,"Ummah FC",5,2), ("Sep 29","Corinthians","Pickup FC",1,1),
 ("Oct 6",GIPP,"Pickup FC",1,0), ("Oct 6","Relaunch FA","99c Fresh FC",2,4), ("Oct 6","Corinthians","Sharples Wednesday",4,2), ("Oct 6","AG Wave & Co","Ummah FC",3,0),
 ("Oct 13","Ummah FC","Corinthians",1,2), ("Oct 13","First Touch FC","Relaunch FA",0,0), ("Oct 13","Wanderers","AG Wave & Co",1,5), ("Oct 13","Sharples Wednesday","99c Fresh FC",1,1),
 ("Oct 20","AG Wave & Co","99c Fresh FC",0,2), ("Oct 20","Pickup FC","Wanderers",3,0), ("Oct 20","First Touch FC","Ummah FC",3,3), ("Oct 20","Relaunch FA",GIPP,1,0),
 ("Oct 27","Pickup FC","Sharples Wednesday",2,5), ("Oct 27","AG Wave & Co","Relaunch FA",4,0), ("Oct 27","99c Fresh FC",GIPP,2,2), ("Oct 27","Corinthians","First Touch FC",1,0),
 ("Nov 3","99c Fresh FC","Ummah FC",5,0), ("Nov 3","AG Wave & Co","Corinthians",3,1), ("Nov 3","Wanderers",GIPP,1,2), ("Nov 3","Sharples Wednesday","Relaunch FA",0,5),
]
# Played, winner known, score not reported: (date, home, away, "home"|"away")
WINNER_ONLY = []
# Played, result not reported at all: simulated like a future game
PENDING = []
# Still to play
FUTURE = [
 ("Nov 10","7:00 pm","First Touch FC",GIPP),
 ("Nov 10","7:50 pm","Sharples Wednesday","Ummah FC"),
 ("Nov 10","8:35 pm","Wanderers","Relaunch FA"),
 ("Nov 10","9:20 pm","Corinthians","99c Fresh FC"),
 ("Nov 10","10:10 pm","Pickup FC","AG Wave & Co"),
 ("Nov 17","TBC","Pickup FC","First Touch FC"),
 ("Nov 17","TBC","Wanderers","Ummah FC"),
]
# The league site's table disagrees with its own results for two teams' goal difference
# (GIPP +8 vs +12 from scores, Sharples +4 vs +1). Results are used; this is the sensitivity check.
LEAGUE_GD = {GIPP: 8, "Sharples Wednesday": 4}
NEXT = FUTURE[0]          # the game the scenario cards condition on
N = 200_000; PRIOR = 3.0  # sims; games of league-average play blended into each rating
# --------------------------------------

# audit: 45 games, 9 per team
allgames = [(h,a) for _,h,a,_,_ in KNOWN] + [(h,a) for _,h,a,_ in WINNER_ONLY] + [(h,a) for _,_,h,a in PENDING+FUTURE]
assert len(allgames) == 45, len(allgames)
assert len({frozenset(g) for g in allgames}) == 45
for k in TEAMS: assert sum(1 for g in allgames if k in g) == 9, k

# table from known results (scores) + winner-only games (points, no goals)
T = {k: dict(p=0,w=0,d=0,l=0,gf=0,ga=0,score_missing=0,pending=0) for k in TEAMS}
for _,h,a,hg,ag in KNOWN:
    for t,g1,g2 in ((h,hg,ag),(a,ag,hg)):
        r=T[t]; r['p']+=1; r['gf']+=g1; r['ga']+=g2
        if g1>g2: r['w']+=1
        elif g1==g2: r['d']+=1
        else: r['l']+=1
for _,h,a,who in WINNER_ONLY:
    w,l = (h,a) if who=="home" else (a,h)
    T[w]['p']+=1; T[w]['w']+=1; T[l]['p']+=1; T[l]['l']+=1
    T[w]['score_missing']+=1; T[l]['score_missing']+=1
for _,_,h,a in PENDING: T[h]['pending']+=1; T[a]['pending']+=1
for k in TEAMS: T[k]['gd']=T[k]['gf']-T[k]['ga']; T[k]['pts']=3*T[k]['w']+T[k]['d']
order = sorted(TEAMS, key=lambda k:(-T[k]['pts'],-T[k]['gd'],-T[k]['gf'],k))
print("== Standings %s ==" % ASOF)
for i,k in enumerate(order,1):
    r=T[k]; print("%2d %-28s P%d %d-%d-%d  %2d-%2d %+3d  %2d pts%s" % (i,k,r['p'],r['w'],r['d'],r['l'],r['gf'],r['ga'],r['gd'],r['pts'], "  (score missing x%d)"%r['score_missing'] if r['score_missing'] else ""))

# ratings from known scorelines only
cnt={k:0 for k in TEAMS}; GF={k:0 for k in TEAMS}; GA={k:0 for k in TEAMS}
for _,h,a,hg,ag in KNOWN:
    cnt[h]+=1; cnt[a]+=1; GF[h]+=hg; GA[h]+=ag; GF[a]+=ag; GA[a]+=hg
avg = sum(hg+ag for *_,hg,ag in KNOWN)/(2*len(KNOWN))
att = {k:(GF[k]+PRIOR*avg)/((cnt[k]+PRIOR)*avg) for k in TEAMS}
dfn = {k:(GA[k]+PRIOR*avg)/((cnt[k]+PRIOR)*avg) for k in TEAMS}

rng = np.random.default_rng(20261109)
def draw(h,a,n=N): return rng.poisson(att[h]*dfn[a]*avg,n), rng.poisson(att[a]*dfn[h]*avg,n)
def draw_winner(h,a,who):
    hg,ag = draw(h,a)
    for _ in range(40):
        bad = (hg<=ag) if who=="home" else (ag<=hg)
        if not bad.any(): break
        hg[bad],ag[bad] = draw(h,a,int(bad.sum()))
    bad = (hg<=ag) if who=="home" else (ag<=hg)
    if who=="home": hg[bad]=ag[bad]+1
    else: ag[bad]=hg[bad]+1
    return hg,ag

# simulate every unresolved game once; scenarios differ only in which future games are counted
SIMGAMES = [("winner",h,a,who) for _,h,a,who in WINNER_ONLY] + [("pending",h,a,None) for _,_,h,a in PENDING] + [("future",h,a,d) for d,_,h,a in FUTURE]
G = []
for kind,h,a,x in SIMGAMES:
    hg,ag = draw_winner(h,a,x) if kind=="winner" else draw(h,a)
    G.append((kind,h,a,x,hg,ag))
base_pts = np.array([T[k]['pts'] for k in TEAMS]); base_gd=np.array([T[k]['gd'] for k in TEAMS]); base_gf=np.array([T[k]['gf'] for k in TEAMS])
gi = idx[GIPP]
nh, na = next((hg,ag) for kind,h,a,x,hg,ag in G if (h,a)==(NEXT[2],NEXT[3]))
gipp_home = NEXT[2]==GIPP
next_res = np.where((nh>na) if gipp_home else (na>nh), "win", np.where(nh==na, "draw", "lose"))

def finish(include_nov17, gd0=None):
    pts=np.tile(base_pts,(N,1)).astype(np.int64); gd=np.tile(base_gd if gd0 is None else gd0,(N,1)); gf=np.tile(base_gf,(N,1))
    for kind,h,a,x,hg,ag in G:
        if kind=="future" and x=="Nov 17" and not include_nov17: continue
        hi,ai=idx[h],idx[a]
        if kind!="winner":  # points for winner-only games are already in base
            pts[:,hi]+=np.where(hg>ag,3,np.where(hg==ag,1,0)); pts[:,ai]+=np.where(ag>hg,3,np.where(hg==ag,1,0))
        gd[:,hi]+=hg-ag; gd[:,ai]+=ag-hg; gf[:,hi]+=hg; gf[:,ai]+=ag
    key = pts*1_000_000 + (gd+500)*1000 + gf
    noise = rng.random((N,len(TEAMS)))
    o = np.lexsort((noise,-key),axis=1)
    pos = np.empty_like(o); pos[np.arange(N)[:,None], o] = np.arange(len(TEAMS))[None,:]
    return pts,gd,pos

def exact_clinch(include_nov17):
    """Worst case over every W/D/L combination of unresolved games, GIPP losing every tiebreak."""
    others = [(h,a) for _,_,h,a in PENDING] + [(h,a) for d,_,h,a in FUTURE if GIPP not in (h,a) and (include_nov17 or d!="Nov 17")]
    out = {}
    for res,lab in ((3,"win"),(1,"draw"),(0,"lose")):
        p0 = base_pts.copy(); p0[gi]+=res
        opp = idx[NEXT[2] if not gipp_home else NEXT[3]]
        if res==0: p0[opp]+=3
        elif res==1: p0[opp]+=1
        g = p0[gi]; worst=0
        for combo in itertools.product(range(3),repeat=len(others)):
            p=p0.copy()
            for (h,a),o in zip(others,combo):
                if o==0: p[idx[h]]+=3
                elif o==1: p[idx[h]]+=1; p[idx[a]]+=1
                else: p[idx[a]]+=3
            n = sum(1 for k in TEAMS if k!=GIPP and p[idx[k]]>=g)
            worst = max(worst,n)
        out[lab] = dict(guaranteed=bool(worst<=3), worst=int(worst), pts=int(g))
    return out

out = {}
for name,inc in (("all",True),("noNov17",False)):
    pts,gd,pos = finish(inc)
    qual = (pos<4).mean(axis=0)
    S = dict(
        qual={k:float(qual[idx[k]]) for k in TEAMS},
        seed1={k:float((pos[:,idx[k]]==0).mean()) for k in TEAMS},
        seeds={k:[float((pos[:,idx[k]]==s).mean()) for s in range(10)] for k in TEAMS},
        exp_pts={k:float(pts[:,idx[k]].mean()) for k in TEAMS},
        cond={}, bypts={}, semi_opp={}, clinch=exact_clinch(inc),
        maxpts={k:int(T[k]['pts']+3*(T[k]['pending']+sum(1 for d,_,h,a in FUTURE if k in (h,a) and (inc or d!="Nov 17")))) for k in TEAMS},
        left={k:int(sum(1 for d,_,h,a in FUTURE if k in (h,a) and (inc or d!="Nov 17"))) for k in TEAMS},
    )
    for lab in ("win","draw","lose"):
        m = next_res==lab
        S['cond'][lab] = dict(p_result=float(m.mean()), p_qual=float((pos[m,gi]<4).mean()), p_seed1=float((pos[m,gi]==0).mean()),
                              seeds=[float((pos[m,gi]==s).mean()) for s in range(10)])
    for p in sorted(set(pts[:,gi].tolist())):
        m = pts[:,gi]==p; S['bypts'][int(p)] = dict(p=float(m.mean()), qual=float((pos[m,gi]<4).mean()))
    qm = np.nonzero(pos[:,gi]<4)[0][:60000]
    partner = {0:3,3:0,1:2,2:1}
    from collections import Counter
    c = Counter()
    for i in qm: c[TEAMS[int(np.nonzero(pos[i]==partner[int(pos[i,gi])])[0][0])]] += 1
    tot = sum(c.values()); S['semi_opp'] = {k:v/tot for k,v in c.most_common()}
    lg = base_gd.copy()
    for k,v in LEAGUE_GD.items(): lg[idx[k]] = v
    _,_,pos2 = finish(inc, lg)
    S['leagueGD'] = dict(qual=float((pos2[:,gi]<4).mean()), lose_qual=float((pos2[next_res=="lose",gi]<4).mean()), seeds=[float((pos2[:,gi]==s).mean()) for s in range(10)])
    out[name] = S
    print("  league-table GD variant: qual %.2f%%, if lose %.1f%%" % (100*S['leagueGD']['qual'],100*S['leagueGD']['lose_qual']))
    print("\n== scenario %s ==" % name)
    for k in order: print("  %-28s qual %5.1f%%  top seed %5.1f%%  E[pts] %.1f  max %d" % (k,100*S['qual'][k],100*S['seed1'][k],S['exp_pts'][k],S['maxpts'][k]))
    print("  GIPP seeds:", ["%.1f"%(100*x) for x in S['seeds'][GIPP][:6]])
    for lab in ("win","draw","lose"):
        c_=S['cond'][lab]; print("  if %-4s (%2.0f%%): qual %.1f%%  | exact: %s (worst %d level/above)" % (lab,100*c_['p_result'],100*c_['p_qual'],"GUARANTEED" if S['clinch'][lab]['guaranteed'] else "can miss",S['clinch'][lab]['worst']))
    print("  semi opp:", {k:"%.0f%%"%(100*v) for k,v in S['semi_opp'].items()})

fx = []
for kind,h,a,x,hg,ag in G:
    if kind=="winner": continue
    meta = next(m for m in PENDING+FUTURE if (m[2],m[3])==(h,a))
    fx.append(dict(date=meta[0], time=meta[1], home=h, away=a, status=kind,
                   ph=float((hg>ag).mean()), pd=float((hg==ag).mean()), pa=float((hg<ag).mean()),
                   xh=float(att[h]*dfn[a]*avg), xa=float(att[a]*dfn[h]*avg)))
out.update(fixtures=fx, table={k:T[k] for k in TEAMS}, order=order, avg=avg, N=N, prior=PRIOR, asof=ASOF,
           next=dict(date=NEXT[0], time=NEXT[1], home=NEXT[2], away=NEXT[3]),
           missing=[dict(date=d,home=h,away=a) for d,h,a,_ in WINNER_ONLY])
json.dump(out, open("out.json","w"), indent=1)
print("\nwrote out.json")
