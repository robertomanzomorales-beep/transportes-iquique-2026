"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroContacto.module.css";

export default function HeroContacto() {
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
      aria-labelledby="hero-contacto-title"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Contacto</span>

          <h1 id="hero-contacto-title" className={styles.title}>
            Conversemos sobre tu próximo transporte
          </h1>

          <p className={styles.description}>
            Completa el formulario o contáctanos directamente para cotizar
            servicios de transporte, arriendo de equipos o retiro de residuos
            no compactables. Nuestro equipo revisará tu solicitud y se
            comunicará contigo a la brevedad.
          </p>
        </div>
      </div>
    </section>
  );
}