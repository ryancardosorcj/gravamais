import { ArrowUpRight, Clock, Clapperboard } from 'lucide-react';

import { ROTEIROS_CABECALHO } from '../../data/roteiro';
import { Reveal } from '../ui';
import { EyebrowTrilha, Rico, TituloSecao } from './comum';

/* Os roteiros — uma prancha de storyboard por vídeo.

   No alto, o índice: cada vídeo num cartão, com âncora para a prancha dele.
   Cada prancha é a ficha do vídeo (número, formato, título, tempo, referência)
   e, embaixo, os quadros em ordem — imagem 9:16 em cima, plano, fala e
   lettering embaixo. Lidas em sequência, as falas dos quadros são a fala na
   íntegra do roteiro: o texto não se repete em outro lugar.

   No celular os quadros viram uma faixa que se arrasta para o lado (como os
   próprios Reels); de `sm` para cima, grade.

   Última seção escura da página: leva `caixa-pe` e fecha o bloco do hero. */

const dois = (n) => String(n).padStart(2, '0');

/* Tempo de fala estimado a ~2,5 palavras por segundo (ritmo de vídeo curto de
   rede social), arredondado de 5 em 5. É uma estimativa — o rótulo diz isso. */
function tempoDeFala(cenas) {
  const texto = cenas.map((c) => c.fala ?? '').join(' ').replace(/\*\*/g, '');
  const palavras = texto.split(/\s+/).filter(Boolean).length;
  return palavras ? Math.max(5, Math.round(palavras / 2.5 / 5) * 5) : null;
}

export default function Roteiros({ videos }) {
  if (!videos?.length) return null;

  return (
    <section id="roteiros" data-tone="dark" className="caixa-pe section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <EyebrowTrilha>{ROTEIROS_CABECALHO.eyebrow}</EyebrowTrilha>
          <TituloSecao dados={ROTEIROS_CABECALHO} />
        </Reveal>

        {/* Índice */}
        <Reveal delay={0.05}>
          <nav aria-label="Vídeos deste roteiro" className="mt-12 md:mt-14">
            <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {videos.map((v) => (
                <li key={v.numero}>
                  <a
                    href={`#video-${v.numero}`}
                    className="group flex h-full min-h-11 flex-col rounded-lg border border-subtle bg-bg-surface p-4 transition-colors duration-base hover:border-gold/50 md:p-5"
                  >
                    <span className="font-display text-xl font-semibold leading-none text-gold/90 md:text-2xl">
                      {dois(v.numero)}
                    </span>
                    <span className="mt-3 font-display text-sm font-bold leading-snug text-fg-primary md:mt-4 md:text-base">
                      {v.titulo}
                    </span>
                    <span className="mt-auto pt-3 font-mono text-2xs uppercase tracking-[0.16em] text-fg-muted md:pt-4">
                      {v.formato}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {videos.map((v) => (
            <Video key={v.numero} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Video({ video: v }) {
  const cenas = v.cenas ?? [];
  const segundos = tempoDeFala(cenas);

  return (
    <article
      id={`video-${v.numero}`}
      className="scroll-mt-8 border-t border-strong py-14 last:pb-0 md:py-20"
    >
      {/* Ficha do vídeo */}
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="font-display text-4xl font-semibold leading-none text-gold/90 md:text-5xl">
                {dois(v.numero)}
              </span>
              <span className="whitespace-nowrap rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1.5 font-mono text-2xs uppercase tracking-[0.16em] text-gold">
                {v.formato}
              </span>
            </div>
            <h3 className="mt-6 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-fg-primary text-balance md:text-4xl">
              {v.titulo}
            </h3>
            <p className="mt-3 font-mono text-2xs uppercase tracking-[0.2em] text-fg-muted">
              // {v.campanha}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-fg-muted">
              <Clapperboard size={13} strokeWidth={1.5} aria-hidden className="text-gold" />
              {dois(cenas.length)} cenas
            </p>
            {segundos && (
              <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-fg-muted">
                <Clock size={13} strokeWidth={1.5} aria-hidden className="text-gold" />
                ~{segundos}s de fala
              </p>
            )}
            {v.referencia && (
              <a
                href={v.referencia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border-b border-gold/40 text-sm text-fg-secondary transition-colors duration-base hover:border-gold hover:text-fg-primary"
              >
                Ver vídeo de referência
                <ArrowUpRight size={16} strokeWidth={1.5} className="text-gold" />
              </a>
            )}
          </div>
        </div>
      </Reveal>

      {/* Prancha: duas cenas por linha, descendo. Cada cena é imagem + texto
          lado a lado, para a fala ter espaço e peso de leitura — é ela que o
          cliente aprova. Abaixo de `lg`, uma cena por linha. */}
      <ol
        aria-label={`Storyboard do vídeo ${v.numero}`}
        className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-2 lg:gap-5"
      >
        {cenas.map((c, i) => (
          <Cena key={i} cena={c} n={i + 1} />
        ))}
      </ol>
    </article>
  );
}

function Cena({ cena: c, n }) {
  return (
    <li>
      <Reveal className="h-full">
        <div className="grid h-full grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 rounded-lg border border-subtle bg-bg-surface p-3 sm:gap-6 md:p-4">
          {c.foto ? (
            <img
              src={c.foto}
              alt={c.plano ?? `Cena ${n}`}
              width="540"
              height="968"
              loading="lazy"
              decoding="async"
              className="aspect-[9/16] w-full rounded-md object-cover"
            />
          ) : (
            /* Cena sem imagem é cartela: o lettering ocupa o quadro. */
            <div className="flex aspect-[9/16] w-full items-center justify-center rounded-md border border-gold/40 bg-bg-base p-4 text-center">
              <p className="font-display text-base font-bold leading-snug text-fg-primary md:text-xl">
                {c.lettering}
              </p>
            </div>
          )}

          <div className="flex min-w-0 flex-col py-1 pr-1 md:py-2 md:pr-2">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-semibold leading-none text-gold/90 md:text-3xl">
                {dois(n)}
              </span>
              <span className="font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">Cena</span>
            </div>

            {/* Sem fala nem lettering (a trend), a ação É o roteiro da cena:
                sobe para o bloco de destaque no lugar da fala. */}
            {c.plano && (c.fala || c.lettering) && (
              <p className="mt-3 font-mono text-2xs uppercase leading-relaxed tracking-[0.12em] text-fg-muted">
                {c.plano}
              </p>
            )}

            {(c.fala || (c.plano && !c.lettering)) && (
              <div className="mt-5 border-l-2 border-gold pl-4 md:mt-7 md:pl-5">
                <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">
                  {c.fala ? 'Fala' : 'Ação'}
                </p>
                <p className="mt-2 text-base font-medium leading-snug text-fg-primary md:text-xl md:leading-snug">
                  <Rico forte="font-bold text-gold">{c.fala ?? c.plano}</Rico>
                </p>
              </div>
            )}

            {c.lettering && (
              <div className="mt-5 rounded-md bg-gold/10 px-4 py-3 md:mt-7">
                <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">Lettering</p>
                <p className="mt-2 text-base font-medium leading-snug text-fg-primary md:text-lg">
                  “{c.lettering}”
                </p>
              </div>
            )}

            {c.nota && <p className="mt-3 text-xs italic text-fg-muted">{c.nota}</p>}
          </div>
        </div>
      </Reveal>
    </li>
  );
}
