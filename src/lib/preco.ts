import { site } from "@/data/site.config";

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** 21900 -> 'R$ 219,00' */
export function formatarBRL(centavos: number): string {
  return BRL.format(centavos / 100);
}

/** 21900 -> '219.00' (formato exigido pelo JSON-LD) */
export function precoSchema(centavos: number): string {
  return (centavos / 100).toFixed(2);
}

/**
 * 'em 3x de R$ 73,00 sem juros' — ou null quando a parcela fica abaixo do mínimo
 * configurado em site.parcelamento e a UI simplesmente não mostra nada.
 */
export function parcelamento(centavos: number): string | null {
  const { vezes, parcelaMinima } = site.parcelamento;
  if (vezes < 2) return null;

  const parcela = Math.round(centavos / vezes);
  if (parcela < parcelaMinima) return null;

  return `em ${vezes}x de ${formatarBRL(parcela)} sem juros`;
}
