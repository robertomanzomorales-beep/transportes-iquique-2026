import type { Metadata } from "next";

import Header from "@/components/Header";
import HeroContacto from "@/components/HeroContacto";
import FormularioContacto from "@/components/FormularioContacto";
import MapaContacto from "@/components/MapaContacto";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contacto | Transportes Iquique",
  description:
    "Contacta a Transportes Iquique para cotizar servicios de transporte, arriendo de equipos y apoyo logístico en Iquique y el norte de Chile.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />

      <main>
        <HeroContacto />
        <FormularioContacto />
        <MapaContacto />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}