// Favicon e ícone do app: o punção de 5 anos invertido — vinho chapado,
// algarismo em pérola. Mesma ideia do selo que aparece em todo card.
import sharp from "sharp";

const VINHO = "#6A0B23";
const PEROLA = "#F5F0ED";

const svg = (lado) => {
  const r = lado / 2;
  const anel = Math.max(2, lado * 0.035);
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 ${lado} ${lado}">
  <rect width="${lado}" height="${lado}" fill="${VINHO}"/>
  <circle cx="${r}" cy="${r}" r="${r - lado * 0.11}" fill="none" stroke="${PEROLA}" stroke-width="${anel}"/>
  <text x="${r}" y="${r + lado * 0.11}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-style="italic"
        font-size="${lado * 0.46}" fill="${PEROLA}">5</text>
  <text x="${r}" y="${r + lado * 0.3}" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-weight="600"
        letter-spacing="${lado * 0.03}" font-size="${lado * 0.09}" fill="${PEROLA}">ANOS</text>
</svg>`);
};

await sharp(svg(512)).png().toFile("src/app/icon.png");
await sharp(svg(180)).png().toFile("src/app/apple-icon.png");

console.log("icone.png e apple-icon.png gerados em src/app");
