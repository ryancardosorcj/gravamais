/* ============================================================
   GRAVAMAIS — CONTEÚDO DA PÁGINA DE PROPOSTA
   Mesma regra de site.js: todo texto e número vive aqui.
   Para um cliente novo, acrescente uma chave em CLIENTES_PROPOSTA.
   ============================================================ */
import { PORTFOLIO } from './site';

/* As listas de categoria do portfólio, e o rótulo que cada uma imprime no
   card. `destaques` fica de fora de propósito: ela repete itens das outras e
   uma busca por título acharia a cópia errada. */
const CATEGORIA_POR_LISTA = {
  institucional: 'Institucional',
  inauguracoes: 'Inauguração',
  eventos: 'Evento corporativo',
  redeSocial: 'Redes sociais',
};

/* Monta a seleção do portfólio a partir dos TÍTULOS, que é como o portfólio é
   discutido na conversa — nada de índices, que mudam de lugar toda vez que um
   vídeo novo entra no meio da lista em site.js.

   Título inexistente estoura na hora em que o módulo carrega, em vez de sumir
   calado do carrossel — a página inteira falha e o erro fica visível, que é
   melhor do que uma proposta ir ao cliente com cinco vídeos de seis. Vale
   conferir a página depois de mexer nesta lista: o build passa de qualquer
   jeito, porque a chamada só roda no navegador. */
export function montarPortfolio(titulos) {
  return titulos.map((titulo) => {
    for (const [lista, categoria] of Object.entries(CATEGORIA_POR_LISTA)) {
      const video = PORTFOLIO[lista].find((v) => v.titulo === titulo);
      if (video) return { ...video, categoria };
    }
    throw new Error(`Vídeo não encontrado no portfólio: "${titulo}"`);
  });
}

/* Cada chave é o :slug da rota /proposta/:slug.

   `olhar` é a ÚNICA parte da página escrita do zero a cada cliente — é o
   estudo daquela empresa. Cliente sem `olhar` não renderiza a seção, em vez
   de renderizá-la vazia: uma proposta com quatro blocos em branco diz o
   contrário do que a seção existe para dizer.

   `base` é o TEMPLATE, servido em /proposta/base. Não é um cliente: é a versão
   canônica da página, a que se olha para conferir o padrão e a que se copia
   para abrir um cliente novo. Melhorias no padrão entram nela.

   Os textos dela descrevem o que vai em cada campo. Substitua ao duplicar;
   nenhum cliente real deve entrar no ar com eles. */
