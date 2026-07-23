import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { navLinks } from "@/data/zones";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/animations/variants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-anthracite text-creme">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-breton-500/50 to-transparent" />
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <Reveal variants={fadeUp}>
            <p className="font-display text-2xl">
              Art Renov <span className="text-breton-400">56</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ardoise-200">
              {company.tagline}. Un interlocuteur unique pour tous vos travaux
              de rénovation dans le Morbihan.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.05}>
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-breton-400">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-ardoise-200 transition-colors duration-300 hover:text-creme"
                  >
                    <span className="border-b border-transparent transition-colors duration-300 group-hover:border-creme/40">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-breton-400">
              Prestations
            </h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/prestations/${service.slug}`}
                    className="group inline-flex items-center text-sm text-ardoise-200 transition-colors duration-300 hover:text-creme"
                  >
                    <span className="border-b border-transparent transition-colors duration-300 group-hover:border-creme/40">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.15}>
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-breton-400">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-ardoise-200">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-breton-400" aria-hidden="true" />
                <a href={`tel:${company.phone}`} className="transition-colors duration-300 hover:text-creme">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-breton-400" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="transition-colors duration-300 hover:text-creme">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-breton-400" aria-hidden="true" />
                <span>
                  {company.address}, {company.postalCode} {company.city}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ardoise-800 pt-8 text-xs text-ardoise-400 md:flex-row">
          <p>
            © {year} {company.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors duration-300 hover:text-creme">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="transition-colors duration-300 hover:text-creme">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
