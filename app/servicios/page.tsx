import type { Metadata } from "next";

import Header from "@/components/Header";
import HeroServicios from "@/components/HeroServicios";
import ServiciosDetalle from "@/components/ServiciosDetalle";
import CompromisoOperativo from "@/components/CompromisoOperativo";
import SeccionComercial from "@/components/SeccionComercial";
import GaleriaServicios from "@/components/GaleriaServicios";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Servicios de transporte y apoyo logístico | Transportes Iquique",
  description:
    "Servicios de transporte de carga, maquinaria, equipos y apoyo logístico en Iquique y el norte de Chile.",
};

export default function ServiciosPage() {
  return (
    <>
      <Header />

      <main>
        <HeroServicios />
        <ServiciosDetalle />
        <CompromisoOperativo />
        <SeccionComercial />
        <GaleriaServicios />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}