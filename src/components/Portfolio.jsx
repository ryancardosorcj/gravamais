import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PORTFOLIO,
  VIDEOS_FILME,
  VIDEOS_SOCIAL,
  FOTOS,
  DESTAQUES,
} from '../data/site';
import { Section, Eyebrow, TitleBlock, Reveal, LiteYouTube } from './ui';
import PortfolioCoverflow from './PortfolioCoverflow';

/* Card de vídeo com legenda */
function CardVideo({ video, vertical }) {
  return (
    <figure>
      <LiteYouTube id={video.id} titulo={video.titulo} vertical={vertical} />
      <figcaption className="mt-4">
        <p className="font-mono text-2xs uppercase tracking-[0.14em] text-brand">
          {video.tipo}
        </p>
        <h3 className="mt-2 text-lg">{video.titulo}</h3>
        <p className="mt-1 text-sm text-fg-muted">{video.cliente}</p>
      </figcaption>
    </figure>
  );
}

/* Lightbox de fotos — navegável por teclado */
function Lightbox({ indice, aoFechar, aoNavegar }) {
  const navegar = useCallback(
    (delta) => aoNavegar((indice + delta + FOTOS.length) % FOTOS.length),
    [indice, aoNavegar],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') aoFechar();
      if (e.key === 'ArrowRight') navegar(1);
      if (e.key === 'ArrowLeft') navegar(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [aoFechar, navegar]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={aoFechar}
    >
      <button
        type="button"
        onClick={aoFechar}
        aria-label="Fechar"
        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-white/10"
      >
        <X size={26} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          navegar(-1);
        }}
        aria-label="Foto anterior"
        className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-white/10 md:left-8"
      >
        <ChevronLeft size={30} />
      </button>

      <motion.img
        key={indice}
        src={FOTOS[indice]}
        alt={`Fotografia ${indice + 1} do portfólio da GravaMais`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          navegar(1);
        }}
        aria-label="Próxima foto"
        className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-white/10 md:right-8"
      >
        <ChevronRight size={30} />
      </button>

      <p className="absolute bottom-6 font-mono text-xs tracking-widest text-fg-muted">
        {indice + 1} / {FOTOS.length}
      </p>
    </motion.div>
  );
}

export default function Portfolio() {
  const [aba, setAba] = useState('filmes');
  const [foto, setFoto] = useState(null);

  return (
    <Section id="portfolio" tone="dark">
      <Reveal>
        <Eyebrow>{PORTFOLIO.eyebrow}</Eyebrow>
        <TitleBlock
          linhas={PORTFOLIO.titulo}
          destaque={PORTFOLIO.destaque}
          className="title-section mt-6"
        />
      </Reveal>

      {/* Destaques em coverflow — a vitrine antes da grade completa */}
      <Reveal delay={0.05}>
        <div className="mt-16">
          <PortfolioCoverflow itens={DESTAQUES} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-16 font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">
          Todos os trabalhos
        </p>
      </Reveal>

      {/* Abas */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Categorias do portfólio"
          className="mt-6 flex flex-wrap gap-2"
        >
          {PORTFOLIO.abas.map((item) => {
            const ativa = aba === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={ativa}
                onClick={() => setAba(item.id)}
                className={`h-11 rounded-full px-6 text-sm font-semibold transition-all duration-base ease-out ${
                  ativa
                    ? 'bg-brand text-on-brand'
                    : 'border border-base text-fg-secondary hover:border-strong hover:text-fg-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Conteúdo da aba */}
      <div className="mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={aba}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {aba === 'filmes' && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {VIDEOS_FILME.map((v) => (
                  <CardVideo key={v.id} video={v} vertical={false} />
                ))}
              </div>
            )}

            {aba === 'social' && (
              <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
                {VIDEOS_SOCIAL.map((v) => (
                  <CardVideo key={v.id} video={v} vertical />
                ))}
              </div>
            )}

            {aba === 'fotos' && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {FOTOS.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setFoto(i)}
                    aria-label={`Ampliar fotografia ${i + 1}`}
                    className="group relative aspect-[4/5] overflow-hidden rounded-md bg-bg-surface"
                  >
                    <img
                      src={src}
                      alt={`Fotografia ${i + 1} do portfólio da GravaMais`}
                      loading="lazy"
                      decoding="async"
                      width="614"
                      height="768"
                      className="h-full w-full object-cover transition-transform duration-slower ease-out group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-base group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {foto !== null && (
          <Lightbox
            indice={foto}
            aoFechar={() => setFoto(null)}
            aoNavegar={setFoto}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
