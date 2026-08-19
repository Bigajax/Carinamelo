export const site = {
  nome: "Carina Melo Shop",
  lema: "Meu sonho é realizar o Seu!",
  cidade: "Maringá",
  estado: "PR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://carinamelo.shop",

  // PENDENTE: número comercial real. O contato público hoje é (43) 99832-0102,
  // que é DDD de Londrina — confirmar com a Carina antes de publicar.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5544999999999",
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
