import {
  ArrowRight,
  Building2,
  CalendarDays,
  CircleCheck,
  Cog,
  Eye,
  MessageSquare,
  Shield,
  Star,
  Target,
} from 'lucide-react';

import { OLHAR } from '../../data/proposta';
import { Reveal } from '../ui';

/* Nosso olhar — a leitura da empresa do cliente, antes dos planos.

   É a seção mais curta da página de propósito: prova que houve estudo, não
   entrega o diagnóstico inteiro.

   Composição editorial, não card: os blocos são colunas separadas por filete.
   Card repetiria a gramática dos planos, que vêm logo abaixo, e pesaria uma
   seção que precisa ser lida em dez segundos.

   DOIS FORMATOS, por bloco. Um bloco cujo valor é string renderiza o parágrafo
   simples; um bloco objeto renderiza a versão desenhada — headline, lista com
   ícone e nota. Os dois convivem porque as propostas não migram todas de uma
   vez: a base e os clientes antigos seguem no parágrafo enquanto o formato
   novo é validado em campo. Quando todos tiverem migrado, BlocoTexto sai.

   Sem `olhar` no cliente a seção não renderiza: uma proposta com quatro blocos
   vazios diz o oposto do que ela existe para dizer. */

const ICONES = {
  calendario: CalendarDays,
  engrenagem: Cog,
  predio: Building2,
  check: CircleCheck,
  olho: Eye,
  estrela: Star,
  escudo: Shield,
  balao: MessageSquare,
  alvo: Target,
};

