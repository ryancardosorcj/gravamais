# GravaMais — Design System v7

**Fonte única da verdade.** Styleguide vivo em `/styleguide.html`.

Estilo: **vidro sobre cinema.** O hero é a VSL em loop mudo; a interface flutua
por cima em lâminas de vidro. O trabalho audiovisual é o herói.

**v7 — passada de sobriedade.** Menos amarelo e menos movimento, sem trocar a
paleta: o limão continua sendo `#FFF97D` e continua sendo a única cor de ação.
O que mudou foi a **frequência** com que ele aparece (de todo lado para três
lugares) e a temperatura da animação. Referência da conversa: `novvaprodutora.com.br`
— monocromática, estática, B2B.

---

## 1. Tons de seção

**Não existe toggle de tema.** O tom é uma propriedade da **seção**:

```html
<section data-tone="light | dark | amber | wall">
```

Os tokens semânticos são redefinidos no escopo daquele elemento e herdam para
tudo que está dentro. Um mesmo `<Card>` ou `.btn-primary` muda de cor sozinho
conforme onde é usado — **sem variante, sem prop, sem `if`**.

O botão primário é **o mesmo limão em todos os tons** — uma cor de ação na página
inteira, sem exceção. O que muda com o tom é o entorno, não ele.

### Ritmo da página

A luz muda entre cenas, como num filme:

| Seção | Tom | Por quê |
|---|---|---|
| Hero | escuro | o vídeo é o herói |
| Faixa em movimento | escuro | prolonga o preto do hero em vez de cortá-lo |
| Clientes, Método, Serviços | claro | a página "acende"; texto longo respira |
| ↳ bloco da virada (Método) | escuro | inversão para PRETO — a mais forte numa seção clara |
| Portfólio | escuro | a imagem brilha |
| Processo | claro | |
| Quem somos | `wall` | a cena dos fundadores |
| CTA | `amber` | **a única superfície amarela da página** |
| Rodapé | escuro | |

### O amarelo aparece em três lugares. Só.

1. A palavra do hero (`.accent-on-video`)
2. O botão primário
3. O degradê do CTA

Nada mais. Havia **três** superfícies amarelas ao mesmo tempo — a faixa do
ticker, o bloco da virada e o CTA — e com isso nenhuma delas significava nada.
A faixa virou contorno escuro, a virada inverteu para preto, e o CTA ficou
sozinho com a cor.

> Regra de leitura: antes de pintar qualquer coisa de amarelo, confira se ela
> entra nessa lista de três. Se não entra, a resposta é tonal.

---

## 2. Cor

**Toda cor nasce de um asset real.** O limão e o preto vêm da logotipo; o dourado
vem do letreiro pintado na parede da cena dos fundadores. Nada foi escolhido a
olho — todos foram amostrados por pixel.

### O limão é a ÚNICA cor de ação

`--brand` = `#FFF97D` em **todos** os tons. Uma cor de botão na página inteira.

O problema: sobre branco o limão tem **1,10:1** de separação — ele some.
A solução **não** é trocar a cor (isso descaracterizaria a marca), e sim dar
forma a ele com **duas sombras**:

```css
--shadow-brand:
  0 1px 2px   rgba(15,15,15,.18),      /* contato: assenta o botão na página */
  0 6px 14px -4px rgba(15,15,15,.22),  /* difusa: levanta-o dela */
  0 16px 32px -12px rgba(180,160,20,.35);
```

Sem borda, sem traço. O texto preto sobre o limão dá **17,43:1** em qualquer tom.

### Amarelo como TEXTO é outra história

| Token | Papel | Dark | Light |
|---|---|---|---|
| `--brand` | **Superfície** (fundo de botão) | `#FFF97D` | `#FFF97D` |
| `--brand-ink` | **Texto** (eyebrow, rótulos) | `#FFF97D` | `#8A6A00` (ocre) |
| `--accent-text` | **Linha destacada do título** (`.accent`) | `#FFF97D` | `#5C5C5C` (tonal) |
| `--on-brand` | Texto sobre o limão | `#0F0F0F` | `#0F0F0F` |
| `--gold-400` | Textos sobre a cena | `#E8C88A` | — |

