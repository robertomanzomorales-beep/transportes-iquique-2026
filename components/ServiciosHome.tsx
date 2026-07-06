"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ServiciosHome.module.css";

const servicios = [
  {
    numero: "01",
    titulo: "Transporte de maquinaria de alto tonelaje",
    bajada: "Traslado de maquinaria pesada y equipos industriales.",
    imagen: "/01-transporte-de-maquinaria-de-alto-tonelaje.webp",
  },
  {
    numero: "02",
    titulo: "Traslado de materiales de construcción e insumos mineros",
    bajada: "Movimiento de materiales e insumos para obras y faenas.",
    imagen: "/02-traslado-de-materiales-de-construccion-e-insumos-mineros.webp",
  },
  {
    numero: "03",
    titulo: "Cargas sobredimensionadas y carga general",
    bajada: "Soluciones para cargas especiales, generales y de mayor volumen.",
    imagen: "/03-cargas-sobredimensionadas-y-carga-general.webp",
  },
  {
    numero: "04",
    titulo: "Arriendo de camas bajas, semirremolque y tracto camiones",
    bajada: "Disponibilidad de equipos para apoyo operativo en ruta.",
    imagen: "/04-arriendo-de-camas-bajas-semirremolque-y-tracto-camiones.webp",
  },
  {
    numero: "05",
    titulo:
      "Retiro de residuos no compactables con contenedor Open Top y camiones ampliroll",
    bajada: "Apoyo para retiro, orden y gestión operativa en terreno.",
    imagen:
      "/05-retiro-de-residuos-no-compactables-con-contenedor-open-top-y-camiones-ampliroll.webp",
  },
];

export default function ServiciosHome() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.16 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className={`${styles.services} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.kicker}>Servicios destacados</span>

            <h2>Servicios de transporte y apoyo logístico</h2>

            <p>
              Soluciones para mover carga, maquinaria, equipos e insumos con
              coordinación operativa, control en ruta y respuesta según cada
              requerimiento.
            </p>
          </div>

          <Link href="/" className={styles.action}>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 6v5h-5" />
                <path d="M19 11a7 7 0 1 0-2.05 4.95" />
              </svg>
            </span>
            <strong>Ver servicios</strong>
          </Link>
        </div>
      </div>

      <div className={styles.cardsWrap}>
        <div className={styles.cards}>
          {servicios.map((servicio, index) => (
            <Link
              href="/"
              className={styles.card}
              key={servicio.numero}
              style={{ transitionDelay: `${index * 85}ms` }}
            >
              <div className={styles.imageWrap}>
                <img src={servicio.imagen} alt={servicio.titulo} />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span>{servicio.numero}</span>
                  <i aria-hidden="true">→</i>
                </div>

                <h3>{servicio.titulo}</h3>

                <p>{servicio.bajada}</p>

                <small>Ver detalle</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}