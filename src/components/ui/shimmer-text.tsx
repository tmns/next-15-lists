import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerTextProps extends ComponentPropsWithoutRef<"span"> {
  isEnabled?: boolean;
}

export function ShimmerText({
  children,
  isEnabled,
  ...props
}: ShimmerTextProps) {
  const classNames = isEnabled
    ? cn(
        "animate-shine !bg-clip-text text-transparent",
        "[background:radial-gradient(circle_at_center,var(--color-muted),transparent)_-200%_50%_/_200%_100%_no-repeat,var(--color-sidebar-foreground)]"
      )
    : undefined;

  return (
    <span {...props} className={classNames}>
      {children}
    </span>
  );
}
