import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { HERO, whatsappLink } from '../data/site';

/* Hero — a VSL em loop, muda, sem controles, como plano de fundo.

   O conteúdo é ancorado embaixo (justify-end): o meio da tela fica livre e o
   vídeo respira. O véu (.hero-scrim) é forte no pé, que é justamente onde vivem
   o título e os CTAs — é ele que garante o texto branco em qualquer frame. */
export default function Hero() {
  const reduz = useReducedMotion();

  const entra = (delay = 0) => ({
    initial: reduz ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="topo"
      data-tone="dark"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden"
    >
      <iframe
        className="video-cover"
        src={`https://www.youtube-nocookie.com/embed/${HERO.vslId}?autoplay=1&mute=1&loop=1&playlist=${HERO.vslId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`}
        title="VSL da GravaMais em plano de fundo"
        tabIndex={-1}
        aria-hidden="true"
        allow="autoplay; encrypted-media"
      />
      <div className="hero-scrim" />

      <div className="container-ds relative z-raised pb-14 text-center md:pb-16">
        {/* Duas linhas fixas, entrelinha apertada: o título é um bloco
            tipográfico, não um parágrafo. */}
        <motion.h1
          className="mx-auto font-display font-extrabold tracking-tight text-white"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)', lineHeight: 1.02 }}
          {...entra(0.1)}
        >
          <span className="block">Conheça a GravaMais, uma</span>
          <span className="block">
            produtora de{' '}
            <span className="accent-on-video">vídeo e performance</span>
          </span>
        </motion.h1>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          {...entra(0.28)}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            Entre em contato
          </a>
          <a href="#portfolio" className="btn btn-glass-dark btn-lg w-full sm:w-auto">
            <Play size={18} fill="currentColor" />
            Assistir vídeo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
