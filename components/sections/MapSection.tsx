"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

const MorbihanMap = dynamic(
  () => import("@/components/sections/MorbihanMap").then((m) => m.MorbihanMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full animate-pulse items-center justify-center bg-ardoise-100">
        <span className="text-sm text-ardoise-500">Chargement de la carte…</span>
      </div>
    ),
  }
);

export function MapSection({ className }: { className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-sm border border-ardoise-200/60 shadow-sm",
        className
      )}
    >
      <MorbihanMap />
    </motion.div>
  );
}
