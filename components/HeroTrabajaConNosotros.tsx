"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroTrabajaConNosotros.module.css";

export default function HeroTrabajaConNosotros() {
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
      aria-labelledby="hero-trabaja-title"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Trabaja con nosotros</span>

          <h1 id="hero-trabaja-title" className={styles.title}>
            Sé parte de nuestro equipo
          </h1>

          <p className={styles.description}>
            Buscamos personas responsables, comprometidas y orientadas al
            trabajo seguro. Envíanos tus antecedentes y cuéntanos sobre tu
            experiencia para considerarte en futuros procesos de selección.
          </p>
        </div>
      </div>
    </section>
  );
}