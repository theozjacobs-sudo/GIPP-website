import json, random, math, sys
from collections import defaultdict, Counter

TEAMS = ["99c Fresh FC","Good Intent Poor Product FC","Relaunch FA","Sharples Wednesday","Corinthians",
         "AG Wave & Co","Pickup FC","Wanderers","First Touch FC","Ummah FC"]
GIPP = "Good Intent Poor Product FC"

# (date, home, away, hg, ag)
RESULTS = [
 ("Sep 8","99c Fresh FC","First Touch FC",4,0),
 ("Sep 8","Pickup FC","Relaunch FA",0,3),
 ("Sep 8",GIPP,"Corinthians",4,1),
 ("Sep 8","Sharples Wednesday","Wanderers",2,3),
 ("Sep 15","Corinthians","Wanderers",1,2),
 ("Sep 15",GIPP,"Sharples Wednesday",1,2),
 ("Sep 15","AG Wave & Co","First Touch FC",2,0),
 ("Sep 15","99c Fresh FC","Pickup FC",3,0),
 ("Sep 15","Relaunch FA","Ummah FC",5,0),
 ("Sep 22","Pickup FC","Ummah FC",5,0),
 ("Sep 22","Corinthians","Relaunch FA",1,0),
 ("Sep 22","99c Fresh FC","Wanderers",5,0),
 ("Sep 22","AG Wave & Co",GIPP,1,7),
 ("Sep 22","First Touch FC","Sharples Wednesday",0,3),  # forfeit
 ("Sep 29","AG Wave & Co","Sharples Wednesday",2,4),
 ("Sep 29","First Touch FC","Wanderers",2,2),
 ("Sep 29",GIPP,"Ummah FC",5,2),
 ("Sep 29","Corinthians","Pickup FC",1,1),
 ("Oct 6",GIPP,"Pickup FC",1,0),
 ("Oct 6","Relaunch FA","99c Fresh FC",2,4),
 ("Oct 6","Corinthians","Sharples Wednesday",4,2),
 ("Oct 6","AG Wave & Co","Ummah FC",3,0),
 ("Oct 13","Ummah FC","Corinthians",1,2),
 ("Oct 13","First Touch FC","Relaunch FA",0,0),
 ("Oct 13","Wanderers","AG Wave & Co",1,5),
 ("Oct 13","Sharples Wednesday","99c Fresh FC",1,1),
 ("Oct 20","AG Wave & Co","99c Fresh FC",0,2),
 ("Oct 20","Pickup FC","Wanderers",3,0),
 ("Oct 20","First Touch FC","Ummah FC",3,3),
 ("Oct 20","Relaunch FA",GIPP,1,0),
]

# Listed on the league site
FIXTURES = [
 ("Oct 27","7:00 pm","Pickup FC","Sharples Wednesday"),
 ("Oct 27","7:55 pm","AG Wave & Co","Relaunch FA"),
 ("Oct 27","8:45 pm","99c Fresh FC",GIPP),
 ("Oct 27","9:40 pm","Corinthians","First Touch FC"),
 ("Nov 3","7:00 pm","99c Fresh FC","Ummah FC"),
 ("Nov 3","7:55 pm","AG Wave & Co","Corinthians"),
 ("Nov 3","8:45 pm","Wanderers",GIPP),
 ("Nov 3","9:40 pm","Sharples Wednesday","Relaunch FA"),
 ("Nov 10","7:00 pm","First Touch FC",GIPP),
 ("Nov 10","7:55 pm","Sharples Wednesday","Ummah FC"),
 ("Nov 10","8:45 pm","Wanderers","Relaunch FA"),
 ("Nov 10","9:40 pm","Pickup FC","AG Wave & Co"),
]

def table(results):
    t = {k: dict(p=0,w=0,d=0,l=0,gf=0,ga=0) for k in TEAMS}
    for _,h,a,hg,ag in results:
        for team,g1,g2 in ((h,hg,ag),(a,ag,hg)):
            r=t[team]; r['p']+=1; r['gf']+=g1; r['ga']+=g2
            if g1>g2: r['w']+=1
            elif g1==g2: r['d']+=1
            else: r['l']+=1
    for k,r in t.items():
        r['gd']=r['gf']-r['ga']; r['pts']=3*r['w']+r['d']
    return t

