import Image from "next/image";
import Link from "next/link";

import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import FaixaRotativa from "@/components/FaixaRotativa";
import Moldura from "@/components/Moldura";
import ProdutoCard from "@/components/ProdutoCard";
import SeloGarantia from "@/components/SeloGarantia";
import { site } from "@/data/site.config";
import {
  getDestaques,
  getMateriais,
  getProdutoPorSlug,
  getResumoLoja,
} from "@/lib/catalogo";
import { formatarBRL } from "@/lib/preco";
import { linkGeral } from "@/lib/whatsapp";

const COBERTURA = [
  "Escurecimento e perda do banho no uso normal do dia a dia.",
  "Falha de solda, de fecho, de pino e de cravação das pedras.",
  "Peça avaliada aqui mesmo, em Maringá, sem precisar mandar para fora.",
];

/** Escada vertical das três gravuras: assimetria de propósito, não descuido. */
const DEGRAU = ["md:mt-0", "md:mt-12", "md:mt-24"];

/** Peça que aparece na foto do hero — precisa bater com o recorte em scripts/fotos.mjs. */
const PECA_DO_HERO = "trio-brinco-argola-paladio";

export default async function Home() {
  const [destaques, materiais, resumo, capa] = await Promise.all([
    getDestaques(4),
    getMateriais(),
    getResumoLoja(),
    getProdutoPorSlug(PECA_DO_HERO),
  ]);


  if (!capa) throw new Error(`Peça do hero não encontrada: ${PECA_DO_HERO}`);

  return (
    <>
      {/* ── hero ───────────────────────────────────────────────────────── */}
      <section className="escuro relative bg-vinho-profundo text-perola">
        {/* Colunas desiguais mantêm a assimetria; a foto agora é objeto emoldurado,
            e objeto emoldurado não sangra — ele fica dentro da margem. */}
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 md:grid-cols-[1fr_minmax(0,420px)] md:gap-16 md:px-8">
          <div className="flex max-w-[560px] flex-col justify-center pt-16 md:py-24">
            <p className="eyebrow text-[11px] text-rosa-nevoa">
              Semijoias · {site.cidade} · Mais de 20 anos
            </p>

            {/* A frase é dela e vem assinada com a caligrafia dela — a mesma
                assinatura da marca, no arquivo original, nunca redesenhada em fonte. */}
            <h1 className="display mt-7 text-[46px] text-perola sm:text-[58px] md:text-[68px]">
              Meu sonho é
              <br />
              realizar o seu.
            </h1>

            <Image
              src="/marca/carina-melo-perola.png"
              alt=""
              aria-hidden
              width={1200}
              height={829}
              className="mt-5 ml-1 h-auto w-40 self-start opacity-90 md:w-52"
            />

            {/* O punção carimbado sobre o fio, como selo em documento: a linha corre
                por trás dele e do texto, e reaparece à direita. É a única aparição do
                selo na home — ele já diz "5 anos", então a frase não repete o número. */}
            <div className="relative mt-14">
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 border-t border-perola/20"
              />
              <div className="relative flex items-center gap-4">
                <SeloGarantia tamanho="lg" tom="perola" />
                {/* O selo já diz "5 anos de garantia": a frase completa a sentença
                    em vez de repetir o número. Quatro palavras. */}
                <p className="display bg-vinho-profundo pr-5 text-[26px] leading-tight text-perola md:text-[30px]">
                  Toda peça, sem exceção.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="eyebrow inline-flex items-center rounded-[6px] bg-perola px-6 py-3.5 text-[12px] text-vinho-profundo transition-colors duration-200 hover:bg-rosa-nevoa"
              >
                Ver catálogo
              </Link>
              <BotaoWhatsApp href={linkGeral()} variante="claro">
                Falar no WhatsApp
              </BotaoWhatsApp>
            </div>

            <p className="mt-10 text-[13px] text-perola/65">
              {resumo.total} peças no catálogo · de {formatarBRL(resumo.precoMin)} a{" "}
              {formatarBRL(resumo.precoMax)}
            </p>
          </div>

          {/* Gravura montada: a moldura é um fio desenhado, deslocado da foto em vez
              de colado nela — a peça fica por cima, e o fio aparece em cima e à
              esquerda. Proporção fixa de propósito: com painel de altura livre, o
              object-cover recortava para dentro da pele em telas largas.
              A etiqueta embaixo usa o vocabulário do lookbook (CÓD.) e leva à peça. */}
          <div className="pb-16 md:py-20">
            <Link href={`/produto/${capa.slug}`} className="group block">
              <Moldura
                src="/img/hero.webp"
                alt={capa.alt}
                sizes="(max-width: 768px) 100vw, 420px"
                prioridade
              />

              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-perola/20 pt-3">
                <span className="display text-[19px] text-perola">{capa.nome}</span>
                <span className="eyebrow shrink-0 text-[10px] text-rosa-nevoa">
                  cód. {capa.codigo}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FaixaRotativa />

      {/* ── acabamentos ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-[11px] text-vinho/80">Escolha pelo acabamento</p>
            <h2 className="display mt-4 max-w-[16ch] text-[34px] text-vinho md:text-[40px]">
              Três banhos, três jeitos de usar.
            </h2>
          </div>
          <p className="max-w-[30ch] text-[15px] text-tinta/80">
            Quem usa dourado, quem usa prateado, e quem quer o branco.
          </p>
        </div>

        {/* Três gravuras montadas em escada, com a etiqueta embaixo do fio — a mesma
            apresentação da peça do hero. Sem gradiente escuro com texto por cima:
            o nome mora na etiqueta, não sobre a foto. */}
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {materiais.map((material, i) => (
            <Link
              key={material.id}
              href={`/catalogo?material=${material.id}`}
              className={`group block ${DEGRAU[i] ?? ""}`}
            >
              <Moldura
                src={material.capa}
                alt={`Peças em ${material.nome.toLowerCase()}`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rosa-classico pt-3">
                <h3 className="display text-[24px] text-vinho">{material.nome}</h3>
                <span className="eyebrow shrink-0 text-[10px] text-vinho/80">
                  {material.quantidade} peças
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── garantia ───────────────────────────────────────────────────── */}
      <section className="bg-rosa-nevoa">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 md:grid-cols-[auto_1fr] md:gap-16 md:px-8 md:py-24">
          <div className="flex items-start gap-5">
            <span
              className="display-italico text-vinho"
              style={{ fontSize: "clamp(96px, 18vw, 176px)", lineHeight: 0.8 }}
              aria-hidden
            >
              5
            </span>
            <span className="eyebrow pt-3 text-[12px] text-vinho">
              anos de
              <br />
              garantia
            </span>
          </div>

          <div>
            <h2 className="display max-w-[20ch] text-[30px] text-vinho md:text-[38px]">
              Cinco anos de garantia. Aqui está o que isso cobre.
            </h2>

            <ul className="mt-8 border-t border-rosa-classico">
              {COBERTURA.map((item) => (
                <li
                  key={item}
                  className="medida-texto border-b border-rosa-classico py-4 text-[15px] text-tinta"
                >
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/garantia"
              className="eyebrow mt-8 inline-flex items-center rounded-[6px] border border-vinho px-6 py-3.5 text-[12px] text-vinho transition-colors duration-200 hover:bg-vinho hover:text-perola"
            >
              Ver detalhes da garantia
            </Link>
          </div>
        </div>
      </section>

      {/* ── destaques ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[34px] text-vinho md:text-[40px]">
            Escolhidas da estação
          </h2>
          <Link
            href="/catalogo"
            className="eyebrow text-[11px] text-vinho underline-offset-4 transition-colors duration-200 hover:underline"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {destaques.map((produto, i) => (
            <ProdutoCard key={produto.id} produto={produto} prioridade={i < 2} />
          ))}
        </div>
      </section>
    </>
  );
}