export const CLIENTES_PROPOSTA = {
  base: {
    nome: 'Sua Marca',
    logo: null,
    /* Este é o formato do `olhar` a ser copiado numa proposta nova. Os quatro
       blocos são fixos; o que muda de cliente para cliente é a copy e as fotos.

       Cada bloco abre com `headline` e sustenta com UM dos três corpos:
       `itens` (lista com ícone), `passos` (rótulo dourado + descrição) ou
       `texto` (parágrafo, opcionalmente com `icone` solto acima). `nota` é o
       rodapé em letra menor e é sempre opcional.

       `headline` é uma lista de partes para poder pintar só um trecho de
       dourado — veja o bloco 03, onde o dourado carrega o diagnóstico.

       Ícones disponíveis: calendario · engrenagem · predio · check · olho
       nas direções: estrela · escudo · balao · alvo */
    olhar: {
      negocio: {
        headline: [{ texto: 'Uma frase sobre o que o estudo viu no negócio.' }],
        itens: [
          { icone: 'calendario', texto: 'Um fato curto — tempo de mercado' },
          { icone: 'engrenagem', texto: 'Um fato curto — estrutura ou capacidade' },
          { icone: 'predio', texto: 'Um fato curto — quem a empresa atende' },
        ],
        nota: 'O que a empresa também faz e não coube nos itens acima.',
      },
      diferencial: {
        headline: [{ texto: 'O que a empresa já faz bem e hoje não aparece.' }],
        itens: [
          { icone: 'check', texto: 'Primeira prova desse diferencial' },
          { icone: 'check', texto: 'Segunda prova desse diferencial' },
          { icone: 'check', texto: 'Terceira prova desse diferencial' },
        ],
        nota: 'A leitura que esses pontos permitem sobre a marca.',
      },
      oportunidade: {
        /* O dourado abre e fecha a frase, com o meio em branco: é a única
           afirmação da seção que contraria uma leitura provável do cliente,
           então é a que pede ênfase. */
        headline: [
          { texto: 'O problema ', gold: true },
          { texto: 'não parece ser o que se imagina. ' },
          { texto: 'É outra coisa.', gold: true },
        ],
        icone: 'olho',
        texto: 'O espaço que o estudo identificou: posicionamento, autoridade, percepção de valor ou geração de demanda.',
      },
      comunicacao: {
        headline: [{ texto: 'O que o conteúdo precisa fazer na prática.' }],
        passos: [
          { rotulo: 'Mostrar', texto: 'O que precisa ficar visível.' },
          { rotulo: 'Provar', texto: 'O que precisa ser comprovado.' },
          { rotulo: 'Diferenciar', texto: 'O que separa da concorrência.' },
        ],
      },
      direcoes: [
        { texto: 'Autoridade', icone: 'estrela' },
        { texto: 'Desejo', icone: 'alvo' },
        { texto: 'Quebra de objeções', icone: 'balao' },
        { texto: 'Diferenciação', icone: 'escudo' },
      ],
      /* Faixas ao fundo, só de lg para cima. Na proposta real elas vêm do
         mundo do cliente; aqui são stills de produção segurando o lugar. */
      imagens: [
        '/proposta/base/faixa-1.jpg',
        '/proposta/base/faixa-2.jpg',
        '/proposta/base/faixa-3.jpg',
      ],
    },
  },
  mgsolar: {
    nome: 'MG Solar Itu',
    logo: '/proposta/logo-mgsolar.png',
    /* Formato desenhado: cada bloco abre com uma headline e sustenta com itens
       curtos, em vez do parágrafo único dos outros clientes. Mesma substância
       do estudo — só destrinchada para ser lida de relance. */
    olhar: {
      negocio: {
        headline: [{ texto: 'Uma operação maior do que a comunicação mostra.' }],
        itens: [
          { icone: 'calendario', texto: '+20 anos de mercado' },
          { icone: 'engrenagem', texto: 'Engenharia própria' },
          { icone: 'predio', texto: 'Projetos residenciais, comerciais, industriais e rurais' },
        ],
        nota: 'Atua também com sistemas híbridos, off-grid, mercado livre e carregadores para veículos elétricos.',
      },
      diferencial: {
        headline: [{ texto: 'Conhecimento técnico é um dos ativos da marca.' }],
        itens: [
          { icone: 'check', texto: 'Projetos personalizados' },
          { icone: 'check', texto: 'Equipe de engenharia' },
          { icone: 'check', texto: 'Acompanhamento próximo' },
        ],
        nota: 'Existe repertório e experiência para sustentar uma comunicação de autoridade.',
      },
      oportunidade: {
        /* A headline quebra em três partes porque o dourado carrega o
           diagnóstico — "o problema" e o veredito — e o meio fica em branco.
           É a única frase da seção que discorda de uma leitura provável, então
           ela é a que precisa de ênfase. */
        headline: [
          { texto: 'O problema ', gold: true },
          { texto: 'não parece ser falta de experiência. ' },
          { texto: 'É falta de percepção.', gold: true },
        ],
        icone: 'olho',
        texto: 'Quem pesquisa energia solar encontra a MG Solar, mas o digital ainda não traduz a estrutura que existe por trás da operação.',
      },
      comunicacao: {
        headline: [{ texto: 'Conteúdo que mostra o que a empresa já é.' }],
        passos: [
          { rotulo: 'Mostrar', texto: 'A estrutura, engenharia e operação.' },
          { rotulo: 'Provar', texto: 'Projetos, obras e clientes reais.' },
          { rotulo: 'Diferenciar', texto: 'Conhecimento técnico e experiência.' },
        ],
      },
      direcoes: [
        { texto: 'Autoridade', icone: 'estrela' },
        { texto: 'Prova', icone: 'escudo' },
        { texto: 'Quebra de objeções', icone: 'balao' },
        { texto: 'Diferenciação', icone: 'alvo' },
      ],
      imagens: [
        '/proposta/mgsolar/faixa-1.jpg',
        '/proposta/mgsolar/faixa-2.jpg',
        '/proposta/mgsolar/faixa-3.jpg',
      ],
    },
    portfolio: montarPortfolio([
      'Germânia',
      'PP Alumínio',
      'Lançamento Toyota',
      'Depoimento PS Digital',
      'Lixadeira',
      'Serra Copo',
    ]),
    planos: {
      /* Negociado para esta proposta: o ESCALA de 8 sai por 2500 e a promoção
         do 10 cai. A tabela do plano é substituída inteira — os outros dois
         planos seguem no padrão. */
      precos: { escala: { 4: 1500, 6: 1900, 8: 2500, 10: 3300 } },
      promos: { escala: null },
      inicial: { escala: 8 },
    },
  },
  aquila: {
    nome: 'Espaço Áquila',
    logo: '/proposta/logo-aquila.png',
    olhar: {
      negocio:
        'Estética automotiva em Itu voltada a carros de alto padrão: polimento, higienização e lavagem. Empresa nova, com a agenda girando pelos stories e os primeiros anúncios já rodando no Meta.',
      diferencial:
        'O serviço é premium e a presença é diária — os stories conversam com o público e fecham horário todo dia. O acabamento da comunicação é que ainda não acompanha o padrão do carro que entra no box.',
      oportunidade:
        'Estética automotiva se prova na imagem: o resultado está no carro. Sendo empresa nova, é justamente a imagem que precisa sustentar o preço e vencer a desconfiança do primeiro contato.',
      comunicacao:
        'Registrar resultado e processo com o mesmo cuidado do serviço: antes e depois tratados, rotina do box e carros atendidos. Isso eleva o que já é publicado diariamente, dá peça profissional para o Meta e constrói a prova que uma operação nova ainda não tem.',
      /* Sem "Autoridade": em empresa nova ela ainda não é alavanca, e prometer
         autoridade sem lastro é o oposto do que a seção faz. Quem carrega o
         peso aqui é a prova. "Desejo" entra porque, diferente de um serviço
         técnico, aqui o resultado é visual e vende sozinho. */
      direcoes: ['Desejo', 'Prova', 'Diferenciação', 'Quebra de objeções'],
    },
    portfolio: montarPortfolio([
      'Germânia',
      'Villa Maré Hotel',
      'Lançamento Toyota',
      'Toyota',
      'Criativo Barbearia',
      'Mini Serie Barbearia',
    ]),
  },
};

