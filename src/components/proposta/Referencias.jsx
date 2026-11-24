import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { Reveal, TitleBlock } from '../ui';

/* Referências visuais — um quadro de referências, não um storyboard.

   As imagens mostram o OLHAR do vídeo (enquadramento, clima, detalhe), não a
   ordem das cenas: o roteiro só é escrito depois da visita técnica. Por isso
   nada aqui numera, ordena ou conta imagens — qualquer número sugere uma
   sequência que ainda não existe.

   O que organiza o quadro são os TEMAS (princípios de linguagem). Clicar em
   um destaca as imagens dele e apaga as outras; clicar de novo, ou em
   "Mostrar todas", desfaz. Clicar numa imagem abre o visualizador, que
   navega só pelas imagens em destaque.

   O quadro é montado em colunas com pequenos desníveis entre elas, como
   referências presas num painel. As imagens entram inteiras, na proporção
   do arquivo (9:16, a do vídeo). A distribuição é feita em JS porque o
   número de colunas muda por breakpoint e o desnível depende dele. */

const DESNIVEL = {
  2: ['', 'mt-10'],
  3: ['', 'mt-12', 'mt-5'],
  5: ['', 'mt-16', 'mt-6', 'mt-24', 'mt-10'],
};

function useColunas() {
  const calcular = () => {
    if (typeof window === 'undefined') return 5;
    if (window.matchMedia('(min-width: 1024px)').matches) return 5;
    if (window.matchMedia('(min-width: 768px)').matches) return 3;
    return 2;
  };
  const [colunas, setColunas] = useState(calcular);
  useEffect(() => {
    const consultas = ['(min-width: 1024px)', '(min-width: 768px)'].map((q) => window.matchMedia(q));
    const atualizar = () => setColunas(calcular());
    consultas.forEach((c) => c.addEventListener('change', atualizar));
    return () => consultas.forEach((c) => c.removeEventListener('change', atualizar));
  }, []);
  return colunas;
}

