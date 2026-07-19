import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

import { siteUrl } from "@/lib/site-url";

import "./globals.scss";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "400"],
  subsets: ["latin"],
});

const gtmId = process.env.GTM_ID ?? process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: siteUrl,
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
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
