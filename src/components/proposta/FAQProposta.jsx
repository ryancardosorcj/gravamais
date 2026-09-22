import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ } from '../../data/proposta';
import { TitleBlock, Reveal } from '../ui';

/* Perguntas frequentes — caixa clara: é a seção mais densa de leitura da
   página e vem logo depois do bloco preto do investimento.

   A abertura anima por grid-template-rows (0fr → 1fr), não por height. Assim
   a transição é CSS puro e não exige medir o conteúdo — height:auto não é
   animável, e fixar altura quebraria na primeira resposta que virasse linha.
   O filho precisa de overflow-hidden e min-h-0 para o truque funcionar. */
export default function FAQProposta() {
  const [aberta, setAberta] = useState(0);

  return (
    /* `caixa-topo` e não `caixa`: o FAQ ABRE o bloco claro que fecha a página
       (FAQ + fecho). Só as duas pontas do bloco são arredondadas. */
    <section id="faq" data-tone="light" className="caixa-topo section relative overflow-hidden">
      <div className="container-ds">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <Reveal>
            <TitleBlock
              linhas={FAQ.titulo}
              destaque={FAQ.destaque}
              className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-base">
              {FAQ.perguntas.map(({ pergunta, resposta }, i) => {
                const ativa = aberta === i;
                return (
                  <li key={pergunta} className="border-b border-base">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setAberta(ativa ? null : i)}
                        aria-expanded={ativa}
                        className="flex w-full items-start gap-5 py-6 text-left"
                      >
                        <span className="mt-1 font-mono text-2xs tracking-[0.2em] text-fg-muted">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-display text-lg font-bold leading-snug text-fg-primary lg:text-xl">
                          {pergunta}
                        </span>
                        <Plus
                          size={20}
                          strokeWidth={2}
                          aria-hidden
                          className={`mt-1 shrink-0 text-brand-ink transition-transform duration-base ease-out ${
                            ativa ? 'rotate-45' : ''
                          }`}
                        />
                      </button>
                    </h3>

                    <div
                      className="grid transition-[grid-template-rows] duration-base ease-out"
                      style={{ gridTemplateRows: ativa ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="max-w-[62ch] pb-7 pl-[3.1rem] text-sm leading-relaxed text-fg-secondary md:text-base">
                          {resposta}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
