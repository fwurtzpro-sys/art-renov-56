import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-creme pt-24">
      <Container className="text-center">
        <Compass className="mx-auto size-12 text-breton-500" aria-hidden="true" />
        <p className="mt-6 font-display text-6xl text-anthracite md:text-7xl">404</p>
        <h1 className="mt-4 font-display text-2xl text-anthracite md:text-3xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-ardoise-600 md:text-base">
          La page que vous recherchez a peut-être été déplacée ou
          n&apos;existe plus. Revenez à l&apos;accueil pour poursuivre votre
          navigation.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/contact" variant="secondary">
            Nous contacter
          </Button>
        </div>
      </Container>
    </section>
  );
}
