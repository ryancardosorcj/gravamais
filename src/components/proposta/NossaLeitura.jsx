import { LEITURA } from '../../data/proposta';
import { Reveal } from '../ui';
import Contador from './Contador';

/* Nossa leitura — tom escuro, duas colunas.

   Esquerda: o título ocupa a coluna inteira e quebra sozinho; o lead entra
   abaixo atrás de uma régua limão vertical.
   Direita: o painel de números — régua no topo, o 150+ em limão, a legenda em
   mono, e as quatro frentes separadas por hairlines.

   No escuro o limão tem 18:1 de contraste, então aqui ele PODE carregar número
   e índice — é o contrário do que acontecia sobre o off-white, onde ele sumia. */
export default function NossaLeitura() {
  return (
    <section id="leitura" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <h2
              className="font-display font-extrabold tracking-tight text-fg-primary"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', lineHeight: 0.98 }}
            >
              {LEITURA.titulo}{' '}
              {/* Limão da marca — 18:1 sobre o escuro. */}
              <span className="text-brand">{LEITURA.tituloDestaque}</span>
            </h2>

            <p className="mt-10 max-w-[46ch] border-l-2 border-brand pl-6 text-base leading-relaxed text-fg-muted md:text-lg">
              {LEITURA.lead}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border-t border-strong pt-8">
              {/* Fileira de três: o número cai para clamp porque "+1.000" tem
                  cinco caracteres numa célula de ~1/9 da página. Os filetes
                  entre as células saem do gap-px sobre o fundo da borda, como
                  no resto da página. */}
              <ol className="grid grid-cols-3 gap-px bg-[var(--border-subtle)]">
                {LEITURA.numeros.map(({ prefixo, valor, sufixo, legenda }) => (
                  <li key={legenda} className="bg-bg-deep pr-3 [&:not(:first-child)]:pl-4">
                    <Contador
                      valor={valor}
                      prefixo={prefixo}
                      sufixo={sufixo}
                      className="block font-display font-extrabold leading-none tracking-tight text-brand"
                      style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)' }}
                    />
                    <span className="mt-3 block font-mono text-2xs uppercase leading-relaxed tracking-[0.14em] text-fg-muted">
                      {legenda}
                    </span>
                  </li>
                ))}
              </ol>

              <ol className="mt-10 border-t border-subtle">
                {LEITURA.pilares.map((texto, i) => (
                  <li
                    key={texto}
                    className="flex items-start gap-6 border-b border-subtle py-5"
                  >
                    <span className="mt-0.5 font-mono text-2xs tracking-[0.2em] text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-fg-secondary md:text-base">
                      {texto}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
