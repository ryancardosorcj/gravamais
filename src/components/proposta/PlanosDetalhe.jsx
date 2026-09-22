import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import { PLANOS_CABECALHO, PLANOS_DETALHE } from '../../data/proposta';
import { Reveal } from '../ui';

/* Nossos planos — o posicionamento dos três, lado a lado.

   Os cartões sobem em grau de participação (ESCALA → ESSENCIAL → PRO) e as
   setas no vão marcam essa progressão. Elas vivem em CÉLULAS PRÓPRIAS do grid,
   não em `absolute`: assim nunca cobrem texto quando um cartão cresce, e somem
   sozinhas quando a fileira empilha no mobile.

   O acento é o dourado inteiro aqui — nome do plano, régua, seta e a régua da
   nota. O limão não entra nesta seção: ele já carrega o selo e os CTAs do
   bloco de preço logo abaixo. */
export default function PlanosDetalhe() {
  return (
    <section id="planos" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <div>
              <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">
                {PLANOS_CABECALHO.eyebrow}
              </p>

              <h2 className="mt-6 font-display text-3xl font-bold leading-[1.18] tracking-tight text-fg-primary md:text-4xl">
                {PLANOS_CABECALHO.titulo.map((linha) => (
                  <span key={linha} className="block">
                    {linha}
                  </span>
                ))}
              </h2>

              <p className="mt-7 max-w-[54ch] text-sm leading-relaxed text-fg-muted md:text-base">
                {PLANOS_CABECALHO.lead}
              </p>
            </div>

            <p className="max-w-[34ch] border-l border-gold/60 pl-6 text-sm leading-relaxed text-fg-muted lg:mt-16">
              {PLANOS_CABECALHO.nota}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:mt-20 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-6">
          {PLANOS_DETALHE.map((plano, i) => (
            <Fragment key={plano.id}>
              <Reveal delay={0.08 * i} className="h-full">
                <Cartao plano={plano} />
              </Reveal>
              {i < PLANOS_DETALHE.length - 1 && (
                <div
                  aria-hidden
                  className="hidden items-center justify-center text-gold lg:flex"
                >
                  <ArrowRight size={22} strokeWidth={1.6} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cartao({ plano }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-subtle bg-bg-surface">
      {/* Espaço da imagem reservado na proporção final. Enquanto não há arquivo,
          fica uma superfície lisa — nada de ícone ou rótulo de placeholder, que
          só sujaria a leitura da proposta se alguém abrisse antes da troca. */}
      <div
        className="w-full border-b border-subtle bg-bg-elevated"
        style={{ aspectRatio: '16 / 10' }}
      >
        {plano.imagem && (
          <img
            src={plano.imagem}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">
          {plano.nome}
        </p>
        <span aria-hidden className="mt-4 block h-px w-10 bg-gold/70" />

        <h3 className="mt-7 font-display text-xl font-bold leading-snug text-fg-primary md:text-2xl">
          {plano.titulo}
        </h3>

        <p className="mt-5 text-sm leading-relaxed text-fg-muted">{plano.texto}</p>

        {/* mt-auto encosta o bloco FOCO no pé: os três cartões têm textos de
            alturas diferentes e, sem isso, o rótulo flutuaria em alturas
            diferentes em cada um. */}
        <div className="mt-auto pt-10">
          <p className="font-mono text-2xs uppercase tracking-[0.24em] text-fg-subtle">
            Foco
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-fg-secondary">
            {plano.foco}
          </p>
        </div>
      </div>
    </article>
  );
}
