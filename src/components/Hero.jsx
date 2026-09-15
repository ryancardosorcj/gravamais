import { motion, useReducedMotion } from 'framer-motion';
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
        src={`https://player.mediadelivery.net/embed/753229/${HERO.vslId}?autoplay=true&loop=true&muted=true&controls=false&responsive=true`}
        title="VSL da GravaMais em plano de fundo"
        tabIndex={-1}
        aria-hidden="true"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
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
        </motion.div>
      </div>
    </section>
  );
}
