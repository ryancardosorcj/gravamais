import {
  BookOpen,
  CalendarDays,
  CircleCheck,
  Clock,
  Clapperboard,
  Cog,
  Package,
  Quote,
  Smile,
  Star,
  Users,
} from 'lucide-react';

import { Reveal, TitleBlock } from '../ui';

/* Proposta de projeto único — o roteiro do vídeo no lugar do trecho
   "método → olhar → planos" da página.

   Quatro seções escuras contíguas, que formam UM bloco com o portfólio acima:
   nenhuma leva `caixa-topo`, e só a última leva `caixa-pe`. O dourado é o
   acento de trilha (eyebrow, número, régua); o limão não entra aqui — fica
   com o CTA do fecho.

   Conteúdo todo em `cliente.projeto` (data/proposta.js). Cada seção some se
   o bloco dela não existir, então um projeto menor não renderiza vazio. */

const ICONES_FICHA = { relogio: Clock, pessoas: Users };

const ICONES = {
  pessoas: Users,
  filme: Clapperboard,
  estrela: Star,
  calendario: CalendarDays,
  livro: BookOpen,
  engrenagem: Cog,
  sorriso: Smile,
  pacote: Package,
};

export default function ProjetoProposta({ projeto }) {
  const { escopo, conteudos, depoimentos, roteiro, entrevista, investimento } = projeto;

  return (
    <>
      {escopo && <Escopo dados={escopo} />}
      {conteudos && <Conteudos dados={conteudos} />}
      {depoimentos && <Depoimentos dados={depoimentos} />}
      {roteiro && <Roteiro dados={roteiro} />}
      {/* Sem investimento, a última seção escura é a que fecha o bloco. */}
      {entrevista && <Entrevista dados={entrevista} caixa={investimento ? '' : 'caixa-pe'} />}
      {investimento && <Investimento dados={investimento} />}
    </>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-5">
      <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">{children}</p>
      <span className="h-px w-24 bg-gold/30" />
    </div>
  );
}

function Titulo({ dados }) {
  return (
    <TitleBlock
      linhas={dados.titulo}
      destaque={dados.destaque}
      className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl"
    />
  );
}

/* 1 · Escopo --------------------------------------------------- */
/* Título na largura toda; embaixo, duas colunas que começam na mesma linha.
   Esquerda: objetivo, ficha em linhas de rótulo e valor, resultado.
   Direita: o que está incluso. As colunas se equilibram em altura. */
