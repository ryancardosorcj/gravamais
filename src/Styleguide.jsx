/* ============================================================
   STYLEGUIDE VIVO — GravaMais · v7
   ============================================================ */
import { useEffect, useState } from 'react';
import {
  MessageCircle,
  Play,
  ArrowDown,
  Clapperboard,
  Camera,
  Share2,
  TrendingUp,
} from 'lucide-react';
import PortfolioCoverflow from './components/PortfolioCoverflow';
import QuemSomos from './components/QuemSomos';
import MotionBanner from './components/MotionBanner';
import { Card } from './components/ui';
import { DESTAQUES } from './data/site';

const VSL_ID = '1C9vcjaCs2A';

/* ---------- token + contraste ao vivo ---------- */
const token = (n, el = document.documentElement) =>
  getComputedStyle(el).getPropertyValue(n).trim();
function resolver(v, el, n = 0) {
  if (!v || n > 6) return v;
  const m = v.match(/^var\((--[\w-]+)\)$/);
  return m ? resolver(token(m[1], el), el, n + 1) : v;
}
function paraRGB(cor) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = cor;
  const h = ctx.fillStyle;
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function lum(cor) {
  const [r, g, b] = paraRGB(cor).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contraste(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const nivel = (r) =>
  r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA grande' : 'Reprovado';

function medir(tone, fg, bg) {
  const s = document.createElement('div');
  s.setAttribute('data-tone', tone);
  s.style.cssText = 'position:absolute;visibility:hidden';
  document.body.appendChild(s);
  const hexFg = resolver(token(fg, s), s).toUpperCase();
  const hexBg = resolver(token(bg, s), s).toUpperCase();
  const r = contraste(hexFg, hexBg);
  s.remove();
  return { r, hexFg, hexBg };
}

/* ---------- blocos ---------- */
function Secao({ id, tone = 'light', num, titulo, resumo, children }) {
  return (
    <section id={id} data-tone={tone} className="section relative">
      <div className="container-ds">
        <div className="mb-10">
          <span className="font-mono text-xs tracking-[0.18em] text-brand-ink">{num}</span>
          <h2 className="title-section mt-3">{titulo}</h2>
          {resumo && <p className="lead mt-4">{resumo}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
function Rotulo({ children }) {
  return (
    <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">
      {children}
    </h3>
  );
}
function Nota({ children }) {
  return (
    <div className="mt-8 rounded-lg border border-brand bg-brand-subtle p-6">
      <p className="max-w-[70ch] text-sm text-fg-secondary">{children}</p>
    </div>
  );
}

/* Amostra de cor — o hex é lido do token, nunca digitado */
function Swatch({ nome, rotulo, marca }) {
  const [hex, setHex] = useState('');
  useEffect(() => setHex(resolver(token(nome), document.documentElement).toUpperCase()), [nome]);
  return (
    <div>
      <div
        className="relative h-20 rounded-md border border-base"
        style={{ background: `var(${nome})` }}
      >
        {marca && (
          <span className="absolute right-2 top-2 rounded-sm bg-black/75 px-1.5 py-0.5 font-mono text-2xs text-white">
            MARCA
          </span>
        )}
      </div>
      <p className="mt-2 font-mono text-2xs text-fg-secondary">{nome.replace('--', '')}</p>
      <p className="font-mono text-2xs text-fg-subtle">{hex}</p>
      {rotulo && <p className="mt-0.5 text-2xs text-fg-muted">{rotulo}</p>}
    </div>
  );
}

function TabelaTom({ tone, pares }) {
  const [linhas, setLinhas] = useState([]);
  useEffect(() => setLinhas(pares.map((p) => ({ ...p, ...medir(tone, p.fg, p.bg) }))), [tone, pares]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left">
        <thead>
          <tr className="border-b border-base">
            {['Amostra', 'Par', 'Ratio', 'WCAG'].map((h) => (
              <th key={h} className="pb-3 font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr key={l.fg + l.bg} className="border-b border-subtle">
              <td className="py-3 pr-4">
                <span
                  className="inline-flex items-center rounded-sm px-3 py-2 text-sm font-semibold"
                  style={{ background: l.hexBg, color: l.hexFg }}
                >
                  Texto
                </span>
              </td>
              <td className="py-3 pr-4 font-mono text-2xs text-fg-muted">
                {l.fg}
                <span className="text-fg-subtle"> / </span>
                {l.bg}
              </td>
              <td className="py-3 pr-4 font-mono text-sm font-medium tabular-nums text-fg-primary">
                {l.r.toFixed(2)}:1
              </td>
              <td
                className={`py-3 font-mono text-xs font-medium ${
                  l.r >= 4.5 ? 'text-success' : l.r >= 3 ? 'text-brand-ink' : 'text-danger'
                }`}
              >
                ✓ {nivel(l.r)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PARES = [
  { fg: '--fg-primary', bg: '--bg-deep' },
  { fg: '--fg-secondary', bg: '--bg-deep' },
  { fg: '--brand-ink', bg: '--bg-deep' },
  { fg: '--on-brand', bg: '--brand' },
];

const SERVICOS = [
  { icone: Clapperboard, titulo: 'Produção de Vídeo', texto: 'Institucionais, comerciais e filmes de marca.' },
  { icone: Camera, titulo: 'Fotografia', texto: 'Ensaios, eventos e foto de produto.' },
  { icone: Share2, titulo: 'Social Media', texto: 'Linha editorial e publicação.' },
  { icone: TrendingUp, titulo: 'Tráfego Pago', texto: 'Verba onde o criativo já provou que performa.' },
];

const ESCALA = [
  ['--text-7xl', '96px', 'Hero'],
  ['--text-6xl', '72px', 'Título de seção'],
  ['--text-4xl', '40px', 'Título (mobile)'],
  ['--text-2xl', '24px', 'Título de card'],
  ['--text-xl', '20px', 'Lead'],
  ['--text-base', '16px', 'Corpo'],
  ['--text-sm', '14px', 'Apoio'],
  ['--text-xs', '12px', 'Eyebrow'],
];
const ESPACOS = [
  ['--space-2', '8px'], ['--space-3', '12px'], ['--space-4', '16px'],
  ['--space-5', '24px'], ['--space-6', '32px'], ['--space-7', '48px'],
  ['--space-8', '64px'], ['--space-9', '96px'], ['--space-10', '128px'],
];

/* ============================================================ */
export default function Styleguide() {
  const [varCard, setVarCard] = useState('glass');

  return (
    <div data-tone="light">
      <header className="fixed inset-x-0 top-4 z-sticky px-4">
        <div className="container-ds flex justify-center">
          <div className="glass-dark flex h-14 items-center gap-2 rounded-full px-3 sm:gap-4 sm:px-4">
            <img src="/logo/logo-branco.png" alt="GravaMais" className="ml-1 h-7 w-auto" />
            <nav className="hidden items-center gap-1 lg:flex">
              {[
                ['paleta', 'Paleta'],
                ['tipografia', 'Tipografia'],
                ['botoes', 'Botões'],
                ['faixas', 'Faixas'],
                ['cards', 'Cards'],
                ['portfolio', 'Portfólio'],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors duration-base hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
            <button type="button" className="btn btn-primary h-11 px-5 text-sm">
              Fale conosco
            </button>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section
        data-tone="dark"
        className="relative flex min-h-dvh flex-col justify-end overflow-hidden"
      >
        <iframe
          className="video-cover"
          src={`https://www.youtube-nocookie.com/embed/${VSL_ID}?autoplay=1&mute=1&loop=1&playlist=${VSL_ID}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`}
          title="VSL da GravaMais em plano de fundo"
          tabIndex={-1}
          aria-hidden="true"
          allow="autoplay; encrypted-media"
        />
        <div className="hero-scrim" />

        <div className="container-ds relative z-raised pb-14 text-center md:pb-16">
          {/* Duas linhas fixas, com entrelinha apertada: o título vira um bloco
              tipográfico, não um parágrafo. */}
          <h1
            className="mx-auto font-display font-extrabold tracking-tight text-white"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)', lineHeight: 1.02 }}
          >
            <span className="block">Conheça a GravaMais, uma</span>
            <span className="block">
              produtora de{' '}
              <span className="accent-on-video">vídeo e performance</span>
            </span>
          </h1>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="btn btn-primary btn-lg">
              Entre em contato
            </button>
            <button type="button" className="btn btn-glass-dark btn-lg">
              <Play size={18} fill="currentColor" />
              Assistir vídeo
            </button>
          </div>
        </div>
      </section>

      <MotionBanner variante="outline" />

      {/* ---------- 01 · PALETA ---------- */}
      <Secao
        id="paleta"
        tone="light"
        num="01"
        titulo="Paleta"
        resumo="Toda cor nasce de um asset real: o limão e o preto vêm da logotipo; o dourado, do letreiro na parede da cena dos fundadores. Nada foi escolhido a olho."
      >
        <Rotulo>Amarelo — a cor da marca</Rotulo>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {[
            ['--yellow-50', ''], ['--yellow-100', ''], ['--yellow-200', 'hover'],
            ['--yellow-300', 'ação'], ['--yellow-400', ''], ['--yellow-500', 'âmbar'],
            ['--yellow-600', ''], ['--yellow-700', 'texto no claro'],
          ].map(([n, r]) => (
            <Swatch key={n} nome={n} rotulo={r} marca={n === '--yellow-300'} />
          ))}
        </div>

        <div className="mt-12">
          <Rotulo>Dourado — amostrado do letreiro na parede</Rotulo>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {[['--gold-300', ''], ['--gold-400', 'textos da cena'], ['--gold-500', 'sombra']].map(
              ([n, r]) => (
                <Swatch key={n} nome={n} rotulo={r} />
              ),
            )}
          </div>
        </div>

        <div className="mt-12">
          <Rotulo>Neutros e parede</Rotulo>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {['--ink-950', '--ink-900', '--wall-800', '--wall-700', '--ink-600', '--ink-400', '--ink-200', '--ink-50'].map(
              (n) => (
                <Swatch key={n} nome={n} marca={n === '--ink-900'} />
              ),
            )}
          </div>
        </div>

        <div className="mt-12">
          <Rotulo>Degradês</Rotulo>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div
                className="h-40 rounded-lg border border-base"
                style={{ background: 'var(--grad-amber)' }}
              />
              <p className="mt-2 font-mono text-2xs text-fg-muted">
                --grad-amber · #FFF97D → #F7F7F7 em 50% (topo para baixo)
              </p>
            </div>
            <div>
              <div
                className="h-40 rounded-lg border border-base"
                style={{ background: 'var(--grad-wall)' }}
              />
              <p className="mt-2 font-mono text-2xs text-fg-muted">
                --grad-wall · concreto sob luz
              </p>
            </div>
          </div>
        </div>

        <Nota>
          <strong className="text-brand-ink">Uma cor de ação só na página inteira: o limão.</strong>{' '}
          Sobre branco ele tem <strong>1,10:1</strong> de separação e sumiria — por
          isso o botão ganha <strong>borda preta nos tons claros</strong>{' '}
          (<code className="font-mono">--btn-border</code>). A borda devolve a forma
          sem adulterar a cor da marca. No escuro a borda é transparente: lá o limão
          já se sustenta sozinho (18:1).
        </Nota>
      </Secao>

      {/* ---------- 02 · TIPOGRAFIA ---------- */}
      <Secao
        id="tipografia"
        tone="light"
        num="02"
        titulo="Tipografia"
        resumo="Bricolage Grotesque nos títulos: grotesca de contraste alto, com bico e personalidade — é ela que dá o peso de cartaz. Plus Jakarta Sans no corpo: some e deixa ler."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Bricolage Grotesque', 'font-display', 'Display · 600–800', 'Títulos e números. Tracking negativo.'],
            ['Plus Jakarta Sans', 'font-body', 'Corpo · 400–700', 'Texto, botões, navegação.'],
            ['JetBrains Mono', 'font-mono', 'Mono · 400–500', 'Tokens, metadados, rótulos técnicos.'],
          ].map(([nome, cls, papel, desc]) => (
            <article key={nome} className="rounded-lg border border-base bg-bg-surface p-6">
              <p className="font-mono text-2xs uppercase tracking-widest text-brand-ink">{papel}</p>
              <p className={`mt-3 text-5xl font-extrabold ${cls}`}>Aa</p>
              <h3 className="mt-4 text-lg">{nome}</h3>
              <p className="mt-2 text-sm text-fg-muted">{desc}</p>
            </article>
          ))}
        </div>

        {/* A mudança mais discutível do lote — vale ver os dois tons lado a
            lado antes de decidir. */}
        <div className="mt-12">
          <Rotulo>Acento do título — .accent</Rotulo>
          <div className="grid gap-4 md:grid-cols-2">
            <div data-tone="light" className="rounded-lg border border-base p-6">
              <p className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                tom claro · --accent-text = --ink-500
              </p>
              <p className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg-primary">
                Trabalho<br />
                <span className="accent">que performa.</span>
              </p>
              <p className="mt-4 text-sm text-fg-muted">
                Contraste tonal, não cromático. 6,69:1.
              </p>
            </div>
            <div data-tone="dark" className="rounded-lg border border-base p-6">
              <p className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                tom escuro · --accent-text = --yellow-300
              </p>
              <p className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg-primary">
                Trabalho<br />
                <span className="accent">que performa.</span>
              </p>
              <p className="mt-4 text-sm text-fg-muted">
                Aqui o limão tem 18:1 e ganha o direito de aparecer.
              </p>
            </div>
          </div>
          <Nota>
            <strong className="text-brand-ink">No claro o acento deixou de ser amarelo.</strong>{' '}
            Eram cinco títulos de seção com uma linha ocre cada — o amarelo
            aparecia tanto que parava de significar. Agora a linha destacada é o
            mesmo preto rebaixado um degrau: o realce vem do tom. No escuro nada
            mudou, porque lá o limão se sustenta.
            <br />
            <br />
            É <strong>uma linha</strong> em <code className="font-mono">tokens.css</code>:
            se você não gostar, <code className="font-mono">--accent-text</code> volta
            a ser <code className="font-mono">var(--brand-ink)</code> e tudo retorna.
          </Nota>
        </div>

        <div className="mt-12">
          <Rotulo>Escala</Rotulo>
          <div className="space-y-1">
            {ESCALA.map(([tk, px, uso]) => (
              <div
                key={tk}
                className="flex items-baseline gap-5 overflow-hidden border-b border-subtle py-3"
              >
                <code className="w-14 shrink-0 font-mono text-2xs tabular-nums text-fg-subtle">
                  {px}
                </code>
                <span
                  className="min-w-0 flex-1 truncate font-display font-bold tracking-tight text-fg-primary"
                  style={{ fontSize: `var(${tk})`, lineHeight: 1.15 }}
                >
                  GravaMais
                </span>
                <span className="hidden shrink-0 text-sm text-fg-muted md:inline">{uso}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Rotulo>Espaço — escala 4pt</Rotulo>
          <div className="space-y-2">
            {ESPACOS.map(([tk, px]) => (
              <div key={tk} className="flex items-center gap-5">
                <code className="w-24 shrink-0 font-mono text-2xs text-fg-subtle">{tk}</code>
                <code className="w-12 shrink-0 font-mono text-2xs tabular-nums text-fg-muted">
                  {px}
                </code>
                <div className="h-5 rounded-sm bg-brand" style={{ width: `var(${tk})` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div>
            <Rotulo>Raio</Rotulo>
            <div className="flex flex-wrap gap-3">
              {['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-2xl'].map(
                (r) => (
                  <div key={r} className="text-center">
                    <div
                      className="h-16 w-16 border border-base bg-bg-elevated"
                      style={{ borderRadius: `var(${r})` }}
                    />
                    <p className="mt-1 font-mono text-2xs text-fg-subtle">{r.replace('--radius-', '')}</p>
                  </div>
                ),
              )}
            </div>
          </div>
          <div>
            <Rotulo>Movimento — curva única: expo.out</Rotulo>
            <div className="space-y-2">
              {[
                ['--duration-fast', '150ms', 'press, hover'],
                ['--duration-base', '250ms', 'padrão'],
                ['--duration-slow', '400ms', 'zoom de imagem'],
                ['--duration-slower', '600ms', 'reveal de seção'],
              ].map(([tk, ms, uso]) => (
                <div key={tk} className="flex items-baseline justify-between gap-3 border-b border-subtle py-2">
                  <code className="font-mono text-xs text-fg-secondary">{tk}</code>
                  <span className="font-mono text-xs tabular-nums text-brand-ink">{ms}</span>
                  <span className="text-xs text-fg-muted">{uso}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Secao>

      {/* ---------- 03 · BOTÕES ---------- */}
      <Secao
        id="botoes"
        tone="light"
        num="03"
        titulo="Botões"
        resumo="Sem borda preta: a forma vem da sombra."
      >
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="btn btn-primary btn-lg">
            <MessageCircle size={20} />
            Sólido
          </button>
          <button type="button" className="btn btn-secondary">Secundário</button>
          <button type="button" className="btn btn-glass">
            <Play size={18} fill="currentColor" />
            Vidro
          </button>
          <button type="button" className="btn btn-amber-outline">
            Contorno
          </button>
          <button type="button" disabled className="btn btn-secondary cursor-not-allowed opacity-40">
            Desabilitado
          </button>
        </div>

        <Nota>
          <strong className="text-brand-ink">O sólido perdeu a borda preta.</strong>{' '}
          A definição agora vem de <strong>duas sombras</strong>: uma de contato,
          curta, que assenta o botão na página; e uma difusa, que o levanta dela.
          É o que segura a forma do limão sobre branco, onde ele tem apenas 1,10:1
          de separação de cor.
          <br />
          <br />
          O <strong>Contorno</strong> ficou no catálogo, como você pediu — ele
          precisa de algo atrás para desfocar, então rende melhor sobre vídeo ou
          foto do que sobre fundo chapado.
        </Nota>
      </Secao>

      {/* ---------- 04 · FAIXAS ---------- */}
      <Secao
        id="faixas"
        tone="light"
        num="04"
        titulo="Faixa em movimento"
        resumo="A de contorno é a que está aplicada acima, logo abaixo do hero. As chapadas ficaram no catálogo."
      >
        <div className="space-y-10">
          <div>
            <Rotulo>A · Contorno escuro — em uso, emendando o hero</Rotulo>
            <div className="rounded-lg bg-bg-base py-8">
              <MotionBanner variante="outline" />
            </div>
          </div>
          <div>
            <Rotulo>B · Amarela — o limão da marca (fora de uso)</Rotulo>
            <div className="rounded-lg bg-bg-base py-8">
              <MotionBanner variante="amber" />
            </div>
          </div>
          <div>
            <Rotulo>C · Branca com sombra (fora de uso)</Rotulo>
            <div className="rounded-lg bg-bg-base py-8">
              <MotionBanner variante="white" />
            </div>
          </div>
        </div>

        <Nota>
          <strong className="text-brand-ink">A amarela saiu da página.</strong>{' '}
          Ela cortava a cena com uma tarja chapada bem no ponto em que o hero
          termina — e era a segunda superfície amarela de três. A de contorno
          prolonga o preto do hero em vez de interrompê-lo, e nenhum item dela é
          pintado de limão: a faixa costura, não compete. Também desacelerou de
          38s para <strong>56s</strong> — virou pano de fundo.
          <br />
          <br />
          As duas chapadas continuam aqui porque a nota delas segue verdadeira:
          branco sobre branco não é nada, e o limão tem <strong>1,10:1</strong>{' '}
          contra o branco — é a sombra que levanta as duas da página. Passe o
          cursor e qualquer uma pausa.
        </Nota>
      </Secao>

      {/* ---------- 05 · CARDS ---------- */}
      <Secao
        id="cards"
        tone="light"
        num="05"
        titulo="Cards"
        resumo="Todos iguais. Passe o cursor: sobe 3px, a borda ganha corpo, a sombra abre."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {[
            ['glass', 'Vidro (claro)'],
            ['dark', 'Escuro'],
            ['amber', 'Amarelo'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setVarCard(id)}
              className={`h-11 rounded-full px-5 text-sm font-semibold transition-all duration-base ease-out ${
                varCard === id
                  ? 'bg-brand text-on-brand ring-1 ring-fg-primary/80'
                  : 'border border-base text-fg-secondary hover:border-strong hover:text-fg-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICOS.map((s) => (
            <Card key={s.titulo} {...s} variante={varCard} />
          ))}
        </div>

        <Nota>
          <strong className="text-brand-ink">A borda de luz girando saiu também.</strong>{' '}
          Primeiro caiu o reflexo rasante (varria rápido demais para ser lido
          como brilho); agora caiu o cônico animado que dava a volta na moldura.
          Um arco-íris girando em oito cards é o oposto da direção premium — e
          era o elemento que mais destoava dela. Ficou um hover sóbrio: 3px de
          elevação, borda mais firme, sombra aberta.
          <br />
          <br />
          O <strong>medalhão ficou monocromático</strong>: o ícone ocre puxava
          amarelo para dentro de oito cards ao mesmo tempo. Nos cards escuro e
          amarelo ele continua <strong>branco</strong>.
        </Nota>
      </Secao>

      {/* ---------- 06 · PORTFÓLIO ---------- */}
      <section id="portfolio" data-tone="dark" className="section relative overflow-hidden">
        <div className="container-ds">
          <div className="mb-10">
            <span className="font-mono text-xs tracking-[0.18em] text-brand-ink">06</span>
            <h2 className="title-section mt-3">Portfólio</h2>
            <p className="lead mt-4">
              Formato reels (9:16). Clique num card lateral para andar naquela
              direção — direita avança, esquerda volta.
            </p>
          </div>

          <PortfolioCoverflow itens={DESTAQUES} />

          <Nota>
            <strong className="text-brand-ink">Clicar num lateral anda um passo, não salta.</strong>{' '}
            Saltar direto para o card clicado embaralharia a fila e o usuário
            perderia a referência. O play virou <strong>vidro</strong>: em amarelo
            sólido ele roubava o olho da capa.
          </Nota>
        </div>
      </section>

      {/* ---------- 07 · CENA DOS FUNDADORES ---------- */}
      <QuemSomos />

      {/* ---------- 08 · DEGRADÊ ÂMBAR ---------- */}
      <section data-tone="amber" className="section">
        <div className="container-ds">
          <span className="font-mono text-xs tracking-[0.18em] text-brand-ink">08</span>
          <h2 className="title-section mt-3 max-w-[16ch]">Nós invertemos a ordem.</h2>
          <p className="mt-6 max-w-[62ch] text-lg text-fg-secondary">
            Antes de ligar a câmera, definimos o que o vídeo precisa fazer pelo seu
            negócio. A estratégia vem primeiro, a produção executa e a distribuição
            garante que o conteúdo chegue em quem importa.
          </p>
          {/* O CTA vive na faixa CLARA do degradê, não no miolo amarelo: ali o
              botão limão volta a ter fundo por contraste e a sombra o sustenta. */}
          <button type="button" className="btn btn-primary btn-lg mt-8">
            <MessageCircle size={20} />
            Quero um diagnóstico
          </button>

          <div className="mt-10 rounded-lg border border-base bg-white/55 p-6 backdrop-blur-sm">
            <p className="max-w-[70ch] text-sm text-fg-secondary">
              <strong className="text-fg-primary">O degradê é o limão da marca.</strong>{' '}
              <code className="font-mono">#FFF97D</code> no topo, desmaiando para
              off-white por volta de 60%. O botão preto saiu: o CTA fica na{' '}
              <strong>faixa clara</strong> do degradê, onde o limão sólido volta a
              se destacar e a sombra faz o resto. Assim a página inteira usa{' '}
              <strong>um único botão</strong>, sem exceção.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 09 · CONTRASTE ---------- */}
      <Secao
        id="contraste"
        tone="light"
        num="09"
        titulo="Contraste por tom"
        resumo="Medido ao vivo, no contexto de cada tom."
      >
        <div className="space-y-10">
          {[
            ['light', 'Tom claro'],
            ['dark', 'Tom escuro'],
            ['amber', 'Tom âmbar (topo do degradê)'],
          ].map(([t, nome]) => (
            <div key={t}>
              <Rotulo>{nome}</Rotulo>
              <TabelaTom tone={t} pares={PARES} />
            </div>
          ))}
        </div>
      </Secao>

      <footer data-tone="dark" className="section">
        <div className="container-ds">
          <img src="/logo/logo-branco.png" alt="GravaMais Produções" className="h-12 w-auto" />
          <p className="mt-5 max-w-[44ch] text-sm text-fg-muted">
            Design System v7 — passada de sobriedade: o amarelo recuou para três
            aparições na página e o movimento decorativo saiu.
          </p>
          <a href="/" className="btn btn-secondary mt-8">
            Ver o site
            <ArrowDown size={18} className="-rotate-90" />
          </a>
        </div>
      </footer>
    </div>
  );
}
