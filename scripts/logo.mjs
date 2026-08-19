// Extrai a assinatura da Carina do arquivo original (traço preto sobre branco)
// e gera duas versões em PNG transparente: vinho (para fundo claro) e pérola (para fundo escuro).
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const ORIGEM = "_raw-fb/LOGO.jpg";
const DESTINO = "public/marca";
mkdirSync(DESTINO, { recursive: true });

const VERSOES = [
  { arquivo: "carina-melo-vinho.png", cor: { r: 0x6a, g: 0x0b, b: 0x23 } },
  { arquivo: "carina-melo-perola.png", cor: { r: 0xf5, g: 0xf0, b: 0xed } },
];

// O traço é escuro sobre branco: invertendo a luminância, o traço vira a máscara alfa.
// `trim` corta a margem branca (agora preta) antes de rasterizar, e `b-w` garante
// um único canal — com 3 canais o joinChannel abaixo cisalha a imagem inteira.
const { data: mascara, info } = await sharp(ORIGEM)
  .greyscale()
  .normalise()
  .negate()
  .linear(1.3, -14) // reforça o traço e limpa o cinza de compressão do JPEG
  .trim({ threshold: 10 })
  .toColourspace("b-w")
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

if (channels !== 1) {
  throw new Error(`máscara veio com ${channels} canais; joinChannel exige 1`);
}
if (mascara.length !== width * height) {
  throw new Error(`máscara com ${mascara.length} bytes para ${width}x${height}`);
}

for (const { arquivo, cor } of VERSOES) {
  // O traço vira o canal alfa de uma chapada da cor: sem halo branco nas bordas.
  // O resize vai num segundo passo: encadeado depois do joinChannel, o sharp
  // redimensiona antes de juntar o canal e a imagem sai distorcida.
  const chapada = await sharp({
    create: { width, height, channels: 3, background: cor },
  })
    .joinChannel(mascara, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();

  await sharp(chapada)
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(`${DESTINO}/${arquivo}`);
}

console.log(`logo extraida ${width}x${height} (${channels} canal) -> ${DESTINO}`);
