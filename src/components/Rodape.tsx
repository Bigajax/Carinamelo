import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site.config";
import { linkGeral } from "@/lib/whatsapp";

const COLUNAS = [
  {
    titulo: "Catálogo",
    itens: [
      { href: "/catalogo", texto: "Todas as peças" },
      { href: "/catalogo?material=ouro", texto: "Banho em ouro" },
      { href: "/catalogo?material=ouroBranco", texto: "Banho em ouro branco" },
      { href: "/catalogo?material=paladio", texto: "Banho em paládio" },
    ],
  },
  {
    titulo: "A marca",
    itens: [
      { href: "/garantia", texto: "Garantia de 5 anos" },
      { href: "/sobre", texto: "Sobre a Carina" },
    ],
  },
];

export default function Rodape() {
  return (
    <footer className="escuro bg-vinho-profundo text-perola">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/marca/carina-melo-perola.png"
              alt="Carina Melo"
              width={1200}
              height={829}
              className="h-16 w-auto"
            />
            <p className="display mt-6 text-[22px] text-rosa-nevoa">{site.lema}</p>
            <p className="mt-4 max-w-[34ch] text-[14px] text-perola/70">
              Semijoias com garantia de {site.garantiaAnos} anos, em {site.cidade}.
              Mais de 20 anos de mercado.
            </p>
          </div>

          {COLUNAS.map((coluna) => (
            <nav key={coluna.titulo} aria-label={coluna.titulo}>
              <h2 className="eyebrow text-[11px] text-rosa-classico">{coluna.titulo}</h2>
              <ul className="mt-5 space-y-2.5">
                {coluna.itens.map((item) => (
                  <li key={item.href + item.texto}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-perola/80 transition-colors duration-200 hover:text-perola"
                    >
                      {item.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow text-[11px] text-rosa-classico">Atendimento</h2>
            <ul className="mt-5 space-y-2.5 text-[14px] text-perola/80">
              <li>{site.endereco}</li>
              <li>{site.horario}</li>
              <li>
                <a
                  href={linkGeral()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-perola"
                >
                  Falar no WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`https://www.instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-perola"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`https://www.facebook.com/${site.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-perola"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-perola/15 pt-6 text-[12px] text-perola/65">
          © {new Date().getFullYear()} {site.nome} · {site.cidade}/{site.estado}
          <span className="mt-1.5 block">
            vitrine por{" "}
            <a
              href="https://rafaelrazeira.com.br/vitrine-digital"
              target="_blank"
              rel="noopener"
              className="underline-offset-2 transition-colors duration-200 hover:text-perola hover:underline"
            >
              Rafael Razeira Estúdio
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
