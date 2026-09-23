import { motion, useReducedMotion } from 'framer-motion';
import { HERO_PROPOSTA } from '../../data/proposta';

/* Hero da proposta — mesma gramática do Hero da LP: VSL em loop, muda, sem
   controles, como plano de fundo; conteúdo ancorado embaixo sobre o scrim.

   A diferença é o par de logos no topo do bloco de texto. Quando o cliente não
   tem logo no acervo, a assinatura da GravaMais fica sozinha e centralizada —
   o divisor e o slot vazio saem juntos, senão sobra um traço órfão. */
export default function HeroProposta({ cliente }) {
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
        src={`https://player.mediadelivery.net/embed/753229/${HERO_PROPOSTA.vslId}?autoplay=true&loop=true&muted=true&controls=false&responsive=true`}
        title="Vídeo da GravaMais em plano de fundo"
        tabIndex={-1}
        aria-hidden="true"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
      <div className="hero-scrim" />

      <div className="container-ds relative z-raised pb-14 text-center md:pb-16">
        <motion.div
          className="mb-10 flex items-center justify-center gap-6 md:mb-12 md:gap-8"
          {...entra(0)}
        >
          <img
            src="/logo/logo-branco.png"
            alt="GravaMais Produções"
            width="360"
            height="120"
            className="h-9 w-auto object-contain md:h-11"
          />
          {cliente.logo && (
            <>
              <span
                aria-hidden
                className="h-8 w-px bg-white/25 md:h-10"
              />
              <img
                src={cliente.logo}
                alt={cliente.nome}
                width="360"
                height="120"
                className="h-9 w-auto object-contain md:h-11"
              />
            </>
          )}
        </motion.div>

        {/* Amarelo sobre vídeo é `.accent-on-video` (--yellow-200), não o
            amarelo da marca: o fundo aqui é sempre escuro. */}
        <motion.p
          className="accent-on-video font-display text-lg font-medium md:text-2xl"
          {...entra(0.1)}
        >
          {HERO_PROPOSTA.saudacao}
        </motion.p>

        {/* Caixa alta pela classe, não no dado: `cliente.nome` ainda é lido em
            caixa mista no alt do logo e no título de "Nosso olhar". */}
        <motion.h1
          className="mx-auto mt-3 font-display font-extrabold uppercase tracking-tight text-white"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', lineHeight: 1.02 }}
          {...entra(0.16)}
        >
          {cliente.nome}
        </motion.h1>

        {/* Uma linha só a partir de md. A frase mede 649px a 16px, e o
            container tem 720px já no md — cabe com folga. Era o `md:text-lg`
            que a quebrava: a 18px ela pede 730px e estourava por 10px. */}
        <motion.p
          className="mx-auto mt-6 max-w-[54ch] text-base leading-relaxed text-white/80 md:max-w-none md:whitespace-nowrap"
          {...entra(0.24)}
        >
          {HERO_PROPOSTA.subtitulo}
        </motion.p>

        <motion.div className="mt-9 flex justify-center" {...entra(0.32)}>
          <a
            href={HERO_PROPOSTA.ctaHref}
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            {HERO_PROPOSTA.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
