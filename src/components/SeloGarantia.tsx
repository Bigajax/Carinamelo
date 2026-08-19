import { site } from "@/data/site.config";

type Tamanho = "sm" | "lg";
type Tom = "vinho" | "perola";

const MEDIDAS: Record<Tamanho, { caixa: number; numero: number; palavra: number }> = {
  sm: { caixa: 44, numero: 19, palavra: 6.5 },
  lg: { caixa: 88, numero: 38, palavra: 9 },
};

/**
 * O punção da casa.
 *
 * Em joalheria, o punção é a marca cravada por dentro do aro: quem fez e o que
 * garante. A garantia de 5 anos é o argumento mais forte da marca e só existia
 * em texto de bio — aqui ela vira objeto gráfico com esse vocabulário. Chapado,
 * sem gradiente e sem metal: cara de carimbo em certificado, não de brilho.
 *
 * É o único elemento decorativo do projeto. Todo o resto é disciplinado.
 */
export default function SeloGarantia({
  tamanho = "sm",
  tom = "vinho",
  className = "",
}: {
  tamanho?: Tamanho;
  tom?: Tom;
  className?: string;
}) {
  const { caixa, numero, palavra } = MEDIDAS[tamanho];
  const cor = tom === "vinho" ? "var(--color-vinho)" : "var(--color-perola)";
  // O punção é opaco nos dois tons: é o que permite carimbá-lo sobre um fio
  // sem que a linha atravesse o miolo do selo.
  const fundo =
    tom === "vinho" ? "var(--color-perola)" : "var(--color-vinho-profundo)";

  return (
    <span
      role="img"
      aria-label={`Garantia de ${site.garantiaAnos} anos`}
      title={`Garantia de ${site.garantiaAnos} anos`}
      className={`inline-flex shrink-0 flex-col items-center justify-center rounded-full ${className}`}
      style={{
        width: caixa,
        height: caixa,
        border: `1px solid ${cor}`,
        background: fundo,
        color: cor,
      }}
    >
      <span
        className="display-italico"
        style={{ fontSize: numero, lineHeight: 0.95 }}
        aria-hidden
      >
        {site.garantiaAnos}
      </span>
      <span
        className="eyebrow"
        style={{ fontSize: palavra, letterSpacing: "0.18em", marginLeft: "0.18em" }}
        aria-hidden
      >
        anos
      </span>
    </span>
  );
}
