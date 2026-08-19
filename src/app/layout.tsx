import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";

import Header from "@/components/Header";
import Rodape from "@/components/Rodape";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import { site } from "@/data/site.config";

import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Semijoias em Maringá com garantia de 5 anos`,
    template: `%s | ${site.nome}`,
  },
  description:
    "Semijoias com garantia de 5 anos em Maringá. Escolha a peça e feche o pedido direto no WhatsApp, sem cadastro e sem carrinho.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: site.url,
    title: `${site.nome} — Semijoias em Maringá com garantia de 5 anos`,
    description:
      "Mais de 20 anos de mercado. Peças em banho de ouro, ouro branco e paládio, com garantia de 5 anos.",
    images: [
      {
        url: "/img/og.webp",
        width: 1200,
        height: 630,
        alt: "Brincos de coração em banho de ouro, na orelha",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const negocio = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: site.nome,
    slogan: site.lema,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.cidade,
      addressRegion: site.estado,
      addressCountry: "BR",
    },
    sameAs: [
      `https://www.instagram.com/${site.instagram}`,
      `https://www.facebook.com/${site.facebook}`,
    ],
  };

  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[6px] focus:bg-vinho focus:px-4 focus:py-2 focus:text-perola"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Rodape />
        <WhatsAppFlutuante />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(negocio).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
