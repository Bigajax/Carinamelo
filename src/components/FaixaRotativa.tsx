const ITENS = [
  "Banho em ouro",
  "Maringá, Paraná",
  "Banho em ouro branco",
  "Mais de 20 anos",
  "Banho em paládio",
  "Escolhida uma a uma",
];

/**
 * Faixa rotativa entre o hero e o catálogo.
 *
 * O conteúdo é o vocabulário da própria marca — os três banhos, a cidade, o tempo
 * de casa. A garantia de 5 anos fica de fora de propósito: ela já tem o punção e a
 * faixa da home, e repetida uma quarta vez viraria ruído.
 *
 * O ritmo alterna Manrope em caixa alta com Bodoni em corpo maior. Sem
 * `prefers-reduced-motion`, a faixa para e vira uma linha estática legível.
 */
export default function FaixaRotativa() {
  const sequencia = [...ITENS, ...ITENS];

  return (
    <div
      className="overflow-hidden border-y border-rosa-classico bg-rosa-nevoa py-4"
      role="presentation"
    >
      <div className="faixa-trilho flex w-max items-baseline gap-8 whitespace-nowrap md:gap-12">
        {sequencia.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-baseline gap-8 md:gap-12">
            {i % 2 === 0 ? (
              <span className="eyebrow text-[12px] text-vinho">{item}</span>
            ) : (
              <span className="display text-[22px] text-vinho/80 md:text-[26px]">
                {item}
              </span>
            )}
            <span className="faixa-losango h-1.5 w-1.5 self-center" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
