import { SOBRE } from '../data/site';
import { Section, Eyebrow, TitleBlock, Reveal } from './ui';

export default function Sobre() {
  return (
    <Section id="sobre" tone="deep">
      <div className="grid items-center gap-24 lg:grid-cols-2 lg:gap-16">
        {/* Retrato dos sócios */}
        <Reveal>
          <div className="relative">
            <img
              src="/equipe/socios.jpg"
              alt="Os sócios da GravaMais Produções"
              loading="lazy"
              decoding="async"
              width="1538"
              height="2048"
              className="w-full rounded-xl object-cover"
            />
            {/* Bastidor sobreposto — sugere "estamos em campo" sem precisar dizer */}
            <img
              src="/equipe/socia-camera.webp"
              alt="Sócia da GravaMais em captação, com câmera em gimbal"
              loading="lazy"
              decoding="async"
              className="absolute -bottom-6 -right-4 hidden w-40 rounded-lg border-4 border-bg-deep object-cover shadow-lg md:block lg:w-48"
            />
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal delay={0.1}>
          <Eyebrow>{SOBRE.eyebrow}</Eyebrow>
          <TitleBlock
            linhas={SOBRE.titulo}
            destaque={SOBRE.destaque}
            className="title-section mt-6"
          />

          <div className="mt-8 space-y-4">
            {SOBRE.paragrafos.map((p) => (
              <p key={p} className="max-w-[58ch] text-fg-secondary">
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-subtle pt-12">
            {SOBRE.numeros.map((n) => (
              <div key={n.label}>
                {/* tabular-nums evita que os números "dancem" entre tamanhos */}
                <dt className="font-display text-4xl font-extrabold tabular-nums tracking-tight text-brand md:text-5xl">
                  {n.valor}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-fg-muted">
                  {n.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
