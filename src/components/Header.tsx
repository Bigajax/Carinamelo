import Image from "next/image";
import Link from "next/link";

import { linkGeral } from "@/lib/whatsapp";

const NAVEGACAO = [
  { href: "/catalogo", texto: "Catálogo" },
  { href: "/garantia", texto: "Garantia" },
  { href: "/sobre", texto: "Sobre" },
];

const ITEM =
  "eyebrow text-[11px] text-tinta transition-colors duration-200 hover:text-vinho md:text-[12px]";

/**
 * No mobile a assinatura, três links e o botão não cabem numa linha só —
 * ficavam espremidos a 360px. A navegação desce para uma segunda faixa,
 * separada por um fio. Três links não justificam um menu sanduíche.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rosa-classico bg-perola/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3 md:px-8 md:py-3.5">
        <Link href="/" aria-label="Carina Melo Shop, página inicial" className="shrink-0">
          <Image
            src="/marca/carina-melo-vinho.png"
            alt="Carina Melo"
            width={1200}
            height={829}
            priority
            className="h-10 w-auto md:h-14"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
          {NAVEGACAO.map((item) => (
            <Link key={item.href} href={item.href} className={ITEM}>
              {item.texto}
            </Link>
          ))}
        </nav>

        <a
          href={linkGeral()}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow shrink-0 rounded-full border border-vinho px-4 py-2 text-[11px] text-vinho transition-colors duration-200 hover:bg-vinho hover:text-perola"
        >
          WhatsApp
        </a>
      </div>

      <nav
        aria-label="Navegação principal"
        className="flex items-center justify-between gap-4 border-t border-rosa-classico/60 px-5 py-2.5 md:hidden"
      >
        {NAVEGACAO.map((item) => (
          <Link key={item.href} href={item.href} className={ITEM}>
            {item.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}
