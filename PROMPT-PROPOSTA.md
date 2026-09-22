# Prompt — Página de Apresentação de Proposta (base)

Cole este arquivo inteiro como instrução, ou diga: *"siga o PROMPT-PROPOSTA.md"*.

---

## Objetivo

Construir a **página-base de apresentação de proposta** em `/proposta/:slug`.
Ela é um **template**: a partir dela, cada cliente novo vira uma variação
trocando só dados (nome, logo, copy pontual), nunca estrutura.

A rota, o roteamento e o componente de planos **já existem e funcionam**. Esta
tarefa é construir as 7 seções que faltam ao redor deles.

---

## Regras invioláveis

1. **`src/components/PlanosSelector.jsx` não muda.** Layout, design, grade,
   dropdowns, lógica de preço e promoções ficam exatamente como estão. Ele é
   a seção 6 (Investimento). Só se altera **copy**, e só quando eu pedir
   explicitamente. Não "melhore", não refatore, não ajuste espaçamento.

2. **Design é o da landing page.** Nenhum visual novo é inventado. Cada seção
   desta página reusa um padrão que já existe em `src/components/`. Leia
   `design-system/MASTER.md` antes de escrever qualquer coisa visual.

3. **Sem hex cru, sem primitivos.** Só a camada semântica: `bg-bg-surface`,
   `text-brand`, `text-fg-muted`, `border-subtle`, `text-gold`. Ver as 3
   camadas em `src/styles/tokens.css`.

4. **O amarelo é escasso.** A v7 do design system reduziu o limão a poucas
   aparições fechadas, reservadas a CTA e acento pontual. Não espalhe. O
   dourado (`--gold-*`) é o acento de trilha/ícone; o limão é de ação.

5. **Conteúdo separado da apresentação.** Todo texto, número e lista vai em
   **`src/data/proposta.js`**, no mesmo formato de `src/data/site.js`
   (`export const HERO_PROPOSTA = {...}`). Componentes só consomem. É isso que
   faz o template ser template: para um cliente novo eu edito um arquivo só.

6. **Contraste tem que fechar.** No print de referência da seção 2, o ícone
   amarelo sobre o off-white sumiu. Não repita: todo ícone, número e traço de
   gráfico precisa ser legível contra o fundo em que está.

---

## Armadilhas já conhecidas (de `CLAUDE.md`)

- Não sobrescreva `spacing` no `tailwind.config.js` — quebra `h-*`/`w-*`.
- `.btn` tem `white-space: nowrap`; sem `max-width: 100%` estoura grid estreito.
- `lucide-react` não exporta ícones de marca (Instagram é SVG inline).
- Vídeo do Bunny entra por `<iframe player.mediadelivery.net/embed/753229/{id}>`,
  como em `Hero.jsx` e `PortfolioDestaques.jsx`.

---

## Verificação

Não há testes. Rodar `npm run dev` e conferir em **375px** e **1440px**.
Depois `npm run build` antes de qualquer commit — o Vercel roda `npm ci`, então
**`package-lock.json` tem que ir junto** com qualquer dependência nova. Foi
exatamente isso que quebrou o último deploy.

---

# Estrutura — 8 seções

## 1. Hero

Mesmo padrão de `src/components/Hero.jsx`: vídeo Bunny em loop, mudo, sem
controles, como plano de fundo + `.hero-scrim` + conteúdo ancorado embaixo.

- Logo GravaMais e logo do cliente, lado a lado (o slot do logo do cliente vem
  de `proposta.js`; precisa degradar bem quando não houver logo)
- Nome do cliente
- Subtítulo: *Uma direção audiovisual desenhada para transformar atenção em
  percepção de valor.*
- Botão: **Conheça a proposta** — âncora para a seção 2, não WhatsApp

## 2. Nossa leitura

- Título: *Sua marca não precisa apenas aparecer. Precisa ser reconhecida.*
- Subtítulo: *Unimos estratégia, direção criativa e produção audiovisual para
  construir uma presença coerente, da primeira ideia ao conteúdo que chega ao
  público.*
- Número em destaque ao lado: **+150 projetos colocados em movimento**
- Grade numerada 2×2 (layout do print de referência — quatro células, número
  em mono, ícone em quadrado de contorno, título em display bold):
  - `01` Estratégia alinhada ao momento da marca
  - `02` Conceitos criativos com linguagem própria
  - `03` Captação dirigida para aproveitar cada diária
  - `04` Pós-produção pensada para retenção e conversão

> Corrigir o contraste do print: o ícone tem que ser visível contra o fundo.

## 3. Portfólio

Versão **enxuta** do portfólio da LP — não é o `PortfolioExplora` inteiro.
Selecionar poucos itens cobrindo cada categoria de `PORTFOLIO` em `site.js`:
`institucional`, `inauguracoes`, `eventos`, `redeSocial`. Card, hover e modal
de player iguais aos de `PortfolioDestaques.jsx`.

