"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Prêt pour une vidéo de chantier réelle : renseigner ce chemin (ex. "/videos/hero-chantier.mp4")
// pour basculer automatiquement sur un arrière-plan vidéo, avec l'image ci-dessous en poster/fallback.
const HERO_VIDEO_SRC: string | undefined = undefined;
const HERO_IMAGE_SRC = "/images/hero/hero-main.svg";

const textReveal = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "20%"]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "16%"]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[680px] items-end overflow-hidden bg-marine"
    >
      <motion.div
        style={{ y: mediaY }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {HERO_VIDEO_SRC ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_IMAGE_SRC}
            className="h-full w-full object-cover"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            fill
            priority
            className="object-cover"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-marine from-10% via-marine/65 via-55% to-marine/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-marine/50 via-transparent to-marine/10" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 pb-24 pt-40 md:pb-32">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.p
            variants={textReveal}
            className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-breton-300"
          >
            <span className="h-px w-8 bg-breton-300/70" aria-hidden="true" />
            Artisans de la rénovation dans le Morbihan
          </motion.p>
          <motion.h1
            variants={textReveal}
            className="font-display text-4xl leading-[1.05] tracking-tightest text-creme sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Une rénovation pensée comme une architecture.
          </motion.h1>
          <motion.p
            variants={textReveal}
            className="mt-8 max-w-xl text-base leading-relaxed text-ardoise-200 md:text-lg"
          >
            Art Renov 56 conçoit et réalise vos projets de rénovation
            intérieure et extérieure, de la peinture aux revêtements, avec
            l&apos;exigence d&apos;un artisan et le regard d&apos;un
            architecte.
          </motion.p>
          <motion.div
            variants={textReveal}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Button href="/devis" className="shadow-lg shadow-marine-950/40">
              Demander un devis gratuit
            </Button>
            <Button href="/realisations" variant="ghost">
              Voir nos réalisations
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-creme/60">
          Défiler
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-creme/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-creme/70"
            animate={
              prefersReducedMotion
                ? undefined
                : { y: ["-100%", "200%"] }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
