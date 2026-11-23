from pathlib import Path
import csv

ROOT = Path(r"C:\Users\ashka\Documents\Manus\2026-10-12\oESGyC")
OUT = ROOT / "Asa_Financial_Dashboard.svg"
CSV = ROOT / "Asa_Scenario_Projections.csv"

SCENARIOS = {
    "Conservative": {"new": 8, "growth": .05, "shop_orders": 1.0, "med_visits": .15, "shop_price": 14, "shop_cost": 10, "med_price": 45, "med_cost": 34, "fee": .08, "reserve": .06, "fixed": 3500, "marketing": 400, "cac": 45, "color": "#C58B4E"},
    "Base": {"new": 15, "growth": .08, "shop_orders": 1.5, "med_visits": .35, "shop_price": 18, "shop_cost": 9, "med_price": 55, "med_cost": 35, "fee": .07, "reserve": .05, "fixed": 4500, "marketing": 900, "cac": 60, "color": "#1F4E79"},
    "Upside": {"new": 25, "growth": .12, "shop_orders": 2.0, "med_visits": .55, "shop_price": 22, "shop_cost": 8, "med_price": 70, "med_cost": 38, "fee": .06, "reserve": .04, "fixed": 6000, "marketing": 1600, "cac": 75, "color": "#2E7D66"},
}

def money(x):
    return f"${x:,.0f}"
def pct(x):
    return f"{x:.0%}"
def esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

def calc(p):
    out=[]
    cumulative=0
    for m in range(1,13):
        new = p["new"] * (1+p["growth"])**(m-1)
        shop = new * p["shop_orders"]
        med = new * p["med_visits"]
        revenue = shop*p["shop_price"] + med*p["med_price"]
        direct = shop*p["shop_cost"] + med*p["med_cost"]
        fees = revenue*p["fee"]
        reserve = revenue*p["reserve"]
        contribution = revenue-direct-fees-reserve
        cash = contribution-p["fixed"]-p["marketing"]-new*p["cac"]
        cumulative += cash
        out.append({"month":m,"new_customers":new,"shopping_orders":shop,"medical_visits":med,"service_revenue":revenue,"direct_costs":direct,"payment_fx":fees,"reserve":reserve,"contribution":contribution,"fixed_cost":p["fixed"],"marketing":p["marketing"],"cac_spend":new*p["cac"],"net_cash_flow":cash,"cumulative_cash_flow":cumulative})
    return out

DATA={name:calc(p) for name,p in SCENARIOS.items()}

with CSV.open("w", newline="", encoding="utf-8") as f:
    fields=["scenario"]+list(DATA["Base"][0].keys())
    w=csv.DictWriter(f, fieldnames=fields); w.writeheader()
    for name, rows in DATA.items():
        for r in rows: w.writerow({"scenario":name, **r})

# Minimal SVG chart primitives.
def text(x,y,s,size=16,fill="#1F2937",weight="400",anchor="start"):
    return f'<text x="{x}" y="{y}" font-family="Arial,Segoe UI,sans-serif" font-size="{size}px" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}">{esc(s)}</text>'
def line(x1,y1,x2,y2,stroke="#CBD5E1",sw=1,dash=""):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}"{f" stroke-dasharray=\"{dash}\"" if dash else ""}/>'
def rect(x,y,w,h,fill,rx=8,stroke="none"):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'
def circle(x,y,r,fill): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'

def chart_frame(x,y,w,h,title,subtitle=""):
    return rect(x,y,w,h,"#FFFFFF",14,"#E2E8F0")+text(x+24,y+32,title,18,"#0F172A","700")+(text(x+24,y+54,subtitle,12,"#64748B") if subtitle else "")

def line_chart(x,y,w,h,series,title,subtitle):
    s=chart_frame(x,y,w,h,title,subtitle); px=x+54; py=y+78; pw=w-80; ph=h-122
    vals=[v for rows in series.values() for v in rows]; lo=min(vals); hi=max(vals); lo=min(lo,0); hi=max(hi,0)
    if hi==lo: hi=1
    for tick in range(5):
        val=lo+(hi-lo)*tick/4; yy=py+ph-(val-lo)/(hi-lo)*ph
        s += line(px,yy,px+pw,yy,"#E2E8F0",1,"4 4")+text(px-8,yy+4,money(val),11,"#64748B","400","end")
    for m in range(1,13):
        xx=px+(m-1)*pw/11; s += text(xx,py+ph+22,str(m),11,"#64748B","400","middle")
    s += text(px+pw/2,py+ph+44,"Month",11,"#64748B","400","middle")
    for name, vals2 in series.items():
        pts=[]
        for i,val in enumerate(vals2):
            xx=px+i*pw/11; yy=py+ph-(val-lo)/(hi-lo)*ph; pts.append(f"{xx:.1f},{yy:.1f}")
        color=SCENARIOS[name]["color"]; s += f'<polyline points="{" ".join(pts)}" fill="none" stroke="{color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
        s += circle(px+pw,py+ph-(vals2[-1]-lo)/(hi-lo)*ph,4,color)+text(px+pw+8,py+ph-(vals2[-1]-lo)/(hi-lo)*ph+4,money(vals2[-1]),11,color,"700")
    lx=x+24; ly=y+h-20
    for i,name in enumerate(series):
        s += circle(lx+i*105,ly-4,4,SCENARIOS[name]["color"])+text(lx+i*105+9,ly,name,11,"#475569")
    return s

