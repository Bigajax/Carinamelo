import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { site } from "@/data/site.config";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre a Carina",
  description:
    "Mais de 20 anos de semijoias em Maringá. Como a Carina escolhe as peças e como comprar pelo WhatsApp.",
  alternates: { canonical: "/sobre" },
};

const COMO_COMPRAR = [
  {
    passo: "01",
    titulo: "Escolhe a peça",
    texto:
      "Navegue pelo catálogo, filtre por acabamento ou por tipo. Cada peça tem o código que a Carina usa no estoque.",
  },
  {
    passo: "02",
    titulo: "Chama no WhatsApp",
    texto:
      "O botão manda a mensagem já com o nome, o código e o preço da peça. Você não precisa explicar qual era.",
  },
  {
    passo: "03",
    titulo: "Retira ou recebe",
    texto:
      "A Carina combina com você a forma de pagamento e se a peça vai ser retirada em Maringá ou enviada.",
  },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <p className="eyebrow text-[11px] text-vinho/80">Sobre</p>
          <h1 className="display mt-4 max-w-[16ch] text-[38px] text-vinho md:text-[52px]">
            Vinte anos escolhendo peça por peça.
          </h1>
          <p className="medida-texto mt-8 text-[17px] leading-relaxed text-tinta">
            A Carina Melo trabalha com semijoia em {site.cidade} há mais de vinte anos. Nesse
            tempo ela deixou de ser só quem vende e virou quem ensina: hoje dá mentoria para
            outras donas de marca de semijoia pelo Brasil.
          </p>
          <p className="medida-texto mt-5 text-[17px] leading-relaxed text-tinta">
            Isso muda o que entra no catálogo. Peça que escurece em três meses não sobrevive
            à curadoria, porque quem vende de novo para a mesma cliente no ano seguinte não
            pode se dar a esse luxo. É daí que vem a garantia de {site.garantiaAnos} anos —
            ela só é possível porque a escolha vem antes.
          </p>
          <p className="medida-texto mt-5 text-[17px] leading-relaxed text-tinta">
            &ldquo;{site.lema}&rdquo; não é slogan de fachada: metade do que sai daqui é
            presente, e a outra metade é mulher se presenteando.
          </p>
        </div>

        <div className="relative aspect-4/5 overflow-hidden rounded-[4px] bg-rosa-nevoa">
          <Image
            src="/img/colar-escapulario-ouro.webp"
            alt="Colar com pingente de escapulário em banho de ouro"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mt-24">
        <h2 className="display max-w-[16ch] text-[30px] text-vinho md:text-[38px]">
          Como comprar
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {COMO_COMPRAR.map((etapa) => (
            <li key={etapa.passo} className="border-t border-rosa-classico pt-5">
              <span className="tabular text-[13px] text-vinho/80">{etapa.passo}</span>
              <h3 className="display mt-2 text-[22px] text-vinho">{etapa.titulo}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-tinta/85">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24 bg-rosa-nevoa p-8 md:p-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="display max-w-[20ch] text-[26px] text-vinho md:text-[32px]">
              Onde a Carina atende
            </h2>
            <p className="mt-4 text-[15px] text-tinta">{site.endereco}</p>
            <p className="text-[15px] text-tinta/70">{site.horario}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <BotaoWhatsApp href={linkGeral()}>Falar no WhatsApp</BotaoWhatsApp>
            <Link
              href="/catalogo"
              className="eyebrow inline-flex items-center rounded-[6px] border border-vinho px-6 py-3.5 text-[12px] text-vinho transition-colors duration-200 hover:bg-vinho hover:text-perola"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
