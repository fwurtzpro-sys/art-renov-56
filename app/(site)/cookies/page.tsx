import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection, type LegalSectionDef } from "@/components/sections/LegalLayout";
import { ConsentPreferencesButton } from "@/components/consent/ConsentManager";
import { consentCategories } from "@/config/consent";
import { href } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookies",
  description: "Les cookies et traceurs utilisés sur le site d’ART RÉNOV 56 : ce qui est déposé, ce qui ne l’est pas, et comment gérer ou modifier vos préférences à tout moment.",
  path: href("cookies"),
});

const sections: ReadonlyArray<LegalSectionDef> = [
  { id: "definition", title: "Qu’est-ce qu’un cookie ?" },
  { id: "utilises", title: "Cookies utilisés sur ce site" },
  { id: "preferences", title: "Gérer vos préférences" },
  { id: "navigateur", title: "Paramétrer votre navigateur" },
];

export default function CookiesPage() {
  const hasOptional = consentCategories.length > 0;

  return (
    <LegalLayout route="cookies" title="Cookies" sections={sections}>
      <LegalSection id="definition" index={1} title="Qu’est-ce qu’un cookie ?">
        <p>
          Un cookie est un petit fichier enregistré sur votre appareil lorsque vous consultez un site. Il peut servir au bon
          fonctionnement du site, à mémoriser vos choix ou, avec votre accord, à mesurer l’audience.
        </p>
      </LegalSection>

      <LegalSection id="utilises" index={2} title="Cookies utilisés sur ce site">
        {hasOptional ? (
          <ul className="space-y-3">
            {consentCategories.map((category) => (
              <li key={category.id} className="border border-line p-4">
                <p className="font-semibold">{category.label}</p>
                <p className="text-[0.9375rem]">
                  {category.description} Services : {category.services.join(", ")}.
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            À ce jour, ce site n’utilise <strong>aucun cookie de mesure d’audience, de publicité ou de suivi</strong>, et ne
            charge aucun service tiers soumis à consentement (pas de carte interactive externe, pas de vidéo intégrée, pas de
            réseau social). Il n’a donc pas besoin de vous demander votre accord.
          </p>
        )}
        <p>
          Le site peut enregistrer sur votre appareil des informations strictement nécessaires à son fonctionnement, qui ne
          nécessitent pas de consentement.
        </p>
      </LegalSection>

      <LegalSection id="preferences" index={3} title="Gérer vos préférences">
        {hasOptional ? (
          <>
            <p>Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment. Refuser est aussi simple qu’accepter.</p>
            <ConsentPreferencesButton />
          </>
        ) : (
          <p>
            Si des services soumis à consentement sont ajoutés un jour, un bandeau vous permettra de les accepter, de les refuser
            ou de personnaliser vos choix — <em>Tout accepter</em>, <em>Tout refuser</em> et <em>Personnaliser</em> — et aucun
            script concerné ne sera chargé avant votre accord. Cette page sera alors mise à jour.
          </p>
        )}
      </LegalSection>

      <LegalSection id="navigateur" index={4} title="Paramétrer votre navigateur">
        <p>
          Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies. Pour en savoir plus sur
          vos droits, consultez notre{" "}
          <Link href={href("privacy")} className="text-or-fonce underline underline-offset-4">
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
