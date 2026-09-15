/* ============================================================
   GRAVAMAIS — CONTEÚDO DO SITE
   Todo o texto e dados da landing page vivem aqui.
   Edite este arquivo para mudar a página; não mexa nos componentes.
   ============================================================ */

/* ⚠️ PREENCHER: dados de contato reais ------------------------ */
export const CONFIG = {
  // Formato internacional, só números. Ex.: 5511987654321
  whatsapp: '5511933673894',
  whatsappMessage:
    'Olá! Vim pelo site da GravaMais e quero conversar sobre um projeto de vídeo.',
  instagram: 'https://instagram.com/gravamaisproducoes',
  email: 'gravamais.producoesaudiovisuais@gmail.com',
  cidade: 'Campolim, Sorocaba/SP',
  endereco: 'Rua Augusto Lippel 1900, Campolim - Sorocaba/SP',
};

export const whatsappLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
  CONFIG.whatsappMessage,
)}`;

/* Navegação ------------------------------------------------- */
export const NAV = [
  { label: 'Método', href: '#metodo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Quem está por trás', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

/* Hero ------------------------------------------------------ */
export const HERO = {
  eyebrow: 'Produtora de vídeo e performance',
  titulo: ['Vídeo bonito', 'não paga', 'boleto.'],
  destaque: 2, // índice da linha que recebe o amarelo
  lead: 'A GravaMais produz conteúdo audiovisual com estratégia por trás de cada frame. Não vendemos gravação: construímos o ativo que faz a sua empresa crescer.',
  ctaPrimario: 'Entre em contato',
  vslId: 'd82dc6bc-6b6a-482b-b1e5-4886c35abd3d',
  vslLegenda: 'Assista: como transformamos vídeo em crescimento',
};

/* Prova social ----------------------------------------------
   Os arquivos vieram em BRANCO com fundo recortado — por isso a seção é
   escura e não há card, borda nem grayscale.
   O equilíbrio de tamanho foi resolvido no asset, não no CSS: cada logo é
   escalado pela raiz da área e centralizado numa tela 3:1, senão as marcas
   largas (Starrett, Apotica) engoliriam as compactas (OPT, Toyota). */
export const CLIENTES = {
  titulo: 'Algumas marcas que já confiaram no nosso trabalho',
  logos: [
    { src: '/clientes/germania.webp', nome: 'Germânia' },
    { src: '/clientes/toyota-nippokar.webp', nome: 'Toyota Nippokar' },
    { src: '/clientes/o-boticario.webp', nome: 'O Boticário' },
    { src: '/clientes/amorsaude.webp', nome: 'AmorSaúde' },
    { src: '/clientes/cartao-de-todos.webp', nome: 'Cartão de Todos' },
    { src: '/clientes/apotica.webp', nome: 'Apotica' },
    { src: '/clientes/oticas-portal-prime.webp', nome: 'Óticas Portal Prime' },
    { src: '/clientes/opt-oculos.webp', nome: 'OPT Óculos' },
    { src: '/clientes/starrett.webp', nome: 'Starrett' },
    { src: '/clientes/studio-mineiro-barber.webp', nome: 'Studio Mineiro Barber' },
    { src: '/clientes/ppa-aluminio.webp', nome: 'PPA Alumínio' },
    { src: '/clientes/psdigital.webp', nome: 'PS Digital' },
  ],
};

/* O problema ------------------------------------------------
   Sem eyebrow e sem cards: a seção é uma afirmação só, e ela abre o raciocínio
   que a seção seguinte (o mapa) fecha. As duas são deliberadamente vizinhas —
   não separe com nada. */
export const METODO = {
  titulo: ['A maioria das empresas', 'produz vídeo.', 'Poucas veem resultado.'],
  destaque: 2,
  lead: 'Conectamos tudo para gerar resultados. Entregamos além dos vídeos, construímos um sistema de crescimento usando conteúdo como ativo do negócio.',
};

/* O que fazemos — o mapa ------------------------------------
   Continuação direta do bloco acima. A ressalva não é enfeite: sem ela o mapa
   lê como "todo cliente recebe as sete coisas", que é exatamente a promessa de
   agência full service que a GravaMais não quer fazer.

   `base: false` marca as frentes condicionais — elas ganham linha tracejada no
   mapa, e é isso que carrega a ressalva visualmente. */
export const MAPA = {
  titulo: ['Não começamos pelo vídeo.', 'Começamos pela sua empresa.'],
  destaque: 1,
  lead: 'Antes de definir entregas, entendemos o momento da empresa, seus objetivos e o que a comunicação precisa construir. A partir disso, conectamos estratégia, audiovisual e distribuição em uma operação pensada para fazer sentido para o negócio.',
  centro: 'Sua Empresa',
  centroSub: 'O ponto de partida',
  ressalva:
    'Nem toda empresa precisa de tudo. O mapa mostra as possibilidades. Juntos, analisamos o que faz sentido para o momento, os objetivos e o investimento da sua empresa.',
  nos: [
    {
      titulo: 'Diagnóstico',
      texto:
        'Entendemos o momento da empresa, a comunicação atual e onde existe oportunidade.',
      base: true,
    },
    {
      titulo: 'Estratégia',
      texto:
        'Definimos prioridades, objetivos e a direção que a comunicação precisa seguir.',
      base: true,
    },
    {
      titulo: 'Roteiro',
      texto:
        'Transformamos a estratégia em mensagens, histórias e conteúdos para produzir.',
      base: true,
    },
    {
      titulo: 'Produção',
      texto:
        'Colocamos a estratégia em prática através de vídeo, fotografia e direção audiovisual.',
      base: true,
    },
    {
      titulo: 'Distribuição',
      texto:
        'Distribuímos os conteúdos estrategicamente, criando legendas, capas e agendando as postagens.',
      base: true,
    },
    {
      titulo: 'Social Media/Design',
      texto:
        'Quando a estratégia pede uma atuação mais completa, estruturamos a presença da sua marca nas redes sociais para criar mais consistência e continuidade.',
      base: false,
    },
    {
      titulo: 'Tráfego Pago',
      texto:
        'Quando faz sentido, utilizamos mídia paga para ampliar o alcance dos conteúdos e apoiar a estratégia.',
      base: false,
    },
  ],
};

/* Serviços --------------------------------------------------- */
export const SERVICOS = {
  eyebrow: 'O que fazemos',
  titulo: ['Vídeo no centro.', 'Performance em volta.'],
  destaque: 1,
  lead: 'O vídeo é o motor. Social media e tráfego pago existem para que ele alcance, converta e continue trabalhando depois da estreia.',
  principal: {
    tag: 'Serviço principal',
    titulo: 'Produção de vídeo estratégico',
    texto:
      'Do roteiro à entrega final. Institucionais, comerciais, filmes de marca, cobertura de eventos e conteúdo recorrente para redes sociais — cada peça desenhada a partir de um objetivo de negócio, não de uma ideia bonita.',
    itens: [
      'Vídeo institucional e filme de marca',
      'Comercial e vídeo de vendas',
      'Conteúdo recorrente para redes sociais',
      'Cobertura de eventos e aftermovie',
      'Fotografia profissional',
    ],
  },
  complementos: [
    {
      titulo: 'Social media',
      texto:
        'O melhor vídeo do mundo não funciona no vácuo. Cuidamos da linha editorial, dos cortes e da publicação para que o conteúdo trabalhe todos os dias.',
    },
    {
      titulo: 'Tráfego pago',
      texto:
        'Colocamos verba onde o vídeo já provou que performa. O criativo certo na frente do público certo — e o resultado deixa de depender do algoritmo.',
    },
  ],
};

/* Portfólio em vídeo — Bunny Stream -------------------- */
export const PORTFOLIO = {
  eyebrow: 'Portfólio',
  destaquesTexto: 'É assim que a estratégia ganha forma.',
  exploraTexto: 'Explore projetos por diferentes formatos, objetivos e necessidades.',

  destaques: [
    { id: 'ca4fc9f0-a3c9-4e4b-b2ab-7dd0cc077f14', titulo: 'Germânia', categoria: 'Institucional', tags: ['Institucional', 'Posicionamento', 'Indústria'], thumbnail: 'url(/portfolio_thubs/germania.jpg)' },
    { id: 'f9ac146d-46e0-4861-a9a9-93703428e24b', titulo: 'Apotica', categoria: 'Institucional', tags: ['Institucional', 'Posicionamento'], thumbnail: 'url(/portfolio_thubs/apotica.jpg)' },
    { id: '02b4c12e-4b4c-409c-9171-7e42a1c53577', titulo: 'Workshop Barbearia', categoria: 'Eventos Corporativos', tags: ['Evento corporativo', 'Treinamento', 'B2B'], thumbnail: 'url(/portfolio_thubs/workshop-barbearia.jpg)' },
    { id: '51f45fae-3cbd-4dfd-81ec-e4cac64f1b7e', titulo: 'Amor e Saúde', categoria: 'Institucional', tags: ['Institucional', 'Posicionamento', 'Saúde'], thumbnail: 'url(/portfolio_thubs/amor-e-saude.jpg)' },
    { id: 'e18487c5-4871-4730-b7d2-684ed55cbcee', titulo: 'Trailer Imobiliário', categoria: 'Inaugurações', tags: ['Inauguração', 'Lançamento', 'Varejo'], thumbnail: 'url(/portfolio_thubs/casa.jpg)' },
    { id: '5ad4e9ec-5bc3-47ee-a9fc-a44dbd5f09c4', titulo: 'Conteúdo Natal', categoria: 'Redes Sociais', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/emporio-1.jpg)' },
    { id: '9b0823ea-122f-47b8-ab13-71dd2efccc54', titulo: 'Trend Viral', categoria: 'Redes Sociais', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/emporio-2.jpg)' },
    { id: '16ef9083-7c09-4e2b-b554-9c671d3ce6df', titulo: 'Lixadeira', categoria: 'Redes Sociais', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/fabrica-ferramentas.jpg)' },
    { id: 'd89d6761-2fb1-46b6-9a5d-dcce74f2e735', titulo: 'Corte', categoria: 'Redes Sociais', tags: ['Conteúdo recorrente', 'Redes sociais', 'Barbearia'], thumbnail: 'url(/portfolio_thubs/barbearia.jpg)' },
    { id: '4f959e6d-1891-48ea-be2e-f0b9bc59a921', titulo: 'Lançamento Toyota', categoria: 'Eventos Corporativos', tags: ['Evento corporativo', 'Lançamento', 'Real Time'], thumbnail: 'url(/portfolio_thubs/toyota.jpg)' },
  ],

  institucional: [
    { id: 'ca4fc9f0-a3c9-4e4b-b2ab-7dd0cc077f14', titulo: 'Germânia', tags: ['Institucional', 'Posicionamento', 'Indústria'], thumbnail: 'url(/portfolio_thubs/germania.jpg)' },
    { id: 'f9ac146d-46e0-4861-a9a9-93703428e24b', titulo: 'Apotica', tags: ['Institucional', 'Posicionamento'], thumbnail: 'url(/portfolio_thubs/apotica.jpg)' },
    { id: 'fcd22f05-9934-46fd-829a-8453773af15d', titulo: 'PP Alumínio', tags: ['Institucional', 'Posicionamento'], thumbnail: 'url(/portfolio_thubs/ppa-aluminio.jpg)' },
    { id: '91cccf58-c5ae-47fb-88ed-96bf0da5d67e', titulo: 'Villa Maré Hotel', tags: ['Institucional', 'Posicionamento'], thumbnail: 'url(/portfolio_thubs/villa-mare-hotel.jpg)' },
    { id: '8e171d47-1d21-423b-862b-0b39ee5c91a1', titulo: 'Casa do Pão', tags: ['Institucional', 'Posicionamento'], thumbnail: 'url(/portfolio_thubs/casa-do-pao.jpg)' },
    { id: '51f45fae-3cbd-4dfd-81ec-e4cac64f1b7e', titulo: 'Amor e Saúde', tags: ['Institucional', 'Posicionamento', 'Saúde'], thumbnail: 'url(/portfolio_thubs/amor-e-saude.jpg)' },
  ],

  inauguracoes: [
    { id: 'e2a51977-f801-486d-94e5-4daafb3561a9', titulo: 'Reinauguração Apotica', tags: ['Inauguração', 'Aftermovie', 'Varejo'], thumbnail: 'url(/portfolio_thubs/apotica2.jpg)' },
    { id: '7faf8089-3673-4df8-af6f-4d00a016391c', titulo: 'Deborah Salgados', tags: ['Inauguração', 'Aftermovie', 'Experiência'], thumbnail: 'url(/portfolio_thubs/deborah-salgados.jpg)' },
  ],

  eventos: [
    { id: '4f959e6d-1891-48ea-be2e-f0b9bc59a921', titulo: 'Lançamento Toyota', tags: ['Evento corporativo', 'Real-Time'], thumbnail: 'url(/portfolio_thubs/toyota.jpg)' },
    { id: '6737ac89-5679-4675-8565-05e90b7f2b34', titulo: 'Jantar Villa Chalé', tags: ['Evento corporativo', 'Cobertura', 'Institucional'], thumbnail: 'url(/portfolio_thubs/jantar-villa-chale.jpg)' },
    { id: 'c1108935-c618-4866-a335-6f8225bcafaf', titulo: 'Treinamento PPA - Dia 01', tags: ['Evento corporativo', 'Cobertura', 'Institucional'], thumbnail: 'url(/portfolio_thubs/treinamento-ppa-dia-01.jpg)' },
    { id: 'b91d582a-05bc-454a-9416-fd5bb6bc6106', titulo: 'Treinamento PPA - Dia 02', tags: ['Evento corporativo', 'Cobertura', 'Institucional'], thumbnail: 'url(/portfolio_thubs/treinamento-ppa-dia-02.jpg)' },
    { id: '02b4c12e-4b4c-409c-9171-7e42a1c53577', titulo: 'Workshop Barbearia', tags: ['Evento corporativo', 'Treinamento', 'B2B'], thumbnail: 'url(/portfolio_thubs/workshop-barbearia.jpg)' },
  ],

  redeSocial: [
    // Açaí
    { id: '6f0539ea-3879-477f-bee6-436c5bfc7178', titulo: 'Mega Açaí', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/mega-acai-preferido.jpg)' },
    { id: 'af9d77d3-ed5e-427d-b5bf-4cce82b820b2', titulo: 'Mega Açaí Preferido', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/mega-acai.jpg)' },
    // Barbearia
    { id: '5b54eacc-b09f-48a2-aad5-a336a4eae367', titulo: 'Mini Serie Barbearia', tags: ['Conteúdo recorrente', 'Redes sociais', 'Barbearia'], thumbnail: 'url(/portfolio_thubs/mini-serie-barbearia.jpg)' },
    { id: 'd89d6761-2fb1-46b6-9a5d-dcce74f2e735', titulo: 'Corte', tags: ['Conteúdo recorrente', 'Redes sociais', 'Barbearia'], thumbnail: 'url(/portfolio_thubs/barbearia.jpg)' },
    { id: 'eb561883-5f1f-4d2e-8ff1-9b8b09eb22a1', titulo: 'Criativo Barbearia', tags: ['Conteúdo recorrente', 'Redes sociais', 'Barbearia'], thumbnail: 'url(/portfolio_thubs/criativo-barbearia.jpg)' },
    // Cervejaria
    { id: 'cfb47e07-4dcf-4ba1-aa1e-6cb2878ad913', titulo: 'Conteúdo Cervejaria', tags: ['Conteúdo recorrente', 'Redes sociais', 'Cervejaria'], thumbnail: 'url(/portfolio_thubs/conteudo-cervejaria.jpg)' },
    // Indústria de Alumínio
    { id: '623beb3b-e6dc-4f29-bcb6-359665435304', titulo: 'Depoimento PPA', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/depoimento-ppa.jpg)' },
    { id: '539cfe2a-e350-48d8-a970-c33419293cdc', titulo: 'Linha de Alumínio', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/linha-aluminio.jpg)' },
    { id: '7921a988-d0ab-4487-9e56-69d597979224', titulo: 'Visita Técnica', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/visita-tecnica.jpg)' },
    // Comunicação Visual
    { id: '2de1cd39-866b-40b7-9800-57be362a2526', titulo: 'Depoimento PS Digital', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/depoimento-ps-digital.jpg)' },
    { id: 'f0546cfb-0621-46f9-ac0b-f08b9c06a11e', titulo: 'Atendimento PS Digital', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/atendimento-ps-digital.jpg)' },
    { id: 'e1fadbbb-e03f-4b66-83e6-c9bb2695d494', titulo: 'Equipamentos', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/equipamentos.jpg)' },
    { id: 'eeaea19f-7b46-4da0-986b-487e304e4c08', titulo: 'Medidas de Lonas', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/medidas-lonas.jpg)' },
    // Fábrica de Ferramentas
    { id: 'd1a385ec-0802-4d38-a542-d4b8c33c0b86', titulo: 'Ferramenta Medidor', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/ferramenta-medidor.jpg)' },
    { id: '31973694-72b5-424c-8392-aeb766901fc2', titulo: 'Serra Copo', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/serra-copo.jpg)' },
    { id: '16ef9083-7c09-4e2b-b554-9c671d3ce6df', titulo: 'Lixadeira', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/fabrica-ferramentas.jpg)' },
    { id: 'e56c1b4e-6824-4c1e-8201-a281ce6bd177', titulo: 'Serra Copo 2', tags: ['Conteúdo recorrente', 'Redes sociais', 'Indústria B2B'], thumbnail: 'url(/portfolio_thubs/serra-copo-2.jpg)' },
    // Prestador de Serviço
    { id: 'ab1c8844-4cc1-4084-8f5d-0d1dc483bae1', titulo: 'Caça Vazamentos', tags: ['Conteúdo recorrente', 'Redes sociais', 'Serviços'], thumbnail: 'url(/portfolio_thubs/caca-vazamentos.jpg)' },
    // Empório
    { id: '9b0823ea-122f-47b8-ab13-71dd2efccc54', titulo: 'Trend Viral', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/emporio-2.jpg)' },
    { id: '290430b3-1f55-4773-8933-6e34063b70d9', titulo: 'Produto Mineiros', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/produto-mineiros.jpg)' },
    { id: '84cc4e99-43ef-49b5-a516-bf6587b4537e', titulo: 'Depoimento Carroça Mineira', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/depoimento-carrocinha-mineira.jpg)' },
    { id: 'd0c93001-0890-43fa-ae73-482df2555250', titulo: 'Campanha Dia das Mães', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/campanha-dia-das-maes.jpg)' },
    { id: '5ad4e9ec-5bc3-47ee-a9fc-a44dbd5f09c4', titulo: 'Conteúdo Natal', tags: ['Conteúdo recorrente', 'Redes sociais', 'Alimentação'], thumbnail: 'url(/portfolio_thubs/emporio-1.jpg)' },
    // Toyota
    { id: '81c5ba03-a43d-41d1-9658-dd093bb34728', titulo: 'Toyota', tags: ['Conteúdo recorrente', 'Redes sociais', 'Automóvel'], thumbnail: 'url(/portfolio_thubs/toyota2.jpg)' },
    // Academia
    { id: '5d4274d8-5db9-4015-b5ec-0b06d2bcb623', titulo: 'R3 Fitness Academia', tags: ['Conteúdo recorrente', 'Redes sociais', 'Fitness'], thumbnail: 'url(/portfolio_thubs/r3-fitness-academia.jpg)' },
  ],
};

/* Portfólio em vídeo — YouTube (legado) --------------- */
export const VIDEOS_FILME = [
  {
    id: 'EE77tufHNRI',
    titulo: 'Condomínio Terras de São José',
    cliente: 'Imobiliária JP Garcia',
    tipo: 'Vídeo comercial',
  },
  {
    id: 'n6QAxJsPIhs',
    titulo: 'Apotica — Farmácia de Manipulação',
    cliente: 'Apotica',
    tipo: 'Vídeo institucional',
  },
  {
    id: 'tOyB02QhuPQ',
    titulo: 'Workshop SalaVip 2',
    cliente: 'SalaVip',
    tipo: 'Aftermovie / Trailer',
  },
];

export const VIDEOS_SOCIAL = [
  {
    id: 'gNwMsUDB8mc',
    titulo: 'Loja física',
    cliente: 'Varejo',
    tipo: 'Conteúdo para redes',
  },
  {
    id: 'aiC87tD0yd8',
    titulo: 'Barbearia',
    cliente: 'Serviços',
    tipo: 'Conteúdo para redes',
  },
  {
    id: 'O9nxZtwPZ_w',
    titulo: 'R3 Fitness',
    cliente: 'R3 Fitness',
    tipo: 'Vídeo comercial',
  },
  {
    id: 'RC5Itmq-e2s',
    titulo: 'Loja de açaí',
    cliente: 'Alimentação',
    tipo: 'Conteúdo para redes',
  },
];

/* Carrossel de destaques — a capa vem da thumbnail do próprio vídeo,
   então não há imagem extra para hospedar.
   maxresdefault é 16:9 limpo; hqdefault vem 4:3 com tarjas pretas coladas
   em cima e embaixo, que apareceriam dentro do card. */
const capa = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const capaFallback = (id) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

export const DESTAQUES = [
  ...VIDEOS_FILME,
  ...VIDEOS_SOCIAL,
].map((v) => ({
  ...v,
  capa: capa(v.id),
  capaAlt: capaFallback(v.id),
  tag: v.tipo,
}));

/* Fotografia ------------------------------------------------- */
export const FOTOS = Array.from(
  { length: 15 },
  (_, i) => `/portfolio/foto-${i + 1}.webp`,
);

/* Processo --------------------------------------------------- */
export const PROCESSO = {
  eyebrow: 'Como trabalhamos',
  titulo: ['Da ideia ao', 'resultado', 'em 4 etapas.'],
  destaque: 1,
  etapas: [
    {
      numero: '01',
      titulo: 'Diagnóstico',
      texto:
        'Sentamos com você para entender o negócio, o público e a meta. Sem isso, qualquer vídeo é chute caro.',
    },
    {
      numero: '02',
      titulo: 'Estratégia e roteiro',
      texto:
        'Definimos o formato, a mensagem e onde o conteúdo vai circular. O roteiro nasce colado no objetivo.',
    },
    {
      numero: '03',
      titulo: 'Produção',
      texto:
        'Equipe, equipamento e direção em campo. Captação, edição, cor e som — acabamento de produtora, sem drama.',
    },
    {
      numero: '04',
      titulo: 'Distribuição e leitura',
      texto:
        'O vídeo vai ao ar com apoio de social media e tráfego. Depois, lemos os números e ajustamos o próximo ciclo.',
    },
  ],
};

/* Quem somos — seção dos fundadores -------------------------- */
export const SOCIOS = {
  servicos: [
    'Estratégia',
    'Produção de Vídeos',
    'Fotografias',
    'Social Media',
    'Tráfego Pago',
  ],
  esquerda: {
    nome: 'Ryan Cardoso',
    papel: 'Marketing e Filmmaker',
  },
  direita: {
    nome: 'Gabrieli Ruivo',
    papel: 'Publicitária e Copywriter',
  },
  paragrafos: [
    'Nós somos Gabrieli e Ryan, fundadores da GravaMais Produções!',
    'Muitas empresas investem em marketing e conteúdo, mas poucas conseguem transformar em conversão. É por isso que unimos estratégia, narrativa e produção audiovisual para criar vídeos que fortalecem a imagem da empresa, geram credibilidade e ajudam a transformar atenção em oportunidades de negócio.',
    'Com base em Sorocaba/SP, produzimos mais do que vídeos, trabalhamos para que sua marca comunique valor, conquiste clientes e se diferencie no mercado.',
  ],
};

/* Sobre ------------------------------------------------------ */
export const SOBRE = {
  eyebrow: 'Quem somos',
  titulo: ['Uma dupla', 'obcecada por', 'resultado.'],
  destaque: 2,
  paragrafos: [
    'A GravaMais nasceu da inconformidade com o vídeo que só serve para enfeitar o feed. Somos uma produtora que entende de câmera, mas pensa como negócio.',
    'Estamos em campo em cada projeto: da conversa de diagnóstico à última correção de cor. Você não fala com um atendente — fala com quem dirige, grava e edita o seu material.',
    'Já produzimos para farmácia de manipulação, imobiliária, academia, barbearia, varejo e eventos. Segmentos diferentes, mesma lógica: vídeo com trabalho a fazer.',
  ],
  numeros: [
    { valor: '+10', label: 'marcas atendidas' },
    { valor: '+100', label: 'vídeos entregues' },
    { valor: '4', label: 'etapas até o resultado' },
  ],
};

/* CTA final -------------------------------------------------- */
export const CTA = {
  eyebrow: 'Vamos conversar',
  titulo: ['Vamos entender', 'o que você precisa?'],
  // -1 = nenhuma linha destacada. O TitleBlock compara índice com `destaque`,
  // então qualquer valor fora da faixa deixa o título inteiro sem a caixa.
  destaque: -1,
  lead: 'Responda algumas perguntas rápidas e nos conte um pouco sobre o seu projeto. Assim, chegamos à conversa já entendendo melhor o que sua empresa procura.',
  garantia: 'Resposta em até 24h',
};

/* Formulário -------------------------------------------------
   As respostas viram uma mensagem formatada no WhatsApp — não há backend e
   nada é armazenado aqui. O que a pessoa preenche sai do navegador dela
   direto para a conversa.

   `multipla` decide entre checkbox e radio; é a única diferença entre os
   passos de pergunta. O último passo é sempre o de dados. */
export const FORM = {
  passos: [
    {
      id: 'procura',
      pergunta: 'O que você está procurando?',
      ajuda: 'Pode selecionar mais de uma.',
      rodape: 'Leva menos de 1 minuto.',
      multipla: true,
      opcoes: [
        'Produção audiovisual constante',
        'Vídeo institucional',
        'Cobertura de evento',
        'Vídeo para YouTube',
        'Tráfego pago',
        'Ainda não sei',
      ],
    },
    {
      id: 'momento',
      pergunta: 'Qual é o momento do projeto?',
      multipla: false,
      opcoes: [
        'Preciso de algo pontual',
        'Preciso de conteúdo recorrente',
        'Tenho uma campanha ou lançamento',
        'Quero entender o que faz sentido',
      ],
    },
    {
      id: 'objetivo',
      pergunta: 'Qual é o principal objetivo?',
      multipla: false,
      opcoes: [
        'Fortalecer a marca',
        'Vídeo para anúncios',
        'Melhorar nossa presença digital',
        'Apresentar melhor a empresa ou produto',
        'Outro',
      ],
    },
  ],
  dados: {
    pergunta: 'Seus dados',
    ajuda: 'Só para sabermos com quem estamos falando.',
    campos: [
      { id: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true, autoComplete: 'name' },
      { id: 'empresa', label: 'Empresa', tipo: 'text', obrigatorio: false, autoComplete: 'organization' },
      { id: 'whatsapp', label: 'WhatsApp', tipo: 'tel', obrigatorio: true, autoComplete: 'tel' },
    ],
  },
  enviar: 'ENVIAR',
  voltar: 'Voltar',
  avancar: 'Continuar',
  aviso: 'Leva menos de 1 minuto.',
};
