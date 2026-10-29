import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronLeft, MoreVertical, Paperclip, Phone, Send } from 'lucide-react';
import { MATERIAIS_DO_MES } from '../../data/comercial';
import { Eyebrow, TitleBlock, Reveal } from '../ui';

const INTERVALO = 4200;

/* 03/Como você recebe — demo de celular com o WhatsApp, em loop por 3
   estágios (chat → revisão → aprovado), sincronizada com a lista de passos
   ao lado: o passo ativo acompanha o estágio do mockup. */
export default function MateriaisDoMes() {
  const [estagio, setEstagio] = useState(0);
  const reduz = useReducedMotion();
  const total = MATERIAIS_DO_MES.passos.length;

  useEffect(() => {
    if (reduz) return;
    const t = setInterval(() => {
      if (!document.hidden) setEstagio((e) => (e + 1) % total);
    }, INTERVALO);
    return () => clearInterval(t);
  }, [reduz, total]);

  return (
    <section data-tone="light" className="caixa-topo section relative overflow-hidden">
      <div className="container-ds">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{MATERIAIS_DO_MES.eyebrow}</Eyebrow>
            <TitleBlock
              linhas={MATERIAIS_DO_MES.titulo}
              destaque={0}
              className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
            />
            <p className="mx-auto mt-6 max-w-[48ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {MATERIAIS_DO_MES.lead}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 md:mt-16">
          <Reveal>
            <ol>
              {MATERIAIS_DO_MES.passos.map((passo, i) => {
                const ativo = i === estagio;
                return (
                  <li
                    key={passo.titulo}
                    className="flex items-start gap-5 border-b border-subtle py-5 first:pt-0"
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-2xs transition-colors duration-base ${
                        ativo ? 'bg-brand text-on-brand' : 'bg-bg-elevated text-fg-muted'
                      }`}
                    >
                      {ativo ? <Check size={14} /> : String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-fg-primary md:text-lg">
                        {passo.titulo}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{passo.texto}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <Telefone estagio={estagio} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Telefone({ estagio }) {
  const { chat, revisao, aprovado } = MATERIAIS_DO_MES;

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-subtle bg-bg-surface shadow-lg">
      <div className="flex items-center gap-3 border-b border-subtle px-4 py-3.5">
        <ChevronLeft size={18} className="text-fg-muted" aria-hidden />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-on-brand">
          {chat.contato[0]}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-fg-primary">{chat.contato}</p>
          <p className="text-2xs text-fg-subtle">online</p>
        </div>
        <Phone size={16} className="text-fg-muted" aria-hidden />
        <MoreVertical size={16} className="text-fg-muted" aria-hidden />
      </div>

      <div className="relative h-80 overflow-hidden bg-bg-elevated/40 p-4">
        <AnimatePresence mode="wait">
          {estagio === 0 && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2.5"
            >
              {chat.mensagens.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.de === 'voce'
                      ? 'ml-auto bg-brand text-on-brand'
                      : 'bg-bg-surface text-fg-secondary shadow-sm'
                  }`}
                >
                  {msg.texto}
                  {msg.anexo && (
                    <span className="mt-2 flex items-center gap-2 rounded-md bg-bg-elevated px-2.5 py-2 text-fg-primary">
                      <Paperclip size={12} className="shrink-0" aria-hidden />
                      <span className="text-2xs">{msg.anexo}</span>
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {estagio === 1 && (
            <motion.div
              key="revisao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-subtle bg-bg-surface shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-subtle px-3.5 py-2.5">
                <span className="text-2xs font-semibold text-fg-primary">{revisao.titulo}</span>
                <span className="text-2xs text-fg-subtle">1/3</span>
              </div>
              <div className="flex-1 bg-bg-elevated" aria-hidden />
              <div className="p-3.5">
                <p className="text-2xs font-semibold text-fg-primary">{revisao.item}</p>
                <p className="mt-1 text-2xs text-fg-muted">{revisao.legenda}</p>
                <span className="mt-3 flex items-center justify-center gap-2 rounded-md bg-brand py-2 text-2xs font-bold text-on-brand">
                  <Check size={13} aria-hidden /> {revisao.cta}
                </span>
              </div>
            </motion.div>
          )}

          {estagio === 2 && (
            <motion.div
              key="aprovado"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col items-center justify-center gap-3 rounded-xl bg-bg-surface text-center shadow-sm"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                <Check size={26} className="text-on-brand" aria-hidden />
              </span>
              <p className="font-mono text-2xs uppercase tracking-[0.16em] text-fg-subtle">
                {aprovado.legenda}
              </p>
              <p className="font-display text-lg font-bold text-fg-primary">{aprovado.titulo}</p>
              <p className="text-sm text-fg-muted">{aprovado.subtitulo}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-subtle px-4 py-3">
        <span className="h-8 flex-1 rounded-full bg-bg-elevated" aria-hidden />
        <Send size={16} className="text-fg-muted" aria-hidden />
      </div>
    </div>
  );
}
