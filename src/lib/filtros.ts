import {
  CATEGORIAS,
  LINHAS,
  MATERIAIS,
  NOMES_CATEGORIA,
  NOMES_MATERIAL,
  type Categoria,
  type Esporte,
  type Linha,
  type Material,
  type ProdutoResumo,
} from "@/lib/tipos";

export type Ordem = "relevancia" | "menorPreco" | "maiorPreco";

export interface Filtros {
  linha?: Linha;
  categoria?: Categoria;
  material?: Material;
  esporte?: Esporte;
  precoMax?: number; // centavos
  busca?: string;
  ordem?: Ordem;
}

const ESPORTES: Esporte[] = ["beachTennis", "ciclismo"];
const ORDENS: Ordem[] = ["relevancia", "menorPreco", "maiorPreco"];

const umDe = <T extends string>(lista: readonly T[], valor: unknown): T | undefined =>
  typeof valor === "string" && (lista as readonly string[]).includes(valor)
    ? (valor as T)
    : undefined;

const primeiro = (valor: string | string[] | undefined): string | undefined =>
  Array.isArray(valor) ? valor[0] : valor;

/** Lê os searchParams descartando qualquer valor inválido, sem lançar erro. */
export function parseFiltros(
  params: Record<string, string | string[] | undefined>
): Filtros {
  const precoMax = Number(primeiro(params.precoMax));
  const busca = primeiro(params.busca)?.trim();

  const filtros: Filtros = {
    linha: umDe(LINHAS, primeiro(params.linha)),
    categoria: umDe(CATEGORIAS, primeiro(params.categoria)),
    material: umDe(MATERIAIS, primeiro(params.material)),
    esporte: umDe(ESPORTES, primeiro(params.esporte)),
    precoMax: Number.isFinite(precoMax) && precoMax > 0 ? precoMax : undefined,
    busca: busca || undefined,
    ordem: umDe(ORDENS, primeiro(params.ordem)),
  };

  // Sub-filtro de esporte só existe dentro da linha esportes.
  if (filtros.linha !== "esportes") delete filtros.esporte;

  return filtros;
}

export function toQueryString(f: Filtros): string {
  const p = new URLSearchParams();
  if (f.linha) p.set("linha", f.linha);
  if (f.categoria) p.set("categoria", f.categoria);
  if (f.material) p.set("material", f.material);
  if (f.linha === "esportes" && f.esporte) p.set("esporte", f.esporte);
  if (f.precoMax) p.set("precoMax", String(f.precoMax));
  if (f.busca) p.set("busca", f.busca);
  if (f.ordem && f.ordem !== "relevancia") p.set("ordem", f.ordem);
  return p.toString();
}

export function temFiltro(f: Filtros): boolean {
  return Boolean(
    f.linha || f.categoria || f.material || f.esporte || f.precoMax || f.busca
  );
}

const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Mesmo filtro no servidor e no cliente — a lista renderizada nunca diverge da URL. */
export function aplicarFiltros<T extends ProdutoResumo>(lista: T[], f: Filtros): T[] {
  let saida = lista;

  if (f.linha) saida = saida.filter((p) => p.linha === f.linha);
  if (f.categoria) saida = saida.filter((p) => p.categoria === f.categoria);
  if (f.material) saida = saida.filter((p) => p.material === f.material);
  if (f.esporte) saida = saida.filter((p) => p.esporte === f.esporte);
  if (f.precoMax) saida = saida.filter((p) => (p.precoPromocional ?? p.preco) <= f.precoMax!);

  if (f.busca) {
    const termo = normalizar(f.busca);
    saida = saida.filter((p) => normalizar(p.nome).includes(termo));
  }

  const preco = (p: T) => p.precoPromocional ?? p.preco;

  if (f.ordem === "menorPreco") saida = [...saida].sort((a, b) => preco(a) - preco(b));
  else if (f.ordem === "maiorPreco") saida = [...saida].sort((a, b) => preco(b) - preco(a));
  else
    saida = [...saida].sort((a, b) => {
      if (a.disponivel !== b.disponivel) return a.disponivel ? -1 : 1;
      if (a.destaque !== b.destaque) return a.destaque ? -1 : 1;
      return 0;
    });

  return saida;
}

/**
 * Vira texto na mensagem do WhatsApp quando a busca não devolve nada.
 * Sempre com os nomes que a cliente lê na tela — nunca a chave do enum.
 */
export function descreverFiltros(f: Filtros): string {
  const partes: string[] = [];
  if (f.busca) partes.push(`"${f.busca}"`);
  if (f.categoria) partes.push(NOMES_CATEGORIA[f.categoria].toLowerCase());
  if (f.material) partes.push(NOMES_MATERIAL[f.material].toLowerCase());
  if (f.precoMax) partes.push(`até R$ ${Math.round(f.precoMax / 100)}`);
  return partes.join(", ");
}
