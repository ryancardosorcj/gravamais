import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import {
  Building2,
  Search,
  Compass,
  PenLine,
  Clapperboard,
  Send,
  LayoutGrid,
  TrendingUp,
} from 'lucide-react';
import { MAPA } from '../data/site';
import { TitleBlock, Reveal } from './ui';

/* Mapa do método — trilha luminosa que desce conforme a página rola.

   O nó fica NO EIXO CENTRAL e o cartão ao lado, alternando os lados. Assim a
   trilha corre reta pelo meio e os cartões é que se alternam — que é o que dá
   a leitura de mapa, e não de linha do tempo torta.

   A trilha BRILHA: um filtro de desfoque gaussiano mesclado com o traço nítido.
   Dois traços empilhados (um grosso translúcido + um fino) não dão o mesmo
   resultado — sem o desfoque de verdade a "luz" tem borda dura e lê como
   contorno, não como brilho.

   O acento é o DOURADO DA PAREDE (--gold-*), já amostrado da cena dos
   fundadores. O limão continua exclusivo dos CTAs.

   AS CURVAS SÃO MEDIDAS (getBoundingClientRect + ResizeObserver). Calcular na
   mão exigiria fixar altura de cartão, e o mapa quebraria no primeiro texto
   que quebrasse uma linha a mais.

   Sem "etapa" e sem a palavra "opcional" em lugar nenhum: as duas frentes
   condicionais chegam por linha tracejada, e os textos delas já começam
   com "Quando…". */

const ICONES = [Search, Compass, PenLine, Clapperboard, Send, LayoutGrid, TrendingUp];