No claro, **nenhum amarelo vivo alcança 4,5:1 sobre branco** — o mais escuro que
ainda lê como "amarelo" (`#B8AC0F`) chega a 2,35:1. Por isso o texto de acento
vira ocre. Não é escolha estética: é a única saída.

### `--accent-text`: o destaque do título é tonal no claro

A linha destacada de cada título de seção **não é amarela no tom claro**. São
cinco seções com um título de duas ou três linhas cada; pintar uma linha de ocre
em todas fazia o amarelo aparecer tanto que parava de significar. O realce agora
vem do **tom** — o mesmo preto rebaixado um degrau (`--ink-500`, 6,69:1).

No escuro `--accent-text` continua sendo o limão: ali ele tem 18:1 e ganha o
direito de aparecer.

> É **uma linha** por tom em `tokens.css`. Para voltar ao ocre, basta
> `--accent-text: var(--brand-ink)` no bloco do tom claro.

> Nos componentes: `--brand` só como fundo, `--brand-ink` e `--accent-text` só
> como texto. Trocar um pelo outro quebra o tom claro silenciosamente.

### Degradês

- `--grad-amber` — **`#FFF97D` (o limão da marca) no topo → `#F7F7F7` em ~50%.**
  Nenhuma seção é amarelo chapado: o amarelo é luz que desmaia, e o pé claro
  emenda sozinho com a próxima seção. O CTA fica na **faixa clara**, onde o botão
  limão volta a ter contraste de fundo.
  A rampa encurtou (era 64%): passando a ser a única superfície amarela da
  página, ela precisa acender e sair de cena rápido.
- `--grad-wall` — concreto sob luz de janela. Preto puro chapa; o degradê dá volume.

### Contraste (medido, os dois temas)

| Par | Dark | Light |
|---|---|---|
| Título / fundo | 19,80:1 | 19,17:1 |
| Corpo / fundo | 9,55:1 | 10,37:1 |
| Apoio / fundo | 5,73:1 | 6,69:1 |
| **Acento do título (`--accent-text`) / fundo** | **18,01:1** | **6,69:1** |
| Rótulo (`--brand-ink`) / fundo | 18,01:1 | 5,07:1 |
| **Texto no botão amarelo** | **17,43:1** | **12,34:1** |
| `--fg-subtle` / fundo | 3,98:1 ⚠️ | 3,45:1 ⚠️ |

`--fg-subtle` não passa em 4,5:1 nos dois temas — **só em texto ≥24px**.

---

## 3. Liquid glass

Quatro camadas. Sem a quarta, é só um retângulo borrado:

1. `backdrop-filter: blur(20px)` — desfoca o fundo
2. `saturate(180%)` — sem isso o fundo fica **cinza** atrás do vidro
3. Tinta translúcida + borda
4. `inset 0 1px 0` no topo — o "menisco" que vende o vidro

### Duas famílias, e a diferença importa

| Classe | Lâmina | Usar sobre |
|---|---|---|
| `.glass` / `.glass-strong` | **Segue o tema** | Superfícies do tema |
| `.glass-dark` / `.btn-glass-dark` | **Escura fixa** | **Vídeo, foto, qualquer mídia** |

**A armadilha:** usar `.glass` sobre uma foto parece certo no tema escuro. No
tema claro a lâmina vira branca leitosa, o texto branco por cima some, e o card
fica ilegível. Sobre mídia é **sempre** `.glass-dark`.

O styleguide (§05) deixa um card errado de propósito, para você ver o efeito.

### Regras

- **Vidro precisa de fundo.** Sobre cor chapada não há o que desfocar.
- **Sempre com fallback.** `@supports not (backdrop-filter)` → superfície opaca.
- **Custa GPU.** Poucas lâminas por tela; nunca dentro de lista longa.

---

## 4. Tipografia

**Bricolage Grotesque** nos títulos — grotesca de contraste alto, com bico; é ela
que dá o peso de cartaz. **Plus Jakarta Sans** no corpo: some e deixa ler.

- Títulos: 700–800, `letter-spacing: -0.025em`
- Corpo: 400–500
- **JetBrains Mono**: uso restrito a metadados e rótulos técnicos. Não aparece na
  copy do site.

