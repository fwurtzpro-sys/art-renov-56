"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
    "bg-ardoise-900 text-creme shadow-sm shadow-ardoise-900/20 hover:bg-ardoise-800 hover:shadow-md hover:shadow-ardoise-900/25 focus-visible:ring-breton-500",
  secondary:
    "bg-transparent text-ardoise-900 border border-ardoise-900/25 hover:border-ardoise-900 hover:bg-ardoise-900/5 focus-visible:ring-breton-500",
  ghost:
    "bg-transparent text-creme border border-creme/40 hover:border-creme hover:bg-creme/10 focus-visible:ring-creme",
};

const MotionLink = motion.create(Link);

export function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionLink
      href={href}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -1 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[background-color,border-color,box-shadow] duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
    </MotionLink>
  );
}
