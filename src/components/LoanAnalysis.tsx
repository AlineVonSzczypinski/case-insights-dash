import { Section } from "./Section";
import { cn } from "@/lib/utils";

const loanDecision = {
  rollover: {
    title: "Loan #1 — Rollover Existing $10M to Sep 30",
    recommendation: "APPROVE with conditions",
    color: "warning" as const,
    rationale: [
      "Cash at Jun 30 forecast: $7.4M — clearly insufficient to repay $10M",
      "Jun '23 revenue surge ($21.4M forecast) driven by $10.1M WIP release + Polish advance orders",
      "Inventory is liquid and working down at $1.22M/month",
      "Strong historical repayment track record (no debt before Sep '22 loan)",
      "Altman Z-Score of 6.9 indicates low structural default risk",
    ],
    conditions: [
      "Require monthly financial reporting (balance sheet + income statement)",
      "Covenant: Minimum cash balance of $5M at all times",
      "Covenant: No dividends until full loan repayment",
      "Covenant: No further stock repurchases",
      "Request personal guarantee from Robinson",
    ],
    risks: [
      "Revenue concentration — 2 customers (airports, auto plants)",
      "Airport segment at 70% of pre-COVID levels, uncertain recovery",
      "Robinson is CEO + co-chair of charity with Garcia — relationship risk",
      "May '23 forecast vs. actual divergence (Sept '22 forecast was $13.7M; actual $7.5M = -45%)",
    ],
  },
  capex: {
    title: "Loan #2 — New $4.8M CAPEX Loan",
    recommendation: "APPROVE with conditions",
    color: "warning" as const,
    rationale: [
      "Equipment critical to inventory/production efficiency — operational necessity",
      "Equipment has 20-yr life; depreciation only $20K/mo — minimal P&L impact",
      "Cash at Sep 30 forecast: $11.6M vs. $14.8M due — tight but Robinson claims confidence",
      "Polish and auto sector backlog provides near-term revenue visibility",
    ],
    conditions: [
      "CAPEX loan secured by the equipment purchased",
      "Require independent equipment appraisal before fund disbursement",
      "Covenant: Total debt-to-equity must not exceed 0.5x",
      "Covenant: Minimum quarterly revenue reporting",
    ],
    risks: [
      "Combined loan balance of $14.8M vs. Sep 30 forecast cash of only $11.6M — shortfall of $3.2M",
      "If Sep '23 revenue misses forecast, repayment impossible without further rollover",
      "RobTech has already missed forecasts 3 consecutive months (Mar–May '23)",
      "$2.4M dividend planned for September — this further pressures cash",
    ],
  },
};

const questions = [
  {
    q: "Are Robinson's sales forecasts reliable?",
    why: "The Sept '22 forecast was $13.7M for May; actual was $7.5M (a 45% miss). The new June forecast of $25.4M is nearly double the previous forecast. Garcia must probe the supply chain narrative independently.",
    who: "Garcia / GFB Loan Committee",
  },
  {
    q: "What are the true terms of the Polish customer relationship?",
    why: "The $8.4M Polish advance and associated $3.6M + $3.6M + $1.2M shipments are central to the Jun–Aug cash projections. What are the contract terms, cancellation clauses, and counterparty creditworthiness?",
    who: "Garcia / GFB Loan Committee",
  },
  {
    q: "What is the risk posed by the Garcia–Robinson personal relationship (DICHA co-chairs)?",
    why: "Both are co-chairs of a major charity. Relationship bias could impair Garcia's independent credit judgment. The Loan Committee should review this independently.",
    who: "GFB Loan Committee / Risk Management",
  },
  {
    q: "Why is Robinson planning a $2.4M dividend in September if cash is tight?",
    why: "Paying $2.4M in dividends in the same month the $14.8M loan is due significantly undermines repayment ability. This signals either poor financial judgment or undisclosed other sources of cash.",
    who: "Garcia / GFB Loan Committee",
  },
];

export const LoanAnalysis = () => {
  return (
    <>
      <Section
        title="Loan Decision Analysis"
        subtitle="Garcia's recommended decision on each loan request, with supporting rationale, conditions, and risks."
        badge="Q6"
        badgeVariant="warning"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[loanDecision.rollover, loanDecision.capex].map((loan) => {
            const borderColor = loan.color === "success" ? "border-success" : loan.color === "warning" ? "border-warning" : "border-danger";
            const badgeBg = loan.color === "success" ? "bg-success text-primary-foreground" : loan.color === "warning" ? "bg-warning text-primary-foreground" : "bg-danger text-danger-foreground";
            return (
              <div key={loan.title} className={cn("bg-card border rounded-lg p-5 shadow-sm border-t-4", borderColor)}>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{loan.title}</p>
                <span className={cn("text-xs font-bold px-3 py-1 rounded-full inline-block mb-4", badgeBg)}>
                  {loan.recommendation}
                </span>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-success uppercase tracking-wide mb-1.5">✓ Supporting Rationale</p>
                    <ul className="space-y-1">
                      {loan.rationale.map((r, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                          <span className="text-success mt-0.5 flex-shrink-0">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1.5">📋 Recommended Conditions</p>
                    <ul className="space-y-1">
                      {loan.conditions.map((c, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                          <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-danger uppercase tracking-wide mb-1.5">⚠ Key Risks</p>
                    <ul className="space-y-1">
                      {loan.risks.map((r, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                          <span className="text-danger mt-0.5 flex-shrink-0">!</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="Critical Due Diligence Questions"
        subtitle="Key questions Garcia should ask before approving any loan extension (Q7 & Q8)."
        badge="Q7"
        badgeVariant="danger"
      >
        <div className="bg-card border rounded-lg p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((q, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-muted/20">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm font-semibold text-foreground">{q.q}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{q.why}</p>
                <p className="text-xs font-medium text-accent">→ Critical for: {q.who}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};