def rank(t):
    return sorted(TEAMS, key=lambda k:(-t[k]['pts'],-t[k]['gd'],-t[k]['gf'],k))

T = table(RESULTS)
print("== Standings from results ==")
for i,k in enumerate(rank(T),1):
    r=T[k]; print(i,k,r['p'],r['w'],r['d'],r['l'],r['gf'],r['ga'],r['gd'],r['pts'])

# Missing pairings
played=set()
for _,h,a,_,_ in RESULTS: played.add(frozenset((h,a)))
for _,_,h,a in FIXTURES: played.add(frozenset((h,a)))
missing=[]
for i,a in enumerate(TEAMS):
    for b in TEAMS[i+1:]:
        if frozenset((a,b)) not in played: missing.append((a,b))
print("== Unscheduled pairings (should be Nov 17) ==", missing)

# ---------------- Monte Carlo ----------------
import numpy as np
rng = np.random.default_rng(20261021)
N = 200_000
PRIOR = 3.0   # games of league-average play blended into each team's rating (shrinkage)

NOV17 = [("Nov 17","TBC","99c Fresh FC","Corinthians"),
         ("Nov 17","TBC","Pickup FC","First Touch FC"),
         ("Nov 17","TBC","Wanderers","Ummah FC")]
ALL_FIX = FIXTURES + NOV17

tot_goals = sum(hg+ag for *_,hg,ag in RESULTS)
avg = tot_goals / (2*len(RESULTS))   # goals per team per game
att, dfn = {}, {}
for k in TEAMS:
    r=T[k]
    att[k] = (r['gf'] + PRIOR*avg) / ((r['p']+PRIOR)*avg)
    dfn[k] = (r['ga'] + PRIOR*avg) / ((r['p']+PRIOR)*avg)
print("avg goals/team/game %.2f" % avg)
for k in TEAMS: print("  %-28s att %.2f  def %.2f  xG/game %.2f" % (k, att[k], dfn[k], att[k]*avg))

idx = {k:i for i,k in enumerate(TEAMS)}
gi = idx[GIPP]
base_pts = np.array([T[k]['pts'] for k in TEAMS]); base_gd = np.array([T[k]['gd'] for k in TEAMS]); base_gf = np.array([T[k]['gf'] for k in TEAMS])

# simulate goals for all 15 fixtures once; scenario B just ignores last 3
H = np.zeros((N,len(ALL_FIX)),dtype=np.int64); A = np.zeros_like(H)
for j,(_,_,h,a) in enumerate(ALL_FIX):
    H[:,j] = rng.poisson(att[h]*dfn[a]*avg, N)
    A[:,j] = rng.poisson(att[a]*dfn[h]*avg, N)

def finish(nfix):
    pts = np.tile(base_pts,(N,1)).astype(np.int64); gd = np.tile(base_gd,(N,1)); gf = np.tile(base_gf,(N,1))
    for j in range(nfix):
        _,_,h,a = ALL_FIX[j]; hi,ai = idx[h],idx[a]
        hg,ag = H[:,j],A[:,j]
        pts[:,hi] += np.where(hg>ag,3,np.where(hg==ag,1,0)); pts[:,ai] += np.where(ag>hg,3,np.where(hg==ag,1,0))
        gd[:,hi] += hg-ag; gd[:,ai] += ag-hg; gf[:,hi]+=hg; gf[:,ai]+=ag
    # rank: pts, gd, gf, then random tiebreak
    key = pts*1_000_000 + (gd+500)*1000 + gf
    noise = rng.random((N,len(TEAMS)))
    order = np.lexsort((noise, -key), axis=1)   # ascending by -key => best first
    pos = np.empty_like(order)
    rows = np.arange(N)[:,None]
    pos[rows, order] = np.arange(len(TEAMS))[None,:]  # pos[i,team] = 0-based finishing position
    return pts, gd, pos

