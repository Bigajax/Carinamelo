export type Categoria =
  | "colares"
  | "brincos"
  | "pulseiras"
  | "braceletes"
  | "aneis"
  | "tornozeleiras";

/** Vocabulário da própria marca: é o que vem escrito no lookbook de cada peça. */
export type Material = "ouro" | "ouroBranco" | "paladio";

export type Linha = "classicos" | "esportes" | "personalizados";

export type Esporte = "beachTennis" | "ciclismo";

export interface Produto {
  id: string; // 'CM-9958' — o número é o código real do catálogo da Carina
  codigo: string; // '9958'
  slug: string;
  nome: string;
  categoria: Categoria;
  material: Material;
  linha: Linha;
  esporte?: Esporte;
  personalizavel: boolean;
  tipoPersonalizacao?: "nome" | "letra" | "data" | "coordenada";
  preco: number; // centavos: 21900 = R$ 219,00
  precoPromocional?: number;
  imagens: string[]; // 1 a 4, a primeira é a capa
  alt: string;
  descricao: string;
  medidas?: string;
  disponivel: boolean;
  destaque: boolean;
  tags?: string[];
}

/** Projeção enxuta: é o que atravessa a fronteira servidor → cliente. */
export type ProdutoResumo = Pick<
  Produto,
  | "id"
  | "slug"
  | "nome"
  | "categoria"
  | "material"
  | "linha"
  | "esporte"
  | "preco"
  | "precoPromocional"
  | "alt"
  | "disponivel"
  | "destaque"
> & { imagem: string };

export const NOMES_CATEGORIA: Record<Categoria, string> = {
  colares: "Colares",
  brincos: "Brincos",
  pulseiras: "Pulseiras",
  braceletes: "Braceletes",
  aneis: "Anéis",
  tornozeleiras: "Tornozeleiras",
};

export const NOMES_CATEGORIA_SINGULAR: Record<Categoria, string> = {
  colares: "Colar",
  brincos: "Brinco",
  pulseiras: "Pulseira",
  braceletes: "Bracelete",
  aneis: "Anel",
  tornozeleiras: "Tornozeleira",
};

export const NOMES_MATERIAL: Record<Material, string> = {
  ouro: "Banho em ouro",
  ouroBranco: "Banho em ouro branco",
  paladio: "Banho em paládio",
};

export const NOMES_MATERIAL_CURTO: Record<Material, string> = {
  ouro: "Ouro",
  ouroBranco: "Ouro branco",
  paladio: "Paládio",
};

export const NOMES_LINHA: Record<Linha, string> = {
  classicos: "Clássicos",
  esportes: "Esportes",
  personalizados: "Personalizados",
};

export const NOMES_ESPORTE: Record<Esporte, string> = {
  beachTennis: "Beach tennis",
  ciclismo: "Ciclismo",
};

export const CATEGORIAS: Categoria[] = [
  "colares",
  "brincos",
  "pulseiras",
  "braceletes",
  "aneis",
  "tornozeleiras",
];

export const MATERIAIS: Material[] = ["ouro", "ouroBranco", "paladio"];

export const LINHAS: Linha[] = ["classicos", "esportes", "personalizados"];
