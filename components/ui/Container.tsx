import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** "site" : contenu courant ; "wide" : header, grandes galeries. */
  size?: "site" | "wide";
  as?: ElementType;
}

export function Container({ children, className, size = "site", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "site" ? "max-w-site" : "max-w-wide",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
