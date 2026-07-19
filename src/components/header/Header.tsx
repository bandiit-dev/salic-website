"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import styles from "./Header.module.scss";

const MENU_TRANSITION_MS = 1600;
const PENDING_SECTION_KEY = "salic-pending-section";

const navigationItems = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/#sobre", label: "Sobre", sectionId: "sobre" },
  { href: "/#projetos", label: "Projetos", sectionId: "projetos" },
  { href: "/#contato", label: "Contato", sectionId: "contato" },
] as const;

type MenuState = "closed" | "open" | "closing";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMenuOpen = menuState === "open";

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setMenuState("open");
  }, [clearCloseTimer]);

  const closeMenu = useCallback(
    (onClosed?: () => void) => {
      clearCloseTimer();
      setMenuState("closing");

      closeTimerRef.current = setTimeout(() => {
        setMenuState("closed");
        closeTimerRef.current = null;
        onClosed?.();
      }, MENU_TRANSITION_MS);
    },
    [clearCloseTimer],
  );

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const scrollToSection = useCallback((sectionId: string) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior, block: "start" });
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      if (pathname === "/") {
        scrollToSection(sectionId);
        return;
      }

      window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
      router.push("/", { scroll: false });
    },
    [pathname, router, scrollToSection],
  );

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    closeMobileMenu = false,
  ) => {
    event.preventDefault();

    if (closeMobileMenu) {
      closeMenu(() => navigateToSection(sectionId));
      return;
    }

    navigateToSection(sectionId);
  };

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const pendingSection = window.sessionStorage.getItem(PENDING_SECTION_KEY);
    const legacyHashSection = window.location.hash
      .slice(1)
      .split("#")[0];
    const sectionId = pendingSection || legacyHashSection;

    if (!sectionId) {
      return;
    }

    window.sessionStorage.removeItem(PENDING_SECTION_KEY);

    const animationFrame = window.requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pathname, scrollToSection]);

  useEffect(() => {
    if (menuState === "closed") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuState]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  return (
    <header className={styles.header}>
      <Link
        className={styles.header__brand}
        href="/"
        aria-label="Ir para o início"
        onClick={(event) => handleNavigation(event, "home")}
      >
        <Image
          src="/images/logo-salic.svg"
          alt="Salic"
          width={236}
          height={75}
        />
      </Link>

      <nav
        className={styles.header__navigation}
        aria-label="Navegação do Header"
      >
        <ul>
          {navigationItems.map(({ href, label, sectionId }) => (
            <li key={sectionId}>
              <Link
                href={href}
                onClick={(event) => handleNavigation(event, sectionId)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={styles.header__menuButton}
        type="button"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-controls="mobile-main-navigation"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <Image
          src="/images/icon-mobile-menu.svg"
          alt=""
          width={36}
          height={27}
        />
      </button>

      <nav
        id="mobile-main-navigation"
        className={styles.header__mobileNavigation}
        aria-label="Navegação principal"
        aria-hidden={!isMenuOpen}
        data-state={menuState}
      >
        <ul>
          {navigationItems.map(({ href, label, sectionId }) => (
            <li key={sectionId}>
              <Link
                href={href}
                tabIndex={isMenuOpen ? undefined : -1}
                onClick={(event) =>
                  handleNavigation(event, sectionId, true)
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
