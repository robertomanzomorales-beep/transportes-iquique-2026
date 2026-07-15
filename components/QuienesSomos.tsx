"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./QuienesSomos.module.css";

const stats = [
  {
    label: "Experiencia",
    value: "14 años",
    text: "Trayectoria en transporte de carga por carretera.",
  },
  {
    label: "Cobertura",
    value: "Norte y país",
    text: "Operaciones en la zona norte y a nivel nacional.",
  },
  {
    label: "Control",
    value: "GPS",
    text: "Seguimiento y trazabilidad durante las operaciones.",
  },
];

type RevealProps = {
  children: ReactNode;
  className: string;
  visibleClassName: string;
  delay?: number;
};

function Reveal({
  children,
  className,
  visibleClassName,
  delay = 0,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);
        observer.unobserve(element);
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -65px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className} ${visible ? visibleClassName : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export default function QuienesSomos() {
  return (
    <section className={styles.about} id="quienes-somos">
      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal
            className={styles.headingReveal}
            visibleClassName={styles.revealVisible}
          >
            <div className={styles.heading}>
              <span className={styles.kicker}>Quiénes somos</span>

              <h2>Transporte confiable para operaciones industriales</h2>
            </div>
          </Reveal>

          <Reveal
            className={styles.copyReveal}
            visibleClassName={styles.revealVisible}
            delay={120}
          >
            <div className={styles.copy}>
              <p className={styles.lead}>
                Transportes Iquique es una empresa del norte de Chile, ubicada
                en la ciudad de Iquique, con 14 años de experiencia en el
                traslado de carga por carretera en la zona norte y a nivel
                nacional.
              </p>

              <p>
                Nuestro trabajo se enfoca en entregar un servicio confiable y
                adaptable a distintos requerimientos logísticos, desde carga
                general hasta maquinaria de alto tonelaje y cargas
                sobredimensionadas.
              </p>
            </div>
          </Reveal>
        </div>

        <div className={styles.stats}>
          {stats.map((item, index) => (
            <Reveal
              key={item.label}
              className={styles.statReveal}
              visibleClassName={styles.revealVisible}
              delay={index * 100}
            >
              <article className={styles.stat}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className={styles.mvGrid}>
          <Reveal
            className={styles.missionReveal}
            visibleClassName={styles.revealVisible}
          >
            <article className={`${styles.mvCard} ${styles.mission}`}>
              <div className={styles.mvHead}>
                <div className={styles.iconBox}>
                  <Image
                    src="/mision.webp"
                    alt="Ícono misión"
                    width={44}
                    height={44}
                  />
                </div>

                <div>
                  <span>Nuestro propósito</span>
                  <h3>Misión</h3>
                </div>
              </div>

              <p>
                Brindar soluciones de transporte de carga y apoyo operativo por
                carretera, entregando un servicio seguro, responsable y
                oportuno para empresas de la zona norte y del país, con equipos
                adecuados, trazabilidad GPS y atención personalizada.
              </p>
            </article>
          </Reveal>

          <Reveal
            className={styles.visionReveal}
            visibleClassName={styles.revealVisible}
            delay={120}
          >
            <article className={`${styles.mvCard} ${styles.vision}`}>
              <div className={styles.mvHead}>
                <div className={styles.iconBox}>
                  <Image
                    src="/visiom.webp"
                    alt="Ícono visión"
                    width={44}
                    height={44}
                  />
                </div>

                <div>
                  <span>Hacia dónde vamos</span>
                  <h3>Visión</h3>
                </div>
              </div>

              <p>
                Ser reconocidos como una empresa de transporte confiable en
                Iquique y el norte de Chile, destacando por la calidad del
                servicio, la capacidad de respuesta y el compromiso con
                operaciones logísticas eficientes y seguras.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}