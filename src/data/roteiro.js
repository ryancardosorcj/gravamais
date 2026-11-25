/* ============================================================
   ROTEIROS — conteúdo da rota /roteiro/:slug
   Mesma mecânica da proposta: cada cliente é uma chave em CLIENTES_ROTEIRO.
   Os componentes (src/components/roteiro/) só leem daqui.

   FORMATO DE UM VÍDEO
     numero      ordem no documento (vira o "01", "02"…)
     titulo      título do vídeo
     campanha    linha de apoio sob o título ("Campanha Redes Sociais")
     formato     etiqueta curta: 'Fala para câmera', 'Trend'…
     referencia  link de referência (Instagram etc.) (opcional)
     cenas       o storyboard: um quadro por cena, na ordem do vídeo.

   FORMATO DE UMA CENA (todos os campos opcionais)
     foto        '/roteiro/<cliente>/v1-<id>.webp' — 9:16, ~540px. O <id> é o
                 sufixo da foto original: trocar a foto troca o nome, e o
                 navegador não mostra a antiga do cache.
     plano       o que se vê no quadro ("Plano aberto do hortifruti")
     fala        o trecho da FALA NA ÍNTEGRA dito nessa cena. `**trecho**`
                 vira negrito — é o mesmo destaque do PDF.
     lettering   texto que entra na tela nessa cena
     nota        observação de produção, em itálico

   Lidas em ordem, as falas das cenas formam a fala na íntegra. Cena sem foto
   vira cartela: o lettering ocupa o quadro (bom para o fechamento).
   ============================================================ */

export const HERO_ROTEIRO = {
  saudacao: 'Roteiros',
  /* Sem `subtitulo`: vale o da proposta (HERO_PROPOSTA), a frase da marca. */
  cta: 'Ver os roteiros',
  ctaHref: '#informacoes',
};

/* Vale para todos os clientes: é como a GravaMais conduz a aprovação. */
export const INFORMACOES = {
  eyebrow: 'Antes de ler',
  titulo: ['Informações', 'importantes'],
  destaque: 1,
  itens: [
    {
      icone: 'aprovacao',
      titulo: 'Aprovação antes da gravação',
      texto:
        'Os roteiros são enviados para aprovação antes da gravação. A produção do conteúdo acontece somente **após a validação do material**.',
    },
    {
      icone: 'mensagem',
      titulo: 'Sugestões são bem-vindas',
      texto:
        'Quer sugerir alguma alteração? **Fique à vontade!** Você pode enviar suas observações pelo WhatsApp.',
    },
    {
      icone: 'teleprompter',
      titulo: 'Teleprompter no set',
      texto:
        'Se necessário, durante a gravação, utilizamos teleprompter para facilitar a apresentação e deixar a fala mais natural.',
    },
    {
      icone: 'direcao',
      titulo: 'Direção do começo ao fim',
      texto:
        'Nossa equipe acompanha todo o processo de gravação e orienta sobre fala, postura, ritmo e interpretação. Você não precisa ter experiência diante das câmeras.',
    },
    {
      icone: 'calendario',
      titulo: 'Base no que já foi aprovado',
      texto:
        'Cada roteiro é desenvolvido com base no briefing e no calendário editorial já aprovado anteriormente.',
    },
    {
      icone: 'duvida',
      titulo: 'Estamos à disposição',
      texto: 'Qualquer dúvida ou questionamento, estamos à disposição!',
    },
  ],
};

export const ROTEIROS_CABECALHO = {
  eyebrow: 'Os roteiros',
  titulo: ['Cada vídeo,', 'cena a cena.'],
  destaque: 1,
};

export const FECHO_ROTEIRO = {
  titulo: ['E aí,', 'o que você achou?'],
  destaque: 1,
  eyebrow: 'Manda pra gente no WhatsApp :)',
  cta: 'Enviar meu retorno',
};

