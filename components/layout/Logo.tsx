import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isProvided, siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  /** Taille du logotype typographique. */
  size?: "md" | "lg";
}

/**
 * Logo ART RÉNOV 56.
 * Tant que l'asset n'est pas fourni (siteConfig.brand.logoOnDark / logo),
 * un logotype typographique est affiché.
 */
export function Logo({ className, size = "md" }: LogoProps) {
  const { brand } = siteConfig;
  const asset = isProvided(brand.logoOnDark) ? brand.logoOnDark : brand.logo;

  return (
    <Link href="/" aria-label={`${brand.name} — accueil`} className={cn("inline-flex shrink-0 flex-col", className)}>
      {isProvided(asset) ? (
        <Image src={asset} alt="" width={180} height={56} className="h-11 w-auto xl:h-12" priority />
      ) : (
        <span aria-hidden className="flex flex-col leading-none">
          <span
            className={cn(
              "font-serif font-medium tracking-[0.04em] text-ivoire",
              size === "lg" ? "text-[2rem]" : "text-[1.3rem] sm:text-[1.4rem] wide:text-[1.6rem]",
            )}
          >
            ART RÉNOV <span className="text-or">56</span>
          </span>
          <span
            className={cn(
              "mt-1.5 font-sans font-medium uppercase text-or",
              size === "lg" ? "text-[0.6875rem] tracking-[0.3em]" : "text-[0.5rem] tracking-[0.22em] sm:text-[0.5625rem] sm:tracking-[0.28em] wide:text-[0.625rem]",
            )}
          >
            {brand.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