def bar_chart(x,y,w,h,values,title,subtitle,percent=False):
    s=chart_frame(x,y,w,h,title,subtitle); px=x+60; py=y+78; pw=w-86; ph=h-126; mx=max(max(values.values()),1)
    bw=pw/(len(values)*1.7); gap=bw*.7
    for j in range(5):
        val=mx*j/4; yy=py+ph-val/mx*ph
        s += line(px,yy,px+pw,yy,"#E2E8F0",1,"4 4")+text(px-8,yy+4,(pct(val) if percent else money(val)),11,"#64748B","400","end")
    colors={"Shopping":"#C58B4E","Medical Companion":"#2E7D66","Conservative":"#C58B4E","Base":"#1F4E79","Upside":"#2E7D66"}
    for i,(name,val) in enumerate(values.items()):
        xx=px+gap+i*(bw+gap); hh=val/mx*ph; yy=py+ph-hh; color=colors.get(name,"#1F4E79")
        s += rect(xx,yy,bw,hh,color,5)+text(xx+bw/2,py+ph+22,name,11,"#475569","400","middle")+text(xx+bw/2,yy-8,(pct(val) if percent else money(val)),12,color,"700","middle")
    return s

def metric_card(x,y,w,h,label,value,sub,color):
    return rect(x,y,w,h,"#FFFFFF",12,"#E2E8F0")+text(x+18,y+27,label,11,"#64748B","700")+text(x+18,y+59,value,24,color,"700")+text(x+18,y+80,sub,10,"#64748B")

# Assemble dashboard.
W,H=1600,1160
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',rect(0,0,W,H,"#F8FAFC",0),text(56,58,"Asa (آسا) financial dashboard",30,"#0F172A","700"),text(56,86,"Scenario visualization from the editable Asa Financial Model · USD-equivalent planning assumptions",14,"#64748B"),text(1544,58,"14 Nov 2026",12,"#64748B","400","end")]
base=DATA["Base"]
base12=base[-1]
shop_contrib=SCENARIOS["Base"]["shop_price"]-SCENARIOS["Base"]["shop_cost"]-SCENARIOS["Base"]["shop_price"]*(SCENARIOS["Base"]["fee"]+SCENARIOS["Base"]["reserve"])
med_contrib=SCENARIOS["Base"]["med_price"]-SCENARIOS["Base"]["med_cost"]-SCENARIOS["Base"]["med_price"]*(SCENARIOS["Base"]["fee"]+SCENARIOS["Base"]["reserve"])
monthly_fixed=SCENARIOS["Base"]["fixed"]+SCENARIOS["Base"]["marketing"]
be_shop=monthly_fixed/shop_contrib
be_med=monthly_fixed/med_contrib
cards=[("Base M12 service revenue",money(base12["service_revenue"]),"Excludes grocery pass-through","#1F4E79"),("Base M12 net cash flow",money(base12["net_cash_flow"]),"After fixed costs, marketing and CAC","#C0392B"),("Shopping contribution / order",money(shop_contrib),"Before fixed costs","#2E7D66"),("Medical contribution / visit",money(med_contrib),"Before fixed costs","#2E7D66"),("Break-even: shopping only",f"{be_shop:,.0f}","Orders/month at base assumptions","#C58B4E"),("Break-even: medical only",f"{be_med:,.0f}","Visits/month at base assumptions","#C58B4E")]
for i,c in enumerate(cards):
    col=i%3; row=i//3; svg.append(metric_card(56+col*504,120+row*112,472,92,*c))
rev={name:[r["service_revenue"] for r in rows] for name,rows in DATA.items()}
cash={name:[r["cumulative_cash_flow"] for r in rows] for name,rows in DATA.items()}
svg.append(line_chart(56,360,732,350,rev,"Monthly service revenue","Grocery product value is excluded from Asa revenue"))
svg.append(line_chart(812,360,732,350,cash,"Cumulative cash flow","Illustrative after fixed costs, marketing and CAC spend"))
unitvals={"Shopping":shop_contrib,"Medical Companion":med_contrib}
# Custom bar for unit economics labels.
svg.append(bar_chart(56,742,480,330,{"Shopping":shop_contrib,"Medical Companion":med_contrib},"Contribution profit per service","Base scenario; before fixed costs"))
# M12 mix stacked-like simple comparison.
mixvals={name:rows[-1]["service_revenue"] for name,rows in DATA.items()}
svg.append(bar_chart(560,742,480,330,mixvals,"M12 service revenue by scenario","Base assumptions recalculated for each scenario"))
# volumes table
x,y,w,h=1064,742,480,330
svg.append(chart_frame(x,y,w,h,"M12 operating volume","Monthly new customers, shopping orders and medical visits"))
svg.append(text(x+24,y+86,"Scenario",12,"#64748B","700")); svg.append(text(x+160,y+86,"New cust.",12,"#64748B","700")); svg.append(text(x+260,y+86,"Shopping",12,"#64748B","700")); svg.append(text(x+370,y+86,"Medical",12,"#64748B","700"))
for i,(name,rows) in enumerate(DATA.items()):
    yy=y+120+i*48; r=rows[-1]; svg.append(circle(x+29,yy-5,5,SCENARIOS[name]["color"])); svg.append(text(x+42,yy,name,13,"#0F172A","700")); svg.append(text(x+176,yy,f"{r['new_customers']:.0f}",13,"#475569")); svg.append(text(x+276,yy,f"{r['shopping_orders']:.0f}",13,"#475569")); svg.append(text(x+386,yy,f"{r['medical_visits']:.0f}",13,"#475569")); svg.append(line(x+24,yy+18,x+w-24,yy+18,"#E2E8F0"))
svg.append(text(56,1128,"Source: Asa Financial Model.xlsx. Assumptions are illustrative and require local quotes, provider approval, and paid-pilot validation; not actual sales data.",11,"#64748B"))
svg.append('</svg>')
OUT.write_text(''.join(svg),encoding='utf-8')
print(OUT)
print(CSV)
