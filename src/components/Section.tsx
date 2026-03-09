import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  badge?: string;
  badgeVariant?: "default" | "warning" | "danger" | "success";
}

export const Section = ({
  title,
  subtitle,
  children,
  className,
  badge,
  badgeVariant = "default",
}: SectionProps) => {
  const badgeColors = {
    default: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    success: "bg-success/10 text-success",
  };

  return (
    <section className={cn("mb-8", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            {badge && (
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  badgeColors[badgeVariant]
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
};
