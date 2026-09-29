"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";
import type { MediaKey } from "@/types";

interface BeforeAfterProps {
  before: MediaKey;
  after: MediaKey;
  ratioClass?: string;
  className?: string;
}

/**
 * Comparateur avant / après. Curseur natif (<input type="range">) :
 * utilisable au clavier (flèches), au doigt et à la souris.
 */
export function BeforeAfter({ before, after, ratioClass = "aspect-[16/10]", className }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden", ratioClass)}>
        <Photo media={after} sizes="(min-width: 1024px) 66vw, 100vw" frameClassName="h-full w-full" className="absolute inset-0" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Photo media={before} sizes="(min-width: 1024px) 66vw, 100vw" frameClassName="h-full w-full" className="absolute inset-0" />
        </div>
        <span className="pointer-events-none absolute left-4 top-4 bg-noir/80 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-ivoire">
          Avant
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-or px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-noir">
          Après
        </span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-or" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-or bg-noir text-or">
            ⟷
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          Comparer la photo avant et après travaux
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </figure>
  );
}
