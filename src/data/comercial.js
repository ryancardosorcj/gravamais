/* ============================================================
   GRAVAMAIS — CONTEÚDO DO TEMPLATE "COMERCIAL"
   Segundo template de proposta, paralelo a data/proposta.js — rota
   /comercial/:slug, servido em /comercial/base. Mesma regra: todo texto e
   número vive aqui, os componentes só consomem.

   `base` é o TEMPLATE. Duplique a chave para abrir um cliente novo, do
   mesmo jeito que CLIENTES_PROPOSTA.base funciona em data/proposta.js.
   O hero é o MESMO da proposta (data/proposta.js → HERO_PROPOSTA): mesmo
   vídeo, por isso não há uma constante de hero separada aqui.
   ============================================================ */

export const CLIENTES_COMERCIAL = {
  base: {
    nome: 'Sua Marca',
    logo: null,
  },
};

export const CLIENTE_PADRAO_COMERCIAL = { nome: 'Sua Marca', logo: null };

/* 2 · Mapa estratégico — "a visão do projeto".
   Nó central (o objetivo do negócio) ramificando em quatro frentes. São os
   mesmos quatro pilares de LEITURA.pilares (data/proposta.js), só reescritos
   como rótulo curto + uma linha — formato de nó, não de frase corrida.
   Ícones disponíveis no componente: Search · Clapperboard · Film · Share2. */
export const MAPA_ESTRATEGICO = {
  eyebrow: 'A visão do projeto',
  titulo: ['O seu objetivo.', 'Um plano para chegar lá.'],
  destaque: 0,
  lead: 'Veja o papel de cada frente e como elas se conectam na estratégia do seu negócio.',
  nucleo: 'Objetivo do negócio',
  nos: [
    {
      icone: 'Search',
      titulo: 'Estratégia',
      texto: 'Públicos, mensagens e ações organizados a partir do diagnóstico da marca.',
    },
    {
      icone: 'Clapperboard',
      titulo: 'Captação',
      texto: 'Direção e produção dirigidas para aproveitar cada diária de gravação.',
    },
    {
      icone: 'Film',
      titulo: 'Pós-produção',
      texto: 'Edição pensada para retenção e conversão, não só para estética.',
    },
    {
      icone: 'Share2',
      titulo: 'Distribuição',
      texto: 'Os conteúdos certos, nos canais certos, no ritmo combinado com você.',
    },
  ],
};

/* 3 · Os primeiros 30 dias — tabs com progresso + card de mockup.
   `mockup` muda de forma por etapa: 'diagnostico' mostra barras de leitura,
   'estrategia' mostra a árvore objetivo→frentes, 'distribuicao' mostra os
   canais e o calendário do mês. Terceira etapa é "Distribuição", não "Site":
   a GravaMais não entrega site. */
export const PRIMEIROS_DIAS = {
  eyebrow: '01 / Os primeiros 30 dias',
  titulo: ['Uma base sólida', 'para começar.'],
  lead: 'Aprofundamos o diagnóstico, detalhamos o plano e organizamos a distribuição da marca.',
  etapas: [
    {
      id: 'diagnostico',
      rotulo: 'Diagnóstico',
      dias: '01/03',
      mockup: 'diagnostico',
      barras: ['Comunicação', 'Presença digital', 'Prioridades'],
      selo: 'Oportunidades identificadas',
      titulo2: 'Entender o momento.',
      oQueFazemos: 'Avaliamos a comunicação, a presença digital e o momento da empresa.',
      oQueRecebe: 'Um diagnóstico com os pontos de atenção e as prioridades de ação.',
      proximo: 'Estratégia',
    },
    {
      id: 'estrategia',
      rotulo: 'Estratégia',
      dias: '02/03',
      mockup: 'estrategia',
      nucleo: 'Objetivo do negócio',
      ramos: ['Mensagens', 'Conteúdos', 'Campanhas'],
      titulo2: 'Detalhar o plano.',
      oQueFazemos: 'Organizamos públicos, mensagens e ações a partir das prioridades identificadas.',
      oQueRecebe: 'Um plano de comunicação para orientar a produção.',
      proximo: 'Distribuição',
    },
    {
      id: 'distribuicao',
      rotulo: 'Distribuição',
      dias: '03/03',
      mockup: 'distribuicao',
      canais: ['Instagram', 'YouTube', 'WhatsApp', 'Tráfego pago'],
      selo: 'Calendário alinhado à estratégia',
      titulo2: 'Organizar a chegada.',
      oQueFazemos: 'Definimos os canais, o ritmo de publicação e o calendário do primeiro ciclo.',
      oQueRecebe: 'Um calendário de distribuição pronto para o primeiro mês.',
      proximo: null,
    },
  ],
};

/* 4 · Da estratégia à produção — seção escura isolada.
   O vídeo que roda em loop à esquerda é o MESMO do hero (HERO_PROPOSTA.vslId
   em data/proposta.js) — só muda a moldura. Três entregas, não duas: a
   referência não tinha "Tráfego", a GravaMais entrega. */
export const ENTREGAS = {
  eyebrow: '02 / Da estratégia à produção',
  titulo: ['Agora, a direção', 'ganha forma.'],
  destaque: 1,
  lead: 'Produzimos vídeos, fotos e tráfego para comunicar o que precisa ganhar destaque.',
  cards: [
    {
      icone: 'Video',
      titulo: 'Vídeos com direção',
      texto: 'Captação e edição para apresentar a empresa, seus diferenciais e suas histórias.',
    },
    {
      icone: 'Camera',
      titulo: 'Fotos que comunicam',
      texto: 'Imagens para valorizar espaços, pessoas, produtos e detalhes da marca.',
    },
    {
      icone: 'Megaphone',
      titulo: 'Tráfego que amplifica',
      texto: 'Campanhas para colocar o conteúdo certo na frente de quem decide.',
    },
  ],
};

