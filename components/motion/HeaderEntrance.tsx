"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

/** Apparition douce du contenu du header au premier chargement (la barre reste en place). */
export function HeaderEntrance({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease }}
    >
      {children}
    </m.div>
  );
}
