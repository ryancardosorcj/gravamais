import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PRIMEIROS_DIAS } from '../../data/comercial';
import { Eyebrow, TitleBlock, Reveal } from '../ui';

const INTERVALO = 5200;

/* 01/Os primeiros 30 dias — 3 tabs com avanço automático, trocando um card
   escuro de mockup + o texto ao lado. Na referência a barra de progresso se
   arrasta à mão ("arraste para avançar"); não existe nenhum padrão de drag
   no repo, então o equivalente robusto é clique nas tabs + autoplay
   pausável — mesmo esqueleto do PortfolioCoverflow.jsx (índice ativo,
   setInterval pausado em aba oculta, desligado sob movimento reduzido). */
export default function PrimeirosDias() {
  const [ativo, setAtivo] = useState(0);
  const reduz = useReducedMotion();
  const total = PRIMEIROS_DIAS.etapas.length;

  const ir = useCallback((i) => setAtivo(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (reduz) return;
    const t = setInterval(() => {
      if (!document.hidden) setAtivo((i) => (i + 1) % total);
    }, INTERVALO);
    return () => clearInterval(t);
  }, [reduz, total]);

  const etapa = PRIMEIROS_DIAS.etapas[ativo];

  return (
    <section data-tone="light" className="caixa-pe section relative overflow-hidden">
      <div className="container-ds">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{PRIMEIROS_DIAS.eyebrow}</Eyebrow>
            <TitleBlock
              linhas={PRIMEIROS_DIAS.titulo}
              destaque={null}
              className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
            />
            <p className="mx-auto mt-6 max-w-[48ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {PRIMEIROS_DIAS.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl md:mt-16">
          {/* Tabs */}
          <div
            className="flex items-center justify-center gap-6 border-b border-subtle sm:gap-10"
            role="tablist"
          >
            {PRIMEIROS_DIAS.etapas.map((e, i) => (
              <button
                key={e.id}
                type="button"
                role="tab"
                aria-selected={i === ativo}
                onClick={() => ir(i)}
                className={`relative pb-4 font-mono text-2xs uppercase tracking-[0.18em] transition-colors duration-base ${
                  i === ativo ? 'text-fg-primary' : 'text-fg-subtle hover:text-fg-muted'
                }`}
              >
                {String(i + 1).padStart(2, '0')} {e.rotulo}
                {i === ativo && (
                  <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-ink" />
                )}
              </button>
            ))}
          </div>

          {/* Barra de progresso — reflete a tab ativa; clique nela também navega */}
          <div
            role="slider"
            aria-label="Progresso das etapas"
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={ativo + 1}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') ir(ativo + 1);
              if (e.key === 'ArrowLeft') ir(ativo - 1);
            }}
            className="mt-5 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-bg-elevated"
          >
            <div
              className="h-full rounded-full bg-brand-ink transition-[width] duration-slower ease-out"
              style={{ width: `${((ativo + 1) / total) * 100}%` }}
            />
          </div>

          {/* Card + texto */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div
              data-tone="dark"
              className="relative overflow-hidden rounded-xl border border-subtle p-6 shadow-lg md:p-7"
              style={{ aspectRatio: '4 / 3' }}
            >
              <div className="flex items-center justify-between font-mono text-2xs uppercase tracking-[0.16em] text-fg-muted">
                <span>O começo da nossa parceria</span>
                <span className="text-brand">30 dias</span>
              </div>

              <div className="mt-6">
                <Mockup etapa={etapa} />
              </div>

              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between font-mono text-2xs text-fg-subtle md:inset-x-7 md:bottom-7">
                <span>{etapa.dias}</span>
                <span>{etapa.rotulo}</span>
              </div>
            </div>

            <div key={etapa.id}>
              <h3 className="font-display text-2xl font-bold text-fg-primary md:text-3xl">
                {etapa.titulo2}
              </h3>

              <p className="mt-5 font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
                O que fazemos
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary md:text-base">
                {etapa.oQueFazemos}
              </p>

              <div className="mt-6 flex items-start gap-3 border-l-2 border-brand-ink pl-4">
                <Check size={16} className="mt-1 shrink-0 text-brand-ink" aria-hidden />
                <div>
                  <p className="font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
                    O que você recebe
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-secondary md:text-base">
                    {etapa.oQueRecebe}
                  </p>
                </div>
              </div>

              {etapa.proximo && (
                <button
                  type="button"
                  onClick={() => ir(ativo + 1)}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg-primary transition-colors duration-base hover:text-brand-ink"
                >
                  Próximo: {etapa.proximo}
                  <ArrowRight size={16} aria-hidden />
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mockup({ etapa }) {
  if (etapa.mockup === 'diagnostico') {
    const niveis = [82, 64, 90];
    return (
      <div className="space-y-4">
        {etapa.barras.map((rotulo, i) => (
          <div key={rotulo}>
            <p className="text-xs text-fg-muted">{rotulo}</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
              <div
                className="h-full rounded-full bg-brand-ink"
                style={{ width: `${niveis[i] ?? 75}%` }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-md bg-brand-subtle px-3 py-2.5">
          <Check size={14} className="shrink-0 text-brand-ink" aria-hidden />
          <span className="text-xs font-medium text-fg-primary">{etapa.selo}</span>
        </div>
      </div>
    );
  }

  if (etapa.mockup === 'estrategia') {
    return (
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-brand px-4 py-2.5 text-center">
          <span className="font-mono text-2xs font-bold uppercase tracking-[0.1em] text-on-brand">
            {etapa.nucleo}
          </span>
        </div>
        <div aria-hidden className="h-5 w-px bg-border-strong" />
        <div className="grid w-full grid-cols-3 gap-2.5">
          {etapa.ramos.map((ramo) => (
            <div
              key={ramo}
              className="rounded-md border border-subtle bg-bg-elevated px-2 py-2.5 text-center"
            >
              <span className="text-2xs font-medium text-fg-secondary">{ramo}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // distribuicao
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {etapa.canais.map((canal) => (
          <span
            key={canal}
            className="rounded-full border border-subtle bg-bg-elevated px-3 py-1.5 text-2xs font-medium text-fg-secondary"
          >
            {canal}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-sm ${
              [2, 5, 9, 11].includes(i) ? 'bg-brand-ink' : 'bg-bg-elevated'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-md bg-brand-subtle px-3 py-2.5">
        <Check size={14} className="shrink-0 text-brand-ink" aria-hidden />
        <span className="text-xs font-medium text-fg-primary">{etapa.selo}</span>
      </div>
    </div>
  );
}
