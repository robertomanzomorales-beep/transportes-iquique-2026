import type { Metadata } from "next";

import Header from "@/components/Header";
import HeroTrabajaConNosotros from "@/components/HeroTrabajaConNosotros";
import FormularioTrabaja from "@/components/FormularioTrabaja";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Trabaja con nosotros | Transportes Iquique",
  description:
    "Postula para formar parte del equipo de Transportes Iquique y envía tus antecedentes laborales y currículum.",
};

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <Header />

      <main>
        <HeroTrabajaConNosotros />
        <FormularioTrabaja />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}