/* 5 · Materiais do mês — demo de aprovação via WhatsApp.
   `chat` e `aprovado` alimentam o mockup de celular; `passos` alimenta a
   lista ao lado, com o item ativo sincronizado ao estágio do mockup. */
export const MATERIAIS_DO_MES = {
  eyebrow: '03 / Como você recebe',
  titulo: ['Materiais do mês.', 'Aprovação em poucos toques.'],
  lead: 'Receba o link pelo WhatsApp e revise os conteúdos em uma única conversa.',
  passos: [
    {
      titulo: 'O link chega pelo WhatsApp.',
      texto: 'Avisamos quando a seleção do mês estiver pronta para revisão.',
    },
    {
      titulo: 'Você revisa e aprova.',
      texto: 'Confira vídeos e legendas e aprove cada material direto na conversa.',
    },
    {
      titulo: 'Seguimos para a publicação.',
      texto: 'Os posts aprovados entram no calendário combinado.',
    },
  ],
  chat: {
    contato: 'GravaMais',
    mensagens: [
      { de: 'eles', texto: 'Oi! Finalizamos os conteúdos deste mês. Podemos te enviar para aprovação?' },
      { de: 'voce', texto: 'Claro! Pode mandar 😊' },
      {
        de: 'eles',
        texto: 'Aqui está! Abra para revisar os vídeos e as legendas.',
        anexo: 'Seus materiais do mês · 3 vídeos para aprovação',
      },
    ],
  },
  revisao: {
    titulo: 'Materiais do mês',
    item: 'Post 02 · Vídeo',
    legenda: 'Vídeo e legenda reunidos para você revisar.',
    cta: 'Aprovar este post',
  },
  aprovado: {
    titulo: 'Tudo aprovado.',
    subtitulo: 'Posts em veiculação!',
    legenda: '3 de 3 aprovados',
  },
};

/* 6 · Tudo se conecta ao objetivo — funil Engajamento → Lead no CRM →
   Conversa → Venda. Cada estágio troca o mockup e o texto à direita; o
   mockup fica em `visual`, consumido pelo componente por `id`. */
export const JORNADA = {
  eyebrow: '04 / Tudo se conecta ao objetivo',
  titulo: ['O vídeo é o caminho.', 'O destino é o seu objetivo.'],
  destaque: 0,
  lead: 'Da comunicação ao contato. Do contato ao atendimento comercial.',
  estagios: [
    {
      id: 'engajamento',
      rotulo: 'Engajamento',
      icone: 'Heart',
      passo: '01 / A atenção vira interesse',
      titulo: 'Seu conteúdo abre conversas.',
      texto: 'Curtidas e comentários aproximam pessoas da marca. Algumas querem saber mais.',
      post: {
        curtidas: 321,
        comentarios: [
          { nome: 'Lucas', texto: 'Quero saber mais' },
          { nome: 'Ana', texto: 'Muito bom, já mandei pra equipe' },
          { nome: 'Pedro', texto: 'Vocês atendem na minha região?' },
        ],
      },
    },
    {
      id: 'lead',
      rotulo: 'Lead no CRM',
      icone: 'Kanban',
      passo: '02 / Passagem para o comercial',
      titulo: 'O lead chegou. Seu comercial assume.',
      texto: 'A GravaMais gera e encaminha o lead. A partir daqui, atendimento, negociação e fechamento são responsabilidade da equipe comercial.',
      colunas: ['Novo contato', 'Em atendimento', 'Venda'],
      lead: { nome: 'Marina', origem: 'Anúncio Instagram' },
    },
    {
      id: 'conversa',
      rotulo: 'Conversa',
      icone: 'MessageCircle',
      passo: '03 / Atendimento comercial',
      titulo: 'Atendimento que leva à decisão.',
      texto: 'O time comercial entende a necessidade, apresenta a proposta e conduz a negociação.',
      mensagens: [
        { de: 'lead', texto: 'Olá! Vi o vídeo e queria saber mais sobre o serviço.' },
        { de: 'comercial', texto: 'Oi, Marina! O pacote completo fica R$ 1.200. Posso reservar para você?' },
        { de: 'lead', texto: 'Perfeito! Vamos fechar.' },
      ],
    },
    {
      id: 'venda',
      rotulo: 'Venda',
      icone: 'Wallet',
      passo: '04 / Fechamento comercial',
      titulo: 'A negociação avança. A venda se concretiza.',
      texto: 'O fechamento e o recebimento são conduzidos pelo time comercial — a simulação mostra a continuidade do trabalho depois do lead.',
      saldo: 'R$ 12.190,00',
      pagamentos: [
        { nome: 'Pedro', valor: '+R$ 1.500' },
        { nome: 'Ana', valor: '+R$ 640' },
        { nome: 'Marina', valor: '+R$ 1.200' },
      ],
    },
  ],
};

/* 7 · CTA final — abre caminho para os planos, que já existem e não mudam
   (PlanosDetalhe + PlanosSelector, ambos reaproveitados sem alteração). */
export const CTA_INVESTIMENTO = {
  eyebrow: '05 / Investimento na parceria',
  titulo: ['Você conhece o caminho.', 'Vamos construir juntos?'],
  cta: 'Conhecer o investimento',
  ctaHref: '#planos',
};
