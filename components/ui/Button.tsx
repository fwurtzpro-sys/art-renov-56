import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  showArrow?: boolean;
}

const variantStyles = {
  primary:
    "bg-ardoise-900 text-creme hover:bg-ardoise-800 focus-visible:ring-ardoise-900",
  secondary:
    "bg-transparent text-ardoise-900 border border-ardoise-900/30 hover:border-ardoise-900 focus-visible:ring-ardoise-900",
  ghost:
    "bg-transparent text-creme border border-creme/40 hover:border-creme focus-visible:ring-creme",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantStyles[variant],
        className
      )}
    >
      {children}
      {showArrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
