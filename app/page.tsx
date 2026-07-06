import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuienesSomos from "@/components/QuienesSomos";
import ServiciosHome from "@/components/ServiciosHome";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <QuienesSomos />
        <ServiciosHome />
        <Footer />
      </main>

      <WhatsAppButton />
    </>
  );
}