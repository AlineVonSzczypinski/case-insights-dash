import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "primary";
  className?: string;
}

export const KPICard = ({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  variant = "default",
  className,
}: KPICardProps) => {
  const borderColors = {
    default: "border-l-primary",
    success: "border-l-success",
    warning: "border-l-warning",
    danger: "border-l-danger",
    primary: "border-l-accent",
  };

  const trendColors = {
    up: "text-success",
    down: "text-danger",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-l-4 p-5 shadow-sm flex flex-col gap-1",
        borderColors[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        {icon && (
          <span className="text-muted-foreground opacity-60">{icon}</span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
      {trendLabel && trend && (
        <p className={cn("text-xs font-medium mt-1", trendColors[trend])}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "●"} {trendLabel}
        </p>
      )}
    </div>
  );
};
