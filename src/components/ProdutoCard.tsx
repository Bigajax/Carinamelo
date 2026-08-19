import Link from "next/link";

import Moldura from "@/components/Moldura";
import SeloGarantia from "@/components/SeloGarantia";
import { formatarBRL } from "@/lib/preco";
import { NOMES_MATERIAL_CURTO, type ProdutoResumo } from "@/lib/tipos";

/**
 * Gravura montada + etiqueta, a mesma apresentação do hero.
 *
 * O punção não flutua mais sobre a foto como adesivo: ele fica carimbado sobre o
 * fio da etiqueta, do mesmo jeito que no hero. A regra do site é essa — o punção
 * sempre aparece sobre uma linha.
 *
 * O parcelamento não entra aqui de propósito: na grade ele polui e rouba a
 * leitura do preço. Ele aparece na página da peça, onde há espaço para decidir.
 */
export default function ProdutoCard({
  produto,
  prioridade = false,
}: {
  produto: ProdutoResumo;
  prioridade?: boolean;
}) {
  const preco = produto.precoPromocional ?? produto.preco;

  return (
    <Link href={`/produto/${produto.slug}`} className="group block">
      <Moldura
        src={produto.imagem}
        alt={produto.alt}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
        proporcao="aspect-4/5"
        prioridade={prioridade}
        esmaecida={!produto.disponivel}
      >
        {!produto.disponivel && (
          <span className="eyebrow absolute left-0 top-4 bg-vinho px-3 py-1.5 text-[10px] text-perola">
            Esgotado
          </span>
        )}
      </Moldura>

      <div className="relative mt-5">
        <span aria-hidden className="absolute inset-x-0 top-0 border-t border-rosa-classico" />
        <div className="relative flex items-start justify-between gap-3 pt-3.5">
          {/* min-w-0: sem isso o nome não encolhe (mínimo automático do flex) e
              empurra o punção para fora da tela nas duas colunas do mobile. */}
          <div className="min-w-0">
            <p className="eyebrow text-[10px] text-vinho/80">
              {NOMES_MATERIAL_CURTO[produto.material]}
            </p>
            <h3 className="display mt-1 text-[19px] text-vinho">{produto.nome}</h3>
            <p className="tabular mt-1 text-[15px] text-tinta">{formatarBRL(preco)}</p>
          </div>
          {/* Carimbado sobre o fio: o selo é opaco e a linha passa por trás dele. */}
          <SeloGarantia tamanho="sm" className="-mt-[22px]" />
        </div>
      </div>
    </Link>
  );
}
