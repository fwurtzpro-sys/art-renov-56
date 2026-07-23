"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ardoise-100 border-y border-ardoise-100">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <Reveal key={item.question} delay={Math.min(index * 0.05, 0.3)}>
            <div>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg text-anthracite transition-colors duration-300 group-hover:text-breton-700 md:text-xl">
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-breton-600 transition-transform duration-300 ease-premium group-hover:scale-110",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm leading-relaxed text-ardoise-700 md:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
