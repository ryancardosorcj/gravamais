import { Reveal } from '../ui';

/* Segundo orçamento — vídeo institucional e comercial, em fundo CLARO.

   Vem logo abaixo do investimento do primeiro, então o primeiro bloco leva
   `caixa-topo` e o último não leva nada: quem fecha a página é o Fecho.

   Espaçamento próprio (py-12 / md:py-16) — mais junto que o `.section` padrão,
   para o orçamento ler como uma peça só.

   Cor: o dourado (`text-gold`) é fixo e não lê sobre branco. Rótulos usam
   `text-brand-ink` (muda por tom). Destaques usam caixa amarela `bg-brand`, com
   texto `text-on-brand`. Superfícies e bordas vêm dos tokens semânticos. */

const brl = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const SECAO = 'relative overflow-hidden py-12 md:py-16';

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-5">
      <p className="font-mono text-2xs uppercase tracking-[0.24em] text-brand-ink">{children}</p>
      <span className="h-px w-24 bg-brand-ink/40" />
    </div>
  );
}

/* Mesmo desenho do título do orçamento 01: linha de moldura em peso forte e
   a segunda linha como destaque. Aqui o destaque é uma caixa amarela. */
function Titulo({ linhas }) {
  return (
    <h2 className="mt-6 font-display font-extrabold tracking-tight text-fg-primary">
      <span className="block text-3xl leading-[1.1] md:text-5xl">{linhas[0]}</span>
      {linhas[1] && (
        <span className="mt-5 inline-block rounded-md bg-brand px-4 py-1.5 text-xl font-bold text-on-brand md:text-2xl">
          {linhas[1]}
        </span>
      )}
    </h2>
  );
}

export default function OrcamentoProposta({ dados }) {
  const { escopo, conteudos, banner, direcao, investimento } = dados;

  return (
    <>
      <Escopo dados={escopo} />
      <Conteudos dados={conteudos} />
      <Banner dados={banner} />
      <Direcao dados={direcao} />
      <Investimento dados={investimento} />
    </>
  );
}

/* 1 · Escopo ------------------------------------------------------ */
function Escopo({ dados }) {
  return (
    <section id="orcamento-2" data-tone="light" className={`caixa-topo ${SECAO}`}>
      <div className="container-ds">
        <Reveal>
          <Titulo linhas={dados.titulo} />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <p className="max-w-[56ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {dados.lead}
            </p>
            <p className="max-w-[56ch] border-l-2 border-brand pl-6 text-sm leading-relaxed text-fg-secondary md:text-base">
              {dados.mensagem}
            </p>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-lg bg-brand sm:grid-cols-2 lg:grid-cols-4">
            {dados.ficha.map(({ rotulo, valor }) => (
              <div key={rotulo} className="bg-brand p-6 md:p-7">
                <dt className="font-mono text-2xs uppercase tracking-[0.2em] text-on-brand/70">
                  {rotulo}
                </dt>
                <dd className="mt-3 font-display text-lg font-bold leading-snug text-on-brand md:text-xl">
                  {valor}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* 2 · Estrutura do vídeo ------------------------------------------ */
function Conteudos({ dados }) {
  return (
    <section id="estrutura" data-tone="light" className={SECAO}>
      <div className="container-ds">
        <Reveal>
          <Eyebrow>{dados.eyebrow}</Eyebrow>
          <Titulo linhas={dados.titulo} />
        </Reveal>

        <ol className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:gap-4 lg:grid-cols-5">
          {dados.itens.map((item, i) => (
            <li key={item}>
              <Reveal delay={0.04 * i} className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 rounded-lg border border-subtle bg-bg-surface p-5 md:p-6">
                  <span className="flex size-9 items-center justify-center rounded-md bg-brand font-display text-sm font-bold text-on-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-base font-semibold leading-snug text-fg-primary md:text-lg">
                    {item}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Divisor: o produto (Chroma) em largura total, sem título. */
function Banner({ dados }) {
  return (
    <section data-tone="light" className="pb-12 md:pb-16">
      <div className="container-ds">
        <Reveal>
          <img
            src={dados.src}
            alt={dados.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[2.75/1] w-full rounded-lg border border-subtle object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* 3 · Direção criativa -------------------------------------------- */
function Direcao({ dados }) {
  return (
    <section id="direcao" data-tone="light" className={SECAO}>
      <div className="container-ds">
        <Reveal>
          <Eyebrow>{dados.eyebrow}</Eyebrow>
          <Titulo linhas={dados.titulo} />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-16">
            <p className="max-w-[52ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {dados.lead}
            </p>
            <ul className="flex flex-wrap gap-2.5 md:justify-end">
              {dados.elementos.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-strong px-4 py-2 text-sm text-fg-secondary"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {dados.imagens.map((img, i) => (
            <li key={img.src}>
              <Reveal delay={0.05 * (i + 1)}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-lg border border-subtle object-cover"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 4 · Investimento — mesma moldura do preço do orçamento 01: texto à
   esquerda, cartão do preço à direita. O cartão é amarelo. */
function Investimento({ dados }) {
  return (
    <section id="investimento-2" data-tone="light" className={SECAO}>
      <div className="container-ds">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow>{dados.eyebrow}</Eyebrow>
            <Titulo linhas={dados.titulo} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg bg-brand p-8 md:p-12">
              <p className="font-mono text-2xs uppercase tracking-[0.24em] text-on-brand/70">
                {dados.legenda}
              </p>
              <span aria-hidden className="mt-4 block h-px w-10 bg-on-brand/60" />
              <p className="mt-8 font-display text-5xl font-extrabold leading-none tracking-tight text-on-brand md:text-7xl">
                {brl(dados.valor)}
              </p>
              <p className="mt-4 text-sm text-on-brand/80">Valor único, pela edição do vídeo.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
