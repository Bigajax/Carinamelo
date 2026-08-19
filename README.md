# Carina Melo Shop — catálogo digital

Vitrine de semijoias de Maringá/PR, com garantia de 5 anos. Faz uma coisa só:
transformar o tráfego de Instagram e WhatsApp em pedido identificado, sem cadastro,
sem carrinho e sem checkout.

A cliente escolhe a peça e chega no WhatsApp da Carina com nome, código real do
estoque e preço já na mensagem.

**Antes de publicar, leia [PENDENCIAS.md](./PENDENCIAS.md).** O WhatsApp ainda é
placeholder e o texto da garantia precisa da aprovação dela.

---

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
npm run lint
```

`.env.local`:

```
NEXT_PUBLIC_WHATSAPP=5544999999999      # placeholder — ver PENDENCIAS.md
NEXT_PUBLIC_SITE_URL=https://carinamelo.shop
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · `next/font` ·
`sharp` só nos scripts de imagem · deploy Vercel.

## Estrutura

```
_raw-fb/            fotos originais do Facebook (fora do git)
scripts/            pipeline de imagem: logo, recortes, folha de contato
public/img/         24 peças em 4:5 + hero + capas de acabamento + OG
public/marca/       assinatura em PNG transparente (vinho e pérola)
src/
  app/              / · /catalogo · /produto/[slug] · /garantia · /sobre
  components/
  data/             produtos.ts (24 peças) · site.config.ts
  lib/              catalogo.ts · tipos.ts · filtros.ts · preco.ts · whatsapp.ts
```

## A regra que não se quebra

**Nenhuma página ou componente importa `src/data/produtos.ts`.** Todo acesso ao
catálogo passa por `src/lib/catalogo.ts`, cujas funções já são todas `async`.

Duas travas reais garantem isso:

- `import "server-only"` no topo de `lib/catalogo.ts` — quebra o build se os dados
  vazarem para o cliente;
- `no-restricted-imports` no `eslint.config.mjs`, barrando `@/data/produtos` dentro
  de `src/app/**` e `src/components/**`.

É o que torna a v2 (estoque e preço em Supabase, painel em `/admin`) uma troca do
miolo daquelas funções, sem reescrever nenhuma tela.

## Design

Cartela da cliente (rose/wine) mais dois neutros derivados, porque quatro tons
rosados chapados não sustentam uma interface inteira:

| Token | Hex | Papel |
|---|---|---|
| `perola` | `#F5F0ED` | fundo padrão |
| `rosaNevoa` | `#F9D0D6` | faixa rotativa, blocos de apoio |
| `rosaClassico` | `#DA9EA6` | hairlines e bordas |
| `vinho` | `#6A0B23` | títulos, CTA, punção |
| `vinhoProfundo` | `#3D0715` | hero e rodapé (derivado) |
| `tinta` | `#2B1A1F` | texto corrido (derivado) |

Sem metal na paleta, de propósito: o brilho vem da foto da peça, não da interface.

Bodoni Moda no display, Manrope no texto e nos preços (`tabular-nums`). **O itálico
da Bodoni aparece em um lugar só no site inteiro: o nome da peça na página do
produto.**

**Elemento-assinatura: o punção de 5 anos.** Em joalheria, o punção é a marca
cravada por dentro do aro. A garantia de 5 anos é o argumento comercial mais forte
da marca e só existia em texto de bio — aqui virou objeto gráfico com esse
vocabulário (`src/components/SeloGarantia.tsx`). Chapado, sem gradiente e sem metal:
cara de carimbo em certificado. É o único elemento decorativo do projeto.

⚠️ Tailwind v4: classe própria escrita depois do `@import "tailwindcss"` tem a mesma
especificidade das utilitárias e **a ordem no arquivo decide**. Por isso as classes
de identidade em `globals.css` declaram só fundo, cor e tipografia — nunca
`position`, `display`, `width`, `margin` ou `font-size`.

## Scripts de imagem

```bash
node scripts/logo.mjs                                   # assinatura -> PNG transparente
node scripts/fotos.mjs                                  # 24 peças + hero + capas + OG
node scripts/grade.mjs public/img saida.jpg 5 300       # folha de contato rotulada
node scripts/carimbar.mjs _raw-fb saida/ id1,id2        # carimba o id dentro da foto
```

Depois de qualquer lote novo de foto, gere a folha de contato e confira antes de
dar o mapeamento como certo.
