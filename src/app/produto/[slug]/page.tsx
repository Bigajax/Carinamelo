import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import GaleriaProduto from "@/components/GaleriaProduto";
import PedidoProduto from "@/components/PedidoProduto";
import ProdutoCard from "@/components/ProdutoCard";
import SeloGarantia from "@/components/SeloGarantia";
import { site } from "@/data/site.config";
import { getProdutoPorSlug, getRelacionados, getSlugs } from "@/lib/catalogo";
import { formatarBRL, parcelamento, precoSchema } from "@/lib/preco";
import {
  NOMES_CATEGORIA_SINGULAR,
  NOMES_MATERIAL,
  NOMES_MATERIAL_CURTO,
} from "@/lib/tipos";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug);
  if (!produto) return {};

  const preco = formatarBRL(produto.precoPromocional ?? produto.preco);

  return {
    title: `${produto.nome} — ${preco}`,
    description: produto.descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: {
      title: `${produto.nome} — ${preco} | ${site.nome}`,
      description: produto.descricao,
      images: [{ url: produto.imagens[0], width: 800, height: 1000, alt: produto.alt }],
    },
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug);
  if (!produto) notFound();

  const relacionados = await getRelacionados(produto, 4);
  const preco = produto.precoPromocional ?? produto.preco;
  const emParcelas = parcelamento(preco);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    sku: produto.codigo,
    description: produto.descricao,
    image: `${site.url}${produto.imagens[0]}`,
    brand: { "@type": "Brand", name: site.nome },
    material: NOMES_MATERIAL[produto.material],
    offers: {
      "@type": "Offer",
      url: `${site.url}/produto/${produto.slug}`,
      price: precoSchema(preco),
      priceCurrency: "BRL",
      availability: produto.disponivel
        ? "https://schema.org/InStock"
        : "https://schema.org/BackOrder",
    },
  };

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-5 pb-32 pt-8 md:px-8 md:pb-24 md:pt-12">
        <nav aria-label="Você está aqui" className="eyebrow text-[10px] text-vinho/80">
          <Link href="/catalogo" className="transition-colors hover:text-vinho">
            Catálogo
          </Link>
          <span className="px-2">/</span>
          <Link
            href={`/catalogo?categoria=${produto.categoria}`}
            className="transition-colors hover:text-vinho"
          >
            {NOMES_CATEGORIA_SINGULAR[produto.categoria]}
          </Link>
        </nav>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-16">
          <GaleriaProduto
            imagens={produto.imagens}
            alt={produto.alt}
            nome={produto.nome}
          />

          <div className="md:pt-4">
            <p className="eyebrow text-[11px] text-vinho/80">
              {NOMES_CATEGORIA_SINGULAR[produto.categoria]} ·{" "}
              {NOMES_MATERIAL_CURTO[produto.material]}
            </p>

            {/* O único itálico da Bodoni no site inteiro. */}
            <h1 className="display-italico mt-3 text-[34px] text-vinho md:text-[40px]">
              {produto.nome}
            </h1>

            <p className="tabular mt-5 text-[28px] text-tinta">{formatarBRL(preco)}</p>
            {emParcelas && <p className="mt-1 text-[14px] text-tinta/70">{emParcelas}</p>}

            {!produto.disponivel && (
              <p className="eyebrow mt-4 inline-flex rounded-full bg-vinho px-3 py-1.5 text-[10px] text-perola">
                Esgotado — dá para encomendar
              </p>
            )}

            <hr className="my-8 border-rosa-classico" />

            <p className="medida-texto text-[15px] leading-relaxed text-tinta">
              {produto.descricao}
            </p>

            <dl className="mt-6 space-y-2 text-[14px] text-tinta/80">
              <div className="flex gap-2">
                <dt className="text-tinta/70">Acabamento:</dt>
                <dd>{NOMES_MATERIAL[produto.material]}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-tinta/70">Código:</dt>
                <dd className="tabular">{produto.codigo}</dd>
              </div>
              {produto.medidas && (
                <div className="flex gap-2">
                  <dt className="text-tinta/70">Medidas:</dt>
                  <dd>{produto.medidas}</dd>
                </div>
              )}
            </dl>

            <PedidoProduto produto={produto} />

            <div className="mt-10 flex items-center gap-5 border-t border-rosa-classico pt-8">
              <SeloGarantia tamanho="lg" />
              <div>
                <p className="display text-[20px] text-vinho">
                  Garantia de {site.garantiaAnos} anos
                </p>
                <Link
                  href="/garantia"
                  className="mt-1 inline-block text-[14px] text-tinta/80 underline-offset-4 hover:underline"
                >
                  Ver o que a garantia cobre
                </Link>
              </div>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="mt-20 md:mt-28">
            <h2 className="eyebrow text-[11px] text-vinho/80">
              Peças do mesmo acabamento
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-14 md:grid-cols-4">
              {relacionados.map((p) => (
                <ProdutoCard key={p.id} produto={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
