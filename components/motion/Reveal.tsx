"use client";

import { inView } from "motion/react";
import { createContext, useContext, useEffect, useMemo, useRef, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { distance, duration, ease, inViewMargin, staggerStep } from "@/lib/motion";

/**
 * Apparition au scroll — amélioration progressive.
 *
 * Le contenu est rendu VISIBLE par le serveur (aucun style masquant dans le HTML).
 * Une fois JavaScript actif, seuls les éléments situés sous la ligne de flottaison
 * sont masqués, puis révélés à leur entrée dans l'écran. Si JavaScript, Motion ou
 * IntersectionObserver font défaut, ou si l'utilisateur préfère moins d'animations,
 * rien n'est masqué : aucun état « caché » ne dépend d'un mécanisme qui pourrait échouer.
 */

type Tag = "div" | "ul" | "ol" | "li" | "p" | "article" | "section" | "span" | "h1" | "h2" | "h3";

interface Group {
  /** Programme la révélation ; les éléments qui entrent ensemble sont décalés dans l'ordre du document. */
  enqueue: (element: HTMLElement, run: (delay: number) => void) => void;
}

function createGroup(): Group {
  let pending: Array<{ element: HTMLElement; run: (delay: number) => void }> = [];
  let scheduled = false;
  return {
    enqueue(element, run) {
      pending.push({ element, run });
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const batch = pending;
        pending = [];
        batch.sort((a, b) => (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        batch.forEach((entry, index) => entry.run(index * staggerStep));
      });
    },
  };
}

const GroupContext = createContext<Group | null>(null);

function canEnhance(): boolean {
  return typeof IntersectionObserver !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Vrai si l'élément est affiché et situé sous la ligne de flottaison. */
function isBelowFold(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.height > 0 && rect.top > window.innerHeight * 0.9;
}

export interface RevealPreset {
  hidden: { opacity: string; transform: string };
  duration: number;
}

export const textPreset: RevealPreset = {
  hidden: { opacity: "0", transform: `translateY(${distance.base}px)` },
  duration: duration.base,
};

export const imagePreset: RevealPreset = {
  hidden: { opacity: "0", transform: "scale(1.06)" },
  duration: duration.slow,
};

const cssEase = `cubic-bezier(${ease.join(", ")})`;

function clear(element: HTMLElement) {
  element.style.opacity = "";
  element.style.transform = "";
  element.style.transition = "";
}

/**
 * Révélation : on retire simplement l'état masqué, et une transition CSS native
 * (avec le décalage voulu) l'anime vers l'état naturel de l'élément. L'état final est
 * donc appliqué immédiatement et de façon synchrone : aucune animation à « terminer »
 * pour que le contenu soit visible.
 */
function reveal(element: HTMLElement, preset: RevealPreset, delay: number) {
  const timing = `${preset.duration}s ${cssEase} ${delay}s`;
  element.style.transition = `opacity ${timing}, transform ${timing}`;
  void element.offsetWidth; // l'état masqué est pris en compte avant la transition
  element.style.opacity = "";
  element.style.transform = "";
  const onEnd = (event: TransitionEvent) => {
    if (event.propertyName !== "opacity") return;
    element.style.transition = "";
    element.removeEventListener("transitionend", onEnd);
  };
  element.addEventListener("transitionend", onEnd);
}

/** Masque l'élément (s'il est sous la ligne de flottaison) puis le révèle à son entrée dans l'écran. */
export function useRevealOnScroll(ref: React.RefObject<HTMLElement | null>, preset: RevealPreset, group: Group | null, delay = 0) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let stop: (() => void) | undefined;
    let revealed = false;
    try {
      if (!canEnhance() || !isBelowFold(element)) return;
      element.style.opacity = preset.hidden.opacity;
      element.style.transform = preset.hidden.transform;
      stop = inView(
        element,
        () => {
          if (revealed) return;
          revealed = true;
          stop?.();
          const run = (offset: number) => {
            try {
              reveal(element, preset, offset);
            } catch {
              clear(element);
            }
          };
          if (group) group.enqueue(element, run);
          else run(delay);
        },
        { margin: inViewMargin, amount: "some" },
      );
    } catch {
      clear(element);
    }
    return () => {
      stop?.();
      clear(element);
    };
  }, [ref, preset, group, delay]);
}

interface MotionProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  id?: string;
  /** Délai (s) avant l'apparition d'un `Reveal` isolé. */
  delay?: number;
}

type AnyElement = ElementType<HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }>;

function RevealElement({ children, as: Component = "div", className, id, delay = 0 }: MotionProps) {
  const ref = useRef<HTMLElement>(null);
  const group = useContext(GroupContext);
  useRevealOnScroll(ref, textPreset, group, delay);
  const Element = Component as AnyElement;
  return (
    <Element ref={ref} id={id} className={className}>
      {children}
    </Element>
  );
}

/** Apparition douce (opacité + léger décalage vertical) à l'entrée dans l'écran, une seule fois. */
export function Reveal(props: MotionProps) {
  return <RevealElement {...props} />;
}

/** Conteneur d'un groupe : ses `StaggerItem` apparaissent en cascade. Les groupes imbriqués se fondent dans le parent. */
export function Stagger({ children, as: Component = "div", className, id }: Omit<MotionProps, "delay">) {
  const parent = useContext(GroupContext);
  const group = useMemo(() => parent ?? createGroup(), [parent]);
  const Element: ElementType = Component;
  return (
    <GroupContext.Provider value={group}>
      <Element id={id} className={className}>
        {children}
      </Element>
    </GroupContext.Provider>
  );
}

/** Élément d'un `Stagger`. Hors d'un `Stagger`, il se comporte comme un `Reveal`. */
export function StaggerItem(props: Omit<MotionProps, "delay">) {
  return <RevealElement {...props} />;
}
