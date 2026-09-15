import { motion, useReducedMotion } from 'framer-motion';
import { SOCIOS } from '../data/site';

/* A cena dos fundadores — seção inteira, não um banner.

   A imagem (parede de concreto, luz de janela, GRAVAMAIS pintado no reboco) já
   vem pronta e ocupa a seção com object-cover: ela É o fundo.

   Os textos usam o dourado da própria parede (--gold-400, amostrado da foto).
   É o que faz a tipografia pertencer à cena em vez de pousar por cima dela.

   O posicionamento é ancorado nas PESSOAS, não na caixa:
     · a pílula sobe para não cair na cabeça da Gabrieli;
     · "Quem somos" é alinhado à direita e dimensionado para que o "Q" nasça
       na altura do cotovelo do Ryan. */
export default function QuemSomos() {
  const reduz = useReducedMotion();

  const sobe = (delay = 0) => ({
    initial: reduz ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="sobre"
      data-tone="wall"
      /* z-raised: o CTA âmbar é puxado para cima e passa POR BAIXO desta
         seção, então o amarelo é o que aparece nos cantos vazados aqui
         embaixo — não mais o off-white da página. */
      className="caixa-pe relative z-raised flex min-h-dvh flex-col overflow-hidden"
    >
      {/* Mobile: 1440×1920 (3:4) */}
      <img
        src="/equipe/casal-cena-mobile.png"
        alt="Gabrieli Ruivo e Ryan Cardoso, fundadores da GravaMais, diante de uma parede com o letreiro GravaMais"
        width="1440"
        height="1920"
        className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
      />

      {/* Desktop: 1920×1080 (16:9) */}
      <img
        src="/equipe/casal-cena.png"
        alt="Gabrieli Ruivo e Ryan Cardoso, fundadores da GravaMais, diante de uma parede com o letreiro GravaMais"
        width="1920"
        height="1080"
        className="hidden absolute inset-0 h-full w-full object-cover object-[60%_center] md:block"
      />

      {/* Véu do pé — sob o texto, que agora é longo e precisa de base sólida */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(8,8,8,.5) 34%, rgba(8,8,8,.9) 66%, rgba(8,8,8,.98) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[24%]"
        style={{
          background:
            'linear-gradient(0deg, transparent 0%, rgba(8,8,8,.3) 60%, rgba(8,8,8,.66) 100%)',
        }}
      />

      {/* pt menor: a pílula sobe e sai da cabeça da Gabrieli */}
      <div className="relative flex flex-1 flex-col px-6 pb-8 pt-8 sm:px-14 md:px-20 md:pb-16 md:pt-20 lg:px-28">
        <motion.div className="flex justify-center" {...sobe()}>
          <ul className="glass-dark flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-full px-3 py-1.5 md:gap-x-4 md:px-7 md:py-2.5">
            {SOCIOS.servicos.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="hidden h-1 w-1 rounded-full bg-gold sm:block"
                  />
                )}
                <span className="whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/90 md:text-xs">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Nomes puxados mais para o centro, longe do canto */}
        <div className="mt-4 flex items-start justify-between gap-3 px-0 sm:px-6 md:mt-9 md:px-10 md:gap-6 lg:px-16">
          <motion.div {...sobe(0.1)}>
            <p className="text-xs font-bold uppercase leading-tight tracking-wide text-gold/90 md:text-2xl">
              {SOCIOS.esquerda.nome}
            </p>
            <p className="mt-0.5 text-[0.6rem] text-gold/55 md:text-sm">
              {SOCIOS.esquerda.papel}
            </p>
          </motion.div>

          <motion.div className="text-right" {...sobe(0.18)}>
            <p className="text-xs font-bold uppercase leading-tight tracking-wide text-gold/90 md:text-2xl">
              {SOCIOS.direita.nome}
            </p>
            <p className="mt-0.5 text-[0.6rem] text-gold/55 md:text-sm">
              {SOCIOS.direita.papel}
            </p>
          </motion.div>
        </div>

        <div className="flex-1" />

        {/* Alinhado à direita — e é o TAMANHO que decide onde o "Q" nasce.
            Calibrado para o "Q" cair na altura do cotovelo do Ryan: o título
            termina na margem direita e avança para dentro da cena até ali. */}
        {/* Alinhado à direita, mas com uma margem direita que o empurra para
            dentro da cena. Com o texto pela metade do tamanho, só o alinhamento
            não bastaria: ele encolheria a partir da esquerda e o "Q" fugiria
            para a direita. A margem devolve o "Q" à altura do cotovelo do Ryan.
            leading-[1.05] (e não 0.9) evita que a cauda do "Q" seja cortada
            pelo bloco de texto seguinte. */}
        <motion.h2
          className="pb-1 text-right font-extrabold uppercase leading-[1.05] tracking-tight text-gold md:mr-[22%]"
          style={{ fontSize: 'clamp(1.15rem, 4.3vw, 4rem)' }}
          {...sobe(0.26)}
        >
          Quem somos
        </motion.h2>

        <motion.div
          className="mt-7 space-y-3 text-[0.78rem] leading-relaxed text-white/85 sm:text-sm md:mt-9 md:space-y-4 md:text-base"
          {...sobe(0.34)}
        >
          {SOCIOS.paragrafos.map((p, i) => (
            <p key={i} className={i === 0 ? 'font-semibold text-white' : undefined}>
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
