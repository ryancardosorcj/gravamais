import { PROCESSO } from '../data/site';
import { Section, Eyebrow, TitleBlock, Reveal } from './ui';

export default function Processo() {
  return (
    <Section id="processo" tone="light">
      <Reveal>
        <Eyebrow>{PROCESSO.eyebrow}</Eyebrow>
        <TitleBlock
          linhas={PROCESSO.titulo}
          destaque={PROCESSO.destaque}
          className="title-section mt-6"
        />
      </Reveal>

      <ol className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PROCESSO.etapas.map((etapa, i) => (
          <Reveal key={etapa.numero} delay={i * 0.08}>
            <li className="group relative h-full overflow-hidden rounded-lg border border-subtle bg-bg-surface p-8 transition-colors duration-base hover:border-brand">
              {/* Numeral gigante ao fundo — dá ritmo de "etapa" sem poluir */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 font-display text-8xl font-black leading-none text-white/[0.04] transition-colors duration-slow group-hover:text-brand/10"
              >
                {etapa.numero}
              </span>
              <span className="relative font-mono text-xs tracking-[0.18em] text-brand">
                {etapa.numero}
              </span>
              <h3 className="relative mt-4 text-2xl">{etapa.titulo}</h3>
              <p className="relative mt-3 text-fg-muted">{etapa.texto}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
