import { site } from "@/data/site.config";
import { formatarBRL } from "@/lib/preco";
import type { Produto, ProdutoResumo } from "@/lib/tipos";

function link(texto: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function linkGeral(): string {
  return link(site.mensagens.geral);
}

export function linkSemResultado(descricao?: string): string {
  const base = site.mensagens.semResultado;
  return link(descricao ? `${base} Procurei por: ${descricao}.` : base);
}

/**
 * Toda mensagem sai com o código real do catálogo da Carina, o nome e o preço.
 * Nas peças personalizáveis, o texto digitado pela cliente entra na mensagem —
 * é o que elimina o vai-e-vem de "como escreve o nome?".
 */
export function linkProduto(
  p: Produto | ProdutoResumo,
  personalizacao?: string
): string {
  const preco = formatarBRL(p.precoPromocional ?? p.preco);

  let texto = p.disponivel
    ? `Oi Carina! Vi no site a peça ${p.nome} (${p.id}) por ${preco}.`
    : `Oi Carina! Vi no site a peça ${p.nome} (${p.id}), que está esgotada. Dá para encomendar?`;

  const escrita = personalizacao?.trim();
  if (escrita) texto += ` Queria personalizada com: "${escrita}".`;

  if (p.disponivel) texto += " Ainda tem disponível?";

  return link(texto);
}
