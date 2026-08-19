"use client";

import { useEffect, useMemo, useState } from "react";

import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import FiltroBarra from "@/components/FiltroBarra";
import ProdutoCard from "@/components/ProdutoCard";
import {
  aplicarFiltros,
  descreverFiltros,
  toQueryString,
  type Filtros,
} from "@/lib/filtros";
import type { Linha, ProdutoResumo } from "@/lib/tipos";
import { linkSemResultado } from "@/lib/whatsapp";

/**
 * O servidor já entrega a grade filtrada a partir dos searchParams. Aqui a
 * filtragem é refeita localmente para a interação ser instantânea, e a URL é
 * reescrita com replaceState: o link filtrado continua colável no story e no
 * WhatsApp sem provocar navegação.
 */
export default function CatalogoView({
  produtos,
  filtrosIniciais,
  linhasDisponiveis,
}: {
  produtos: ProdutoResumo[];
  filtrosIniciais: Filtros;
  linhasDisponiveis: Linha[];
}) {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);

  const lista = useMemo(() => aplicarFiltros(produtos, filtros), [produtos, filtros]);

  useEffect(() => {
    const query = toQueryString(filtros);
    const destino = query ? `/catalogo?${query}` : "/catalogo";
    if (destino !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, "", destino);
    }
  }, [filtros]);

  const aoMudar = (parcial: Partial<Filtros>) =>
    setFiltros((atual) => ({ ...atual, ...parcial }));

  const aoLimpar = () => setFiltros({});

  return (
    <>
      <FiltroBarra
        filtros={filtros}
        linhasDisponiveis={linhasDisponiveis}
        total={lista.length}
        aoMudar={aoMudar}
        aoLimpar={aoLimpar}
      />

      <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        {lista.length > 0 ? (
          <>
            {/* Mantém a hierarquia h1 → h2 → h3 dos cards, sem título visível
                competindo com o cabeçalho da página. */}
            <h2 className="sr-only">Peças encontradas</h2>
            <div className="surgir grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {lista.map((produto, i) => (
              <ProdutoCard key={produto.id} produto={produto} prioridade={i < 4} />
            ))}
            </div>
          </>
        ) : (
          <div className="border-t border-rosa-classico py-16">
            <p className="display max-w-[24ch] text-[28px] text-vinho">
              Nenhuma peça com esses filtros.
            </p>
            <p className="medida-texto mt-4 text-[15px] text-tinta/80">
              Limpe os filtros ou chame no WhatsApp que a gente procura para você.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={aoLimpar}
                className="eyebrow rounded-[6px] border border-vinho px-6 py-3.5 text-[12px] text-vinho transition-colors duration-200 hover:bg-vinho hover:text-perola"
              >
                Limpar filtros
              </button>
              <BotaoWhatsApp href={linkSemResultado(descreverFiltros(filtros))}>
                Chamar no WhatsApp
              </BotaoWhatsApp>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
