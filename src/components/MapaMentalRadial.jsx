import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Camera, Plus, Star, Target, Users, Video } from 'lucide-react';

const ICONES = { Video, Camera, Target, Users, Star };

/* Mapa mental — prévia estática, não mais interativa. Depois de três
   rodadas tentando replicar o comportamento de abrir/fechar do mapa real
   (ferramenta externa), o pedido mudou: isso aqui é só uma "imagem" com os
   5 galhos fechados, igual à referência — o card inteiro é um link que abre
   o mapa de verdade em outra aba. Sem estado, sem pan/zoom, sem +/− clicável
   (os círculos com "+" ficam só de decoração, combinando com a referência).

   As curvas continuam medidas em JS (getBoundingClientRect) porque a
   largura de cada pílula varia com o texto — só não há mais nada
   recalculando por causa de abrir/fechar, já que nada abre. */
export default function MapaMentalRadial({ centro, nos, link }) {
  const [curvas, setCurvas] = useState([]);
  const palcoRef = useRef(null);
  const origemRef = useRef(null);
  const refsPorId = useRef(new Map());

  const medir = useCallback(() => {
    const palco = palcoRef.current;
    const origem = origemRef.current;
    if (!palco || !origem || window.innerWidth < 768) {
      setCurvas([]);
      return;
    }

    const p = palco.getBoundingClientRect();
    const borda = (el, ladoAlvo) => {
      const r = el.getBoundingClientRect();
      return { x: (ladoAlvo === 'direita' ? r.right : r.left) - p.left, y: r.top + r.height / 2 - p.top };
    };
    const curva = (a, b) => {
      const midX = (a.x + b.x) / 2;
      return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
    };

    const novas = [];
    nos.forEach((no) => {
      const el = refsPorId.current.get(no.id);
      if (!el) return;
      const ladoDoGalho = no.lado === 'esquerda' ? 'esquerda' : 'direita';
      const origemPonto = borda(origem, ladoDoGalho);
      const destino = borda(el, ladoDoGalho === 'esquerda' ? 'direita' : 'esquerda');
      novas.push({ d: curva(origemPonto, destino), cor: no.cor });
    });
    setCurvas(novas);
  }, [nos]);

  useLayoutEffect(() => {
    medir();
    const obs = new ResizeObserver(medir);
    if (palcoRef.current) obs.observe(palcoRef.current);
    window.addEventListener('resize', medir);
    return () => {
      obs.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [medir]);

  const esquerda = nos.filter((no) => no.lado === 'esquerda');
  const direita = nos.filter((no) => no.lado !== 'esquerda');

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-tone="dark"
      className="group relative block overflow-hidden rounded-xl border border-white/10 px-6 py-20 transition-[filter,transform] duration-slow ease-out hover:brightness-110 md:px-16"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 25% 50%, rgba(217,96,106,0.09), transparent 65%), var(--ink-950)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <span className="absolute right-5 top-5 z-raised flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 font-mono text-2xs text-white opacity-80 backdrop-blur-sm transition-opacity duration-base group-hover:opacity-100">
        Abrir mapa completo
        <ArrowUpRight size={13} aria-hidden />
      </span>

      <div ref={palcoRef} className="relative mx-auto flex max-w-3xl items-center justify-center gap-12 lg:gap-16">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
          {curvas.map((c, i) => (
            <path key={i} d={c.d} fill="none" stroke={`var(${c.cor})`} strokeWidth={2} strokeLinecap="round" opacity={0.85} />
          ))}
        </svg>

        <Ramos nos={esquerda} refsPorId={refsPorId} invertido />

        <div ref={origemRef} className="relative shrink-0">
          <p className="whitespace-nowrap font-display text-xl font-extrabold uppercase tracking-tight text-white lg:text-2xl">
            {centro}
          </p>
        </div>

        <Ramos nos={direita} refsPorId={refsPorId} />
      </div>
    </a>
  );
}

function Ramos({ nos, refsPorId, invertido = false }) {
  if (!nos.length) return null;
  return (
    <div className="flex shrink-0 flex-col gap-5">
      {nos.map((no) => {
        const Icone = ICONES[no.icone] ?? Target;
        return (
          <div key={no.id} className={`flex items-center gap-2.5 ${invertido ? 'flex-row-reverse' : ''}`}>
            <span
              ref={(el) => {
                if (el) refsPorId.current.set(no.id, el);
                else refsPorId.current.delete(no.id);
              }}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border bg-black/40 px-4 py-2.5 backdrop-blur-sm"
              style={{ borderColor: `var(${no.cor})`, color: 'var(--white)' }}
            >
              <Icone size={16} strokeWidth={2} aria-hidden style={{ color: `var(${no.cor})` }} />
              <span className="text-sm font-semibold">{no.titulo}</span>
            </span>
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: `var(${no.cor})`, color: `var(${no.cor})` }}
            >
              <Plus size={13} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
