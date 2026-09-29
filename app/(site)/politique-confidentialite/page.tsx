import type { Metadata } from "next";
import Link from "next/link";
import { LegalField, LegalLayout, LegalSection, type LegalSectionDef } from "@/components/sections/LegalLayout";
import { href } from "@/config/routes";
import { getEmail, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Comment ART RÉNOV 56 collecte et utilise vos données personnelles lorsque vous la contactez via le site, et comment exercer vos droits.",
  path: href("privacy"),
});

const sections: ReadonlyArray<LegalSectionDef> = [
  { id: "responsable", title: "Responsable du traitement" },
  { id: "donnees", title: "Données collectées" },
  { id: "finalites", title: "Finalités" },
  { id: "base-legale", title: "Base légale" },
  { id: "conservation", title: "Durées de conservation" },
  { id: "destinataires", title: "Destinataires" },
  { id: "sous-traitants", title: "Sous-traitants" },
  { id: "droits", title: "Droits des utilisateurs" },
  { id: "securite", title: "Sécurité" },
  { id: "cookies", title: "Cookies" },
  { id: "contact", title: "Contact" },
  { id: "mise-a-jour", title: "Mise à jour" },
];

export default function PrivacyPage() {
  const { legal, brand } = siteConfig;
  const email = getEmail();
  const link = "text-or-fonce underline underline-offset-4";

  return (
    <LegalLayout
      route="privacy"
      title="Politique de confidentialité"
      sections={sections}
      intro="Cette page explique quelles données personnelles sont collectées lorsque vous utilisez le formulaire de contact du site, pourquoi, et comment exercer vos droits."
    >
      <LegalSection id="responsable" index={1} title="Responsable du traitement">
        <dl>
          <LegalField label="Responsable" value={legal.companyName} />
          <LegalField label="Nom commercial" value={brand.name} />
          <LegalField label="Contact" value={email?.display} />
        </dl>
      </LegalSection>

      <LegalSection id="donnees" index={2} title="Données collectées">
        <p>Lorsque vous remplissez le formulaire de contact, nous collectons uniquement les informations que vous saisissez :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>nom et prénom ;</li>
          <li>adresse email et numéro de téléphone ;</li>
          <li>commune du projet et type de projet ;</li>
          <li>description de votre projet ;</li>
          <li>photographies ou documents que vous choisissez de joindre.</li>
        </ul>
        <p>Aucune donnée sensible n’est demandée. Merci de ne pas en communiquer dans le champ de message.</p>
      </LegalSection>

      <LegalSection id="finalites" index={3} title="Finalités">
        <p>Ces données sont utilisées pour répondre à votre demande, étudier votre projet et vous proposer un devis.</p>
      </LegalSection>

      <LegalSection id="base-legale" index={4} title="Base légale">
        <p>
          Le traitement repose sur votre consentement, que vous exprimez en cochant la case prévue à cet effet avant l’envoi du
          formulaire, ainsi que sur des mesures précontractuelles prises à votre demande.
        </p>
      </LegalSection>

      <LegalSection id="conservation" index={5} title="Durées de conservation">
        <dl>
          <LegalField label="Demandes de contact" value="À RENSEIGNER" />
        </dl>
        <p className="text-[0.875rem] text-muted">La durée de conservation sera précisée par ART RÉNOV 56 avant la mise en ligne.</p>
      </LegalSection>

      <LegalSection id="destinataires" index={6} title="Destinataires">
        <p>
          Vos données sont destinées exclusivement à ART RÉNOV 56. Elles ne sont ni vendues ni cédées à des tiers à des fins
          commerciales.
        </p>
      </LegalSection>

      <LegalSection id="sous-traitants" index={7} title="Sous-traitants">
        <p>
          Pour faire fonctionner le site et acheminer vos messages, nous faisons appel à des prestataires techniques (hébergement
          et messagerie électronique), qui traitent les données selon nos instructions.
        </p>
        <dl>
          <LegalField label="Hébergeur" value={legal.host.name} />
          <LegalField label="Service de messagerie" value="À RENSEIGNER" />
        </dl>
      </LegalSection>

      <LegalSection id="droits" index={8} title="Droits des utilisateurs">
        <p>Conformément à la réglementation applicable en matière de protection des données, vous disposez des droits suivants :</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>accès à vos données, rectification et effacement ;</li>
          <li>limitation du traitement et opposition ;</li>
          <li>retrait de votre consentement à tout moment ;</li>
          <li>définition de directives sur le sort de vos données après votre décès.</li>
        </ul>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank" className={link}>
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection id="securite" index={9} title="Sécurité">
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données : échange
          chiffré (HTTPS), contrôle des formulaires côté serveur, limitation des envois abusifs et accès restreint aux messages
          reçus.
        </p>
      </LegalSection>

      <LegalSection id="cookies" index={10} title="Cookies">
        <p>
          Les informations sur les cookies et traceurs sont détaillées sur la page{" "}
          <Link href={href("cookies")} className={link}>
            Cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="contact" index={11} title="Contact">
        <p>
          Pour toute question relative à vos données ou pour exercer vos droits, utilisez notre{" "}
          <Link href={href("contact")} className={link}>
            page de contact
          </Link>
          {email ? (
            <>
              {" "}
              ou écrivez à <a href={email.href} className={link}>{email.display}</a>
            </>
          ) : null}
          .
        </p>
      </LegalSection>

      <LegalSection id="mise-a-jour" index={12} title="Mise à jour">
        <p>
          Cette politique peut évoluer, notamment si de nouveaux traitements sont mis en place sur le site. La date de dernière
          mise à jour figure en haut de cette page.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
