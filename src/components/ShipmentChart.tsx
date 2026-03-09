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
import { shipmentData } from "@/data/robtechData";
import { Section } from "./Section";

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}M`;

export const ShipmentChart = () => {
  return (
    <Section
      title="Monthly Shipments vs. Forecasts"
      subtitle="Actual shipments (Oct '22–May '23) vs. Sept 2022 forecast. Jun–Sep '23 use revised May 2023 forecast."
      badge="Revenue"
    >
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={shipmentData} margin={{ top: 8, right: 16, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number) => [`$${v.toLocaleString()}K`, ""]}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine x="May '23" stroke="hsl(38 90% 48%)" strokeDasharray="4 2" label={{ value: "Forecast starts", position: "top", fontSize: 10 }} />
            <Bar dataKey="actual" name="Actual Sales" fill="hsl(213 75% 28%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="forecastMay" name="May '23 Forecast" fill="hsl(196 80% 42%)" opacity={0.8} radius={[3, 3, 0, 0]} />
            <Line dataKey="forecast" name="Sept '22 Forecast" stroke="hsl(38 90% 48%)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Supply chain disruptions caused Mar–May '23 actuals to fall sharply below forecast. June '23 forecast surges to $25.4M (backlog release + Polish order).
        </p>
      </div>
    </Section>
  );
};
