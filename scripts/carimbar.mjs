// Carimba o nome do arquivo dentro da própria imagem, em resolução cheia.
// Assim a leitura em paralelo é segura: cada imagem carrega a própria identificação.
// Uso: node scripts/carimbar.mjs <pastaOrigem> <pastaSaida> [lista,de,ids]
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const origem = process.argv[2] ?? "_raw-fb";
const destino = process.argv[3] ?? "scripts/_carimbadas";
const filtro = process.argv[4] ? new Set(process.argv[4].split(",")) : null;

mkdirSync(destino, { recursive: true });

const arquivos = readdirSync(origem)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .filter((f) => !filtro || filtro.has(f.replace(/\.[^.]+$/, "")));

for (const arquivo of arquivos) {
  const id = arquivo.replace(/\.[^.]+$/, "");
  const img = sharp(join(origem, arquivo));
  const { width } = await img.metadata();
  const faixa = Buffer.from(
    `<svg width="${width}" height="64">
      <rect width="100%" height="100%" fill="#000"/>
      <text x="16" y="45" font-family="monospace" font-size="40" fill="#0f0">${id}</text>
    </svg>`
  );
  await img
    .composite([{ input: faixa, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(join(destino, `${id}.jpg`));
}

console.log(`${arquivos.length} imagens carimbadas em ${destino}`);
