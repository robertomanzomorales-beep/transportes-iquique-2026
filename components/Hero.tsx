import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Video de fondo */}
      <video
        className={styles.video}
        src="/video-fondo-hero-largo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay sólido, sin degradado */}
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.frame}>
          <div className={styles.topBar}>
            <span>Transportes Iquique SpA</span>
            <span>Iquique · Norte de Chile</span>
          </div>

          <div className={styles.content}>
            <span className={styles.kicker}>Transporte industrial</span>

            <h1>Soluciones de transporte para cargas y equipos</h1>

            <p>
              Servicios de transporte por carretera para cargas industriales,
              maquinarias, materiales para obras civiles, insumos mineros y
              operaciones especiales.
            </p>

            <div className={styles.actions}>
              <span className={styles.primary} aria-disabled="true">
                Solicitar cotización
              </span>

              <span className={styles.secondary} aria-disabled="true">
                Ver servicios
              </span>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <span>Maquinaria · Carga especial · Apoyo operativo</span>
            <span>Seguimiento GPS y coordinación en ruta</span>
          </div>
        </div>
      </div>
    </section>
  );
}