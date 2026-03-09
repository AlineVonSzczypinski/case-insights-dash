import { Section } from "./Section";

const events = [
  { date: "Aug 2022", type: "balance", label: "Pre-loan baseline", detail: "Cash $11.7M, No debt, Equity $51.6M", color: "primary" },
  { date: "Sep 2022", type: "financing", label: "$10M loan + stock repurchase", detail: "GFB approves $10M term loan at 6% p.a. Robinson uses $10M loan + $5M cash to repurchase 1M shares → equity drops to $37.1M", color: "danger" },
  { date: "Oct '22–Feb '23", type: "operations", label: "Stable operations", detail: "Sales tracking near Sept '22 forecast. Steady $666–$753K monthly net income.", color: "success" },
  { date: "Mar–May 2023", type: "operations", label: "Supply chain disruption", detail: "Key component bottleneck delays shipments. Sales fall from $12.0M → $7.5M (−37%). Inventory builds to $24.3M. Cash remains adequate at $11.1M.", color: "warning" },
  { date: "Apr 2023", type: "financing", label: "Polish customer advance", detail: "$5.4M advance payment received from Polish heat pump customer. Order: $3.6M Jun + $3.6M Jul + $1.2M Aug.", color: "primary" },
  { date: "Jun 17, 2023", type: "key", label: "Loan review meeting (case date)", detail: "Robinson requests: (1) Roll existing $10M loan to Sep 30; (2) New $4.8M CAPEX loan for equipment. Nina Garcia (SVP, GFB) must decide.", color: "danger" },
  { date: "Jun 30, 2023", type: "financing", label: "Original loan maturity (extended)", detail: "Original $10M loan due. RobTech cannot repay — only $7.4M forecast cash. Extension requested to Sep 30.", color: "warning" },
  { date: "Jul 30, 2023", type: "investing", label: "$4.8M equipment purchase", detail: "CAPEX loan of $4.8M drawn and spent on equipment (20-yr life, straight-line depreciation → $20K/mo additional D&A).", color: "primary" },
  { date: "Sep 15, 2023", type: "financing", label: "Tax payment", detail: "$500K quarterly tax installment due (revised FY2023 tax estimate of $3.2M).", color: "warning" },
  { date: "Sep 30, 2023", type: "key", label: "Full debt repayment due", detail: "Both loans ($14.8M total) due. Forecast cash at Sep 30: $11.6M — INSUFFICIENT to repay in full without additional measures.", color: "danger" },
];

const colorMap = {
  primary: { bg: "bg-primary/10", border: "border-primary", text: "text-primary", dot: "bg-primary" },
  success: { bg: "bg-success/10", border: "border-success", text: "text-success", dot: "bg-success" },
  warning: { bg: "bg-warning/10", border: "border-warning", text: "text-warning", dot: "bg-warning" },
  danger: { bg: "bg-danger/10", border: "border-danger", text: "text-danger", dot: "bg-danger" },
};

export const Timeline = () => {
  return (
    <Section
      title="Key Event Timeline"
      subtitle="Aug 2022 – Sep 2023 — major financial, operational, and financing events"
      badge="Q1"
    >
      <div className="bg-card border rounded-lg p-5 shadow-sm">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
          <div className="space-y-4">
            {events.map((event, i) => {
              const colors = colorMap[event.color as keyof typeof colorMap];
              return (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${colors.dot} border-2 border-card z-10`} />
                  <div className={`flex-1 rounded-lg border ${colors.border} ${colors.bg} p-3`}>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>{event.date}</p>
                      <span className="text-xs text-muted-foreground capitalize">{event.type}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground mt-1">{event.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};
