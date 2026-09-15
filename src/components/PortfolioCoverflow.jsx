import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

/* Carrossel coverflow do portfólio.
   Cada card ganha uma posição relativa ao centro (…-2, -1, 0, 1, 2…) e daí
   sai a transformação: quanto mais longe do centro, mais recuado em Z, mais
   girado em Y, mais escuro e mais desfocado. O card 0 fica reto e aceso.
   Além de ±2 o card é escondido — renderizar a fila inteira custa caro e
   ninguém vê. */
export default function PortfolioCoverflow({ itens }) {
  const [ativo, setAtivo] = useState(0);
  const reduz = useReducedMotion();
  const total = itens.length;

  const ir = useCallback(
    (delta) => setAtivo((i) => (i + delta + total) % total),
    [total],
  );

  // Avanço automático, pausado quando a aba está oculta
  useEffect(() => {
    if (reduz) return;
    const t = setInterval(() => {
      if (!document.hidden) ir(1);
    }, 3800);
    return () => clearInterval(t);
  }, [ir, reduz]);

  // Navegação por teclado
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') ir(-1);
    if (e.key === 'ArrowRight') ir(1);
  };

  /* Distância até o centro, pelo caminho mais curto do anel */
  const offset = (i) => {
    let d = i - ativo;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const estilo = (d) => {
    const abs = Math.abs(d);
    const sinal = Math.sign(d);
    // O deslocamento lateral é % da largura do CARD. 76% deixa o vizinho
    // visível pela metade sem cobrir o central — abaixo disso eles colidem.
    return {
      transform: `translateX(calc(-50% + ${d * 76}%)) translateZ(${
        -abs * 130
      }px) rotateY(${-sinal * Math.min(abs, 2) * 26}deg) scale(${
        1 - abs * 0.05
      })`,
      opacity: abs > 2 ? 0 : 1 - abs * 0.25,
      filter: abs === 0 ? 'none' : `brightness(${1 - abs * 0.32}) blur(${abs * 1.8}px)`,
      zIndex: 50 - abs,
      pointerEvents: abs > 2 ? 'none' : 'auto',
      visibility: abs > 2 ? 'hidden' : 'visible',
    };
  };

  return (
    <div
      className="coverflow"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Portfólio da GravaMais"
      tabIndex={0}
      onKeyDown={onKey}
    >
      <div className="coverflow-glow" />

      <div className="coverflow-stage">
        {itens.map((item, i) => {
          const d = offset(i);
          const central = d === 0;
          return (
            <button
              key={item.id}
              type="button"
              /* Clicar num card lateral anda UM passo naquela direção — não
                 salta direto para ele. Assim a fila desliza de forma previsível
                 e o usuário sempre entende o que aconteceu. */
              onClick={() => (central ? null : ir(Math.sign(d)))}
              aria-label={
                central
                  ? `${item.titulo} — em destaque`
                  : d > 0
                    ? `Avançar para ${item.titulo}`
                    : `Voltar para ${item.titulo}`
              }
              aria-current={central}
              tabIndex={Math.abs(d) > 2 ? -1 : 0}
              className="coverflow-item"
              style={estilo(d)}
            >
              {/* 9:16 — o formato de reels. As capas 16:9 do YouTube são
                  cortadas ao centro pelo object-cover, que é onde o assunto
                  quase sempre está. */}
              <div
                className={`relative aspect-[9/16] overflow-hidden rounded-xl border bg-bg-surface text-left transition-shadow duration-slower ${
                  central
                    ? 'border-brand/50 shadow-brand'
                    : 'border-white/10 shadow-lg'
                }`}
              >
                <div className="absolute inset-0">
                  {/* absolute inset-0: sem isto a thumb 16:9 não preenche o
                      card 3/4 e sobra uma faixa vazia no topo. */}
                  <img
                    src={item.capa}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (e.currentTarget.src !== item.capaAlt) {
                        e.currentTarget.src = item.capaAlt;
                      }
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Degradê para o texto sobreviver a qualquer capa */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-2xs font-medium tracking-wider text-white backdrop-blur-sm">
                    {item.tag}
                  </span>

                  {central && (
                    /* Play em vidro: o amarelo sólido roubava o olho da capa.
                       A lâmina deixa o frame passar e ainda assim se lê. */
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-lg backdrop-blur-md transition-colors duration-base group-hover:bg-white/25">
                      <Play size={22} fill="currentColor" className="ml-0.5" />
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-base font-bold leading-tight text-white">
                      {item.titulo}
                    </h3>
                    <p className="mt-1 text-xs text-white/65">{item.cliente}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Controles */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => ir(-1)}
          aria-label="Projeto anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-base text-fg-primary transition-colors duration-base hover:border-strong"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center" role="tablist">
          {itens.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === ativo}
              aria-label={item.titulo}
              onClick={() => setAtivo(i)}
              /* O botão tem 44px de alvo de toque; o ponto visível dentro dele
                 tem 8px. Área grande o suficiente para o dedo, marca pequena
                 o suficiente para o olho. */
              className="group flex h-11 w-6 items-center justify-center"
            >
              <span
                className={`h-2 rounded-full transition-all duration-base ease-out ${
                  i === ativo
                    ? 'w-7 bg-brand'
                    : 'w-2 bg-fg-primary/25 group-hover:bg-fg-primary/50'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => ir(1)}
          aria-label="Próximo projeto"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-base text-fg-primary transition-colors duration-base hover:border-strong"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
