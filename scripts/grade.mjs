// Folha de contato rotulada — auditoria visual obrigatória de qualquer lote de fotos.
// Uso: node scripts/grade.mjs <pastaOrigem> <arquivoSaida> [colunas] [larguraCelula]
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join, basename } from "node:path";

const origem = process.argv[2] ?? "_raw-fb";
const saida = process.argv[3] ?? "scripts/_contato.jpg";
const COLS = Number(process.argv[4] ?? 5);
const CELULA = Number(process.argv[5] ?? 360);
const ROTULO = 34;

const arquivos = readdirSync(origem)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();

const linhas = Math.ceil(arquivos.length / COLS);
const alturaCelula = Math.round(CELULA * 1.25) + ROTULO;

const escapar = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const composicao = [];
for (const [i, arquivo] of arquivos.entries()) {
  const col = i % COLS;
  const lin = Math.floor(i / COLS);
  const foto = await sharp(join(origem, arquivo))
    .resize(CELULA, alturaCelula - ROTULO, { fit: "cover", position: "attention" })
    .toBuffer();

  const nome = escapar(basename(arquivo).replace(/\.[^.]+$/, ""));
  const rotulo = Buffer.from(
    `<svg width="${CELULA}" height="${ROTULO}">
      <rect width="100%" height="100%" fill="#111"/>
      <text x="8" y="23" font-family="monospace" font-size="17" fill="#fff">${nome}</text>
    </svg>`
  );

  composicao.push(
    { input: foto, left: col * CELULA, top: lin * alturaCelula },
    { input: rotulo, left: col * CELULA, top: lin * alturaCelula + (alturaCelula - ROTULO) }
  );
}

await sharp({
  create: {
    width: COLS * CELULA,
    height: linhas * alturaCelula,
    channels: 3,
    background: "#222",
  },
})
  .composite(composicao)
  .jpeg({ quality: 88 })
  .toFile(saida);

console.log(`${arquivos.length} imagens -> ${saida} (${COLS}x${linhas})`);
