import { altmanZScore, balanceSheets, incomeStatements } from "@/data/robtechData";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

export const AltmanZScore = () => {
  const { wc, ta, re, ebit, mve, tl, sales, zScore } = altmanZScore;

  const x1 = +(wc / ta).toFixed(3);
  const x2 = +(re / ta).toFixed(3);
  const x3 = +(ebit / ta).toFixed(3);
  const x4 = +(mve / tl).toFixed(3);
  const x5 = +(sales / ta).toFixed(3);

  const components = [
    { name: "X1 = Working Capital / Total Assets", coeff: 1.2, value: x1, contribution: +(1.2 * x1).toFixed(3) },
    { name: "X2 = Retained Earnings / Total Assets", coeff: 1.4, value: x2, contribution: +(1.4 * x2).toFixed(3) },
    { name: "X3 = EBIT / Total Assets", coeff: 3.3, value: x3, contribution: +(3.3 * x3).toFixed(3) },
    { name: "X4 = Market Value Equity / Total Liabilities", coeff: 0.6, value: x4, contribution: +(0.6 * x4).toFixed(3) },
    { name: "X5 = Sales / Total Assets (annualized TTM)", coeff: 1.0, value: x5, contribution: +(1.0 * x5).toFixed(3) },
  ];

  const zoneColor = zScore > 2.99 ? "success" : zScore > 1.8 ? "warning" : "danger";
  const zoneLabel = zScore > 2.99 ? "Safe Zone" : zScore > 1.8 ? "Grey Zone" : "Distress Zone";
  const zoneDesc = zScore > 2.99
    ? "Z > 2.99: Company is financially healthy with low bankruptcy risk."
    : zScore > 1.8
    ? "1.8 < Z < 2.99: Grey zone — caution warranted."
    : "Z < 1.8: High probability of financial distress.";

  // PELL ratios at May '23
  const may = incomeStatements[9]; // May '23
  const mayBS = balanceSheets[9]; // May '23
  const prevEquity = balanceSheets[8].equity; // Apr '23

  const annualSales = (may.netSales / mayBS.totalAssets) * 12;
  const currentRatio = mayBS.currentAssets / (mayBS.totalLiab - mayBS.notesPayable);
  const quickRatio = (mayBS.cash + mayBS.ar) / (mayBS.totalLiab - mayBS.notesPayable);
  const daysAR = (mayBS.ar / may.netSales) * 30;
  const daysInv = (mayBS.inventory / may.cogs) * 30;
  const daysAP = (mayBS.ap / may.cogs) * 30;
  const cashCycle = daysAR + daysInv - daysAP;
  const leverageRatio = mayBS.totalLiab / mayBS.totalAssets;
  const pm = (may.netIncome / may.netSales) * 100;
  const grossMargin = (may.grossProfit / may.netSales) * 100;

  const pellRows = [
    { label: "Gross Margin", value: `${grossMargin.toFixed(1)}%`, note: "Stable ~22% throughout" },
    { label: "Net Profit Margin", value: `${pm.toFixed(1)}%`, note: "Compressed but positive" },
    { label: "Current Ratio", value: currentRatio.toFixed(2), note: "Excl. notes payable; adequate" },
    { label: "Quick Ratio", value: quickRatio.toFixed(2), note: "Cash + A/R only" },
    { label: "Days Receivable", value: `${daysAR.toFixed(1)} days`, note: "~30 day terms" },
    { label: "Days Inventory", value: `${daysInv.toFixed(1)} days`, note: "Elevated — supply chain build" },
    { label: "Days Payable", value: `${daysAP.toFixed(1)} days`, note: "30 day terms" },
    { label: "Cash-to-Cash Cycle", value: `${cashCycle.toFixed(1)} days`, note: "Working capital efficiency" },
    { label: "Total Liab / Total Assets", value: `${(leverageRatio * 100).toFixed(1)}%`, note: "Modest leverage" },
  ];

  return (
    <Section
      title="Credit Risk Analysis"
      subtitle="Altman Z-Score at 5/31/23 and PELL key ratios. All figures in $000s unless noted."
      badge="Risk"
      badgeVariant="warning"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Z-Score Card */}
        <div className="bg-card border rounded-lg p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Altman Z-Score @ May 31, 2023
          </p>
          <div className={cn(
            "text-center py-4 rounded-lg mb-4",
            zoneColor === "success" ? "bg-success/10 border border-success" :
            zoneColor === "warning" ? "bg-warning/10 border border-warning" :
            "bg-danger/10 border border-danger"
          )}>
            <p className={cn(
              "text-5xl font-black",
              zoneColor === "success" ? "text-success" :
              zoneColor === "warning" ? "text-warning" : "text-danger"
            )}>{zScore}</p>
            <p className={cn(
              "text-sm font-bold mt-1",
              zoneColor === "success" ? "text-success" :
              zoneColor === "warning" ? "text-warning" : "text-danger"
            )}>{zoneLabel}</p>
            <p className="text-xs text-muted-foreground mt-1 px-4">{zoneDesc}</p>
          </div>
          <div className="space-y-2">
            {components.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs border-b border-border pb-1">
                <span className="text-muted-foreground">{c.name}</span>
                <span className="font-mono font-semibold text-foreground">
                  {c.coeff} × {c.value} = <span className="text-primary">{c.contribution}</span>
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span>Z-Score Total</span>
              <span className="text-success text-lg">{zScore}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 bg-muted/50 rounded p-2">
            ⚠️ Despite a high Z-Score, the case warns against complacency: Z-Score uses TTM sales and equity proxies, and does not capture the severe cash crunch risk at June 30, 2023.
          </p>
        </div>

        {/* PELL Ratios */}
        <div className="bg-card border rounded-lg p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
            PELL Key Ratios @ May 31, 2023
          </p>
          <div className="space-y-2">
            {pellRows.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-xs py-1.5 border-b border-border">
                <span className="font-medium text-foreground">{r.label}</span>
                <div className="text-right">
                  <span className="font-mono font-bold text-primary">{r.value}</span>
                  <p className="text-muted-foreground text-[10px]">{r.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 bg-muted/50 rounded p-2">
            💡 Days inventory of ~127 days is elevated vs. historic ~45 days — direct result of $4.88M excess raw material purchases to prep for Polish order fulfillment.
          </p>
        </div>
      </div>
    </Section>
  );
};
