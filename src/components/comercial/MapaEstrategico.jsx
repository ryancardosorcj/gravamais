import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Clapperboard, Film, Plus, Search, Share2, Target } from 'lucide-react';
import { MAPA_ESTRATEGICO } from '../../data/comercial';
import { Eyebrow, TitleBlock, Reveal } from '../ui';

const ICONES = { Search, Clapperboard, Film, Share2, Camera };

/* Mapa estratégico — "a visão do projeto".
   Um nó central (o objetivo) ramifica em quatro frentes. Na referência o
   mapa entra desfocado e assenta em foco ao rolar — não há evidência de
   pan/zoom pelo usuário, só reveal de scroll — por isso o blur→foco é feito
   com Framer Motion (opacity + filter), não com uma biblioteca de canvas.

   Cada nó é um botão: clicar abre/fecha o detalhe. É o "interativo" pedido —
   sem precisar de ferramenta externa, e com os tokens da casa. */
export default function MapaEstrategico() {
  const [aberto, setAberto] = useState(null);
  const reduz = useReducedMotion();

  const foco = (delay = 0) => ({
    initial: reduz ? false : { opacity: 0, filter: 'blur(10px)', y: 14 },
    whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduz ? 0 : 0.9, delay: reduz ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section data-tone="light" className="caixa-topo section relative overflow-hidden">
      <div className="container-ds">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{MAPA_ESTRATEGICO.eyebrow}</Eyebrow>
            <TitleBlock
              linhas={MAPA_ESTRATEGICO.titulo}
              destaque={MAPA_ESTRATEGICO.destaque}
              className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
            />
            <p className="mx-auto mt-6 max-w-[48ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {MAPA_ESTRATEGICO.lead}
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl md:mt-20">
          {/* Núcleo — o objetivo do negócio, no eixo central */}
          <motion.div className="mx-auto w-fit" {...foco(0)}>
            <div className="flex items-center gap-3 rounded-full border border-brand bg-bg-elevated px-6 py-3.5 shadow-md">
              <Target size={18} className="text-brand-ink" aria-hidden />
              <span className="font-display text-sm font-bold text-fg-primary md:text-base">
                {MAPA_ESTRATEGICO.nucleo}
              </span>
            </div>
          </motion.div>

          {/* Trilha — um traço reto descendo do núcleo até a fileira de nós */}
          <div aria-hidden className="mx-auto hidden h-10 w-px bg-border-strong md:block" />

          <div className="relative mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-0">
            {MAPA_ESTRATEGICO.nos.map((no, i) => {
              const Icone = ICONES[no.icone] ?? Target;
              const ativo = aberto === i;
              return (
                <motion.div key={no.titulo} {...foco(0.1 + i * 0.08)}>
                  <button
                    type="button"
                    onClick={() => setAberto(ativo ? null : i)}
                    aria-expanded={ativo}
                    className="w-full rounded-xl border border-subtle bg-bg-surface p-6 text-left shadow-sm transition-colors duration-base hover:border-strong"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-elevated text-fg-primary">
                      <Icone size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-display text-lg font-bold text-fg-primary">{no.titulo}</span>
                      <Plus
                        size={16}
                        strokeWidth={2}
                        aria-hidden
                        className={`shrink-0 text-fg-muted transition-transform duration-base ease-out ${
                          ativo ? 'rotate-45' : ''
                        }`}
                      />
                    </span>
                    <div
                      className="grid transition-[grid-template-rows] duration-base ease-out"
                      style={{ gridTemplateRows: ativo ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{no.texto}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
