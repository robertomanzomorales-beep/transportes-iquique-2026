"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import styles from "./GaleriaServicios.module.css";

const images = [
  {
    src: "/fondo-servicios-home.webp",
    alt: "Camión de Transportes Iquique trasladando maquinaria",
    title: "Operación industrial",
  },
  {
    src: "/vym-transporte-01.webp",
    alt: "Camión transportando maquinaria pesada en carretera",
    title: "Transporte de maquinaria",
  },
  {
    src: "/vym-transporte-02.webp",
    alt: "Camión trasladando carga especial en zona industrial",
    title: "Carga especial en ruta",
  },
  {
    src: "/vym-transporte-03.webp",
    alt: "Camión amarillo realizando una operación de transporte",
    title: "Apoyo operativo",
  },
  {
    src: "/vym-transporte-04.webp",
    alt: "Camión con equipos en patio industrial",
    title: "Operación en patio",
  },
  {
    src: "/vym-transporte-05.webp",
    alt: "Convoy trasladando equipos e insumos para minería",
    title: "Insumos para minería",
  },
  {
    src: "/vym-transporte-06.webp",
    alt: "Transporte de maquinaria pesada en carretera",
    title: "Servicios para industria",
  },
  {
    src: "/vym-transporte-07.webp",
    alt: "Camión trasladando maquinaria en condiciones climáticas exigentes",
    title: "Transporte por carretera",
  },
  {
    src: "/vym-transporte-08.webp",
    alt: "Camión en operación logística dentro de una faena",
    title: "Apoyo logístico en terreno",
  },
  {
    src: "/vym-transporte-09.webp",
    alt: "Maquinaria pesada trasladada sobre cama baja",
    title: "Cargas sobredimensionadas",
  },
  {
    src: "/vym-transporte-10.webp",
    alt: "Camión trasladando maquinaria y carga especial",
    title: "Carga general y equipos",
  },
  {
    src: "/vym-transporte-11.webp",
    alt: "Camión trasladando contenedor en carretera",
    title: "Traslado especializado",
  },
  {
    src: "/vym-transporte-13.webp",
    alt: "Camión blanco realizando una operación en faena",
    title: "Operación en faena",
  },
  {
    src: "/vym-transporte-14.webp",
    alt: "Equipo de transporte de alto tonelaje en patio industrial",
    title: "Maquinaria de alto tonelaje",
  },
  {
    src: "/vym-transporte-15.webp",
    alt: "Camión en ruta dentro de una operación logística",
    title: "Cobertura en zona norte",
  },
  {
    src: "/vym-transporte-16.webp",
    alt: "Camión trasladando maquinaria por carretera",
    title: "Coordinación de transporte",
  },
];

export default function GaleriaServicios() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [headingVisible, setHeadingVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLButtonElement => card !== null
    );

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(
            (entry.target as HTMLButtonElement).dataset.index
          );

          setVisibleCards((current) =>
            current.includes(index) ? current : [...current, index]
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -55px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + images.length) % images.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null
        ? 0
        : (current - 1 + images.length) % images.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % images.length
    );
  };

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <section
        className={styles.section}
        aria-labelledby="galeria-servicios-title"
      >
        <div
          ref={headingRef}
          className={`${styles.heading} ${
            headingVisible ? styles.headingVisible : ""
          }`}
        >
          <div className={styles.headingMain}>
            <span className={styles.eyebrow}>Galería operativa</span>

            <h2 id="galeria-servicios-title" className={styles.title}>
              Equipos y operaciones en terreno
            </h2>
          </div>

          <p className={styles.intro}>
            Una muestra de nuestros traslados, equipos y operaciones de apoyo
            logístico desarrolladas para empresas de la zona norte y del país.
          </p>
        </div>

        <div className={styles.fullWidth}>
          <div className={styles.grid}>
            {images.map((image, index) => {
              const isVisible = visibleCards.includes(index);

              return (
                <button
                  key={image.src}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  data-index={index}
                  type="button"
                  className={`${styles.card} ${
                    isVisible ? styles.cardVisible : ""
                  }`}
                  style={
                    {
                      "--entrance-delay": `${(index % 4) * 70}ms`,
                    } as CSSProperties
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ampliar imagen: ${image.title}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className={styles.imageShade} aria-hidden="true" />

                  <span className={styles.topLine} aria-hidden="true" />

                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.cardContent}>
                    <strong>{image.title}</strong>

                    <span className={styles.viewText}>
                      Ampliar imagen
                      <span className={styles.viewLine} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galería ampliada de Transportes Iquique"
          onClick={closeLightbox}
        >
          <div
            className={styles.lightboxPanel}
            onClick={stopPropagation}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Cerrar galería"
            >
              <span aria-hidden="true">×</span>
            </button>

            <button
              type="button"
              className={`${styles.navigationButton} ${styles.previousButton}`}
              onClick={showPrevious}
              aria-label="Ver imagen anterior"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <div className={styles.lightboxMedia}>
              <img
                key={images[activeIndex].src}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                className={styles.lightboxImage}
              />
            </div>

            <button
              type="button"
              className={`${styles.navigationButton} ${styles.nextButton}`}
              onClick={showNext}
              aria-label="Ver imagen siguiente"
            >
              <span aria-hidden="true">›</span>
            </button>

            <div className={styles.lightboxFooter}>
              <div>
                <span className={styles.lightboxCounter}>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>

                <strong className={styles.lightboxTitle}>
                  {images[activeIndex].title}
                </strong>
              </div>

              <span className={styles.keyboardHelp}>
                Use las flechas para navegar
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}