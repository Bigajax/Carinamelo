import "server-only";

import { produtos } from "@/data/produtos";
import { aplicarFiltros, type Filtros } from "@/lib/filtros";
import {
  CATEGORIAS,
  MATERIAIS,
  NOMES_CATEGORIA,
  NOMES_MATERIAL_CURTO,
  type Categoria,
  type Material,
  type Produto,
  type ProdutoResumo,
} from "@/lib/tipos";

/**
 * Única porta de entrada do catálogo. Nenhuma página ou componente lê
 * `@/data/produtos` direto — a regra é garantida pelo `no-restricted-imports`
 * no eslint.config.mjs e pelo `server-only` acima.
 *
 * Todas as funções são async de propósito: na v2 o corpo delas vira consulta
 * ao Supabase e nenhuma tela precisa ser reescrita.
 */

export function paraResumo(p: Produto): ProdutoResumo {
  return {
    id: p.id,
    slug: p.slug,
    nome: p.nome,
    categoria: p.categoria,
    material: p.material,
    linha: p.linha,
    esporte: p.esporte,
    preco: p.preco,
    precoPromocional: p.precoPromocional,
    alt: p.alt,
    disponivel: p.disponivel,
    destaque: p.destaque,
    imagem: p.imagens[0],
  };
}

export async function getProdutos(filtros?: Filtros): Promise<ProdutoResumo[]> {
  const lista = produtos.map(paraResumo);
  return filtros ? aplicarFiltros(lista, filtros) : aplicarFiltros(lista, {});
}

export async function getProdutoPorSlug(slug: string): Promise<Produto | null> {
  return produtos.find((p) => p.slug === slug) ?? null;
}

export async function getSlugs(): Promise<string[]> {
  return produtos.map((p) => p.slug);
}

export async function getCategorias(): Promise<
  { id: Categoria; nome: string; quantidade: number }[]
> {
  return CATEGORIAS.map((id) => ({
    id,
    nome: NOMES_CATEGORIA[id],
    quantidade: produtos.filter((p) => p.categoria === id).length,
  })).filter((c) => c.quantidade > 0);
}

/**
 * Capa editorial de cada acabamento: enquadramento aberto, gerado por
 * `scripts/fotos.mjs`. Reaproveitar o recorte de produto aqui não funciona —
 * ele é fechado demais e no bloco grande da home lê como pele, não como peça.
 */
const CAPA_MATERIAL: Record<Material, string> = {
  ouro: "/img/acabamento-ouro.webp",
  ouroBranco: "/img/acabamento-ouroBranco.webp",
  paladio: "/img/acabamento-paladio.webp",
};

export async function getMateriais(): Promise<
  { id: Material; nome: string; quantidade: number; capa: string }[]
> {
  return MATERIAIS.map((id) => ({
    id,
    nome: NOMES_MATERIAL_CURTO[id],
    quantidade: produtos.filter((p) => p.material === id).length,
    capa: CAPA_MATERIAL[id],
  })).filter((m) => m.quantidade > 0);
}

export async function getDestaques(limite = 4): Promise<ProdutoResumo[]> {
  return produtos
    .filter((p) => p.destaque && p.disponivel)
    .slice(0, limite)
    .map(paraResumo);
}

export async function getRelacionados(
  produto: Produto,
  limite = 4
): Promise<ProdutoResumo[]> {
  const mesmoMaterial = produtos.filter(
    (p) => p.slug !== produto.slug && p.material === produto.material
  );
  const resto = produtos.filter(
    (p) => p.slug !== produto.slug && p.material !== produto.material
  );
  return [...mesmoMaterial, ...resto].slice(0, limite).map(paraResumo);
}

export async function getResumoLoja(): Promise<{
  total: number;
  precoMin: number;
  precoMax: number;
}> {
  const precos = produtos.map((p) => p.precoPromocional ?? p.preco);
  return {
    total: produtos.length,
    precoMin: Math.min(...precos),
    precoMax: Math.max(...precos),
  };
}