export const CLIENTES_ROTEIRO = {
  alvorada: {
    nome: 'Supermercados Alvorada',
    logo: null,
    /* Mensagem que abre no WhatsApp ao clicar no CTA do fecho. */
    whatsappMensagem:
      'Olá! Li os roteiros do Supermercados Alvorada e queria comentar:',
    videos: [
      {
        numero: 1,
        titulo: '3 motivos para comprar no Alvorada!',
        campanha: 'Campanha Redes Sociais',
        formato: 'Fala para câmera',
        cenas: [
          {
            foto: '/roteiro/alvorada/v1-c05aa45c.webp',
            plano: 'Apresentador no corredor, falando para a câmera',
            fala: 'Se você ainda não faz suas compras no Alvorada, vou te dar **3 bons motivos** pra começar! E o terceiro é daqueles que fazem diferença no bolso!',
          },
          {
            foto: '/roteiro/alvorada/v1-a4b81fea.webp',
            plano: 'Plano aberto do hortifruti',
            fala: '**Primeiro:** nosso hortifruti!',
          },
          {
            foto: '/roteiro/alvorada/v1-02ea7bce.webp',
            plano: 'Detalhe das frutas, verduras e ofertas',
            fala: 'Tem variedade de frutas, verduras e legumes fresquinhos pra você escolher.',
          },
          {
            foto: '/roteiro/alvorada/v1-a78bbdae.webp',
            plano: 'Apresentador escolhendo frutas na banca',
            fala: 'E vamos combinar, né? Uma compra com produtos fresquinhos faz toda a diferença!',
          },
          {
            foto: '/roteiro/alvorada/v1-bd8eab6e.webp',
            plano: 'Detalhe dos cortes na vitrine do açougue',
            fala: '**Segundo:** nosso açougue! Aqui você encontra carnes selecionadas, diferentes opções de cortes…',
          },
          {
            foto: '/roteiro/alvorada/v1-f49363f0.webp',
            plano: 'Apresentador em frente ao açougue, apresentando o balcão',
            fala: '…e um atendimento ágil. Afinal, na hora de preparar aquela refeição especial, uma carne de qualidade faz toda a diferença!',
          },
          {
            foto: '/roteiro/alvorada/v1-28467d9b.webp',
            plano: 'Cliente usando o celular com o carrinho',
            fala: '**E agora o terceiro motivo:** nosso aplicativo!',
          },
          {
            foto: '/roteiro/alvorada/v1-f6cf52d0.webp',
            plano: 'Detalhe da tela do app com as ofertas',
            fala: 'Por lá você encontra descontos e ofertas exclusivas pra economizar ainda mais nas suas compras.',
          },
          {
            foto: '/roteiro/alvorada/v1-b4327294.webp',
            plano: 'Fechamento no caixa, com a sacola do Alvorada',
            fala: 'Viu só? São três bons motivos pra escolher o Alvorada! Baixe nosso aplicativo e venha fazer suas compras com a gente!',
          },
        ],
      },
      {
        numero: 2,
        titulo: 'Sorteio fim de ano Alvorada',
        campanha: 'Campanha Redes Sociais',
        formato: 'Fala para câmera',
        cenas: [
          {
            foto: '/roteiro/alvorada/v2-c552f1e8.webp',
            plano: 'Apresentador estoura o balão com confete',
            fala: 'Ó, o final de ano do Alvorada já começou! E aqui, além de fazer suas compras, você ainda pode sair com um presentão!',
          },
          {
            foto: '/roteiro/alvorada/v2-83a18ff3.webp',
            plano: 'Apresentador no corredor decorado',
            fala: 'É isso mesmo! Nas compras a partir de 150 reais, você concorre a um:',
          },
          {
            foto: '/roteiro/alvorada/v2-384fe9b5.webp',
            plano: 'Tanquinho em destaque no expositor do sorteio',
            fala: 'Tanquinho de lavar roupas…',
          },
          {
            foto: '/roteiro/alvorada/v2-98ec4917.webp',
            plano: 'Bicicleta com laço no corredor',
            fala: 'Uma bicicleta novinha…',
          },
          {
            foto: '/roteiro/alvorada/v2-b39a4c1e.webp',
            plano: 'Mão segurando as notas',
            fala: 'E um vale-compra de 300 reais!',
          },
          {
            foto: '/roteiro/alvorada/v2-c1776233.webp',
            plano: 'Apresentador no caixa, cliente em primeiro plano',
            fala: 'Então já sabe, né? Nesse final de ano, suas compras no Alvorada podem valer muito mais!',
          },
          {
            plano: 'Cartela de fechamento',
            lettering: 'Supermercado Alvorada. Boas compras e boa sorte!',
            nota: 'Slogan ou frase da campanha.',
          },
        ],
      },
      {
        numero: 3,
        titulo: 'Trend',
        campanha: 'Campanha Redes Sociais',
        formato: 'Trend',
        referencia: 'https://www.instagram.com/reels/DaV45AIpD1m/',
        cenas: [
          {
            foto: '/roteiro/alvorada/v3-f6d9a1ac.webp',
            plano: 'Acorda deitado sobre os panetones da padaria',
            lettering:
              'POV: Você acordou e lembrou que chegou a melhor época do ano (natal, ano novo e comida boa!)',
          },
          {
            foto: '/roteiro/alvorada/v3-c421f002.webp',
            plano: 'Entra no Alvorada comemorando com a sidra',
          },
          {
            foto: '/roteiro/alvorada/v3-fd3b7825.webp',
            plano: 'Corre com o carrinho pelo corredor',
          },
          {
            foto: '/roteiro/alvorada/v3-82d8c37f.webp',
            plano: 'Anda sentado dentro do carrinho',
          },
          {
            foto: '/roteiro/alvorada/v3-89533ebc.webp',
            plano: 'Abraça a pilha de panetones e chocolates',
          },
          {
            foto: '/roteiro/alvorada/v3-8420d657.webp',
            plano: 'Dança no hortifruti',
          },
        ],
      },
      {
        numero: 4,
        titulo: 'No Alvorada você economiza',
        campanha: 'Campanha Redes Sociais',
        formato: 'Fala para câmera',
        referencia: 'https://www.instagram.com/reels/DeM0QmfR23b/',
        cenas: [
          {
            foto: '/roteiro/alvorada/v4-c4d3d47c.webp',
            plano: 'Sentado no corredor, lendo a caixa do remédio',
            fala: 'Tem gente que compra Mounjaro pra cuidar do peso…',
          },
          {
            foto: '/roteiro/alvorada/v4-b98717cd.webp',
            plano: '"Academia" com os galões de amaciante',
            fala: 'Tem gente que vai na academia pra cuidar do corpo…',
          },
          {
            foto: '/roteiro/alvorada/v4-e60e40a6.webp',
            plano: 'Creme no rosto, espelho na mão',
            fala: 'Tem gente que faz skincare pra cuidar da pele…',
          },
          {
            foto: '/roteiro/alvorada/v4-72a1fe33.webp',
            plano: 'Mostra a carteira vazia',
            fala: 'Agora, quem quer cuidar do bolso…',
          },
          {
            foto: '/roteiro/alvorada/v4-74d373ab.webp',
            plano: 'Carrinho lotado, comemorando',
            fala: 'Vai no Supermercado Alvorada! Aqui você encontra **economia de verdade!**',
          },
        ],
      },
    ],
  },
};

/* Slug desconhecido NÃO cai no roteiro de outro cliente — roteiro é material
   em aprovação. Sem vídeos, a página mostra só o hero e o fecho. */
export const CLIENTE_PADRAO_ROTEIRO = { nome: 'Roteiros', logo: null, videos: [] };