export default function MapaMental() {
  const [segmentos, setSegmentos] = useState([]);
  const [fim, setFim] = useState(null);
  // Dimensão do palco — necessária para a região do filtro de brilho.
  const [palco, setPalco] = useState({ w: 0, h: 0 });

  const palcoRef = useRef(null);
  const origemRef = useRef(null);
  const nosRef = useRef([]);

  const medir = useCallback(() => {
    const palcoEl = palcoRef.current;
    const origem = origemRef.current;
    if (!palcoEl || !origem) return;

    if (window.innerWidth < 768) {
      setSegmentos([]); // no mobile a trilha é uma régua vertical
      setFim(null);
      return;
    }

    const p = palcoEl.getBoundingClientRect();
    setPalco({ w: p.width, h: p.height });
    const centro = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - p.left, y: r.top + r.height / 2 - p.top };
    };

    const ro = origem.getBoundingClientRect();
    const pontos = [
      // a trilha nasce na BORDA DE BAIXO do cartão de origem, não no meio dele
      { x: ro.left + ro.width / 2 - p.left, y: ro.bottom - p.top },
      ...nosRef.current.filter(Boolean).map(centro),
    ];

    const novos = [];
    for (let i = 1; i < pontos.length; i++) {
      const a = pontos[i - 1];
      const b = pontos[i];
      const my = (a.y + b.y) / 2;
      novos.push({
        d: `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`,
        tracejado: !MAPA.nos[i - 1].base, // o traço do nó em que CHEGA
      });
    }
    // A cauda e o ponto de luz que fecham a trilha. Montados ANTES do
    // setSegmentos: empurrar no array depois de entregá-lo ao React seria
    // mutar estado já publicado.
    const ultimo = pontos[pontos.length - 1];
    if (ultimo && novos.length) {
      const fimY = ultimo.y + 110;
      novos.push({
        d: `M ${ultimo.x} ${ultimo.y} L ${ultimo.x} ${fimY}`,
        tracejado: true,
      });
      setFim({ x: ultimo.x, y: fimY });
    } else {
      setFim(null);
    }

    setSegmentos(novos);
  }, []);

  useLayoutEffect(() => {
    medir();
    const obs = new ResizeObserver(medir);
    if (palcoRef.current) obs.observe(palcoRef.current);
    nosRef.current.forEach((el) => el && obs.observe(el));
    window.addEventListener('resize', medir);
    return () => {
      obs.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [medir]);

  return (
    <section
      id="metodo"
      data-tone="dark"
      className="caixa-topo section relative overflow-hidden"
    >
      {/* Luz de topo — tira o preto chapado do fundo do painel */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[46rem] w-[70rem] -translate-x-1/2 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(242,219,174,0.10), transparent 62%)',
        }}
      />

      <div className="container-ds relative">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <TitleBlock
              linhas={MAPA.titulo}
              destaque={MAPA.destaque}
              className="mx-auto max-w-[34ch] font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl"
            />
            <p className="lead mx-auto mt-7 !max-w-[78ch]">{MAPA.lead}</p>
          </div>
        </Reveal>

        <div ref={palcoRef} className="relative mt-20 md:mt-24">
          {/* A trilha luminosa */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <defs>
              {/* filterUnits em userSpaceOnUse, NÃO em porcentagem.
                  Com os nós centralizados cada segmento é uma reta vertical, e
                  reta vertical tem bounding box de LARGURA ZERO: uma região de
                  filtro em "220%" vira 220% de zero, o filtro devolve vazio e o
                  traço desaparece por completo. Em coordenadas de usuário a
                  região é a do palco inteiro e o problema não existe. */}
              <filter
                id="brilho-trilha"
                filterUnits="userSpaceOnUse"
                x="-40"
                y="-40"
                width={palco.w + 80}
                height={palco.h + 80}
              >
                <feGaussianBlur stdDeviation="3.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {segmentos.map((s, i) => (
              <path
                key={i}
                d={s.d}
                fill="none"
                stroke="var(--gold-300)"
                strokeWidth={s.tracejado ? 1.1 : 1.6}
                strokeLinecap="round"
                strokeDasharray={s.tracejado ? '4 9' : undefined}
                opacity={s.tracejado ? 0.6 : 0.95}
                filter="url(#brilho-trilha)"
              />
            ))}
          </svg>

          {/* No mobile, régua vertical no lugar das curvas */}
          <span
            aria-hidden
            className="absolute bottom-10 left-[1.625rem] top-0 w-px md:hidden"
            style={{ background: 'var(--border-base)' }}
          />

          {/* ---------- Origem ---------- */}
          <div className="relative flex md:justify-center">
            <div
              ref={origemRef}
              className="card-origem relative ml-[0.125rem] px-7 py-5 md:ml-0 md:px-10 md:py-6"
            >
              <div className="flex items-center gap-3.5">
                <Building2 size={20} strokeWidth={1.9} className="text-gold" aria-hidden />
                <div>
                  <p className="font-display text-lg font-bold leading-none text-fg-primary lg:text-xl">
                    {MAPA.centro}
                  </p>
                  <p className="mt-1.5 font-mono text-2xs uppercase tracking-[0.2em] text-gold/70">
                    {MAPA.centroSub}
                  </p>
                </div>
              </div>
              {/* ponto de luz de onde a trilha nasce */}
              <span
                aria-hidden
                className="brilho-ponta absolute -bottom-1.5 left-1/2 hidden h-3 w-3 -translate-x-1/2 md:block"
              />
            </div>
          </div>

          {/* ---------- Nós ---------- */}
          <ol className="relative mt-10 flex flex-col gap-10 md:mt-12 md:gap-12">
            {MAPA.nos.map((no, i) => {
              const Icone = ICONES[i];
              const direita = i % 2 === 0;
              return (
                <li
                  key={no.titulo}
                  className="flex items-start gap-5 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-7 lg:gap-9"
                >
                  <span
                    ref={(el) => {
                      nosRef.current[i] = el;
                    }}
                    aria-hidden
                    className="no-mapa relative z-raised shrink-0 md:col-start-2 md:row-start-1"
                  >
                    <Icone size={20} strokeWidth={1.8} />
                  </span>

                  {/* justify-self-end encosta o cartão da ESQUERDA no eixo:
                      sem isso ele fica grudado na margem da coluna e sobra um
                      vão morto até o ícone. */}
                  <Reveal
                    className={`min-w-0 flex-1 md:row-start-1 ${
                      direita ? 'md:col-start-3' : 'md:col-start-1 md:justify-self-end'
                    }`}
                  >
                    <article className="card-mapa md:max-w-sm">
                      <h3 className="font-display text-lg font-bold leading-tight text-fg-primary lg:text-xl">
                        {no.titulo}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                        {no.texto}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Fecho luminoso da trilha */}
          {fim && (
            <span
              aria-hidden
              className="brilho-ponta absolute hidden h-4 w-4 md:block"
              style={{ left: fim.x, top: fim.y, transform: 'translate(-50%, -50%)' }}
            />
          )}
        </div>

        {/* A ressalva fecha a seção: é ela que separa "ferramentas que se
            conectam" de "pacote fechado de agência". */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-28 max-w-[58ch] border-t border-subtle pt-8 text-center text-sm text-fg-muted">
            {MAPA.ressalva}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