## 4. Quem já confia

Idêntico a `src/components/Clientes.jsx`: eyebrow em mono
*"Algumas marcas que já confiaram no nosso trabalho"* + parede de logos
`CLIENTES.logos`. Reusar o componente direto se possível.

## 5. Planos

Texto de abertura da seção:

> Antes de definir entregas, entendemos o momento da empresa, seus objetivos e
> o que a comunicação precisa construir. A partir disso, conectamos estratégia,
> audiovisual e distribuição em uma operação pensada para fazer sentido para o
> negócio.

### 5.1 PRO

Copy: *A operação de conteúdo completa: estratégia, produção dirigida e
performance para transformar presença em demanda, sem você ter que orquestrar
nada.*

**Reusar o `MapaMental.jsx` exatamente como está na LP** — a trilha luminosa
com "Sua Empresa / O ponto de partida" no topo e os nós Diagnóstico →
Estratégia → Roteiro → Produção → Distribuição → Social Media → Tráfego Pago.

Depois, **"O que entregamos:"** como gráfico/diagrama:

> Vídeos + fotos + estratégia e marketing + tráfego completo + análises +
> social media completo + landing page — ideal para empresa que quer investir
> e ir para outro patamar.

- 6 a 8 vídeos
- ½ a 1 diária
- 6 a 8 fotografias
- Estratégia e roteiros
- Análise de resultados/métricas
- Reunião mensal
- Social Media Completo — legendas/capas/postagens · calendário editorial ·
  bio/destaques · 6 artes
- Tráfego Pago Completo
- Criação de Landing Page

Liberdade criativa na forma do gráfico. Única restrição: legibilidade.

### 5.2 ESSENCIAL — *Recomendado*

Copy proposta (ajustar se não servir): *A estrutura completa para se posicionar
e vender, sem o peso de uma operação inteira. Produção dirigida, estratégia e
uma plataforma de tráfego — no ritmo que a marca consegue sustentar.*

> Vídeos + fotos + estratégia e marketing + tráfego + análises — ideal para
> quem precisa de uma estrutura completa para se posicionar e vender.

- 4 a 6 vídeos
- ½ diária
- 4 a 6 fotografias
- Estratégia e roteiros
- Análise de resultados/métricas
- Reunião mensal
- Social Media Smart — legendas/capas/postagens
- Tráfego Pago em uma plataforma

### 5.3 ESCALA

Copy proposta (ajustar se não servir): *Volume com direção. Para quem já tem
time e marketing rodando e precisa de uma fonte constante de material bem
feito — sem camada de gestão, sem intermediário.*

> Apenas vídeos + fotos — ideal para quem já tem equipe e marketing e quer
> volume de vídeos e fotos.

- 4 a 10 vídeos
- ½ a 1 diária
- 4 a 10 fotografias
- Estratégia e roteiros

## 6. Investimento

- Título: *Três formatos. Uma decisão de posicionamento.*
- Subtítulo: *O ESSENCIAL é onde a maioria das marcas acelera. ESCALA para
  começar; PRO para escalar. O escopo final é validado antes do início.*

Aqui entra o **`PlanosSelector.jsx` intocado**. Única alteração permitida:
acrescentar **"Reunião mensal"** à lista de features do ESSENCIAL e do PRO.

## 7. Perguntas frequentes

Título: *Tudo alinhado para começar bem.* Acordeão.

**01 — Qual é o prazo de entrega?**
O cronograma é definido após a captação. Como referência, trabalhamos com até
7 dias úteis.

**02 — Como funciona o dia de captação?**
Chegamos com os roteiros aprovados e conduzimos a gravação, do setup de luz e
áudio à direção de cada cena.

**03 — Quantas revisões estão incluídas?**
O ESCALA inclui uma rodada consolidada de ajustes. O ESSENCIAL e o PRO incluem
até duas, desde que respeitado o escopo aprovado.

**04 — Os vídeos chegam prontos para publicar?**
No ESCALA os arquivos são entregues nos formatos combinados, com edição,
tratamento de cor, trilha e legendas quando previstas no escopo. Nos planos
ESSENCIAL e PRO, fazemos toda a gestão de postagem.

## 8. Fecho

- Logo GravaMais
- Título: *E aí, vamos trabalhar juntos?*
- Contato:
  - **(11) 93367-3894**
  - **@gravamaisproducoes**
  - **gravamaisproducoes.com.br**

> Puxar de `CONFIG` em `src/data/site.js`, que já tem os dados reais — não
> hardcodar o número nem o @ na seção.

---

## Entregáveis

- `src/data/proposta.js` — todo o conteúdo acima
- `src/pages/PropostaPage.jsx` — montagem das 8 seções
- Componentes novos só onde nenhum da LP serve; reusar sempre que servir
- `PlanosSelector.jsx` inalterado (exceto "Reunião mensal")
- Build passando e conferido em 375px e 1440px
