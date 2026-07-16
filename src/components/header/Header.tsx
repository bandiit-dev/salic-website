"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Header.module.scss";

const MENU_TRANSITION_MS = 1600;

const navigationItems = [
  { href: "/#home", label: "Home" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#contato", label: "Contato" },
] as const;

type MenuState = "closed" | "open" | "closing";

export function Header() {
  const router = useRouter();
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

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    closeMenu(() => router.push(href));
  };

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
        href="/#home"
        aria-label="Ir para o início"
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
          {navigationItems.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
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
          {navigationItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                tabIndex={isMenuOpen ? undefined : -1}
                onClick={(event) => handleNavigation(event, href)}
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
