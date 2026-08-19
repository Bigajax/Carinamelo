"use client";

import type { Filtros, Ordem } from "@/lib/filtros";
import {
  CATEGORIAS,
  MATERIAIS,
  NOMES_CATEGORIA,
  NOMES_ESPORTE,
  NOMES_LINHA,
  NOMES_MATERIAL,
  type Esporte,
  type Linha,
  type Material,
} from "@/lib/tipos";

const ESPORTES: Esporte[] = ["beachTennis", "ciclismo"];

const chip = (ativo: boolean) =>
  `eyebrow rounded-full border px-4 py-2 text-[11px] transition-colors duration-200 ${
    ativo
      ? "border-vinho bg-vinho text-perola"
      : "border-rosa-classico text-tinta hover:border-vinho hover:text-vinho"
  }`;

const campo =
  "rounded-[6px] border border-rosa-classico bg-perola px-3 py-2 text-[13px] text-tinta";

export default function FiltroBarra({
  filtros,
  linhasDisponiveis,
  total,
  aoMudar,
  aoLimpar,
}: {
  filtros: Filtros;
  linhasDisponiveis: Linha[];
  total: number;
  aoMudar: (parcial: Partial<Filtros>) => void;
  aoLimpar: () => void;
}) {
  const alterna = <T,>(atual: T | undefined, valor: T) =>
    atual === valor ? undefined : valor;

  return (
    <div className="sticky top-[101px] z-30 border-b border-rosa-classico bg-perola/95 backdrop-blur-sm md:top-[85px]">
      <div className="mx-auto max-w-[1240px] space-y-3 px-5 py-4 md:px-8">
        {linhasDisponiveis.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {linhasDisponiveis.map((linha) => (
              <button
                key={linha}
                type="button"
                onClick={() => aoMudar({ linha: alterna(filtros.linha, linha), esporte: undefined })}
                aria-pressed={filtros.linha === linha}
                className={chip(filtros.linha === linha)}
              >
                {NOMES_LINHA[linha]}
              </button>
            ))}
          </div>
        )}

        {/* Sub-filtro de esporte só existe dentro da linha esportes. */}
        {filtros.linha === "esportes" && (
          <div className="flex flex-wrap gap-2">
            {ESPORTES.map((esporte) => (
              <button
                key={esporte}
                type="button"
                onClick={() => aoMudar({ esporte: alterna(filtros.esporte, esporte) })}
                aria-pressed={filtros.esporte === esporte}
                className={chip(filtros.esporte === esporte)}
              >
                {NOMES_ESPORTE[esporte]}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => aoMudar({ categoria: alterna(filtros.categoria, categoria) })}
              aria-pressed={filtros.categoria === categoria}
              className={chip(filtros.categoria === categoria)}
            >
              {NOMES_CATEGORIA[categoria]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2">
            <span className="sr-only">Acabamento</span>
            <select
              className={campo}
              value={filtros.material ?? ""}
              onChange={(e) =>
                aoMudar({ material: (e.target.value || undefined) as Material | undefined })
              }
            >
              <option value="">Todos os acabamentos</option>
              {MATERIAIS.map((m) => (
                <option key={m} value={m}>
                  {NOMES_MATERIAL[m]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="sr-only">Preço máximo</span>
            <select
              className={campo}
              value={filtros.precoMax ?? ""}
              onChange={(e) =>
                aoMudar({ precoMax: e.target.value ? Number(e.target.value) : undefined })
              }
            >
              <option value="">Qualquer preço</option>
              <option value="10000">Até R$ 100</option>
              <option value="20000">Até R$ 200</option>
              <option value="30000">Até R$ 300</option>
              <option value="40000">Até R$ 400</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="sr-only">Ordenar por</span>
            <select
              className={campo}
              value={filtros.ordem ?? "relevancia"}
              onChange={(e) => aoMudar({ ordem: e.target.value as Ordem })}
            >
              <option value="relevancia">Relevância</option>
              <option value="menorPreco">Menor preço</option>
              <option value="maiorPreco">Maior preço</option>
            </select>
          </label>

          <label className="flex w-full items-center gap-2 md:min-w-[180px] md:flex-1">
            <span className="sr-only">Buscar peça</span>
            <input
              type="search"
              placeholder="Buscar peça"
              className={`${campo} w-full`}
              value={filtros.busca ?? ""}
              onChange={(e) => aoMudar({ busca: e.target.value || undefined })}
            />
          </label>

          {/* No mobile o contador e o "limpar" dividem uma linha só, em vez de
              cair cada um na sua e esticar a barra fixa. */}
          <div className="flex w-full items-center justify-between gap-3 md:w-auto">
            <p className="tabular text-[13px] text-tinta/70">
              {total} {total === 1 ? "peça" : "peças"}
            </p>

            <button
              type="button"
              onClick={aoLimpar}
              className="eyebrow text-[11px] text-vinho underline-offset-4 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
