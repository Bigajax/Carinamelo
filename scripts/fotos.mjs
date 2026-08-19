// Recorta cada peça do lookbook do Facebook em 4:5 (1000x1250) para public/img.
// As fotos originais trazem mais de uma peça por página, por isso o recorte é por PRODUTO,
// nao por arquivo: cada entrada aponta o centro da peca e o quanto da foto entra no quadro.
//
// caixa = { foto, cx, cy, h }
//   cx, cy = centro do recorte, em fração da largura/altura da foto original
//   h      = altura do recorte, em fração da altura original (a largura sai de 4:5)
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const ORIGEM = "_raw-fb";
const DESTINO = "public/img";
const LARGURA = 800;
const ALTURA = 1000;

mkdirSync(DESTINO, { recursive: true });

// Enquadramento fechado na peça, deixando de fora o código e o preço que o lookbook
// traz gravados na foto: quem informa o preço é o catálogo, não a imagem.
export const RECORTES = {
  // --- banho em ouro ---
  "brinco-coracao-liso-ouro": { foto: "1451309823688186", cx: 0.465, cy: 0.52, h: 0.18 },
  "brinco-coracao-cravejado-ouro": { foto: "1451309823688186", cx: 0.575, cy: 0.6, h: 0.18 },
  "colar-elo-portugues-ouro": { foto: "1451309833688185", cx: 0.22, cy: 0.58, h: 0.16 },
  "colar-esfera-ouro": { foto: "1451309833688185", cx: 0.72, cy: 0.77, h: 0.18 },
  "anel-meia-alianca-cravejada-ouro": {
    foto: "1451309790354856",
    cx: 0.52,
    cy: 0.49,
    h: 0.15,
  },
  "pulseira-elos-facetados-ouro": { foto: "1451309777021524", cx: 0.6, cy: 0.62, h: 0.16 },
  "bracelete-ondas-ouro": { foto: "1451309827021519", cx: 0.5, cy: 0.83, h: 0.26 },
  "colar-gravatinha-ouro": { foto: "1451309797021522", cx: 0.57, cy: 0.6, h: 0.16 },
  "pulseira-flor-cravejada-ouro": { foto: "1451309803688188", cx: 0.53, cy: 0.44, h: 0.2 },
  "colar-escapulario-ouro": { foto: "1451309787021523", cx: 0.6, cy: 0.85, h: 0.22 },
  "colar-divino-perolas-ouro": { foto: "1451309837021518", cx: 0.6, cy: 0.5, h: 0.21 },
  "duplinha-brinco-ponto-de-luz-ouro": { foto: "1451309830354852", cx: 0.45, cy: 0.42, h: 0.18 },
  "brinco-perola-ouro": { foto: "1451309830354852", cx: 0.5, cy: 0.5, h: 0.15 },
  "anel-alianca-cravejada-ouro": { foto: "1451309783688190", cx: 0.42, cy: 0.415, h: 0.18 },
  "anel-perola-pendente-ouro": { foto: "1451309783688190", cx: 0.51, cy: 0.71, h: 0.18 },
  "pulseira-riviera-flores-ouro": { foto: "1451309817021520", cx: 0.575, cy: 0.475, h: 0.18 },
  "duplinha-brinco-perolas-ouro": { foto: "1451309807021521", cx: 0.5, cy: 0.42, h: 0.15 },
  // --- banho em ouro branco ---
  "colar-no-perola-ouro-branco": { foto: "1451309840354851", cx: 0.56, cy: 0.615, h: 0.18 },
  "brinco-elo-marinho-ouro-branco": { foto: "1451309807021521", cx: 0.53, cy: 0.48, h: 0.16 },
  // --- banho em paladio ---
  "bracelete-ondas-paladio": { foto: "1451309810354854", cx: 0.56, cy: 0.4, h: 0.18 },
  "anel-cravejado-paladio": { foto: "1451309810354854", cx: 0.27, cy: 0.69, h: 0.18 },
  "colar-duplo-elo-esfera-paladio": { foto: "1451309793688189", cx: 0.55, cy: 0.7, h: 0.24 },
  "trio-brinco-argola-paladio": { foto: "1451309820354853", cx: 0.49, cy: 0.465, h: 0.18 },
  "tornozeleira-ponto-de-luz-paladio": { foto: "1451309780354857", cx: 0.33, cy: 0.5, h: 0.18 },
};

const limitar = (valor, minimo, maximo) => Math.max(minimo, Math.min(maximo, valor));

for (const [slug, caixa] of Object.entries(RECORTES)) {
  const origem = sharp(`${ORIGEM}/${caixa.foto}.jpg`);
  const { width: W, height: H } = await origem.metadata();

  const alturaPx = Math.round(caixa.h * H);
  const larguraPx = Math.round((alturaPx * LARGURA) / ALTURA);

  const esquerda = limitar(Math.round(caixa.cx * W - larguraPx / 2), 0, W - larguraPx);
  const topo = limitar(Math.round(caixa.cy * H - alturaPx / 2), 0, H - alturaPx);

  await origem
    .extract({ left: esquerda, top: topo, width: larguraPx, height: alturaPx })
    .resize(LARGURA, ALTURA, { fit: "cover", kernel: "lanczos3" })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 84 })
    .toFile(`${DESTINO}/${slug}.webp`);
}

console.log(`${Object.keys(RECORTES).length} pecas recortadas -> ${DESTINO}`);

// Imagens editoriais: enquadramento aberto, para painel grande e OG.
const EDITORIAIS = {
  // Retrato 3:4 fechado no trio de brinco: fundo escuro, peça gráfica e nenhum
  // texto gravado. A proporção é fixa de propósito — com painel de altura livre,
  // o object-cover recortava para dentro da pele em telas largas.
  hero: { foto: "1451309820354853", cx: 0.48, cy: 0.375, h: 0.4, w: 900, a: 1200 },
  og: { foto: "1451309823688186", cx: 0.5, cy: 0.42, h: 0.4, w: 1200, a: 630 },
  // Capas de acabamento em 3:4, na mesma moldura do hero. Escolhidas para que a
  // peça leia de longe: cada uma diz sozinha 'isto e ouro / branco / paladio'.
  'acabamento-ouro': { foto: '1451309837021518', cx: 0.58, cy: 0.4, h: 0.4, w: 760, a: 1013 },
  'acabamento-ouroBranco': { foto: '1451309807021521', cx: 0.57, cy: 0.42, h: 0.3, w: 760, a: 1013 },
  'acabamento-paladio': { foto: '1451309810354854', cx: 0.58, cy: 0.48, h: 0.34, w: 760, a: 1013 },
};

for (const [nome, caixa] of Object.entries(EDITORIAIS)) {
  const origem = sharp(`${ORIGEM}/${caixa.foto}.jpg`);
  const { width: W, height: H } = await origem.metadata();

  const alturaPx = Math.min(H, Math.round(caixa.h * H));
  const larguraPx = Math.min(W, Math.round((alturaPx * caixa.w) / caixa.a));

  const esquerda = limitar(Math.round(caixa.cx * W - larguraPx / 2), 0, W - larguraPx);
  const topo = limitar(Math.round(caixa.cy * H - alturaPx / 2), 0, H - alturaPx);

  await origem
    .extract({ left: esquerda, top: topo, width: larguraPx, height: alturaPx })
    .resize(caixa.w, caixa.a, { fit: "cover", kernel: "lanczos3" })
    .webp({ quality: 84 })
    .toFile(`${DESTINO}/${nome}.webp`);
}

console.log(`${Object.keys(EDITORIAIS).length} editoriais -> ${DESTINO}`);
