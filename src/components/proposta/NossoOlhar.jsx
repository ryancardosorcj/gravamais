import { OLHAR } from '../../data/proposta';
import { Reveal } from '../ui';

/* Nosso olhar — a leitura da empresa do cliente, antes dos planos.

   É a seção mais curta da página de propósito: prova que houve estudo, não
   entrega o diagnóstico. Quatro blocos de uma frase e uma faixa de direções.

   Composição editorial, não card: os blocos são colunas separadas por filete.
   Card repetiria a gramática dos planos, que vêm logo abaixo, e pesaria uma
   seção que precisa ser lida em dez segundos.

   Os filetes saem do `gap-px` sobre um fundo da cor da borda — assim eles
   acompanham sozinhos a virada de 4 para 2 para 1 coluna, verticais entre
   colunas e horizontais entre linhas, sem uma regra de nth-child por
   breakpoint. Cada célula precisa repintar o fundo da seção (`bg-bg-deep`),
   senão a cor da borda vaza por baixo do texto.

   Sem `olhar` no cliente a seção não renderiza: uma proposta com quatro blocos
   vazios diz o oposto do que ela existe para dizer. */
export default function NossoOlhar({ cliente }) {
  const olhar = cliente.olhar;
  if (!olhar) return null;

  const blocos = OLHAR.blocos.filter(({ chave }) => olhar[chave]);
  if (!blocos.length) return null;

  const direcoes = olhar.direcoes ?? [];

  return (
    <section id="olhar" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">
              {OLHAR.eyebrow}
            </p>

            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.15] tracking-tight text-fg-primary md:text-4xl">
              {OLHAR.tituloPrefixo}{' '}
              <span className="text-gold">{cliente.nome}</span>
            </h2>

            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {OLHAR.lead}
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-px bg-[var(--border-subtle)] md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {blocos.map(({ chave, rotulo }, i) => (
            <li key={chave} className="bg-bg-deep">
              <Reveal delay={0.06 * i} className="h-full py-8 md:px-8 md:py-9">
                <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold/80">
                  {rotulo}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
                  {olhar[chave]}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        {direcoes.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col gap-5 border-t border-strong pt-8 sm:flex-row sm:items-center sm:gap-10 md:mt-16">
              <p className="shrink-0 font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
                {OLHAR.direcoesRotulo}
              </p>

              <ul className="flex flex-wrap gap-2.5">
                {direcoes.map((direcao) => (
                  <li
                    key={direcao}
                    className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-fg-secondary"
                  >
                    {direcao}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
