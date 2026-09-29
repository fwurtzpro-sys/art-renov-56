"use client";

import * as m from "motion/react-m";
import { createContext, useContext, type ReactNode } from "react";
import { revealVariants, staggerVariants, viewport } from "@/lib/motion";

type Tag = "div" | "ul" | "ol" | "li" | "p" | "article" | "section" | "span" | "h1" | "h2" | "h3";

const tags = {
  div: m.div,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  p: m.p,
  article: m.article,
  section: m.section,
  span: m.span,
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
} as const;

/** Vrai à l'intérieur d'un `Reveal` / `Stagger` : les enfants suivent le déclenchement du parent. */
const NestedContext = createContext(false);

interface MotionProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  id?: string;
  /** Délai (s) avant l'apparition. */
  delay?: number;
}

/** Apparition douce (opacité + léger décalage vertical) à l'entrée dans le viewport, une seule fois. */
export function Reveal({ children, as = "div", className, id, delay }: MotionProps) {
  const Component = tags[as];
  const nested = useContext(NestedContext);
  return (
    <Component
      data-reveal
      id={id}
      className={className}
      variants={revealVariants}
      {...(nested ? {} : { initial: "hidden", whileInView: "visible", viewport })}
      transition={delay ? { delay } : undefined}
    >
      <NestedContext.Provider value>{children}</NestedContext.Provider>
    </Component>
  );
}

/**
 * Conteneur qui déclenche l'apparition échelonnée de ses `StaggerItem`.
 * Imbriqué dans un autre `Stagger` / `Reveal`, il se contente de relayer le déclenchement du parent.
 */
export function Stagger({ children, as = "div", className, id }: Omit<MotionProps, "delay">) {
  const Component = tags[as];
  const nested = useContext(NestedContext);
  return (
    <Component
      id={id}
      className={className}
      variants={staggerVariants}
      {...(nested ? {} : { initial: "hidden", whileInView: "visible", viewport })}
    >
      <NestedContext.Provider value>{children}</NestedContext.Provider>
    </Component>
  );
}

/** Élément d'un `Stagger` : hérite du déclenchement et du décalage du parent. */
export function StaggerItem({ children, as = "div", className, id }: Omit<MotionProps, "delay">) {
  const Component = tags[as];
  return (
    <Component data-reveal id={id} className={className} variants={revealVariants}>
      {children}
    </Component>
  );
}
