import { balanceSheets, incomeStatements } from "@/data/robtechData";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

const fmt = (v: number) => `$${v.toLocaleString()}`;

interface TableProps {
  headers: string[];
  rows: { label: string; values: (string | number)[]; highlight?: boolean; bold?: boolean; indent?: boolean }[];
  title?: string;
}

const FinancialTable = ({ headers, rows, title }: TableProps) => (
  <div className="overflow-x-auto">
    {title && <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{title}</p>}
    <table className="w-full text-xs border-collapse min-w-[700px]">
      <thead>
        <tr className="bg-primary text-primary-foreground">
          <th className="text-left p-2 font-semibold rounded-tl sticky left-0 bg-primary z-10">Line Item</th>
          {headers.map((h) => (
            <th key={h} className="text-right p-2 font-semibold whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className={cn(
              "border-b border-border",
              row.highlight ? "bg-accent/10 font-semibold" : i % 2 === 0 ? "bg-card" : "bg-muted/30",
              row.bold ? "font-bold" : ""
            )}
          >
            <td className={cn("p-2 text-left sticky left-0 z-10", row.highlight ? "bg-accent/10" : i % 2 === 0 ? "bg-card" : "bg-muted/30", row.indent ? "pl-5 text-muted-foreground" : "")}>
              {row.label}
            </td>
            {row.values.map((v, j) => (
              <td
                key={j}
                className={cn(
                  "p-2 text-right font-mono",
                  typeof v === "number" && v < 0 ? "text-danger" : "",
                  row.highlight ? "font-semibold" : ""
                )}
              >
                {typeof v === "number" ? fmt(v) : v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FinancialTables = () => {
  const months = incomeStatements.slice(2).map((d) => d.month); // Oct '22 onward
  const isMonths = incomeStatements.slice(2);

  const incomeRows = [
    { label: "Net Sales", values: isMonths.map(d => d.netSales), highlight: false, bold: false },
    { label: "COGS", values: isMonths.map(d => d.cogs), indent: true },
    { label: "Gross Profit", values: isMonths.map(d => d.grossProfit), highlight: true },
    { label: "Operating Expenses", values: isMonths.map(d => d.opEx), indent: true },
    { label: "D&A", values: isMonths.map(d => d.da), indent: true },
    { label: "Interest Expense", values: isMonths.map(d => d.interest), indent: true },
    { label: "EBT", values: isMonths.map(d => d.ebt), highlight: true },
    { label: "Income Taxes (25%)", values: isMonths.map(d => d.tax), indent: true },
    { label: "Net Income", values: isMonths.map(d => d.netIncome), bold: true, highlight: false },
  ];

  const bsMonths = balanceSheets.slice(1).map(d => d.month);
  const bsData = balanceSheets.slice(1);

  const bsRows = [
    { label: "Cash", values: bsData.map(d => d.cash), bold: false },
    { label: "Accounts Receivable", values: bsData.map(d => d.ar), indent: true },
    { label: "Inventory", values: bsData.map(d => d.inventory), indent: true },
    { label: "Current Assets", values: bsData.map(d => d.currentAssets), highlight: true },
    { label: "Net PP&E", values: bsData.map(d => d.netPPE), indent: true },
    { label: "Total Assets", values: bsData.map(d => d.totalAssets), bold: true, highlight: false },
    { label: "Accounts Payable", values: bsData.map(d => d.ap), indent: true },
    { label: "Notes Payable (Bank)", values: bsData.map(d => d.notesPayable), indent: true },
    { label: "Total Liabilities", values: bsData.map(d => d.totalLiab), highlight: true },
    { label: "Shareholders' Equity", values: bsData.map(d => d.equity), bold: true },
  ];

  return (
    <Section
      title="Financial Statements Detail"
      subtitle="Income statements and balance sheets (Oct '22–Sep '23). * = forecasted months. All figures in $000s."
      badge="Tables"
    >
      <div className="space-y-6">
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <FinancialTable
            title="Income Statements ($000s)"
            headers={months}
            rows={incomeRows}
          />
        </div>
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <FinancialTable
            title="Balance Sheets ($000s)"
            headers={bsMonths}
            rows={bsRows}
          />
        </div>
      </div>
    </Section>
  );
};
