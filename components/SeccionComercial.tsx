"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SeccionComercial.module.css";

export default function SeccionComercial() {
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
              // Algunos navegadores pueden bloquear autoplay.
            });
          }

          observer.unobserve(section);
        }
      },
      {
        threshold: 0.18,
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
      aria-labelledby="seccion-comercial-title"
    >
      <div className={styles.inner}>
        <div className={styles.media}>
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Flota y operación de transporte de Transportes Iquique"
          >
            <source src="/VIDEO%202.4.mp4" type="video/mp4" />
            Tu navegador no permite reproducir este video.
          </video>

          <div className={styles.mediaLabel}>
            <span>Flota y operaciones</span>
            <span>Transportes Iquique</span>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Atención comercial</span>

          <h2 id="seccion-comercial-title" className={styles.title}>
            Soluciones para empresas que necesitan mover carga sin complicaciones
          </h2>

          <p className={styles.description}>
            Ya sea para un traslado puntual, una operación programada o apoyo
            con equipos específicos, Transportes Iquique ofrece una atención
            directa para evaluar requerimientos, coordinar disponibilidad y
            entregar una alternativa eficiente para cada tipo de carga.
          </p>

          <div className={styles.points}>
            <span>Atención directa</span>
            <span>Evaluación de requerimientos</span>
            <span>Coordinación de disponibilidad</span>
          </div>
        </div>
      </div>
    </section>
  );
}