function Escopo({ dados }) {
  return (
    <section id="escopo" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <Eyebrow>{dados.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-display font-extrabold tracking-tight text-balance text-fg-primary">
            <span className="block text-3xl leading-[1.1] md:text-5xl">{dados.titulo[0]}</span>
            <span className="mt-4 block text-xl font-semibold text-gold md:text-2xl">
              {dados.titulo[1]}
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 border-t border-subtle pt-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="max-w-[52ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {dados.lead}
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {dados.ficha.map(({ rotulo, valor, icone }) => {
                const Icone = ICONES_FICHA[icone];
                return (
                  <div key={rotulo} className="rounded-lg border border-subtle bg-bg-surface p-6">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
                        {rotulo}
                      </dt>
                      {Icone && <Icone size={18} strokeWidth={1.5} className="shrink-0 text-gold" />}
                    </div>
                    <dd className="mt-4 font-display text-lg font-bold leading-snug text-fg-primary md:text-xl">
                      {valor}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-6 flex gap-4 rounded-lg border-l-2 border-gold bg-gold/10 p-6">
              <p className="text-sm leading-relaxed text-fg-secondary">{dados.resultado}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">
              {dados.entregasRotulo}
            </p>
            <ul className="mt-5 border-t border-subtle">
              {dados.entregas.map((item) => (
                <li key={item} className="flex items-start gap-3.5 border-b border-subtle py-5">
                  <CircleCheck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-sm leading-snug text-fg-secondary md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 2 · Conteúdos e materiais -------------------------------------- */
function Conteudos({ dados }) {
  return (
    <section id="conteudos" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <Eyebrow>{dados.eyebrow}</Eyebrow>
          <Titulo dados={dados} />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-16 md:gap-4 lg:grid-cols-3">
          {dados.itens.map(({ icone, rotulo }, i) => {
            const Icone = ICONES[icone];
            return (
              <li key={rotulo}>
                <Reveal delay={0.03 * i} className="h-full">
                  <div className="flex h-full items-center gap-4 rounded-lg border border-subtle bg-bg-surface px-5 py-5 md:px-6 md:py-6">
                    {Icone && <Icone size={20} strokeWidth={1.5} className="shrink-0 text-gold" />}
                    <p className="font-display text-base font-semibold text-fg-primary md:text-lg">
                      {rotulo}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-8 border-t border-strong pt-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">
                {dados.materiaisRotulo}
              </p>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-fg-muted">
                {dados.materiaisLead}
              </p>
            </div>
            <ul className="space-y-3">
              {dados.materiais.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2.5 block h-px w-5 shrink-0 bg-gold/70" />
                  <span className="text-sm leading-snug text-fg-secondary">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 3 · Direção dos depoimentos ---------------------------------- */
function Depoimentos({ dados }) {
  return (
    <section id="depoimentos" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-stretch lg:gap-16">
          {/* A foto é o foco: ocupa a coluna maior, na proporção natural do
              arquivo, e o texto acompanha ao lado. */}
          {/* No desktop a foto estica até o fim da coluna de texto, para não
              sobrar um vazio embaixo dela. No mobile segue a proporção 4:3. */}
          <Reveal className="h-full">
            <img
              src={dados.foto}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full rounded-lg border border-subtle object-cover lg:aspect-auto lg:min-h-[420px]"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>{dados.eyebrow}</Eyebrow>
            <Titulo dados={dados} />

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-subtle pt-8 md:gap-6">
              {dados.numeros.map(({ valor, legenda }) => (
                <div key={legenda}>
                  <dt className="font-display text-xl font-extrabold leading-none text-fg-primary md:text-3xl">
                    {valor}
                  </dt>
                  <dd className="mt-3 text-xs leading-snug text-fg-muted">{legenda}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 font-mono text-2xs uppercase tracking-[0.2em] text-gold">
              {dados.areasRotulo}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {dados.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-gold/40 px-4 py-2 text-sm text-fg-secondary"
                >
                  {area}
                </li>
              ))}
            </ul>

            <ul className="mt-10 space-y-5">
              {dados.pontos.map((ponto) => (
                <li key={ponto} className="flex items-start gap-4 border-b border-subtle pb-5">
                  <span aria-hidden className="mt-2.5 block h-px w-6 shrink-0 bg-gold/70" />
                  <span className="text-sm leading-relaxed text-fg-secondary">{ponto}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 4 · Storyboard ----------------------------------------------- */
function Roteiro({ dados }) {
  const total = dados.blocos.reduce((soma, b) => soma + b.segundos, 0);

  return (
    <section id="roteiro" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>{dados.eyebrow}</Eyebrow>
            <Titulo dados={dados} />
            <p className="mt-7 max-w-[62ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {dados.lead}
            </p>
          </div>
        </Reveal>

        {/* Régua do vídeo: cada bloco ocupa a fatia proporcional à duração. É
            decorativa — a mesma informação está em texto em cada bloco. */}
        <Reveal delay={0.05}>
          <div aria-hidden className="mt-12 flex gap-1 md:mt-14">
            {dados.blocos.map((b, i) => (
              <div
                key={b.titulo}
                style={{ flexGrow: b.segundos, flexBasis: 0 }}
                className="flex h-9 items-center justify-center rounded-sm border border-gold/40 font-mono text-2xs text-gold"
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
          <div aria-hidden className="mt-2 flex justify-between font-mono text-2xs text-fg-subtle">
            <span>00:00</span>
            <span>{`0${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`}</span>
          </div>
        </Reveal>

        <ol className="mt-10 border-t border-subtle md:mt-12">
          {dados.blocos.map((b, i) => (
            <li key={b.titulo} className="border-b border-subtle">
              <Reveal className="grid gap-6 py-9 md:py-11 lg:grid-cols-[9rem_16rem_1fr] lg:gap-10">
                <div className="flex items-baseline gap-4 lg:block">
                  <span className="font-display text-2xl font-semibold leading-none text-gold/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-2xs uppercase tracking-[0.2em] text-fg-muted lg:mt-4">
                    {b.inicio} – {b.fim}
                  </p>
                </div>

                {b.foto && (
                  <img
                    src={b.foto}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] w-full max-w-sm rounded-lg border border-subtle object-cover lg:max-w-none"
                  />
                )}

                <div className="max-w-3xl">
                  <h3 className="font-display text-xl font-bold leading-snug text-fg-primary md:text-2xl">
                    {b.titulo}
                  </h3>

                  <Campo rotulo="Imagem">{b.imagem}</Campo>
                  {b.narracao && <Campo rotulo="Narração" aspas>{b.narracao}</Campo>}
                  {b.depoimento && <Campo rotulo="Depoimento">{b.depoimento}</Campo>}
                  {b.mensagem && <Campo rotulo="Texto final" aspas>{b.mensagem}</Campo>}
                  {b.complemento && <Campo rotulo="Complemento na tela final" aspas>{b.complemento}</Campo>}

                  {b.perguntas && (
                    <div className="mt-6">
                      <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">
                        {b.perguntas.length > 1 ? 'Perguntas sugeridas' : 'Pergunta'}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {b.perguntas.map((p) => (
                          <li key={p} className="flex items-start gap-3">
                            <Quote
                              size={14}
                              strokeWidth={1.5}
                              className="mt-1 shrink-0 text-gold"
                            />
                            <span className="text-sm leading-relaxed text-fg-secondary">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Campo({ rotulo, aspas = false, children }) {
  return (
    <div className="mt-6">
      <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">{rotulo}</p>
      <p className="mt-2.5 text-sm leading-relaxed text-fg-secondary md:text-base">
        {aspas ? `“${children}”` : children}
      </p>
    </div>
  );
}

/* 5 · Guia de entrevista + recomendação ------------------------ */
function Entrevista({ dados, caixa = '' }) {
  return (
    <section
      id="entrevista"
      data-tone="dark"
      className={`section relative overflow-hidden ${caixa}`}
    >
      <div className="container-ds">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{dados.eyebrow}</Eyebrow>
            <Titulo dados={dados} />
            <p className="mt-7 max-w-[46ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {dados.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="border-t border-subtle">
              {dados.perguntas.map((p, i) => (
                <li key={p} className="flex items-start gap-5 border-b border-subtle py-5">
                  <span className="font-display text-lg font-semibold leading-snug text-gold/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-fg-primary md:text-base">{p}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-strong pt-10 md:mt-20 md:pt-12">
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">
              {dados.recomendacaoRotulo}
            </p>
            <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
              {dados.recomendacoes.map((r, i) => (
                <div key={i}>
                  <h3 className="font-display text-2xl font-bold leading-[1.2] tracking-tight text-fg-primary md:text-3xl">
                    {r.titulo.map((parte, j) => (
                      <span key={j} className={parte.gold ? 'text-gold' : undefined}>
                        {parte.texto}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-fg-muted md:text-base">
                    {r.texto}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-14 max-w-3xl border-l border-gold/60 pl-6 text-sm leading-relaxed text-fg-secondary md:text-base">
              {dados.mensagemCentral}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 6 · Investimento ------------------------------------------------
   Fecha o bloco escuro (`caixa-pe`). Preço único, sem seletor: é um projeto,
   não um plano — por isso não usa o PlanosSelector. */
const brl = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function Investimento({ dados }) {
  return (
    <section
      id="investimento"
      data-tone="dark"
      className="caixa-pe section relative overflow-hidden"
    >
      <div className="container-ds">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow>{dados.eyebrow}</Eyebrow>
            <Titulo dados={dados} />
            <ul className="mt-9 space-y-4">
              {dados.condicoes.map((c) => (
                <li key={c} className="flex items-start gap-3.5">
                  <CircleCheck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                  <span className="max-w-[52ch] text-sm leading-relaxed text-fg-secondary md:text-base">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sem `valor` no dado, o cartão de preço não renderiza. */}
          {dados.valor != null && (
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-subtle bg-bg-surface p-8 md:p-12">
                <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">
                  {dados.legenda}
                </p>
                <span aria-hidden className="mt-4 block h-px w-10 bg-gold/70" />
                <p className="mt-8 font-display text-5xl font-extrabold leading-none tracking-tight text-fg-primary md:text-7xl">
                  {brl(dados.valor)}
                </p>
                <p className="mt-4 text-sm text-fg-muted">Valor único, pelo projeto completo.</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
