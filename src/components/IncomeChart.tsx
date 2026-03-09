import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { incomeStatements } from "@/data/robtechData";
import { Section } from "./Section";

const fmt = (v: number) => `$${v.toLocaleString()}K`;

export const IncomeChart = () => {
  const data = incomeStatements.map((d) => ({
    ...d,
    grossMargin: +((d.grossProfit / d.netSales) * 100).toFixed(1),
  }));

  return (
    <Section
      title="Income Statement Overview"
      subtitle="Monthly net sales, COGS, gross profit and gross margin %. * = forecasted months."
      badge="P&L"
    >
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 8, right: 40, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" tickFormatter={(v) => `$${(v/1000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 40]} />
            <Tooltip
              formatter={(v: number, name: string) =>
                name === "Gross Margin %" ? [`${v}%`, name] : [fmt(v), name]
              }
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine yAxisId="left" x="May '23" stroke="hsl(38 90% 48%)" strokeDasharray="4 2" />
            <Bar yAxisId="left" dataKey="cogs" name="COGS" fill="hsl(213 75% 28%)" stackId="a" />
            <Bar yAxisId="left" dataKey="grossProfit" name="Gross Profit" fill="hsl(196 80% 42%)" stackId="a" radius={[3, 3, 0, 0]} />
            <Line yAxisId="right" dataKey="grossMargin" name="Gross Margin %" stroke="hsl(38 90% 48%)" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Gross margin remains stable (~22%). Revenue decline in Mar–May '23 drove absolute profit compression. Forecast recovery in Jun '23 driven by backlog release.
        </p>
      </div>
    </Section>
  );
};
