import { CircleCheck } from 'lucide-react';

import { Reveal } from '../ui';

/* Terceiro orçamento — cobertura da confraternização, em fundo PRETO.

   Entra depois do bloco claro do orçamento 02. O primeiro bloco escuro leva
   `caixa-topo`, o último (a foto final) leva `caixa-pe`, e o Fecho vem logo
   depois, em claro.

   Duas opções de preço lado a lado. A de maior cobertura (`destaque`) é a
   caixa amarela; a outra segue a superfície escura. O dourado é o acento de
   trilha e o limão fica só na caixa de destaque. */

const brl = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const SECAO = 'relative overflow-hidden py-12 md:py-16';

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-5">
      <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">{children}</p>
      <span className="h-px w-24 bg-gold/30" />
    </div>
  );
}

function Titulo({ linhas }) {
  return (
    <h2 className="mt-6 font-display font-extrabold tracking-tight text-fg-primary">
      <span className="block text-3xl leading-[1.1] md:text-5xl">{linhas[0]}</span>
      {linhas[1] && (
        <span className="mt-4 block text-xl font-semibold text-gold md:text-2xl">{linhas[1]}</span>
      )}
    </h2>
  );
}

export default function ConfraternizacaoProposta({ dados }) {
  return (
    <>
      <Escopo dados={dados.escopo} />
      <Foto dados={dados.fotoBrinde} />
      <Opcoes dados={dados.opcoes} />
      <Foto dados={dados.fotoJardim} caixa="caixa-pe" />
    </>
  );
}

/* 1 · Escopo ------------------------------------------------------ */
function Escopo({ dados }) {
  return (
    <section id="confraternizacao" data-tone="dark" className={`caixa-topo ${SECAO}`}>
      <div className="container-ds">
        <Reveal>
          <Eyebrow>Orçamento 03</Eyebrow>
          <Titulo linhas={dados.titulo} />
        </Reveal>

        <div className="mt-14 grid gap-14 border-t border-subtle pt-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="max-w-[52ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {dados.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border-t border-subtle">
              {dados.ficha.map(({ rotulo, valor }) => (
                <div
                  key={rotulo}
                  className="flex items-baseline justify-between gap-6 border-b border-subtle py-5"
                >
                  <dt className="font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
                    {rotulo}
                  </dt>
                  <dd className="text-right font-display text-lg font-bold leading-snug text-fg-primary md:text-xl">
                    {valor}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Divisor com foto em largura de conteúdo, sem título. */
function Foto({ dados, caixa = '' }) {
  return (
    <section data-tone="dark" className={`pb-12 md:pb-16 ${caixa}`}>
      <div className="container-ds">
        <Reveal>
          <img
            src={dados.src}
            alt={dados.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[16/8] w-full rounded-lg border border-subtle object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* 2 · Opções de cobertura ----------------------------------------- */
function Opcoes({ dados }) {
  return (
    <section id="opcoes-3" data-tone="dark" className={SECAO}>
      <div className="container-ds">
        <Reveal>
          <Eyebrow>{dados.eyebrow}</Eyebrow>
          <Titulo linhas={dados.titulo} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:mt-14">
          {dados.itens.map((op, i) => (
            <Reveal key={op.id} delay={0.08 * i} className="h-full">
              <Cartao opcao={op} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cartao({ opcao }) {
  const destaque = opcao.destaque;
  const rotulo = destaque ? 'text-on-brand/70' : 'text-fg-subtle';
  const icone = destaque ? 'text-on-brand' : 'text-gold';
  const superficie = destaque
    ? 'bg-brand text-on-brand'
    : 'border border-subtle bg-bg-surface text-fg-primary';

  return (
    <article className={`flex h-full flex-col rounded-lg p-8 md:p-10 ${superficie}`}>
      <p className={`font-mono text-2xs uppercase tracking-[0.24em] ${rotulo}`}>{opcao.nome}</p>
      <p className="mt-5 font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl">
        {brl(opcao.valor)}
      </p>

      <p className={`mt-10 font-mono text-2xs uppercase tracking-[0.2em] ${rotulo}`}>Captação</p>
      <p className="mt-2.5 font-display text-lg font-bold leading-snug">{opcao.captacao}</p>

      <p className={`mt-8 font-mono text-2xs uppercase tracking-[0.2em] ${rotulo}`}>Entregas</p>
      <ul className="mt-4 space-y-4">
        {opcao.entregas.map((e) => (
          <li key={e} className="flex items-start gap-3.5">
            <CircleCheck size={17} strokeWidth={1.5} className={`mt-0.5 shrink-0 ${icone}`} />
            <span className="text-sm leading-snug">{e}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
