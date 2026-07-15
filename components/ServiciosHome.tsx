"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./ServiciosHome.module.css";

const servicios = [
  {
    numero: "01",
    titulo: "Transporte de maquinaria de alto tonelaje",
    bajada: "Traslado de maquinaria pesada y equipos industriales.",
    imagen: "/1-maquinaria-alto-tonelaje.webp",
  },
  {
    numero: "02",
    titulo: "Traslado de materiales de construcción e insumos mineros",
    bajada: "Movimiento de materiales e insumos para obras y faenas.",
    imagen:
      "/02-traslado-de-materiales-de-construccion-e-insumos-mineros.webp",
  },
  {
    numero: "03",
    titulo: "Cargas sobredimensionadas y carga general",
    bajada:
      "Soluciones para cargas especiales, generales y de mayor volumen.",
    imagen: "/3-carga-sobredimensionada.webp",
  },
  {
    numero: "04",
    titulo: "Arriendo de camas bajas, semirremolque y tractocamiones",
    bajada: "Disponibilidad de equipos para apoyo operativo en ruta.",
    imagen: "/4-arriendos.webp",
  },
  {
    numero: "05",
    titulo:
      "Retiro de residuos no compactables con contenedor Open Top y camiones ampliroll",
    bajada: "Apoyo para retiro, orden y gestión operativa en terreno.",
    imagen: "/5-retiro-de-residuos.webp",
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
        threshold: 0.16,
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

export default function ServiciosHome() {
  return (
    <section id="servicios" className={styles.services}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <Reveal
            className={styles.headerReveal}
            visibleClassName={styles.revealVisible}
          >
            <div className={styles.headerText}>
              <span className={styles.kicker}>
                Servicios destacados
              </span>

              <h2>Servicios de transporte y apoyo logístico</h2>

              <p>
                Soluciones para mover carga, maquinaria, equipos e
                insumos con coordinación operativa, control en ruta
                y respuesta según cada requerimiento.
              </p>
            </div>
          </Reveal>

          <Reveal
            className={styles.actionReveal}
            visibleClassName={styles.revealVisible}
            delay={120}
          >
            <Link href="/servicios" className={styles.action}>
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20 6v5h-5" />
                  <path d="M19 11a7 7 0 1 0-2.05 4.95" />
                </svg>
              </span>

              <strong>Ver servicios</strong>
            </Link>
          </Reveal>
        </div>
      </div>

      <div className={styles.cardsWrap}>
        <div className={styles.cards}>
          {servicios.map((servicio, index) => (
            <Reveal
              key={servicio.numero}
              className={styles.cardReveal}
              visibleClassName={styles.revealVisible}
              delay={(index % 5) * 90}
            >
              <Link href="/servicios" className={styles.card}>
                <div className={styles.imageWrap}>
                  <img
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    loading="lazy"
                    decoding="async"
                  />

                  <span
                    className={styles.imageOverlay}
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span>{servicio.numero}</span>
                    <i aria-hidden="true">→</i>
                  </div>

                  <h3>{servicio.titulo}</h3>

                  <p>{servicio.bajada}</p>

                  <small>
                    Ver detalle
                    <span aria-hidden="true" />
                  </small>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}