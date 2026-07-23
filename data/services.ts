import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "renovation-interieure",
    title: "Rénovation intérieure",
    shortDescription:
      "Redonnez vie à vos espaces de vie avec une rénovation intérieure complète, pensée dans les moindres détails.",
    description: [
      "Une rénovation intérieure réussie transforme durablement votre quotidien. Chez Art Renov 56, nous prenons en charge l'ensemble du projet : de la démolition à la finition, en passant par l'électricité, la plomberie et les cloisons.",
      "Chaque chantier est piloté par une équipe unique qui coordonne tous les corps de métier, pour un résultat cohérent, soigné et livré dans les délais annoncés.",
    ],
    icon: "Home",
    image: "/images/services/renovation-interieure.svg",
    features: [
      "Rénovation complète d'appartement ou de maison",
      "Optimisation des espaces et cloisonnement",
      "Coordination des corps de métier",
      "Suivi de chantier personnalisé",
    ],
    metaDescription:
      "Rénovation intérieure complète en Morbihan : appartements, maisons, optimisation d'espace. Devis gratuit avec Art Renov 56.",
  },
  {
    slug: "renovation-exterieure",
    title: "Rénovation extérieure",
    shortDescription:
      "Valorisez et protégez votre patrimoine avec une rénovation extérieure durable et esthétique.",
    description: [
      "Façades, toitures, menuiseries extérieures : l'enveloppe de votre bâtiment mérite autant d'attention que son intérieur. Nous intervenons pour restaurer, isoler et embellir vos façades et extérieurs.",
      "Nos solutions allient performance énergétique et esthétique, dans le respect des matériaux et du style architectural de votre région.",
    ],
    icon: "Building2",
    image: "/images/services/renovation-exterieure.svg",
    features: [
      "Ravalement et traitement de façade",
      "Isolation thermique par l'extérieur",
      "Rénovation de menuiseries",
      "Traitement des points singuliers",
    ],
    metaDescription:
      "Rénovation de façade et extérieurs dans le Morbihan : ravalement, isolation, menuiseries. Expertise Art Renov 56.",
  },
  {
    slug: "peinture",
    title: "Peinture",
    shortDescription:
      "Des finitions impeccables pour sublimer chaque pièce, à l'intérieur comme à l'extérieur.",
    description: [
      "La peinture est souvent la dernière étape d'un chantier, mais c'est elle qui donne le ton final. Nos peintres appliquent un savoir-faire minutieux sur tous types de supports.",
      "Nous sélectionnons des peintures de qualité, adaptées à chaque pièce et à ses contraintes d'usage et d'humidité.",
    ],
    icon: "Paintbrush",
    image: "/images/services/peinture.svg",
    features: [
      "Peinture intérieure toutes pièces",
      "Peinture de façade",
      "Enduits décoratifs",
      "Préparation et traitement des supports",
    ],
    metaDescription:
      "Peinture intérieure et extérieure en Morbihan : finitions soignées, enduits décoratifs. Devis gratuit Art Renov 56.",
  },
  {
    slug: "revetements-de-sols",
    title: "Revêtements de sols",
    shortDescription:
      "Parquet, carrelage, sols souples : un revêtement de qualité pour chaque usage et chaque style.",
    description: [
      "Le choix d'un revêtement de sol conditionne le confort et l'allure d'une pièce pour de nombreuses années. Nous vous conseillons selon vos usages, votre budget et vos goûts.",
      "Pose soignée, jonctions maîtrisées et finitions propres sont notre exigence sur chaque chantier, du studio à la maison familiale.",
    ],
    icon: "LayoutGrid",
    image: "/images/services/revetements-sols.svg",
    features: [
      "Parquet massif, contrecollé et stratifié",
      "Carrelage et grès cérame",
      "Sols souples et PVC",
      "Ragréage et préparation des sols",
    ],
    metaDescription:
      "Pose de revêtements de sols dans le Morbihan : parquet, carrelage, sols souples. Savoir-faire Art Renov 56.",
  },
  {
    slug: "revetements-muraux",
    title: "Revêtements muraux",
    shortDescription:
      "Papier peint, lambris, carrelage mural : des murs qui donnent du caractère à vos intérieurs.",
    description: [
      "Les murs structurent l'ambiance d'une pièce. Nous posons tous types de revêtements muraux, du papier peint contemporain au lambris bois, en passant par le carrelage de salle de bain.",
      "Une attention particulière est portée aux jonctions, aux angles et à la préparation des supports pour un rendu durable.",
    ],
    icon: "PanelsTopLeft",
    image: "/images/services/revetements-muraux.svg",
    features: [
      "Papier peint et toile de verre",
      "Lambris et boiseries",
      "Carrelage mural et faïence",
      "Enduits et parements décoratifs",
    ],
    metaDescription:
      "Revêtements muraux en Morbihan : papier peint, lambris, carrelage. Pose professionnelle par Art Renov 56.",
  },
  {
    slug: "amenagement-interieur",
    title: "Aménagement intérieur",
    shortDescription:
      "Rangements sur mesure, cuisines, dressings : optimisez chaque mètre carré de votre intérieur.",
    description: [
      "Un aménagement intérieur réfléchi transforme l'usage d'un espace sans nécessairement l'agrandir. Nous concevons et réalisons des aménagements sur mesure adaptés à votre mode de vie.",
      "De la cuisine au dressing en passant par les rangements sous combles, chaque projet est unique et pensé avec vous.",
    ],
    icon: "Ruler",
    image: "/images/services/amenagement-interieur.svg",
    features: [
      "Cuisines et dressings sur mesure",
      "Rangements et placards intégrés",
      "Aménagement de combles",
      "Conception et plans 3D",
    ],
    metaDescription:
      "Aménagement intérieur sur mesure en Morbihan : cuisines, dressings, rangements. Conception par Art Renov 56.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
