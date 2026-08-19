import type { Metadata } from "next";

import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import SeloGarantia from "@/components/SeloGarantia";
import { site } from "@/data/site.config";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Garantia de 5 anos",
  description:
    "O que a garantia de 5 anos da Carina Melo Shop cobre, o que não cobre e como acionar. Direto ao ponto.",
  alternates: { canonical: "/garantia" },
};

const COBRE = [
  "Escurecimento ou perda do banho no uso normal do dia a dia.",
  "Falha de solda em elo, argola ou emenda.",
  "Fecho que para de travar, mola de brinco e pino que solta.",
  "Pedra que cai da cravação sem ter havido pancada.",
];

const NAO_COBRE = [
  "Peça amassada, torcida, cortada ou quebrada por pancada ou peso.",
  "Contato com cloro, água do mar, água sanitária, acetona e produto de limpeza.",
  "Perfume, álcool e creme aplicados direto sobre a peça.",
  "Banho de piscina, banho quente e academia com a peça no corpo.",
  "Conserto ou banho refeito por terceiros.",
  "Perda ou roubo da peça.",
];

const COMO_ACIONAR = [
  {
    passo: "01",
    titulo: "Mande a foto",
    texto:
      "Chame no WhatsApp com a foto da peça e o código dela. O código está na página da peça aqui no site, e também na embalagem.",
  },
  {
    passo: "02",
    titulo: "A gente avalia",
    texto:
      "A avaliação é feita aqui mesmo, em Maringá. Você não precisa mandar a peça para fora nem pagar frete para lugar nenhum.",
  },
  {
    passo: "03",
    titulo: "Reparo ou troca",
    texto:
      "Sendo caso de garantia, a peça é reparada ou trocada. Se a mesma peça tiver saído de linha, a troca é feita por outra de valor equivalente.",
  },
];

const CUIDADOS = [
  "Colocar a peça por último, depois do perfume e do creme.",
  "Tirar para dormir, para tomar banho e para entrar na água.",
  "Guardar seca, separada das outras peças, em saquinho ou flanela.",
  "Limpar só com flanela seca e macia.",
];

export default function GarantiaPage() {
  return (
    <>
      <section className="escuro bg-vinho-profundo text-perola">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-8 px-5 py-16 md:px-8 md:py-24">
          <SeloGarantia tamanho="lg" tom="perola" />
          <div>
            <p className="eyebrow text-[11px] text-rosa-nevoa">A garantia</p>
            <h1 className="display mt-4 max-w-[18ch] text-[38px] text-perola md:text-[52px]">
              Cinco anos, por escrito.
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <p className="medida-texto text-[17px] leading-relaxed text-tinta">
          Semijoia boa não é a que brilha na foto: é a que continua igual depois de dois
          anos de uso. Por isso toda peça que sai daqui tem {site.garantiaAnos} anos de
          garantia. Abaixo está exatamente o que isso quer dizer — sem letra miúda.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <section>
            <h2 className="eyebrow text-[11px] text-vinho">O que a garantia cobre</h2>
            <ul className="mt-6 border-t border-rosa-classico">
              {COBRE.map((item) => (
                <li
                  key={item}
                  className="border-b border-rosa-classico py-4 text-[15px] text-tinta"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="eyebrow text-[11px] text-vinho/80">
              O que a garantia não cobre
            </h2>
            <ul className="mt-6 border-t border-rosa-classico">
              {NAO_COBRE.map((item) => (
                <li
                  key={item}
                  className="border-b border-rosa-classico py-4 text-[15px] text-tinta/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-20">
          <h2 className="display max-w-[18ch] text-[30px] text-vinho md:text-[38px]">
            Como acionar a garantia
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {COMO_ACIONAR.map((etapa) => (
              <li key={etapa.passo} className="border-t border-rosa-classico pt-5">
                <span className="tabular text-[13px] text-vinho/80">{etapa.passo}</span>
                <h3 className="display mt-2 text-[22px] text-vinho">{etapa.titulo}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-tinta/85">
                  {etapa.texto}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 bg-rosa-nevoa p-8 md:p-12">
          <h2 className="display max-w-[22ch] text-[26px] text-vinho md:text-[32px]">
            Quatro cuidados que fazem a peça durar mais que a garantia
          </h2>
          <ul className="mt-8 border-t border-rosa-classico">
            {CUIDADOS.map((item) => (
              <li
                key={item}
                className="border-b border-rosa-classico py-4 text-[15px] text-tinta"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 flex flex-wrap items-center gap-6">
          <p className="medida-texto flex-1 text-[15px] text-tinta/85">
            Ficou com dúvida sobre a sua peça? Manda a foto que a Carina responde.
          </p>
          <BotaoWhatsApp href={linkGeral()}>Falar no WhatsApp</BotaoWhatsApp>
        </section>
      </div>
    </>
  );
}
