import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { cashFlowData } from "@/data/robtechData";
import { Section } from "./Section";

export const CashFlowChart = () => {
  return (
    <Section
      title="Cash Flow from Operations (CFOPS)"
      subtitle="Monthly operating cash generation. Negative CFOPS signals working capital strain. * = forecast."
      badge="Cash Flow"
    >
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={cashFlowData} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number, name: string) => [`$${v.toLocaleString()}K`, name]}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine y={0} stroke="hsl(4 75% 50%)" strokeWidth={1.5} />
            <Bar dataKey="cfops" name="CF from Operations" radius={[3, 3, 0, 0]}>
              {cashFlowData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.cfops >= 0 ? "hsl(142 60% 35%)" : "hsl(4 75% 50%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Jun '23 CFOPS of -$5.4M reflects inventory drawdown lag + A/R surge from backlog release. Sep '22 large negative due to $15M stock repurchase in financing activities.
        </p>
      </div>
    </Section>
  );
};