export const CLIENTE_PADRAO = { nome: 'Sua Marca', logo: null };

/* 1 · Hero --------------------------------------------------- */
export const HERO_PROPOSTA = {
  /* Vale para todas as propostas: é a GravaMais recebendo quem abriu a
     página, não um texto do cliente. */
  saudacao: 'Seja bem-vindo',
  subtitulo:
    'Uma direção audiovisual desenhada para transformar atenção em percepção de valor.',
  cta: 'Conheça a proposta',
  ctaHref: '#leitura',
  vslId: 'd82dc6bc-6b6a-482b-b1e5-4886c35abd3d',
};

/* 2 · Nossa leitura ------------------------------------------ */
export const LEITURA = {
  /* Strings corridas, não arrays de linhas: no layout de referência o título
     quebra sozinho pela largura da coluna. Forçar as quebras deixaria a
     terceira linha órfã em telas médias.
     A segunda frase é a que recebe o acento em limão. */
  titulo: 'Sua marca não precisa apenas aparecer.',
  tituloDestaque: 'Precisa ser reconhecida.',
  lead: 'Unimos estratégia, direção criativa e produção audiovisual para construir uma presença coerente, da primeira ideia ao conteúdo que chega ao público.',
  /* Três números, não um. Eles respondem em sequência as dúvidas de quem lê
     uma proposta: sabe fazer, está há quanto tempo nisso, e o cliente fica
     depois de assinar. O último é o mais persuasivo e o que menos concorrente
     consegue mostrar. */
  numeros: [
    { prefixo: '+', valor: 1000, legenda: 'Vídeos entregues' },
    { prefixo: '+', valor: 6, legenda: 'Anos de mercado' },
    { valor: 90, sufixo: '%', legenda: 'Seguem após o primeiro ciclo' },
  ],
  pilares: [
    'Estratégia alinhada ao momento da marca',
    'Conceitos criativos com linguagem própria',
    'Captação dirigida para aproveitar cada diária',
    'Pós-produção pensada para retenção e conversão',
  ],
};

