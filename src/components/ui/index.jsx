/* ============================================================
   PRIMITIVOS DO DESIGN SYSTEM
   Blocos reutilizáveis. As seções compõem a página a partir daqui.
   ============================================================ */
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Play } from 'lucide-react';

/* Reveal — entrada ao entrar no viewport.
   Usa só transform/opacity para não causar reflow.

   Percurso curto (16px, era 24) e um pouco mais rápido: a entrada deve ser
   percebida de canto de olho, não assistida. Deslocamento longo faz a página
   inteira parecer que está "montando" enquanto se rola. */
export function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const reduz = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduz ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: reduz ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // expo.out — mesma curva dos tokens
      }}
    >
      {children}
    </motion.div>
  );
}

/* Eyebrow — label mono que assina cada seção */
export function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

/* TitleBlock — título multilinha com uma linha em amarelo.
   `linhas` é um array; `destaque` é o índice que recebe a cor da marca. */
export function TitleBlock({ linhas, destaque, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={className}>
      {linhas.map((linha, i) => (
        <span key={i} className="block">
          <span className={i === destaque ? 'accent' : undefined}>{linha}</span>
        </span>
      ))}
    </Tag>
  );
}

/* Section — o `tone` pinta o fundo e redefine os tokens semânticos para tudo
   que está dentro. Um mesmo botão sai âmbar no claro, limão no escuro e preto
   no amarelo, sem variante nem prop. */
export function Section({ id, children, className = '', tone = 'light' }) {
  return (
    <section id={id} data-tone={tone} className={`section relative ${className}`}>
      <div className="container-ds">{children}</div>
    </section>
  );
}

/* Botão / link de ação */
export function Button({
  as = 'a',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const Tag = as;
  const classes = [
    'btn',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    size === 'lg' ? 'btn-lg' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

/* Card — medalhão de ícone, título, régua e texto.
   Todos os cards da fileira são IGUAIS: nenhum "selecionado". A hierarquia vem
   da ordem, não da cor.
   O hover é sóbrio: sobe 3px, a borda ganha corpo, a sombra abre (ver .card em
   index.css). O reflexo rasante e a borda de luz girando saíram os dois.
   `variante` escolhe a superfície da fileira inteira, não de um card isolado. */
export function Card({ icone: Icone, titulo, texto, variante = 'glass' }) {
  const superficie =
    variante === 'dark' ? 'card-dark' : variante === 'amber' ? 'card-amber' : '';
  return (
    <article className={`card ${superficie}`}>
      <span className="card-medal">
        <Icone size={28} strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="text-xl">{titulo}</h3>
      <div className="card-rules" aria-hidden>
        <span />
      </div>
      <p className="text-sm opacity-85">{texto}</p>
    </article>
  );
}

/* LiteYouTube — fachada de vídeo.
   Mostra só a thumbnail até o clique; o iframe (≈1MB de JS do YouTube)
   só é montado sob demanda. Mantém o carregamento da página leve. */
export function LiteYouTube({ id, titulo, vertical = false, autoplay = true }) {
  const [ativo, setAtivo] = useState(false);
  const proporcao = vertical ? 'aspect-[9/16]' : 'aspect-video';
  // maxres não existe para todo vídeo; hqdefault existe sempre.
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-bg-surface ${proporcao}`}
    >
      {ativo ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=${
            autoplay ? 1 : 0
          }&rel=0&modestbranding=1`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          aria-label={`Reproduzir vídeo: ${titulo}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = fallback;
            }}
            className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
          />
          {/* Escurecimento: garante contraste do play sobre qualquer thumbnail */}
          <span className="absolute inset-0 bg-black/30 transition-colors duration-base group-hover:bg-black/15" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-on-brand shadow-brand transition-transform duration-base ease-out group-hover:scale-110">
            <Play size={24} fill="currentColor" className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}
