const URL_PADRAO = "https://carinamelo.shop";

/**
 * Variável de ambiente definida mas vazia é o caso comum em painel de deploy,
 * e `??` não pega isso: `"" ?? padrao` devolve `""`. Aqui string em branco conta
 * como ausente.
 */
function texto(valor: string | undefined, padrao: string): string {
  const limpo = valor?.trim();
  return limpo ? limpo : padrao;
}

/** Sempre devolve uma origem válida — `new URL("")` derrubava o build na Vercel. */
function origemDoSite(): string {
  const bruto = texto(process.env.NEXT_PUBLIC_SITE_URL, URL_PADRAO);
  const comProtocolo = /^https?:\/\//i.test(bruto) ? bruto : `https://${bruto}`;
  try {
    return new URL(comProtocolo).origin;
  } catch {
    return URL_PADRAO;
  }
}

export const site = {
  nome: "Carina Melo Shop",
  lema: "Meu sonho é realizar o Seu!",
  cidade: "Maringá",
  estado: "PR",
  url: origemDoSite(),

  // PENDENTE: número comercial real. O contato público hoje é (43) 99832-0102,
  // que é DDD de Londrina — confirmar com a Carina antes de publicar.
  whatsapp: texto(process.env.NEXT_PUBLIC_WHATSAPP, "5544999999999"),
  instagram: "carinamelo.oficial",
  facebook: "carinamelo.shop",

  // PENDENTE: endereço e horário de atendimento.
  endereco: "Maringá · Paraná",
  horario: "Atendimento por WhatsApp",

  garantiaAnos: 5,

  // A marca anuncia 3x sem juros em todas as peças, inclusive abaixo de R$ 300.
  // Trocar para { vezes: 12, parcelaMinima: 3000 } se a política mudar — a UI acompanha sozinha.
  parcelamento: { vezes: 3, parcelaMinima: 0 },

  mensagens: {
    geral: "Oi Carina! Vim pelo site e queria ver as peças.",
    semResultado:
      "Oi Carina! Procurei uma peça no site e não achei. Você consegue me ajudar?",
  },
} as const;
