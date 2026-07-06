"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const disabledNavItems = ["Quiénes somos", "Servicios", "Contacto"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Ir al inicio - Transportes Iquique SpA"
        >
          <img
            src="/transportes-iquique-logo-menu-retina.webp"
            alt="Transportes Iquique SpA"
          />
        </Link>

        <nav className={styles.nav} aria-label="Menú principal">
          <Link href="/" className={styles.activeLink}>
            Inicio
          </Link>

          {disabledNavItems.map((item) => (
            <span key={item} className={styles.disabledLink} aria-disabled="true">
              {item}
            </span>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.workButtonDisabled} aria-disabled="true">
            Trabaja con nosotros
          </span>

          <button
            type="button"
            className={`${styles.menuButton} ${open ? styles.menuOpen : ""}`}
            onClick={() => setOpen((current) => !current)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ""}`}>
        <nav className={styles.mobileNav} aria-label="Menú móvil">
          <Link href="/" onClick={closeMenu} className={styles.mobileActive}>
            Inicio
          </Link>

          {disabledNavItems.map((item) => (
            <span
              key={item}
              className={styles.mobileDisabled}
              aria-disabled="true"
            >
              {item}
            </span>
          ))}

          <span className={styles.mobileWorkDisabled} aria-disabled="true">
            Trabaja con nosotros
          </span>
        </nav>
      </div>
    </header>
  );
}