/* 3 · Portfólio — recorte enxuto, um pouco de cada categoria --- */
export const PORTFOLIO_PROPOSTA = {
  titulo: ['É assim que a estratégia', 'ganha forma.'],
  destaque: 1,
  lead: 'Uma seleção de projetos para mostrar estética, acabamento e a forma como traduzimos estratégia em linguagem visual.',
  itens: [
    { ...PORTFOLIO.institucional[0], categoria: 'Institucional' },
    { ...PORTFOLIO.institucional[1], categoria: 'Institucional' },
    { ...PORTFOLIO.eventos[0], categoria: 'Evento corporativo' },
    { ...PORTFOLIO.eventos[4], categoria: 'Evento corporativo' },
    { ...PORTFOLIO.inauguracoes[0], categoria: 'Inauguração' },
    { ...PORTFOLIO.inauguracoes[1], categoria: 'Inauguração' },
    { ...PORTFOLIO.redeSocial[3], categoria: 'Redes sociais' },
    { ...PORTFOLIO.redeSocial[16], categoria: 'Redes sociais' },
  ],
};

/* 4.5 · Como projetamos — moldura do MapaMental reaproveitado da LP.
   O componente é o mesmo; só o título, o lead e a ressalva entram por prop. */
export const METODO_PROPOSTA = {
  titulo: ['Como projetamos'],
  destaque: null,
  lead: 'Antes de definir entregas, entendemos o momento da empresa, seus objetivos e o que a comunicação precisa construir. A partir disso, conectamos estratégia, audiovisual e distribuição em uma operação pensada para fazer sentido para o negócio.',
};

/* 4.7 · Nosso olhar — a leitura da empresa do cliente.
   Só a moldura vive aqui; o conteúdo de cada bloco vem do `olhar` do cliente.
   `direcoes` é opcional e não precisa trazer as quatro: quando o estudo
   aponta duas, entram duas. */
export const OLHAR = {
  eyebrow: 'Nosso olhar',
  tituloPrefixo: 'Nosso olhar sobre',
  lead: 'Antes de definir uma solução, estudamos o momento da empresa, seu mercado, seu público e as oportunidades que podem ser exploradas na comunicação.',
  blocos: [
    { chave: 'negocio', rotulo: 'O negócio' },
    { chave: 'diferencial', rotulo: 'O diferencial' },
    { chave: 'oportunidade', rotulo: 'A oportunidade' },
    { chave: 'comunicacao', rotulo: 'A comunicação' },
  ],
  direcoesRotulo: 'Direções de conteúdo',
};

