import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <div className={styles.logoBox}>
              <img
                src="/transportes-iquique-logo-menu-retina.webp"
                alt="Transportes Iquique SpA"
              />
            </div>

            <p>
              Transporte por carretera para cargas industriales, maquinarias,
              materiales para obras civiles, insumos mineros y operaciones
              especiales.
            </p>
          </div>

          <div className={styles.contactBlock}>
            <span className={styles.label}>Contacto directo</span>

            <div className={styles.contacts}>
              <a href="tel:+56988394613">
                <strong>Carlos Vega Caballero</strong>
                <span>+56 9 8839 4613</span>
              </a>

              <a href="tel:+56982028486">
                <strong>Ana Muñoz García</strong>
                <span>+56 9 8202 8486</span>
              </a>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.label}>Correo</span>

            <a href="mailto:carlos.vega.vym@gmail.com">
              carlos.vega.vym@gmail.com
            </a>

            <a href="mailto:trans.vym@gmail.com">trans.vym@gmail.com</a>
          </div>

          <div className={styles.actionBlock}>
            <span className={styles.label}>Cotizaciones</span>

            <p>Conversemos sobre tu próximo transporte.</p>

            <Link href="#contacto" className={styles.button}>
              Solicitar cotización
            </Link>
          </div>
        </div>

        <div className={styles.secondary}>
          <div className={styles.location}>
            <span>Dirección</span>
            <p>Algarrobos 4335 ES A Depto. 403, Iquique</p>
          </div>

          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/tranportes_vym?igsh=MWVmZG1hbW5vY3NpMQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/share/14gMQaZZ18v/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Transportes Iquique SpA</span>

          <span>
            Diseñado y potenciado por{" "}
            <a
              href="https://vialoop.cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              vialoop.cl
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}