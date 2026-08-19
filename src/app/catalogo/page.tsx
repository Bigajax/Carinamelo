import type { Metadata } from "next";

import CatalogoView from "@/components/CatalogoView";
import { getProdutos } from "@/lib/catalogo";
import { parseFiltros, temFiltro } from "@/lib/filtros";
import { LINHAS, type Linha } from "@/lib/tipos";

type Busca = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Busca;
}): Promise<Metadata> {
  const filtros = parseFiltros(await searchParams);

  return {
    title: "Catálogo",
    description:
      "Colares, brincos, pulseiras, braceletes, anéis e tornozeleiras em banho de ouro, ouro branco e paládio. Toda peça com garantia de 5 anos.",
    alternates: { canonical: "/catalogo" },
    // Combinação de filtros não vira página indexável: evita conteúdo duplicado.
    robots: temFiltro(filtros) ? { index: false, follow: true } : undefined,
  };
}

export default async function CatalogoPage({ searchParams }: { searchParams: Busca }) {
  const filtros = parseFiltros(await searchParams);
  const todos = await getProdutos();

  // Só entram as linhas que realmente têm peça hoje — sem chip que leva a lugar nenhum.
  const linhasDisponiveis: Linha[] = LINHAS.filter((linha) =>
    todos.some((p) => p.linha === linha)
  );

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-5 pb-8 pt-12 md:px-8 md:pt-16">
        <p className="eyebrow text-[11px] text-vinho/80">
          {todos.length} peças · garantia de 5 anos
        </p>
        <h1 className="display mt-4 max-w-[14ch] text-[38px] text-vinho md:text-[52px]">
          O catálogo inteiro.
        </h1>
      </section>

      <CatalogoView
        produtos={todos}
        filtrosIniciais={filtros}
        linhasDisponiveis={linhasDisponiveis}
      />
    </>
  );
}