/* 5 · Planos — o POSICIONAMENTO de cada plano, não o escopo item a item.
   O escopo detalhado e o preço vivem no PlanosSelector, logo abaixo.

   A ordem é crescente (ESCALA → ESSENCIAL → PRO): as setas entre os cartões só
   fazem sentido lendo do menor grau de participação para o maior. */
export const PLANOS_CABECALHO = {
  eyebrow: 'Nossos planos',
  titulo: ['Três formas de trabalhar', 'a comunicação da sua empresa.'],
  lead: 'Cada plano foi pensado para um nível diferente de participação da GravaMais na sua operação. Escolha o que faz mais sentido para o momento da sua empresa.',
  nota: 'Mais do que produzir vídeos, nós ajudamos a construir uma comunicação com estratégia e resultado.',
};

/* As imagens são 1200x750 (16:10), a mesma proporção do slot no cartão. Elas
   entram com `object-cover`: trocar por um arquivo de outra proporção apara as
   bordas em vez de deformar. */
export const PLANOS_DETALHE = [
  {
    id: 'escala',
    nome: 'ESCALA',
    imagem: '/proposta/escala.jpg',
    titulo: 'Produção de conteúdo recorrente',
    texto:
      'Para empresas que já possuem uma estrutura de marketing e precisam de uma produção audiovisual consistente para manter sua comunicação ativa.',
    foco: 'Vídeos + Fotografias',
  },
  {
    id: 'essencial',
    nome: 'ESSENCIAL',
    imagem: '/proposta/essencial.jpg',
    titulo: 'Estratégia, produção e distribuição',
    texto:
      'Para empresas que precisam de uma estrutura mais completa, com planejamento, produção e distribuição dos conteúdos para manter sua comunicação ativa, posicionada e alcançando as pessoas certas.',
    foco: 'Vídeos + Fotografias + Estratégia + Distribuição + Alcance',
  },
  {
    id: 'pro',
    nome: 'PRO',
    imagem: '/proposta/pro.jpg',
    titulo: 'Uma operação completa',
    texto:
      'Para empresas que querem levar sua comunicação a outro nível, com estratégia, produção, distribuição, mídia e conversão trabalhando de forma integrada.',
    foco: 'Vídeos + Fotografias + Estratégia + Distribuição + Alcance + Conversão',
  },
];

/* 6 · Investimento — a moldura do PlanosSelector --------------- */
export const INVESTIMENTO = {
  titulo: ['Três formatos.', 'Uma decisão de posicionamento.'],
  destaque: 1,
  lead: 'O ESSENCIAL é onde a maioria das marcas acelera. ESCALA para começar; PRO para escalar. O escopo final é validado antes do início.',
};

/* 7 · FAQ ----------------------------------------------------- */
export const FAQ = {
  titulo: ['Tudo alinhado', 'para começar bem.'],
  destaque: 1,
  perguntas: [
    {
      pergunta: 'Qual é o prazo de entrega?',
      resposta:
        'O cronograma é definido após a captação. Como referência, trabalhamos com até 7 dias úteis.',
    },
    {
      pergunta: 'Como funciona o dia de captação?',
      resposta:
        'Chegamos com os roteiros aprovados e conduzimos a gravação, do setup de luz e áudio à direção de cada cena.',
    },
    {
      pergunta: 'Quantas revisões estão incluídas?',
      resposta:
        'O ESCALA inclui uma rodada consolidada de ajustes. O ESSENCIAL e o PRO incluem até duas, desde que respeitado o escopo aprovado.',
    },
    {
      pergunta: 'Os vídeos chegam prontos para publicar?',
      resposta:
        'No ESCALA os arquivos são entregues nos formatos combinados, com edição, tratamento de cor, trilha e legendas quando previstas no escopo. Nos planos ESSENCIAL e PRO, fazemos toda a gestão de postagem.',
    },
  ],
};

/* 8 · Fecho --------------------------------------------------- */
export const FECHO = {
  titulo: ['E aí,', 'vamos trabalhar juntos?'],
  destaque: 1,
  eyebrow: 'Contato',
};
