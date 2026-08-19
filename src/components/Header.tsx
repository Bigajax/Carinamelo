import Image from "next/image";
import Link from "next/link";

import { linkGeral } from "@/lib/whatsapp";

const NAVEGACAO = [
  { href: "/catalogo", texto: "Catálogo" },
  { href: "/garantia", texto: "Garantia" },
  { href: "/sobre", texto: "Sobre" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rosa-classico bg-perola/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        <Link href="/" aria-label="Carina Melo Shop, página inicial" className="shrink-0">
          <Image
            src="/marca/carina-melo-vinho.png"
            alt="Carina Melo"
            width={1200}
            height={829}
            priority
            className="h-11 w-auto md:h-14"
          />
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-5 md:gap-8">
          {NAVEGACAO.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow text-[11px] text-tinta transition-colors duration-200 hover:text-vinho md:text-[12px]"
            >
              {item.texto}
            </Link>
          ))}

          <a
            href={linkGeral()}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow rounded-full border border-vinho px-4 py-2 text-[11px] text-vinho transition-colors duration-200 hover:bg-vinho hover:text-perola"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
