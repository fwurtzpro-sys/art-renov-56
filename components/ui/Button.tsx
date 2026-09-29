import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

export type ButtonVariant = "gold" | "outline" | "dark" | "light";
export type ButtonSize = "md" | "lg" | "sm";

const base =
  "group inline-flex items-center justify-center gap-3 text-center font-sans font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /* Bouton principal : fond doré, texte noir (contraste ≈ 7:1) */
  gold: "bg-or text-noir hover:bg-or-clair",
  /* Contour : doré sur fond noir, bronze sur fond ivoire */
  outline: "border border-accent text-fg hover:border-or hover:bg-or hover:text-noir",
  /* Noir avec détail doré (fonds clairs) */
  dark: "bg-noir text-ivoire hover:bg-anthracite-light [&_svg]:text-or",
  /* Ivoire (fonds noirs, usage secondaire) */
  light: "bg-ivoire text-noir hover:bg-ivoire-200",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[44px] px-5 text-[0.6875rem]",
  md: "min-h-[52px] px-7 text-[0.75rem]",
  lg: "min-h-[58px] px-9 text-[0.8125rem]",
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icône à droite (flèche par défaut ; `null` pour aucune). */
  icon?: IconName | null;
  fullWidth?: boolean;
}

export function buttonClasses({ variant = "gold", size = "md", fullWidth }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full");
}

function ButtonContent({ children, icon }: { children: ReactNode; icon: IconName | null }) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover:translate-x-1"
        />
      ) : null}
    </>
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & { className?: string };

/** Lien stylé en bouton (navigation interne ou tel:/mailto:). */
export function ButtonLink({
  variant,
  size,
  icon = "arrowRight",
  fullWidth,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  icon = null,
  fullWidth,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

/** Lien texte « Découvrir → » avec trait doré. */
export function ArrowLink({
  children,
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & { className?: string }) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors hover:text-accent",
        className,
      )}
      {...props}
    >
      <span className="link-underline pb-1">{children}</span>
      <Icon name="arrowRight" className="h-4 w-4 text-or transition-transform duration-300 ease-premium group-hover:translate-x-1" />
    </Link>
  );
}
