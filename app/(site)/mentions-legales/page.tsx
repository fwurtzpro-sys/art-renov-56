import type { Metadata } from "next";
import Link from "next/link";
import { LegalField, LegalLayout, LegalSection, type LegalSectionDef } from "@/components/sections/LegalLayout";
import { PendingValue } from "@/components/ui/PendingValue";
import { href } from "@/config/routes";
import { getEmail, getPhone, getPublicLocality, isProvided, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site d’ART RÉNOV 56, entreprise de rénovation intérieure et d’aménagement basée à Elven (Morbihan) : éditeur, hébergement et propriété intellectuelle.",
  path: href("legal"),
});

const sections: ReadonlyArray<LegalSectionDef> = [
  { id: "edition", title: "Édition du site" },
  { id: "hebergement", title: "Hébergement" },
  { id: "propriete-intellectuelle", title: "Propriété intellectuelle" },
  { id: "donnees-personnelles", title: "Données personnelles" },
  { id: "cookies", title: "Cookies" },
  { id: "responsabilites", title: "Responsabilités" },
  { id: "droit-applicable", title: "Droit applicable" },
];

export default function LegalNoticePage() {
  const { legal, address, brand } = siteConfig;
  const phone = getPhone();
  const email = getEmail();

  return (
    <LegalLayout route="legal" title="Mentions légales" sections={sections}>
      <LegalSection id="edition" index={1} title="Édition du site">
        <p>Le site {siteConfig.url.replace("https://", "")} est édité par :</p>
        <dl>
          <LegalField label="Nom commercial" value={brand.name} />
          <LegalField label="Raison sociale" value={legal.companyName} />
          <LegalField label="Forme juridique" value={legal.legalForm} />
          <LegalField label="Capital social" value={legal.shareCapital} />
          <LegalField label="SIRET" value={legal.siret} />
          <LegalField label="Immatriculation (RCS / RM)" value={legal.registration} />
          <LegalField label="N° de TVA intracommunautaire" value={legal.vatNumber} />
          <LegalField label="Siège social" value={isProvided(address.street) ? `${address.street}, ${getPublicLocality()}` : null} />
          <LegalField label="Téléphone" value={phone?.display} />
          <LegalField label="Email" value={email?.display} />
          <LegalField label="Directeur de la publication" value={legal.publicationDirector} />
        </dl>
      </LegalSection>

      <LegalSection id="hebergement" index={2} title="Hébergement">
        <p>Le site est hébergé par :</p>
        <dl>
          <LegalField label="Hébergeur" value={legal.host.name} />
          <LegalField label="Adresse" value={legal.host.address} />
          <LegalField label="Site web" value={legal.host.website} />
        </dl>
      </LegalSection>

      <LegalSection id="propriete-intellectuelle" index={3} title="Propriété intellectuelle">
        <p>
          L’ensemble des contenus du site (textes, images, photographies, logos, éléments graphiques, structure) est protégé
          par le droit de la propriété intellectuelle. Toute reproduction, représentation ou adaptation, totale ou partielle,
          sans autorisation écrite préalable de l’éditeur est interdite.
        </p>
        <p>
          Les photographies de réalisations publiées sur le site sont la propriété d’ART RÉNOV 56 ou utilisées avec
          l’autorisation de leurs auteurs et des personnes concernées.
        </p>
      </LegalSection>

      <LegalSection id="donnees-personnelles" index={4} title="Données personnelles">
        <p>
          Les données transmises via le formulaire de contact sont utilisées pour traiter votre demande. Les conditions de
          traitement, de conservation et l’exercice de vos droits sont détaillés dans notre{" "}
          <Link href={href("privacy")} className="text-or-fonce underline underline-offset-4">
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="cookies" index={5} title="Cookies">
        <p>
          Les informations relatives aux cookies et traceurs éventuellement utilisés sur le site sont présentées sur la page{" "}
          <Link href={href("cookies")} className="text-or-fonce underline underline-offset-4">
            Cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="responsabilites" index={6} title="Responsabilités">
        <p>
          L’éditeur s’efforce de fournir des informations exactes et à jour, mais ne peut garantir l’absence d’erreur ou
          d’omission. Les informations du site sont données à titre indicatif et ne constituent pas une offre contractuelle :
          seul un devis signé engage l’entreprise.
        </p>
        <p>
          Le site peut contenir des liens vers des sites tiers dont l’éditeur ne maîtrise pas le contenu et n’assume aucune
          responsabilité.
        </p>
      </LegalSection>

      <LegalSection id="droit-applicable" index={7} title="Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable,
          les tribunaux français seront compétents.
        </p>
        {!isProvided(legal.companyName) ? (
          <p className="text-[0.875rem] text-muted">
            <PendingValue /> Les informations d’identification de l’éditeur seront complétées avant la mise en ligne.
          </p>
        ) : null}
      </LegalSection>
    </LegalLayout>
  );
}
