import { cn } from "@/lib/utils";

export function Spinner() {
  return (
    <span
      className={cn(
        "inline-block h-3.5 w-3.5 animate-spin",
        "rounded-full border border-current border-b-transparent"
      )}
    />
  );
}
