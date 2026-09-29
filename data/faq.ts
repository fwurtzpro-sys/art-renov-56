import type { FaqCategory, FaqItem } from "@/types";

export const faqCategories: ReadonlyArray<{ id: FaqCategory; label: string }> = [
  { id: "projet", label: "Projet" },
  { id: "devis", label: "Devis" },
  { id: "travaux", label: "Travaux" },
  { id: "delais", label: "Délais" },
  { id: "intervention", label: "Intervention" },
];

/**
 * Questions / réponses — modifiables ici uniquement.
 *
 * Les réponses ci-dessous sont des rédactions de départ, volontairement neutres
 * (aucun délai, tarif, garantie ni engagement chiffré). Tant que
 * `needsValidation` vaut true, la question n'est PAS reprise dans les données
 * structurées FAQPage : passer à false (ou supprimer la ligne) après validation
 * par ART RÉNOV 56.
 */
export const faqItems: ReadonlyArray<FaqItem> = [
  {
    id: "quels-travaux",
    category: "projet",
    question: "Quels types de travaux réalisez-vous ?",
    answer:
      "ART RÉNOV 56 réalise des travaux de rénovation intérieure et d’aménagement : salle de bain et adaptation PMR, installation de VMI (ventilation par insufflation), cuisine, revêtements de sols et muraux, peinture et finitions.",
    needsValidation: true,
  },
  {
    id: "projet-partiel",
    category: "projet",
    question: "Puis-je confier une seule pièce, ou faut-il rénover tout le logement ?",
    answer:
      "Les deux sont possibles. Vous pouvez nous confier une seule pièce, par exemple la salle de bain ou la cuisine, comme un projet plus global. Décrivez-nous votre situation et nous vous conseillons.",
    needsValidation: true,
  },
  {
    id: "premier-contact",
    category: "devis",
    question: "Comment demander un devis ?",
    answer:
      "Il suffit de remplir le formulaire de la page Contact en décrivant votre projet. Vous pouvez y joindre des photos de vos pièces : elles nous aident à comprendre votre besoin. Nous revenons ensuite vers vous pour en discuter.",
    needsValidation: true,
  },
  {
    id: "infos-devis",
    category: "devis",
    question: "Quelles informations dois-je préparer pour mon devis ?",
    answer:
      "Les pièces concernées, la surface approximative, l’état actuel, vos envies de style et de matériaux, ainsi que les éventuelles contraintes d’accessibilité. Des photos et un plan, même sommaire, sont très utiles.",
    needsValidation: true,
  },
  {
    id: "deroulement",
    category: "travaux",
    question: "Comment se déroule un chantier ?",
    answer:
      "Chaque projet suit quatre étapes : écoute et étude de votre besoin, conception des solutions, réalisation des travaux, puis réception et suivi. Les détails sont précisés dans le devis et convenus avec vous avant le démarrage.",
    needsValidation: true,
  },
  {
    id: "vivre-chantier",
    category: "travaux",
    question: "Puis-je rester dans mon logement pendant les travaux ?",
    answer:
      "Cela dépend de la nature des travaux et de la pièce concernée. Nous en discutons avec vous en amont afin d’organiser le chantier de façon à limiter la gêne au quotidien.",
    needsValidation: true,
  },
  {
    id: "vmi-difference",
    category: "travaux",
    question: "Quelle est la différence entre une VMI et une VMC ?",
    answer:
      "Une VMC (ventilation mécanique contrôlée) extrait l’air du logement et laisse l’air neuf entrer par des entrées d’air. Une VMI (ventilation mécanique par insufflation) fonctionne à l’inverse : elle insuffle dans le logement de l’air extérieur filtré. L’étude de votre logement permet de déterminer la solution adaptée.",
    needsValidation: true,
  },
  {
    id: "duree-travaux",
    category: "delais",
    question: "Combien de temps durent les travaux ?",
    answer:
      "La durée dépend de l’ampleur du projet, de l’état existant et des matériaux choisis. Un planning prévisionnel est établi avec vous avant le démarrage du chantier.",
    needsValidation: true,
  },
  {
    id: "delai-reponse",
    category: "delais",
    question: "Sous quel délai puis-je espérer un retour après ma demande ?",
    answer:
      "Nous étudions chaque demande avec attention et revenons vers vous pour échanger sur votre projet. Le délai dépend de notre charge de travail du moment.",
    needsValidation: true,
  },
  {
    id: "zone",
    category: "intervention",
    question: "Dans quelles communes intervenez-vous ?",
    answer:
      "ART RÉNOV 56 est basée à Elven et intervient dans le Morbihan, notamment autour de Vannes, Saint-Avé et Theix-Noyalo. Si votre commune n’est pas citée, contactez-nous : nous vous confirmons si nous pouvons intervenir.",
    needsValidation: true,
  },
  {
    id: "deplacement",
    category: "intervention",
    question: "Vous déplacez-vous pour voir mon logement ?",
    answer:
      "Oui, découvrir votre logement sur place fait partie de l’étude de votre projet. Précisez votre commune dans le formulaire de contact pour que nous puissions organiser la suite.",
    needsValidation: true,
  },
];

export function getFaqByCategory(category: FaqCategory): ReadonlyArray<FaqItem> {
  return faqItems.filter((item) => item.category === category);
}

/** Questions validées, utilisables dans les données structurées FAQPage. */
export function getValidatedFaq(): ReadonlyArray<FaqItem> {
  return faqItems.filter((item) => !item.needsValidation);
}