Escala: 12 · 14 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 96 px

---

## 5. Hero em vídeo

A VSL roda em loop, **muda, sem controles**, como plano de fundo.

O iframe do YouTube é 16:9 e **não aceita `object-fit`**. A classe `.video-cover`
resolve dimensionando pelo lado que sobra: `177.77vh` de largura (16/9 da altura)
e `56.25vw` de altura (9/16 da largura), centralizado. Assim cobre qualquer
viewport sem barras pretas.

O `.hero-scrim` por cima é **obrigatório**: sem o véu, o texto branco morre num
frame claro do vídeo. O véu é escuro **nos dois temas** — o vídeo não muda de cor
com o tema, então o texto sobre ele é sempre branco.

Sobre o vídeo, o acento usa `--yellow-200` (classe `.accent-on-video`), não
`--brand-ink`: ali o fundo é sempre escuro.

---

## 7. Movimento

Uma curva na página inteira: **`cubic-bezier(0.16, 1, 0.3, 1)`** (expo.out).

| Token | Duração |
|---|---|
| `--duration-fast` | 150ms — press, hover |
| `--duration-base` | 250ms — padrão |
| `--duration-slow` | 400ms — zoom de imagem |
| `--duration-slower` | 600ms — reveal de seção |

Anima-se **só `transform` e `opacity`**. `prefers-reduced-motion` zera tudo.

### Movimento é discreto por padrão

- **Reveal de seção**: 16px de percurso, 0.6s. Era 24px / 0.7s — deslocamento
  longo faz a página inteira parecer que está "montando" enquanto se rola. A
  entrada deve ser percebida de canto de olho, não assistida.
- **Faixa em movimento**: 56s por volta (era 38s). É pano de fundo, não atração.
- **Hover de card**: 3px de elevação, borda e sombra. Nada gira, nada pisca.
- **Prova social não se mexe.** A parede de logos é uma grade estática: movimento
  contínuo puxa o olho justamente na seção cujo único trabalho é estabelecer
  confiança e sair do caminho.

---

## 8. Espaço

Escala 4pt, ritmo generoso.

> ⚠️ **Não sobrescreva `spacing` no `tailwind.config.js`.** As chaves 1–11 também
> alimentam `h-*`, `w-*` e `gap-*` — redefini-las faz `h-11` virar 160px em vez
> de 44px e deforma todos os botões. Já aconteceu neste projeto. A escala nativa
> do Tailwind já é 4pt; os tokens `--space-*` valem só dentro das classes de
> componente em `index.css`.

---

## 8.1 Armadilhas do Tailwind (as duas que já morderam)

**1. Opacidade sobre token `var()` falha em silêncio.**
`bg-brand/60` **não é gerada** se `colors.brand` apontar para `var(--brand)` em
hex. A classe simplesmente não existe e o elemento não pinta nada — sem erro,
sem aviso. Por isso os tokens usados com alpha são expostos em **canais RGB**:

```js
brand: 'rgb(var(--brand-rgb) / <alpha-value>)'
```

Se criar um token novo e for usá-lo com `/50`, ele precisa de um `--x-rgb`.

**2. Não sobrescreva `spacing`.** As chaves 1–11 também alimentam `h-*`, `w-*` e
`gap-*` — redefini-las faz `h-11` virar 160px em vez de 44px e deforma todos os
botões.

---

## 8.2 Halo é `box-shadow`, nunca pseudo-elemento

Um `::before` com `inset: -20%` se projeta para fora da caixa, **entra na conta
do `scrollWidth`** e cria rolagem horizontal na página inteira. Já aconteceu com
o card em destaque. `box-shadow` pinta fora da caixa sem ocupar layout.

Mesma lógica no coverflow: os cards laterais projetam por design, então o palco
leva `overflow-x: clip`.

---

## 9. Cards

Anatomia: **medalhão de ícone → título → duas réguas → fileira de pontos.**
As réguas não são enfeite: dão ritmo e fazem a fileira ler como um conjunto,
mesmo com textos de comprimentos diferentes.

