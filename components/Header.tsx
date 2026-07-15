"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "./Header.module.css";

const navigationItems = [
  {
    label: "Servicios",
    href: "/servicios",
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
];

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const handleHomeClick = () => {
    closeMenu();
    window.location.assign("/");
  };

  const handleAboutClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();

      const section = document.getElementById("quienes-somos");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.replaceState(
          null,
          "",
          "/#quienes-somos"
        );
      }

      return;
    }

    window.location.assign("/#quienes-somos");
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`${styles.header} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.inner}>
        <a
          href="/"
          className={styles.logo}
          aria-label="Recargar inicio - Transportes Iquique SpA"
          onClick={(event) => {
            event.preventDefault();
            handleHomeClick();
          }}
        >
          <img
            src="/transportes-iquique-logo-menu-retina.webp"
            alt="Transportes Iquique SpA"
          />
        </a>

        <nav className={styles.nav} aria-label="Menú principal">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              handleHomeClick();
            }}
            className={`${styles.navLink} ${
              pathname === "/" ? styles.currentLink : ""
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Inicio
          </a>

          <a
            href="/#quienes-somos"
            onClick={handleAboutClick}
            className={styles.navLink}
          >
            Quiénes somos
          </a>

          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`${styles.navLink} ${
                isActive(item.href) ? styles.currentLink : ""
              }`}
              aria-current={
                isActive(item.href) ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link
            href="/trabaja-con-nosotros"
            onClick={closeMenu}
            className={`${styles.workButton} ${
              pathname === "/trabaja-con-nosotros"
                ? styles.workButtonActive
                : ""
            }`}
            aria-current={
              pathname === "/trabaja-con-nosotros"
                ? "page"
                : undefined
            }
          >
            Trabaja con nosotros
          </Link>

          <button
            type="button"
            className={`${styles.menuButton} ${
              open ? styles.menuOpen : ""
            }`}
            onClick={() => setOpen((current) => !current)}
            aria-label={
              open
                ? "Cerrar menú principal"
                : "Abrir menú principal"
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${
          open ? styles.mobileOpen : ""
        }`}
      >
        <nav className={styles.mobileNav} aria-label="Menú móvil">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              handleHomeClick();
            }}
            className={`${styles.mobileLink} ${
              pathname === "/" ? styles.mobileCurrent : ""
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <span>Inicio</span>
            <i aria-hidden="true">01</i>
          </a>

          <a
            href="/#quienes-somos"
            onClick={handleAboutClick}
            className={styles.mobileLink}
          >
            <span>Quiénes somos</span>
            <i aria-hidden="true">02</i>
          </a>

          <Link
            href="/servicios"
            onClick={closeMenu}
            className={`${styles.mobileLink} ${
              pathname === "/servicios"
                ? styles.mobileCurrent
                : ""
            }`}
            aria-current={
              pathname === "/servicios" ? "page" : undefined
            }
          >
            <span>Servicios</span>
            <i aria-hidden="true">03</i>
          </Link>

          <Link
            href="/contacto"
            onClick={closeMenu}
            className={`${styles.mobileLink} ${
              pathname === "/contacto"
                ? styles.mobileCurrent
                : ""
            }`}
            aria-current={
              pathname === "/contacto" ? "page" : undefined
            }
          >
            <span>Contacto</span>
            <i aria-hidden="true">04</i>
          </Link>

          <Link
            href="/trabaja-con-nosotros"
            onClick={closeMenu}
            className={`${styles.mobileWork} ${
              pathname === "/trabaja-con-nosotros"
                ? styles.mobileWorkActive
                : ""
            }`}
            aria-current={
              pathname === "/trabaja-con-nosotros"
                ? "page"
                : undefined
            }
          >
            <span>Trabaja con nosotros</span>
            <i aria-hidden="true">Postular</i>
          </Link>
        </nav>
      </div>
    </header>
  );
}