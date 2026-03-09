import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";
import { balanceSheets, incomeStatements, cashFlowData, keyMetrics } from "@/data/robtechData";
import { AlertTriangle, TrendingDown, DollarSign, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────
const fmt = (v: number) => `$${(v / 1000).toFixed(1)}M`;
const fmtK = (v: number) => `$${v.toLocaleString()}K`;

// ── forecast slice (Jun–Sep) ──────────────────────────────────────────────────
const forecastMonths = ["Jun '23*", "Jul '23*", "Aug '23*", "Sep '23*"];

const cashBridge = balanceSheets
  .filter((r) => [...["May '23"], ...forecastMonths].includes(r.month))
  .map((r) => ({ month: r.month, cash: r.cash }));

const revenueForecast = incomeStatements
  .filter((r) => forecastMonths.includes(r.month))
  .map((r) => ({
    month: r.month,
    revenue: r.netSales,
    cogs: r.cogs,
    grossProfit: r.grossProfit,
    netIncome: r.netIncome,
  }));

const cfForecast = cashFlowData
  .filter((r) => forecastMonths.includes(r.month))
  .map((r) => ({ ...r }));

// cash vs. obligations table
const cashTable = [
  { label: "Cash @ May 31, 2023", cash: 11148, obligation: null, note: "Last actual" },
  { label: "Cash @ Jun 30 (forecast)", cash: 7378, obligation: 10000, note: "$10M loan due" },
  { label: "Cash @ Sep 30 (forecast)", cash: 11550, obligation: 14800, note: "$14.8M total due" },
];

// month-by-month cash + debt table
const monthTable = balanceSheets
  .filter((r) => ["May '23", ...forecastMonths].includes(r.month))
  .map((r) => {
    const is = incomeStatements.find((i) => i.month === r.month);
    const cf = cashFlowData.find((c) => c.month === r.month);
    return {
      month: r.month,
      cash: r.cash,
      ar: r.ar,
      inventory: r.inventory,
      ap: r.ap,
      debt: r.notesPayable,
      revenue: is?.netSales ?? null,
      cfops: cf?.cfops ?? null,
    };
  });

export default function Forecast() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-5 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-0.5">
              RobTech · Forecast View
            </p>
            <h1 className="text-2xl font-black tracking-tight">Jun – Sep 2023 Projections</h1>
            <p className="text-xs opacity-60 mt-0.5">Can RobTech repay $14.8M by Sep 30?</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold bg-primary-foreground text-primary px-3 py-2 rounded border border-primary-foreground/30 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Full Analysis
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Bottom-line answer ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cashTable.map((row) => {
            const shortfall = row.obligation ? row.obligation - row.cash : null;
            const ok = shortfall === null || shortfall <= 0;
            return (
              <div
                key={row.label}
                className={`bg-card border rounded-lg p-4 shadow-sm border-t-4 ${
                  ok ? "border-t-success" : "border-t-danger"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {row.label}
                </p>
                <p className="text-2xl font-black text-foreground">{fmt(row.cash)}</p>
                {row.obligation && (
                  <p className="text-xs text-muted-foreground mt-1">
                    vs. <span className="font-semibold text-foreground">{fmt(row.obligation)}</span> due
                  </p>
                )}
                {shortfall !== null && (
                  <div className={`flex items-center gap-1 mt-2 ${ok ? "text-success" : "text-danger"}`}>
                    {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span className="text-xs font-semibold">
                      {ok ? "Sufficient" : `$${((shortfall) / 1000).toFixed(1)}M shortfall`}
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">{row.note}</p>
              </div>
            );
          })}
        </div>

        {/* ── Key assumptions ─────────────────────────────────────────────── */}
        <div className="bg-card border rounded-lg p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
            Key Forecast Assumptions (independent analysis)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {[
              ["Revenue", "~1/3 haircut applied to June backlog ($25.4M → $21.4M); revised figures used Jul–Sep"],
              ["COGS", "Rolling 6-month avg COGS/Sales ratio + $1.22M/mo excess inventory drawdown"],
              ["A/R", "Averaged 6 pre-distortion months (~$11.75M); excluded Apr–May as supply-chain outliers"],
              ["A/P", "Pegged to $9.8M/mo raw material purchases (net-30 = 1 month outstanding)"],
              ["Depreciation", "$240K/mo base + $20K/mo on new CAPEX equipment starting Aug '23"],
              ["Tax catch-up", "$3.2M FY2023 upward revision → catch-up payment due Sep 15, 2023"],
              ["Polish advance", "$5.4M drawn down: Jun $3.6M + Jul $3.6M + Aug $1.2M vs. A/R"],
              ["Dividend", "$2.4M planned by Robinson in Sep — NOT paid in base case (covenant risk)"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-xs">
                <span className="text-primary font-semibold flex-shrink-0 w-28">{k}</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cash bridge chart ────────────────────────────────────────────── */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider mb-1">Cash Balance Trend</p>
          <p className="text-xs text-muted-foreground mb-3">
            May (actual) → Jun–Sep (forecast). Dashed lines show loan obligations.
          </p>
          <div className="bg-card border rounded-lg p-4 shadow-sm">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={cashBridge} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
                <defs>
                  <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142 60% 35%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(142 60% 35%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}M`} tick={{ fontSize: 11 }} domain={[0, 16000]} />
                <Tooltip formatter={(v: number) => [fmt(v), "Cash"]} contentStyle={{ fontSize: 12 }} />
                <ReferenceLine y={10000} stroke="hsl(4 75% 50%)" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "$10M due 6/30", position: "insideTopRight", fontSize: 10, fill: "hsl(4 75% 50%)" }} />
                <ReferenceLine y={14800} stroke="hsl(38 90% 48%)" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "$14.8M due 9/30", position: "insideTopRight", fontSize: 10, fill: "hsl(38 90% 48%)" }} />
                <Area type="monotone" dataKey="cash" stroke="hsl(142 60% 35%)" fill="url(#cashGrad)" strokeWidth={2} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Revenue forecast ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-1">Revenue & Gross Profit Forecast</p>
            <p className="text-xs text-muted-foreground mb-3">Jun '23 spike driven by $10.1M WIP release + Polish advance.</p>
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueForecast} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number, n: string) => [fmtK(v), n]} contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="cogs" name="COGS" stackId="a" fill="hsl(4 75% 50%)" opacity={0.7} />
                  <Bar dataKey="grossProfit" name="Gross Profit" stackId="a" fill="hsl(142 60% 35%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── CF from operations ──────────────────────────────────────────── */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-1">Operating Cash Flow Forecast</p>
            <p className="text-xs text-muted-foreground mb-3">Jun CFOPS deeply negative — A/R lag as backlog ships.</p>
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={cfForecast} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number, n: string) => [fmtK(v), n]} contentStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={0} stroke="hsl(0 0% 40%)" strokeWidth={1.5} />
                  <Bar dataKey="cfops" name="CF from Ops" radius={[3, 3, 0, 0]}>
                    {cfForecast.map((entry, i) => (
                      <Cell key={i} fill={entry.cfops >= 0 ? "hsl(142 60% 35%)" : "hsl(4 75% 50%)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Month-by-month table ─────────────────────────────────────────── */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider mb-1">Month-by-Month Forecast Table</p>
          <p className="text-xs text-muted-foreground mb-3">All figures in $000s. * = forecast.</p>
          <div className="bg-card border rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="text-left px-4 py-2.5 font-semibold">Line Item</th>
                  {monthTable.map((r) => (
                    <th key={r.month} className={`text-right px-4 py-2.5 font-semibold ${r.month === "May '23" ? "text-muted-foreground" : "text-primary"}`}>
                      {r.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Revenue", key: "revenue", format: (v: number | null) => v ? `$${v.toLocaleString()}` : "—" },
                  { label: "Cash", key: "cash", format: (v: number | null) => v ? `$${v.toLocaleString()}` : "—" },
                  { label: "A/R", key: "ar", format: (v: number | null) => v ? `$${v.toLocaleString()}` : "—" },
                  { label: "Inventory", key: "inventory", format: (v: number | null) => v ? `$${v.toLocaleString()}` : "—" },
                  { label: "A/P", key: "ap", format: (v: number | null) => v ? `$${v.toLocaleString()}` : "—" },
                  { label: "Debt (Notes Pay.)", key: "debt", format: (v: number | null) => v ? `$${v.toLocaleString()}` : "—", highlight: true },
                  { label: "CF from Ops", key: "cfops", format: (v: number | null) => v !== null && v !== undefined ? `$${v.toLocaleString()}` : "—" },
                ].map((row, ri) => (
                  <tr key={row.label} className={`border-b border-border last:border-0 ${ri % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                    <td className={`px-4 py-2 font-medium ${row.highlight ? "text-danger" : "text-foreground"}`}>
                      {row.label}
                    </td>
                    {monthTable.map((m) => {
                      const val = (m as Record<string, number | null>)[row.key] ?? null;
                      const isNeg = val !== null && val < 0;
                      return (
                        <td key={m.month} className={`text-right px-4 py-2 font-mono tabular-nums ${isNeg ? "text-danger" : row.highlight ? "text-danger" : "text-foreground"}`}>
                          {row.format(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Obligation row */}
                <tr className="bg-danger/10 border-t-2 border-danger">
                  <td className="px-4 py-2 font-bold text-danger">Loan Due</td>
                  <td className="text-right px-4 py-2 font-mono text-muted-foreground">—</td>
                  <td className="text-right px-4 py-2 font-mono font-bold text-danger">$10,000</td>
                  <td className="text-right px-4 py-2 font-mono text-muted-foreground">—</td>
                  <td className="text-right px-4 py-2 font-mono text-muted-foreground">—</td>
                  <td className="text-right px-4 py-2 font-mono font-bold text-danger">$14,800</td>
                </tr>
                <tr className="bg-danger/5">
                  <td className="px-4 py-2 font-bold text-danger">Cash vs. Obligation</td>
                  <td className="text-right px-4 py-2 font-mono text-muted-foreground">—</td>
                  <td className="text-right px-4 py-2 font-mono font-bold text-danger">−$2,622</td>
                  <td className="text-right px-4 py-2 font-mono text-muted-foreground">—</td>
                  <td className="text-right px-4 py-2 font-mono text-muted-foreground">—</td>
                  <td className="text-right px-4 py-2 font-mono font-bold text-danger">−$3,250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Risk flags ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-danger/40 rounded-lg p-4 shadow-sm border-t-4 border-t-danger">
            <p className="text-xs font-bold uppercase tracking-wider text-danger mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Key Forecast Risks
            </p>
            <ul className="space-y-1.5">
              {[
                "Jun revenue of $21.4M is 3× May actuals — very aggressive",
                "3 consecutive months of forecast misses (Mar–May '23)",
                "Tax catch-up of $3.2M due Sep 15 pressures cash at worst time",
                "$2.4M dividend planned in Sep adds to repayment pressure",
                "Airport segment still at 70% of pre-COVID volumes",
              ].map((r, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="text-danger flex-shrink-0">!</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-success/40 rounded-lg p-4 shadow-sm border-t-4 border-t-success">
            <p className="text-xs font-bold uppercase tracking-wider text-success mb-3 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 rotate-180" /> Supporting Factors
            </p>
            <ul className="space-y-1.5">
              {[
                "$10.08M WIP confirmed in process — legitimate release mechanism",
                "$5.4M Polish advance already received in cash",
                "Inventory drawdown of $1.22M/mo reduces COGS outlay",
                "Altman Z-Score of 4.36 — structurally solvent company",
                "Zero debt history from 2005–2022; strong long-term track record",
              ].map((r, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="text-success flex-shrink-0">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Verdict ──────────────────────────────────────────────────────── */}
        <div className="bg-card border-2 border-warning rounded-lg p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-warning mb-2">GFB Decision — Bottom Line</p>
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Extend both loans to Sep 30</strong>, but with strict covenants: no dividends, minimum $5M cash covenant,
            monthly reporting, and equipment as collateral on the CAPEX loan. The forecast shows a <strong>$3.2M shortfall</strong> at
            Sep 30 — GFB should require Robinson to demonstrate how this gap closes (e.g. additional inventory liquidation, delay
            dividend, or partial early repayment from June cash flows).
          </p>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-6 pb-10 text-center">
          <p className="text-xs text-muted-foreground">
            Robinson HVAC Tech Inc. Case Study · Forecast View ·{" "}
            <em>Fictitious case written solely as a basis for class analysis + discussion.</em>
          </p>
        </footer>
      </main>
    </div>
  );
}
