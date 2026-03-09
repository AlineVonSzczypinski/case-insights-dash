import { KPICard } from "@/components/KPICard";
import { Section } from "@/components/Section";
import { ShipmentChart } from "@/components/ShipmentChart";
import { IncomeChart } from "@/components/IncomeChart";
import { CashLiquidityChart } from "@/components/CashLiquidityChart";
import { CashFlowChart } from "@/components/CashFlowChart";
import { AltmanZScore } from "@/components/AltmanZScore";
import { FinancialTables } from "@/components/FinancialTables";
import { Timeline } from "@/components/Timeline";
import { LoanAnalysis } from "@/components/LoanAnalysis";
import { Building2, DollarSign, TrendingDown, AlertTriangle, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Building2 className="w-6 h-6 opacity-80" />
                <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  Financial Analysis Case Study
                </span>
              </div>
              <h1 className="text-3xl font-black tracking-tight">
                Robinson HVAC Tech Inc.
              </h1>
              <p className="text-sm opacity-75 mt-1">
                Credit Risk Assessment · Georgia First Bank · June 17, 2023
              </p>
            </div>
            <div className="text-right text-sm opacity-70">
              <p className="font-semibold">Analyst:</p>
              <p>Work Sample</p>
              <p className="mt-1">Version 3/11/25</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Case Summary */}
        <Section title="Case Summary" subtitle="Robinson HVAC Tech Inc. — Overview">
          <div className="bg-card border rounded-lg p-5 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Company Overview</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Robinson HVAC Tech Inc. (RobTech)</strong> is an Atlanta-based
                  HVAC manufacturer specializing in <em>ductless A/C units</em>, <em>thermally driven A/C systems</em>,
                  and <em>dual-fuel heat pumps</em> for airports and auto assembly plants. Founded in 1998 by
                  Marvin Robinson, RobTech reached $152M in FY2022 sales — split evenly between the two customer
                  segments. 84% of sales are U.S.-based; 16% in Poland and Hungary.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  RobTech maintained zero debt from 2005 until September 2022, when CEO Robinson took a
                  <strong className="text-foreground"> $10M term loan from Georgia First Bank (GFB)</strong> to
                  fund a stock repurchase of 1M shares (30% reduction), using $15M total ($10M loan + $5M cash).
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">The Loan Decision</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  On June 17, 2023, SVP <strong className="text-foreground">Nina Garcia</strong> at GFB must decide
                  whether to: (1) <em>roll over</em> the existing $10M loan to September 30, and (2) <em>approve</em> a
                  new $4.8M CAPEX loan for production equipment needed by July 30. Both loans would total <strong className="text-foreground">$14.8M due September 30, 2023</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  The challenge: sales dropped sharply in Mar–May 2023 due to <strong className="text-foreground">supply chain bottlenecks</strong>
                  (key components delayed), inventory ballooned to $24.3M, and RobTech cannot repay the June 30
                  maturity with only $11.1M cash vs. $10M owed. Robinson claims a large <strong className="text-foreground">backlog release
                  of $10.1M</strong> and a $8.4M Polish customer order will drive a June revenue spike to $25.4M.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Given vs. Independent Analysis */}
        <Section title="What Was Given vs. What I Analyzed" subtitle="Case inputs provided vs. independent judgments required">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div className="bg-card border border-success/40 rounded-lg p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-success mb-3">✓ Provided in the Case</p>
              <ul className="space-y-1.5">
                {[
                  "Monthly IS + BS (Aug 2022 – May 2023)",
                  "Original + revised sales forecasts (Oct '22 – Sep '23)",
                  "Loan terms: $10M @ 6%, due 6/30/23; $4.8M CAPEX proposed",
                  "Net-30 terms on sales + purchases; $240K/mo depreciation; 25% tax rate",
                  "Supply chain bottleneck narrative; $10.08M WIP releasing in June",
                  "$4.88M excess inventory → drawn down $1.22M/month over 4 months",
                  "Raw material purchases cut to $9.8M/month going forward",
                  "$5.4M Polish customer advance already received",
                  "$2.4M dividend Robinson plans to pay in September",
                ].map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-success flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-primary/40 rounded-lg p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">⚙ My Independent Analysis</p>
              <ul className="space-y-1.5">
                {[
                  "Built cash flow statements from scratch (reconciling IS + BS changes)",
                  "Applied ~1/3 haircut to June backlog (companies tend to be optimistic); used revised figures Jul–Sep",
                  "Derived COGS/Sales ratio from 6-month rolling avg; layered in $1.22M/mo inventory drawdown",
                  "Averaged prior 6 normal A/R months (~$11.75M) — excluded distorted Apr–May",
                  "Modeled A/P = $9.8M/mo purchases (net-30) instead of avg A/P/COGS method (case-warned)",
                  "Added $4.8M ÷ 240 months = $20K/mo incremental depreciation starting August",
                  "Identified & modeled $3.2M tax catch-up payment due 9/15/23",
                  "Traced $5.4M advance drawdown: Jun $3.6M + Jul $3.6M + Aug $1.2M vs. A/R",
                  "Computed Altman Z-Score using proxies: MVE = $50M (buyback-implied), RE = equity",
                ].map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-primary flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* KPI Row */}
        <Section title="Key Financial Metrics" subtitle="As of May 31, 2023 (most recent actual) and Sep 30, 2023 forecast">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-2">
            <KPICard
              title="Cash @ May 31"
              value="$11.1M"
              subtitle="vs. $10M due Jun 30"
              trend="down"
              trendLabel="Insufficient to repay"
              icon={<DollarSign className="w-4 h-4" />}
              variant="warning"
            />
            <KPICard
              title="Forecast Cash @ Jun 30"
              value="$7.4M"
              subtitle="$2.6M shortfall vs. $10M due"
              trend="down"
              trendLabel="Cannot repay alone"
              icon={<TrendingDown className="w-4 h-4" />}
              variant="danger"
            />
            <KPICard
              title="Forecast Cash @ Sep 30"
              value="$11.6M"
              subtitle="vs. $14.8M total due"
              trend="down"
              trendLabel="$3.2M shortfall"
              icon={<AlertTriangle className="w-4 h-4" />}
              variant="danger"
            />
            <KPICard
              title="Total Loan Requested"
              value="$14.8M"
              subtitle="$10M rollover + $4.8M CAPEX"
              icon={<BarChart3 className="w-4 h-4" />}
              variant="primary"
            />
            <KPICard
              title="Altman Z-Score"
              value="4.36"
              subtitle="Safe zone (>2.99)"
              trend="up"
              trendLabel="Low structural risk"
              icon={<Shield className="w-4 h-4" />}
              variant="success"
            />
            <KPICard
              title="Inventory Excess"
              value="$4.88M"
              subtitle="Above normal levels @ May '23"
              trend="down"
              trendLabel="Draws down Jun–Sep"
              icon={<Building2 className="w-4 h-4" />}
              variant="warning"
            />
          </div>
        </Section>

        {/* Timeline */}
        <Timeline />

        {/* Charts */}
        <ShipmentChart />
        <IncomeChart />
        <CashLiquidityChart />
        <CashFlowChart />

        {/* Credit Risk */}
        <AltmanZScore />

        {/* Financial Tables */}
        <FinancialTables />

        {/* Loan Decision */}
        <LoanAnalysis />

        {/* Footer */}
        <footer className="border-t border-border mt-8 pt-6 pb-10 text-center">
          <p className="text-xs text-muted-foreground">
            Robinson HVAC Tech Inc. Case Study · Prof. John Hand · v2.2 dated 3/11/25 ·{" "}
            <em>Fictitious case written solely as a basis for class analysis + discussion.</em>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