O **medalhão é monocromático** (`--fg-primary`). O ícone em ocre puxava amarelo
para dentro de oito cards ao mesmo tempo; em preto, a fileira lê como conjunto e
o amarelo sobra para o botão. Nos cards `dark` e `amber` o medalhão é branco.

### O hover não gira

Sobe 3px, a borda ganha corpo (`--border-strong`), a sombra abre. Mais nada.

Duas tentativas anteriores foram **removidas**, nesta ordem: o reflexo rasante
(varria rápido demais para ser lido como brilho — virava um flash) e a borda de
luz em cônico animado via `@property` (um arco-íris girando em oito cards é o
oposto da direção premium). Não reintroduza nenhuma das duas.

`.card-featured` inverte para preto e acende. **Um por fileira, nunca dois** — se
dois acendem, o olho não sabe para onde ir.

> Só funciona em seção de **tom claro**. No escuro todos os cards já são escuros
> e o destaque desaparece.

---

## 10. Coverflow do portfólio

Cada card recebe uma posição relativa ao centro (…−2, −1, 0, 1, 2…). Quanto mais
longe, mais recuado em Z, mais girado em Y, mais escuro e mais desfocado.

**O desfoque é o que cria a profundidade** — só recuar em Z não basta, o olho
ainda tenta ler os laterais. Cards além de ±2 não são renderizados.

A perspectiva vive no **contêiner**; sem ela o `rotateY` vira um achatamento sem
volume.

Os dots têm 24×44px de alvo de toque (WCAG 2.5.8 AA pede 24×24). Sete dots a
44px não caberiam em 375px — as setas de 44px e a navegação por teclado são a
alternativa acessível.

---

## 11. Seção "Quem somos" — a cena dos fundadores

A imagem **é** a cena: parede de concreto, luz de janela e o letreiro GRAVAMAIS
pintado no reboco já vêm prontos na foto. Ela ocupa a seção com `object-cover`.

A tentativa anterior — recorte PNG + tipografia jogada por cima de um preto
chapado — falhava porque nada pertencia a nada.

Os textos usam o **dourado da própria parede** (`--gold-400`, amostrado da foto).
É o que faz a tipografia pertencer à cena.

O posicionamento é ancorado nas **pessoas**, não na caixa:
- a pílula de serviços sobe para não cair na cabeça da Gabrieli;
- "Quem somos" é alinhado à direita, e é o **tamanho** (`clamp(…, 8.6vw, 8rem)`)
  que decide onde o "Q" nasce — calibrado para cair na altura do cotovelo do Ryan;
- `leading-[1.05]`, não `0.9`: a cauda do "Q" descia abaixo da caixa e era
  cortada pelo bloco de texto seguinte.

> A tela intermediária com a pergunta "Quem somos?" e a máquina de estados de
> scroll foram **removidas**. O componente e sua documentação saíram do projeto.

---

## 12. Regras invioláveis

1. **Uma ação primária por tela.** Se tudo é amarelo, nada é.
2. **Sem hex cru nos componentes.** Só tokens semânticos.
3. **`--brand` é fundo, `--brand-ink` é texto.** Trocar quebra o tema claro.
4. **Sobre mídia, vidro escuro.** Sempre.
5. **Sem emoji como ícone.** Só SVG (Lucide).
6. **Foco sempre visível.** `:focus-visible` nunca é removido.
7. **Alvo de toque ≥ 44px.** Sem exceção.

## 10. Anti-padrões

- Uma segunda cor de acento. A força vem da escassez.
- Amarelo como superfície de seção — **só o CTA**. Ver §1: são três aparições do
  amarelo na página inteira, e a lista é fechada.
- Vidro sobre cor chapada. Não há o que desfocar.
- Testar só num tema. Contraste do claro **não** se infere do escuro.
- **Movimento decorativo contínuo** — esteira de logos, borda girando, reflexo
  varrendo. Tudo isso já esteve aqui e saiu. Animação responde a uma ação
  (hover, entrada em viewport) ou não existe.
- **Amarelo como ícone sobre superfície clara.** `text-brand` numa lâmina de
  vidro claro dá 1,10:1 — o ícone fica invisível. Já aconteceu nos cards do
  Método. Ícone sobre claro é `--fg-primary`.