out = {}
for name,nfix in (("all15",15),("twelve",12)):
    pts,gd,pos = finish(nfix)
    qual = (pos<4).mean(axis=0)
    seed1 = (pos==0).mean(axis=0)
    seeds = {k: [float((pos[:,idx[k]]==s).mean()) for s in range(10)] for k in TEAMS}
    # GIPP conditional on Oct 27 vs 99c (fixture 2: 99c home, GIPP away)
    g_h, g_a = H[:,2], A[:,2]
    cond = {}
    for lab,mask in (("win",g_a>g_h),("draw",g_a==g_h),("lose",g_a<g_h)):
        cond[lab] = dict(p_result=float(mask.mean()), p_qual=float((pos[mask,gi]<4).mean()),
                         p_seed1=float((pos[mask,gi]==0).mean()),
                         seeds=[float((pos[mask,gi]==s).mean()) for s in range(10)])
    # GIPP by final points
    bypts = {}
    for p in sorted(set(pts[:,gi].tolist())):
        m = pts[:,gi]==p
        bypts[int(p)] = dict(p=float(m.mean()), qual=float((pos[m,gi]<4).mean()))
    # semi opponent if GIPP qualifies: 1v4, 2v3
    opp = Counter()
    qm = pos[:,gi]<4
    partner = np.where(pos[:,gi]==0,3,np.where(pos[:,gi]==3,0,np.where(pos[:,gi]==1,2,1)))
    for i in np.nonzero(qm)[0][:50000]:
        opp[TEAMS[int(np.nonzero(pos[i]==partner[i])[0][0])]] += 1
    tot = sum(opp.values())
    out[name] = dict(qual={k:float(qual[idx[k]]) for k in TEAMS}, seed1={k:float(seed1[idx[k]]) for k in TEAMS},
                     seeds=seeds, cond=cond, bypts=bypts, semi_opp={k:v/tot for k,v in opp.most_common()},
                     exp_pts={k:float(pts[:,idx[k]].mean()) for k in TEAMS})
    print("\n==", name, "==")
    for k in rank(T): print("  %-28s qual %5.1f%%  top seed %5.1f%%  E[pts] %.1f" % (k, 100*qual[idx[k]], 100*seed1[idx[k]], pts[:,idx[k]].mean()))
    print("  GIPP seeds:", ["%.1f"%(100*x) for x in seeds[GIPP]])
    for lab in ("win","draw","lose"): print("  GIPP if %s vs 99c (%.0f%%): qual %.1f%%, seed1 %.1f%%" % (lab,100*cond[lab]['p_result'],100*cond[lab]['p_qual'],100*cond[lab]['p_seed1']))
    print("  by pts:", {p:("%.0f%% / qual %.0f%%"%(100*v['p'],100*v['qual'])) for p,v in bypts.items()})
    print("  semi opp:", {k:"%.0f%%"%(100*v) for k,v in out[name]['semi_opp'].items()})

# per-fixture probabilities
fx = []
for j,(d,t,h,a) in enumerate(ALL_FIX):
    hg,ag = H[:,j],A[:,j]
    fx.append(dict(date=d,time=t,home=h,away=a,ph=float((hg>ag).mean()),pd=float((hg==ag).mean()),pa=float((hg<ag).mean()),
                   xh=float(att[h]*dfn[a]*avg), xa=float(att[a]*dfn[h]*avg)))
    print("%-6s %-26s v %-26s  %4.0f/%4.0f/%4.0f" % (d,h,a,100*fx[-1]['ph'],100*fx[-1]['pd'],100*fx[-1]['pa']))

out['fixtures']=fx; out['table']={k:T[k] for k in TEAMS}; out['order']=rank(T); out['avg']=avg
out['ratings']={k:dict(att=att[k],dfn=dfn[k]) for k in TEAMS}; out['N']=N; out['prior']=PRIOR
json.dump(out, open("out.json","w"), indent=1)
