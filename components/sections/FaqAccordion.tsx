import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/types";

/**
 * Accordéons FAQ basés sur <details>/<summary> : accessibles au clavier et aux
 * lecteurs d'écran nativement, contenu présent dans le HTML (indexable), sans JavaScript.
 */
export function FaqAccordion({ items }: { items: ReadonlyArray<FaqItem> }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group border-b border-line">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-serif text-[1.25rem] font-medium leading-snug text-fg sm:text-[1.4rem]">{item.question}</h3>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-accent transition-colors group-open:border-or group-open:bg-or group-open:text-marine">
              <Icon name="plus" className="h-4 w-4 group-open:hidden" />
              <Icon name="minus" className="hidden h-4 w-4 group-open:block" />
            </span>
          </summary>
          <div className="max-w-3xl pb-8 pr-12 text-[1rem] leading-relaxed text-muted">
            {item.answer.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="mt-3 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
