import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, Kanban, MessageCircle, MessageSquare, Wallet } from 'lucide-react';
import { JORNADA } from '../../data/comercial';
import { Eyebrow, TitleBlock, Reveal } from '../ui';

const ICONES = { Heart, Kanban, MessageCircle, Wallet };
const INTERVALO = 5000;

/* 04/Tudo se conecta ao objetivo — funil Engajamento → Lead no CRM →
   Conversa → Venda. Mesmo esqueleto de índice-ativo + autoplay de
   PrimeirosDias.jsx (e, mais a fundo, de PortfolioCoverflow.jsx): clique no
   estágio também navega, autoplay pausa sob movimento reduzido. */
export default function JornadaObjetivo() {
  const [ativo, setAtivo] = useState(0);
  const reduz = useReducedMotion();
  const total = JORNADA.estagios.length;

  const ir = useCallback((i) => setAtivo(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (reduz) return;
    const t = setInterval(() => {
      if (!document.hidden) setAtivo((i) => (i + 1) % total);
    }, INTERVALO);
    return () => clearInterval(t);
  }, [reduz, total]);

  const estagio = JORNADA.estagios[ativo];

  return (
    <section data-tone="light" className="section relative overflow-hidden">
      <div className="container-ds">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{JORNADA.eyebrow}</Eyebrow>
            <TitleBlock
              linhas={JORNADA.titulo}
              destaque={JORNADA.destaque}
              className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
            />
            <p className="mx-auto mt-6 max-w-[48ch] text-sm leading-relaxed text-fg-muted md:text-base">
              {JORNADA.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl md:mt-16">
          {/* Estágios do funil */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {JORNADA.estagios.map((e, i) => {
              const Icone = ICONES[e.icone] ?? MessageSquare;
              const passado = i < ativo;
              const atual = i === ativo;
              return (
                <div key={e.id} className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => ir(i)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-base ${
                      atual
                        ? 'border-brand bg-brand text-on-brand'
                        : passado
                          ? 'border-subtle bg-bg-elevated text-fg-secondary'
                          : 'border-subtle text-fg-muted hover:border-strong'
                    }`}
                  >
                    <Icone size={14} aria-hidden />
                    {e.rotulo}
                  </button>
                  {i < total - 1 && (
                    <span aria-hidden className="hidden h-px w-5 bg-border-base sm:block" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div
              className="relative overflow-hidden rounded-xl border border-subtle bg-bg-surface p-6 shadow-md md:p-7"
              style={{ minHeight: '22rem' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={estagio.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Mockup estagio={estagio} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div key={estagio.id}>
              <p className="font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
                {estagio.passo}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-fg-primary md:text-3xl">
                {estagio.titulo}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-fg-secondary md:text-base">
                {estagio.texto}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mockup({ estagio }) {
  if (estagio.id === 'engajamento') {
    return (
      <div>
        <div className="flex items-center gap-2.5 border-b border-subtle pb-3">
          <span className="h-7 w-7 rounded-full bg-brand" aria-hidden />
          <span className="text-xs font-semibold text-fg-primary">Sua empresa</span>
        </div>
        <div className="mt-3 aspect-video rounded-md bg-bg-elevated" aria-hidden />
        <div className="mt-3 flex items-center gap-4 text-xs text-fg-muted">
          <span className="flex items-center gap-1.5">
            <Heart size={14} className="text-brand-ink" aria-hidden /> {estagio.post.curtidas}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} aria-hidden /> {estagio.post.comentarios.length}
          </span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {estagio.post.comentarios.map((c) => (
            <li key={c.nome} className="text-xs text-fg-secondary">
              <span className="font-semibold text-fg-primary">{c.nome}</span> {c.texto}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (estagio.id === 'lead') {
    return (
      <div>
        <p className="text-xs font-semibold text-fg-primary">Equipe comercial · CRM</p>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {estagio.colunas.map((coluna, i) => (
            <div key={coluna} className="rounded-md bg-bg-elevated p-2">
              <p className="text-2xs font-medium text-fg-muted">{coluna}</p>
              {i === 1 && (
                <div className="mt-2 rounded-md border border-brand/40 bg-bg-surface p-2 shadow-sm">
                  <p className="text-2xs font-bold text-fg-primary">{estagio.lead.nome}</p>
                  <p className="mt-0.5 text-2xs text-fg-subtle">{estagio.lead.origem}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (estagio.id === 'conversa') {
    return (
      <div className="flex flex-col gap-2.5">
        {estagio.mensagens.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
              m.de === 'comercial'
                ? 'ml-auto bg-brand text-on-brand'
                : 'bg-bg-elevated text-fg-secondary'
            }`}
          >
            {m.texto}
          </div>
        ))}
      </div>
    );
  }

  // venda
  return (
    <div>
      <p className="text-xs font-semibold text-fg-primary">Sua conta</p>
      <p className="mt-3 font-display text-3xl font-extrabold text-fg-primary">{estagio.saldo}</p>
      <ul className="mt-5 space-y-2.5 border-t border-subtle pt-4">
        {estagio.pagamentos.map((p) => (
          <li key={p.nome} className="flex items-center justify-between text-xs">
            <span className="text-fg-secondary">Pagamento recebido · {p.nome}</span>
            <span className="font-semibold text-success">{p.valor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
