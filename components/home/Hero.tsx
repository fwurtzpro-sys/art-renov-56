"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/animations/variants";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-anthracite">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/60 to-anthracite/20" />
      </div>

      <Container className="relative z-10 pb-20 pt-40 md:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-pierre-300"
          >
            Artisans de la rénovation dans le Morbihan
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl leading-[1.05] tracking-tightest text-creme sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Une rénovation pensée comme une architecture.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-relaxed text-ardoise-200 md:text-lg"
          >
            Art Renov 56 conçoit et réalise vos projets de rénovation
            intérieure et extérieure, de la peinture aux revêtements, avec
            l&apos;exigence d&apos;un artisan et le regard d&apos;un
            architecte.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button href="/devis">Demander un devis gratuit</Button>
            <Button href="/realisations" variant="ghost">
              Voir nos réalisations
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <ArrowDown className="size-5 animate-bounce text-creme/60" />
      </motion.div>
    </section>
  );
}
