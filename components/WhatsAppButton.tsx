import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/56988394613?text=Hola,%20quiero%20cotizar%20un%20servicio%20de%20transporte.";

  return (
    <a
      href={whatsappUrl}
      className={styles.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <span className={styles.pulse} aria-hidden="true" />

      <span className={styles.iconBox}>
        <img src="/whatsapp-blanco.webp" alt="" aria-hidden="true" />
      </span>

      <span className={styles.text}>
        <small>Cotizar por</small>
        <strong>WhatsApp</strong>
      </span>
    </a>
  );
}