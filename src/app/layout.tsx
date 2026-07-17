import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

import "./globals.scss";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salic - Arquitetura de Interiores",
  description: "Arquitetura de Interiores com presença e criatividade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
