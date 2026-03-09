import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { balanceSheets } from "@/data/robtechData";
import { Section } from "./Section";

export const CashLiquidityChart = () => {
  const data = balanceSheets.map((d) => ({
    month: d.month,
    cash: d.cash,
    inventory: d.inventory,
    currentRatio: +((d.currentAssets / (d.totalLiab - d.notesPayable || 1))).toFixed(2),
    netDebt: d.notesPayable - d.cash,
  }));

  return (
    <Section
      title="Cash & Inventory Trends"
      subtitle="Cash and inventory levels over the analysis period. Inventory buildup in Apr–May '23 signals supply chain impact."
      badge="Liquidity"
    >
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
            <defs>
              <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(213 75% 28%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(213 75% 28%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38 90% 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38 90% 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number) => [`$${v.toLocaleString()}K`]}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine x="May '23" stroke="hsl(38 90% 48%)" strokeDasharray="4 2" label={{ value: "→ Forecast", position: "top", fontSize: 10 }} />
            <Area dataKey="cash" name="Cash" stroke="hsl(213 75% 28%)" fill="url(#cashGrad)" strokeWidth={2} />
            <Area dataKey="inventory" name="Inventory" stroke="hsl(38 90% 48%)" fill="url(#invGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Inventory surged from $14.2M → $24.3M (Apr–May '23) due to pre-purchased raw materials ($4.88M excess). Cash declined to $11.1M vs. $10M loan due June 30.
        </p>
      </div>
    </Section>
  );
};
