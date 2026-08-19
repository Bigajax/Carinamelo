# Pendências — Carina Melo Shop v1

O site está completo e no ar localmente com **24 peças reais**. Tudo o que está
listado aqui depende de informação que só a Carina tem. Nada foi inventado para
tapar buraco: onde faltou dado, o campo ficou vazio ou o recurso ficou desligado.

---

## 1. Bloqueia a publicação

| O que | Onde muda | Situação |
|---|---|---|
| **WhatsApp comercial** | `.env.local` → `NEXT_PUBLIC_WHATSAPP` | Placeholder `5544999999999`. O contato público citado no briefing é **(43) 99832-0102**, mas 43 é DDD de Londrina e a loja é de Maringá (44). Confirmar antes de publicar. |
| **Texto oficial da garantia** | `src/app/garantia/page.tsx` | A página está escrita e pronta, mas o conteúdo é um **rascunho** montado a partir do que a marca divulga publicamente mais a estrutura padrão do setor. É um compromisso comercial: a Carina precisa ler e aprovar cada linha antes de ir ao ar. |
| **Endereço e horário** | `src/data/site.config.ts` → `endereco`, `horario` | Hoje só diz "Maringá · Paraná" e "Atendimento por WhatsApp". |
| **Domínio** | `.env.local` → `NEXT_PUBLIC_SITE_URL` | Está `https://carinamelo.shop`, provisório. Ele alimenta canonical, sitemap e JSON-LD. |

---

## 2. Decisão de negócio

**Canonical e a loja atual.** A `carinameloshop.com.br` continua no ar com o mesmo
catálogo, e a Netshoes também. Hoje este site declara canonical próprio, ou seja,
os dois domínios competem entre si no Google pelos mesmos produtos.

As opções são: (a) apontar o canonical desta vitrine para a loja principal — ela
some do buscador e vive só do tráfego de Instagram/WhatsApp, que é para o que foi
feita; (b) manter como está e aceitar a competição; (c) migrar o catálogo para cá.
A escolha é da Carina. Onde muda: `alternates.canonical` em `src/app/layout.tsx`.

**Preço entre canais.** Se o preço aqui divergir da loja ou da Netshoes, a cliente
compara e a marca perde. Vale conferir os 24 códigos antes de publicar.

---

## 3. Dados que faltam nas peças

Vieram do lookbook: nome, categoria, acabamento, **código real** e **preço real**.
Não vieram:

- **Medidas** — nenhuma peça tem. O campo `medidas` existe em `src/data/produtos.ts`
  e a página do produto já mostra a linha assim que ele for preenchido.
- **Estoque** — todas estão com `disponivel: true` porque não há dado real. Marcar
  uma peça como esgotada sem saber custaria uma venda. O estado "Esgotado" já está
  construído (foto a 60%, faixa, card continua clicável, mensagem vira encomenda):
  basta trocar o booleano.
- **Personalização** — todas com `personalizavel: false`. O recurso está pronto e
  testado: quando `personalizavel: true` e `tipoPersonalizacao: "nome" | "letra" |
  "data" | "coordenada"`, aparece o campo e o que a cliente digita entra dentro da
  mensagem do WhatsApp junto com o código. Falta a Carina dizer **quais códigos**
  aceitam gravação.
- **Aço inox** — o briefing cita, mas nenhuma peça do lookbook é de aço. O tipo
  `Material` cobre hoje só o que existe de verdade: ouro, ouro branco e paládio.

---

## 4. Linhas esportes e personalizados

O briefing tratava as três linhas (clássicos / esportes / personalizados) como o
eixo de organização da home. **Não existe uma foto sequer de beach tennis, ciclismo
ou peça personalizada** no material publicado — as 24 peças são todas clássicos.

Por isso a home organiza por **acabamento** (ouro, ouro branco, paládio), que é um
eixo real, visível na foto e escrito no lookbook. A arquitetura das linhas continua
inteira no código: o campo `linha`, o filtro, o sub-filtro de esporte que só aparece
com `linha=esportes` ativa. Os chips de linha ficam escondidos enquanto só existir
uma linha com peça — e voltam sozinhos quando a segunda aparecer.

**Para reativar:** mandar fotos das peças de esporte e personalizados. É o
diferencial da marca e é justamente onde falta imagem.

---

## 5. Fotos

As 24 imagens saíram do lookbook publicado no Facebook, em 1131×1508. Cada peça foi
recortada em 4:5 fechando o enquadramento na joia, de propósito, para deixar de fora
o código e o preço que vêm gravados na arte — quem informa preço é o catálogo, não a
imagem. Algumas peças pequenas (brincos, anéis) ficaram no limite da resolução.

**O ideal é pedir à Carina o arquivo original das fotos, sem a arte por cima.** Com
isso, `scripts/fotos.mjs` regenera tudo com folga de resolução e enquadramento.

Pipeline, se as fotos novas chegarem:

```bash
node scripts/logo.mjs      # assinatura -> PNG transparente (vinho e pérola)
node scripts/fotos.mjs     # recorta as 24 peças + hero + capas + OG
node scripts/grade.mjs public/img scripts/_contato.jpg 5 300   # folha de contato
```

A folha de contato é obrigatória depois de qualquer lote novo: é o que impede
publicar a foto errada no produto errado.

---

## 6. Parcelamento

A marca anuncia **3x sem juros em todas as peças**, e é isso que o site mostra —
os valores batem exatamente com o que está impresso em cada foto do lookbook
(ex.: o colar de R$ 249,00 mostra "3x de R$ 83,00", igual à arte original).

O briefing pedia outra regra (até 12x, parcela mínima de R$ 30, sumindo abaixo de
R$ 300). Com ela, 19 das 24 peças ficariam **sem** parcelamento na tela enquanto a
foto ao lado anuncia 3x — por isso segui a política real da marca.

Trocar é uma linha em `src/data/site.config.ts`:

```ts
parcelamento: { vezes: 12, parcelaMinima: 3000 },
```

A UI acompanha sozinha: abaixo do mínimo, `parcelamento()` devolve `null` e a
linha simplesmente não aparece.

---

## 7. Logo

A assinatura foi extraída da foto de perfil do Facebook em 2048×2048 e vetorizada
em máscara alfa, gerando `public/marca/carina-melo-vinho.png` e
`carina-melo-perola.png`. Está limpa e serve para web em qualquer tamanho usado
hoje. **Se existir o arquivo vetorial original (AI/SVG/PDF), vale trocar** — é o
que garante nitidez em impressão e em telas futuras.