export default function Referencias({ dados }) {
  const [ativo, setAtivo] = useState(null);
  const [aberta, setAberta] = useState(null); // src da imagem no visualizador
  const gatilho = useRef(null);
  const colunas = useColunas();

  const temaDe = Object.fromEntries(dados.temas.map((t) => [t.id, t]));
  const visiveis = ativo ? dados.imagens.filter((img) => img.tema === ativo) : dados.imagens;

  // Distribuição em colunas: a imagem i vai para a coluna i % n.
  const grade = Array.from({ length: colunas }, () => []);
  dados.imagens.forEach((img, i) => grade[i % colunas].push(img));

  const abrir = (src, botao) => {
    gatilho.current = botao;
    setAberta(src);
  };
  const fechar = useCallback(() => {
    setAberta(null);
    gatilho.current?.focus();
  }, []);

  return (
    <section id="referencias" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow>{dados.eyebrow}</Eyebrow>
              <TitleBlock
                linhas={dados.titulo}
                destaque={dados.destaque}
                className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl"
              />
            </div>
            <p className="max-w-[52ch] text-sm leading-relaxed text-fg-muted md:text-base">{dados.lead}</p>
          </div>
        </Reveal>

        {/* Temas — os filtros do quadro */}
        <Reveal delay={0.05}>
          <div className="mt-14 flex min-h-11 items-center justify-between gap-4 border-t border-subtle pt-8 md:mt-16">
            <p className="whitespace-nowrap font-mono text-2xs uppercase tracking-[0.2em] text-gold">Princípios de linguagem</p>
            {ativo && (
              <button
                type="button"
                onClick={() => setAtivo(null)}
                className="min-h-11 whitespace-nowrap font-mono text-2xs uppercase tracking-[0.2em] text-fg-muted transition-colors duration-base hover:text-fg-primary"
              >
                Ver todas
              </button>
            )}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {dados.temas.map((t) => {
              const ligado = ativo === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-pressed={ligado}
                    onClick={() => setAtivo(ligado ? null : t.id)}
                    className={`h-full w-full rounded-lg border p-5 text-left transition-colors duration-base md:p-6 ${
                      ligado
                        ? 'border-gold bg-gold/10'
                        : 'border-subtle bg-bg-surface hover:border-gold/50'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`block h-px w-8 transition-colors duration-base ${ligado ? 'bg-gold' : 'bg-gold/50'}`}
                    />
                    <span className="mt-4 block font-display text-base font-bold leading-snug text-fg-primary md:text-lg">
                      {t.titulo}
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-fg-muted md:text-sm">{t.texto}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* O quadro */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex gap-3 md:mt-12 md:gap-4">
            {grade.map((coluna, c) => (
              <ul key={c} className={`flex min-w-0 flex-1 flex-col gap-3 md:gap-4 ${DESNIVEL[colunas][c]}`}>
                {coluna.map((img) => {
                  const apagada = ativo && img.tema !== ativo;
                  return (
                    <li key={img.src}>
                      <button
                        type="button"
                        onClick={(e) => abrir(img.src, e.currentTarget)}
                        tabIndex={apagada ? -1 : 0}
                        aria-label={`Ampliar referência: ${img.alt}`}
                        className={`group block w-full cursor-zoom-in overflow-hidden rounded-lg border transition-[opacity,border-color] duration-slow ${
                          apagada ? 'border-subtle opacity-20' : ativo ? 'border-gold/60' : 'border-subtle'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt=""
                          width="768"
                          height="1376"
                          loading="lazy"
                          decoding="async"
                          className="aspect-[768/1376] w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-fg-subtle">{dados.aviso}</p>
        </Reveal>
      </div>

      {/* Fora dos Reveal: eles aplicam transform, e um `fixed` dentro de um
          ancestral transformado deixa de se prender à tela. */}
      <AnimatePresence>
        {aberta && (
          <Visualizador
            lista={visiveis}
            atual={aberta}
            temaDe={temaDe}
            aoNavegar={setAberta}
            aoFechar={fechar}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-5">
      <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">{children}</p>
      <span className="h-px w-24 bg-gold/30" />
    </div>
  );
}

/* Visualizador — mesmo comportamento do lightbox do portfólio (Esc fecha,
   setas navegam, rolagem travada), sem contador: aqui contar imagens sugeriria
   uma sequência de cenas. A legenda diz o tema, que é o que a imagem ensina. */
function Visualizador({ lista, atual, temaDe, aoNavegar, aoFechar }) {
  const fecharRef = useRef(null);
  const i = Math.max(0, lista.findIndex((img) => img.src === atual));
  const img = lista[i];
  const varias = lista.length > 1;

  const navegar = useCallback(
    (delta) => aoNavegar(lista[(i + delta + lista.length) % lista.length].src),
    [i, lista, aoNavegar],
  );

  useEffect(() => {
    fecharRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') aoFechar();
      if (varias && e.key === 'ArrowRight') navegar(1);
      if (varias && e.key === 'ArrowLeft') navegar(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [aoFechar, navegar, varias]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Referência ampliada"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-modal flex flex-col items-center justify-center bg-black/90 px-4 backdrop-blur-md"
      onClick={aoFechar}
    >
      <button
        ref={fecharRef}
        type="button"
        onClick={aoFechar}
        aria-label="Fechar"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-white/10 md:right-6 md:top-6"
      >
        <X size={26} />
      </button>

      {varias && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navegar(-1);
          }}
          aria-label="Referência anterior"
          className="absolute left-2 z-raised flex h-12 w-12 items-center justify-center rounded-full bg-bg-deep/60 text-fg-primary transition-colors hover:bg-white/10 md:left-8 md:bg-transparent"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      <figure className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          width="768"
          height="1376"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-h-[78vh] w-auto max-w-[min(90vw,440px)] rounded-lg object-contain"
        />
        <figcaption className="mt-5 max-w-[44ch] text-center">
          <span className="block font-mono text-2xs uppercase tracking-[0.2em] text-gold">
            {temaDe[img.tema]?.titulo}
          </span>
          <span className="mt-2 block text-sm leading-snug text-fg-secondary">{img.alt}</span>
        </figcaption>
      </figure>

      {varias && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navegar(1);
          }}
          aria-label="Próxima referência"
          className="absolute right-2 z-raised flex h-12 w-12 items-center justify-center rounded-full bg-bg-deep/60 text-fg-primary transition-colors hover:bg-white/10 md:right-8 md:bg-transparent"
        >
          <ChevronRight size={30} />
        </button>
      )}
    </motion.div>
  );
}
