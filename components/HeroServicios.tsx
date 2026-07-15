"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroServicios.module.css";

export default function HeroServicios() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} ${visible ? styles.visible : ""}`}
      aria-labelledby="hero-servicios-title"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Nuestros servicios</span>

          <h1 id="hero-servicios-title" className={styles.title}>
            Servicios de transporte y apoyo logístico
          </h1>

          <p className={styles.description}>
            Ofrecemos soluciones para sus traslados. Cada servicio se coordina
            según las características de la operación, priorizando seguridad,
            cumplimiento y control en ruta. Los requerimientos de nuestros
            clientes son fundamentales para entregar una coordinación
            personalizada y eficiente por parte de nuestro equipo de trabajo.
          </p>
        </div>
      </div>
    </section>
  );
}