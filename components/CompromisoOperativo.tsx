"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CompromisoOperativo.module.css";

export default function CompromisoOperativo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (video) {
            video.play().catch(() => {
              // El navegador puede bloquear la reproducción automática.
            });
          }

          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="compromiso-operativo-title"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Gestión y coordinación</span>

          <h2 id="compromiso-operativo-title" className={styles.title}>
            Compromiso operativo en cada traslado
          </h2>

          <p className={styles.description}>
            En Transportes Iquique trabajamos con foco en la seguridad, la
            planificación y la correcta coordinación de cada servicio.
            Nuestro equipo busca entregar respuestas claras y soluciones
            ajustadas a las necesidades de empresas que requieren mover carga,
            maquinaria o insumos de forma responsable.
          </p>

          <div className={styles.details}>
            <span>Seguridad operacional</span>
            <span>Planificación de ruta</span>
            <span>Coordinación personalizada</span>
          </div>
        </div>

        <div className={styles.media}>
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Operación de transporte de Transportes Iquique"
          >
            <source src="/VIDEO%202.3.mp4" type="video/mp4" />
            Tu navegador no permite reproducir este video.
          </video>

          <div className={styles.mediaLabel}>
            <span>Transportes Iquique</span>
            <span>Operación en terreno</span>
          </div>
        </div>
      </div>
    </section>
  );
}