export default function NossoOlhar({ cliente }) {
  const olhar = cliente.olhar;
  if (!olhar) return null;

  const blocos = OLHAR.blocos.filter(({ chave }) => olhar[chave]);
  if (!blocos.length) return null;

  const direcoes = olhar.direcoes ?? [];
  const imagens = olhar.imagens ?? [];

  return (
    <section id="olhar" data-tone="dark" className="section relative overflow-hidden">
      {imagens.length > 0 && <Faixas imagens={imagens} />}

      <div className="container-ds relative">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-5">
              <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">
                {OLHAR.eyebrow}
              </p>
              <span className="h-px w-24 bg-gold/30" />
            </div>

            {/* O nome do cliente cai para a segunda linha sempre, não por
                acaso da largura: o prefixo é moldura, o nome é o assunto. */}
            <h2
              className="mt-6 font-display font-extrabold tracking-tight text-fg-primary"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)', lineHeight: 1.04 }}
            >
              {OLHAR.tituloPrefixo}
              <span className="block text-gold">{cliente.nome}</span>
            </h2>

            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {OLHAR.lead}
            </p>
          </div>
        </Reveal>

        {/* Até md os filetes saem do `gap-px` sobre um fundo da cor da borda, e
            cada célula repinta o fundo da seção. A partir de lg isso é trocado
            por `border-l`: as células ficam transparentes para as faixas
            aparecerem atrás, e com 4 colunas fixas o filete é só "todas menos a
            primeira" — sem regra de nth-child por breakpoint. */}
        <ol className="mt-14 grid gap-px bg-[var(--border-subtle)] md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:bg-transparent">
          {blocos.map(({ chave, rotulo }, i) => (
            <li
              key={chave}
              className="bg-bg-deep lg:bg-transparent lg:border-l lg:border-subtle lg:first:border-l-0"
            >
              <Reveal delay={0.06 * i} className="h-full py-8 md:px-8 md:py-9 lg:px-7">
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl font-semibold leading-none text-gold/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-10 bg-gold/30" />
                </div>

                <p className="mt-4 font-mono text-2xs uppercase tracking-[0.2em] text-fg-muted">
                  {rotulo}
                </p>

                {typeof olhar[chave] === 'string' ? (
                  <BlocoTexto texto={olhar[chave]} />
                ) : (
                  <BlocoRico bloco={olhar[chave]} />
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        {direcoes.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col gap-5 border-t border-strong pt-8 sm:flex-row sm:items-center sm:gap-10 md:mt-16">
              <div className="flex shrink-0 items-center gap-5">
                <p className="font-mono text-2xs uppercase tracking-[0.2em] text-gold">
                  {OLHAR.direcoesRotulo}
                </p>
                <span className="hidden h-px w-16 bg-gold/30 sm:block" />
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {direcoes.map((direcao) => {
                  /* Cliente antigo traz string; o formato novo traz
                     { texto, icone }. */
                  const texto = direcao.texto ?? direcao;
                  const Icone = ICONES[direcao.icone];

                  return (
                    <li
                      key={texto}
                      className="flex items-center gap-2.5 rounded-full border border-gold/40 px-4 py-2 text-sm text-fg-secondary"
                    >
                      {Icone && <Icone size={15} className="shrink-0 text-gold" />}
                      {texto}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function BlocoTexto({ texto }) {
  return <p className="mt-4 text-sm leading-relaxed text-fg-secondary">{texto}</p>;
}

function BlocoRico({ bloco }) {
  const { headline = [], itens = [], passos = [], icone, texto, nota } = bloco;
  const IconeSolto = ICONES[icone];

  return (
    <>
      <h3 className="mt-5 font-display text-xl font-bold leading-[1.25] tracking-tight text-fg-primary">
        {headline.map((parte, i) => (
          <span key={i} className={parte.gold ? 'text-gold' : undefined}>
            {parte.texto}
          </span>
        ))}
      </h3>

      {IconeSolto && <IconeSolto size={26} strokeWidth={1.25} className="mt-6 text-gold" />}

      {texto && (
        <p className="mt-5 text-sm leading-relaxed text-fg-secondary">{texto}</p>
      )}

      {itens.length > 0 && (
        <ul className="mt-6 space-y-3.5">
          {itens.map(({ icone: nomeIcone, texto: item }) => {
            const Icone = ICONES[nomeIcone];
            return (
              <li key={item} className="flex items-start gap-3">
                {Icone && (
                  <Icone
                    size={17}
                    strokeWidth={1.5}
                    /* mt-0.5 alinha o ícone à primeira linha do texto, não ao
                       centro do item — itens de duas linhas ficariam com o
                       ícone flutuando no meio. */
                    className="mt-0.5 shrink-0 text-gold"
                  />
                )}
                <span className="text-sm leading-snug text-fg-secondary">{item}</span>
              </li>
            );
          })}
        </ul>
      )}

      {passos.length > 0 && (
        <ol className="mt-6 space-y-5">
          {passos.map(({ rotulo, texto: descricao }) => (
            <li key={rotulo} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/40">
                <ArrowRight size={13} strokeWidth={1.75} className="text-gold" />
              </span>
              <span>
                <span className="block font-mono text-2xs uppercase tracking-[0.16em] text-gold">
                  {rotulo}
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-fg-secondary">
                  {descricao}
                </span>
              </span>
            </li>
          ))}
        </ol>
      )}

      {nota && (
        <p className="mt-6 border-t border-subtle pt-5 text-xs leading-relaxed text-fg-subtle">
          {nota}
        </p>
      )}
    </>
  );
}

/* Faixas de foto ao fundo, só a partir de lg.

   Abaixo disso as colunas empilham e a foto passaria por trás do texto em vez
   de entre as colunas — vira ruído e come contraste justamente na tela onde
   ele é mais escasso.

   Cada faixa é mascarada nas laterais para dissolver no preto em vez de
   terminar numa aresta reta, e leva um véu por cima: sobre foto o texto branco
   precisa de véu, é regra do design system. */
const mascara = (sangra) =>
  sangra
    ? 'linear-gradient(90deg, transparent, #000 34%)'
    : 'linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent)';

function Faixas({ imagens }) {
  /* A terceira é mais larga e sai pela direita: na referência ela sangra
     na borda em vez de terminar dentro da grade. */
  const posicoes = [
    { left: '21%', width: '18%' },
    { left: '47%', width: '18%' },
    { left: '82%', width: '26%' },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {imagens.slice(0, 3).map((src, i) => (
        <div
          key={src}
          className="absolute inset-y-0"
          style={{
            ...posicoes[i],
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.22,
            WebkitMaskImage: mascara(i === 2),
            maskImage: mascara(i === 2),
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--bg-deep) 0%, rgb(0 0 0 / 0.35) 38%, rgb(0 0 0 / 0.45) 62%, var(--bg-deep) 100%)',
        }}
      />
    </div>
  );
}
