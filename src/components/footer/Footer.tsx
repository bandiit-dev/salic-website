import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.scss";

const navigationItems = [
  { href: "/#home", label: "Home" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#contato", label: "Contato" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Link
        className={styles.footer__brand}
        href="/#home"
        aria-label="Ir para o início"
      >
        <Image
          src="/images/logo-salic.svg"
          alt="Salic"
          width={195}
          height={59}
        />
      </Link>

      <nav className={styles.footer__navigation} aria-label="Navegação do rodapé">
        <ul>
          {navigationItems.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className={styles.footer__copyright}>
        ©Salic Arquitetura, {currentYear}
      </p>
    </footer>
  );
}
