import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Spinner({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-block size-3 animate-spin",
        "rounded-full border border-current border-b-transparent",
        className
      )}
    />
  );
}
