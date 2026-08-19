"use client";

import { useState } from "react";

import { formatarBRL } from "@/lib/preco";
import type { Produto } from "@/lib/tipos";
import { linkProduto } from "@/lib/whatsapp";

const ROTULO: Record<NonNullable<Produto["tipoPersonalizacao"]>, string> = {
  nome: "Nome para gravar",
  letra: "Letra para gravar",
  data: "Data para gravar",
  coordenada: "Coordenada para gravar",
};

const EXEMPLO: Record<NonNullable<Produto["tipoPersonalizacao"]>, string> = {
  nome: "Ex.: Helena",
  letra: "Ex.: H",
  data: "Ex.: 12/03/2019",
  coordenada: "Ex.: 23°25'S 51°56'O",
};

/**
 * O texto digitado aqui entra dentro da mensagem do WhatsApp junto com o código
 * da peça — é o que elimina o vai-e-vem de "como escreve o nome?".
 */
export default function PedidoProduto({ produto }: { produto: Produto }) {
  const [personalizacao, setPersonalizacao] = useState("");
  const tipo = produto.tipoPersonalizacao ?? "nome";
  const href = linkProduto(produto, personalizacao);
  const rotuloBotao = produto.disponivel ? "Pedir no WhatsApp" : "Encomendar no WhatsApp";

  return (
    <>
      {produto.personalizavel && (
        <div className="mt-8 rounded-[6px] bg-rosa-nevoa p-5">
          <label htmlFor="personalizacao" className="eyebrow text-[11px] text-vinho">
            {ROTULO[tipo]}
          </label>
          <input
            id="personalizacao"
            type="text"
            maxLength={40}
            value={personalizacao}
            onChange={(e) => setPersonalizacao(e.target.value)}
            placeholder={EXEMPLO[tipo]}
            className="mt-3 w-full rounded-[6px] border border-rosa-classico bg-perola px-4 py-3 text-[15px] text-tinta placeholder:text-tinta/40"
          />
          <p className="mt-3 text-[13px] text-tinta/70">
            O que você escrever aqui vai junto na mensagem para a Carina.
          </p>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow mt-8 hidden w-full items-center justify-center rounded-[6px] bg-vinho px-6 py-4 text-[12px] text-perola transition-colors duration-200 hover:bg-vinho-profundo md:inline-flex"
      >
        {rotuloBotao}
      </a>

      {/* No mobile o CTA fica fixo no rodapé da viewport: o preço acompanha, para
          a decisão não depender de rolar de volta. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rosa-classico bg-perola/97 px-5 py-3 backdrop-blur-sm md:hidden">
        <div className="flex items-center gap-4">
          <p className="tabular shrink-0 text-[16px] text-tinta">
            {formatarBRL(produto.precoPromocional ?? produto.preco)}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow flex flex-1 items-center justify-center rounded-[6px] bg-vinho px-4 py-3.5 text-[12px] text-perola"
          >
            {rotuloBotao}
          </a>
        </div>
      </div>
    </>
  );
}
