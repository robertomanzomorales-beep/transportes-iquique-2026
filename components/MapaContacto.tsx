"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MapaContacto.module.css";

const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.6871238276503!2d-70.12666192476381!3d-20.271806681194825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91521500506cc63f%3A0x4ca081fa32698edc!2sCONDOMINIO%20ALTOS%20DEL%20DRAG%C3%93N%20P!5e0!3m2!1ses!2scl!4v1784150885048!5m2!1ses!2scl";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=-20.271806681194825,-70.12666192476381";

export default function MapaContacto() {
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
        rootMargin: "0px 0px -70px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="mapa-contacto-title"
    >
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div className={styles.headingMain}>
            <span className={styles.eyebrow}>Ubicación</span>

            <h2 id="mapa-contacto-title" className={styles.title}>
              Encuéntranos en Iquique
            </h2>
          </div>

          <div className={styles.location}>
            <span className={styles.locationLabel}>Dirección</span>

            <p>
              Algarrobos 4335 ES A
              <br />
              Depto. 403, Iquique
            </p>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsButton}
            >
              <span>Abrir en Google Maps</span>
              <span className={styles.buttonLine} aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className={styles.mapWrapper}>
          <iframe
            src={mapUrl}
            className={styles.map}
            title="Ubicación de Transportes Iquique"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />

          <div className={styles.mapFooter}>
            <span>Transportes Iquique SpA</span>
            <span>Iquique · Región de Tarapacá</span>
          </div>
        </div>
      </div>
    </section>
  );
}