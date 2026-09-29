import { cn } from "@/lib/utils";

export interface ProcessStep {
  title: string;
  text: string;
}

/** Étapes numérotées horizontales (verticales sur mobile), reliées par un filet doré. */
export function ProcessSteps({ steps, className }: { steps: ReadonlyArray<ProcessStep>; className?: string }) {
  const columns = steps.length === 5 ? "lg:grid-cols-5" : steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={cn("grid gap-10 sm:grid-cols-2 lg:gap-8", columns, className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="relative">
          <div className="flex items-center gap-4">
            <span className="font-serif text-[2.75rem] leading-none text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <h3 className="mt-6 font-sans text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-fg">{step.title}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
