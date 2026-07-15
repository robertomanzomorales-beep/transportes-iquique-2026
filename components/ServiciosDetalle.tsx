"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ServiciosDetalle.module.css";

const servicios = [
  {
    title: "Transporte de carga por carretera",
    description:
      "Traslado de carga general en rutas de la zona norte y a nivel nacional, con coordinación según volumen, destino y requerimientos del cliente.",
    objective: "Resolver necesidades de transporte continuo o puntual.",
  },
  {
    title: "Maquinaria de alto tonelaje",
    description:
      "Servicio orientado al traslado de maquinaria pesada y equipos industriales, utilizando unidades adecuadas para operaciones exigentes.",
    objective: "Apoyar proyectos de construcción, minería e industria.",
  },
  {
    title: "Cargas sobredimensionadas",
    description:
      "Transporte de cargas especiales que requieren planificación, equipos específicos y control durante el traslado.",
    objective: "Entregar una solución segura para cargas complejas.",
  },
  {
    title: "Materiales e insumos para minería",
    description:
      "Traslado de materiales, camionetas, equipos e insumos asociados a faenas y operaciones mineras.",
    objective: "Responder a necesidades logísticas del sector minero.",
  },
  {
    title: "Arriendo de equipos",
    description:
      "Disponibilidad de camas bajas, ramplas planas y tractocamiones para apoyar operaciones de transporte y movimiento de carga.",
    objective: "Aportar capacidad operativa adicional al cliente.",
  },
  {
    title: "Retiro de residuos no compactables",
    description:
      "Servicio con contenedores Open Top y camiones ampliroll para el retiro de residuos no compactables.",
    objective: "Facilitar la gestión operativa y el orden del lugar de trabajo.",
  },
  {
    title: "Rastreo GPS",
    description:
      "Equipos con seguimiento GPS para mantener mayor control y trazabilidad durante las operaciones.",
    objective: "Transmitir seguridad y control al cliente.",
  },
];

function ServicioItem({
  servicio,
  index,
}: {
  servicio: (typeof servicios)[number];
  index: number;
}) {
  const itemRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const item = itemRef.current;

    if (!item) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(item);
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    observer.observe(item);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={itemRef}
      className={`${styles.service} ${visible ? styles.serviceVisible : ""}`}
    >
      <span className={styles.number}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.serviceContent}>
        <h3>{servicio.title}</h3>
        <p>{servicio.description}</p>
      </div>

      <p className={styles.objective}>{servicio.objective}</p>
    </article>
  );
}

export default function ServiciosDetalle() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;

    if (!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.unobserve(heading);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      aria-labelledby="servicios-detalle-title"
    >
      <div className={styles.inner}>
        <header
          ref={headingRef}
          className={`${styles.heading} ${
            headingVisible ? styles.headingVisible : ""
          }`}
        >
          <div className={styles.headingMain}>
            <span className={styles.eyebrow}>Capacidad operativa</span>

            <h2 id="servicios-detalle-title" className={styles.title}>
              Soluciones para cada requerimiento de transporte
            </h2>
          </div>

          <p className={styles.intro}>
            Coordinamos cada servicio de acuerdo con el tipo de carga, destino,
            condiciones de ruta y requerimientos operacionales de cada
            proyecto.
          </p>
        </header>

        <div className={styles.services}>
          {servicios.map((servicio, index) => (
            <ServicioItem
              key={servicio.title}
              servicio={servicio}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}