import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, Check, Loader2 } from 'lucide-react';
import { FORM, CONFIG } from '../data/site';
import emailjs from '@emailjs/browser';

const TOTAL = FORM.passos.length + 1;
const ULTIMO = TOTAL - 1;

// Configuração do EmailJS
const EMAILJS_PUBLIC_KEY = 'TUYQLoNh2CjMrlKX8';
const EMAILJS_SERVICE_ID = 'service_hvzparl';
const EMAILJS_TEMPLATE_ID = 'template_oxar3k8';

// reCAPTCHA v3
const RECAPTCHA_SITE_KEY = '6LdmorwtAAAAAKe7N1AR8nqHvtev03ifoSQCVUSC';

emailjs.init(EMAILJS_PUBLIC_KEY);

export default function Formulario() {
  const reduz = useReducedMotion();
  const [passo, setPasso] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [respostas, setRespostas] = useState({});
  const [dados, setDados] = useState({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    // Carrega reCAPTCHA v3
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    document.head.appendChild(script);
  }, []);

  const irPara = (n) => {
    setDirecao(n > passo ? 1 : -1);
    setPasso(n);
  };

  const alternar = (id, valor, multipla) => {
    setRespostas((r) => {
      if (!multipla) return { ...r, [id]: valor };
      const atual = r[id] ?? [];
      return {
        ...r,
        [id]: atual.includes(valor)
          ? atual.filter((v) => v !== valor)
          : [...atual, valor],
      };
    });
  };

  const selecionado = (id, valor, multipla) =>
    multipla ? (respostas[id] ?? []).includes(valor) : respostas[id] === valor;

  const faltando = FORM.dados.campos.filter(
    (c) => c.obrigatorio && !(dados[c.id] ?? '').trim(),
  );

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setTentouEnviar(true);

    // Honeypot: se preenchido, bloqueia
    if (honeypot) {
      console.warn('Honeypot triggered');
      return;
    }

    if (faltando.length) return;

    // Validar email
    const emailCampo = dados.email?.trim();
    if (emailCampo && !validarEmail(emailCampo)) {
      alert('Email inválido');
      return;
    }

    setEnviando(true);

    try {
      // Executar reCAPTCHA v3
      const token = await window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, {
        action: 'submit',
      });

      const linha = (rotulo, v) =>
        `${rotulo}: ${Array.isArray(v) ? v.join(', ') : v || '—'}`;

      const respostasTexto = FORM.passos
        .map((p) => linha(p.pergunta.replace(/\?$/, ''), respostas[p.id]))
        .join('\n');

      const dadosTexto = FORM.dados.campos
        .filter((c) => (dados[c.id] ?? '').trim())
        .map((c) => linha(c.label, dados[c.id].trim()))
        .join('\n');

      // Enviar email via EmailJS
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'gravamais.producoesaudiovisuais@gmail.com',
        from_name: dados.nome || 'Novo Contato',
        from_email: dados.email || 'sem-email@gravamais.com',
        respostas: respostasTexto,
        dados: dadosTexto,
        recaptcha_token: token,
      });

      // Sucesso: mostrar mensagem
      setSucesso(true);
    } catch (erro) {
      console.error('Erro ao enviar:', erro);
      alert('❌ Erro ao enviar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const slide = {
    initial: reduz ? false : { opacity: 0, x: direcao * 24 },
    animate: { opacity: 1, x: 0 },
    exit: reduz ? { opacity: 0 } : { opacity: 0, x: direcao * -24 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="mx-auto mt-14 w-full max-w-2xl">
      <AnimatePresence mode="wait">
        {!sucesso ? (
          <motion.form
            key="form"
            onSubmit={enviar}
            noValidate
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-base bg-bg-surface p-6 text-left shadow-md sm:p-9"
          >
      {/* Progresso — os passos concluídos ficam clicáveis para trás */}
      <ol className="flex items-center gap-2" aria-label="Progresso">
        {Array.from({ length: TOTAL }, (_, i) => (
          <li key={i} className="flex-1">
            <button
              type="button"
              disabled={i > passo}
              onClick={() => irPara(i)}
              aria-label={`Passo ${i + 1} de ${TOTAL}`}
              aria-current={i === passo ? 'step' : undefined}
              className={`h-1.5 w-full rounded-full transition-colors duration-base ease-out ${
                i <= passo ? 'bg-fg-primary' : 'bg-bg-elevated'
              } ${i < passo ? 'cursor-pointer' : 'cursor-default'}`}
            />
          </li>
        ))}
      </ol>

      <p className="mt-5 font-mono text-2xs uppercase tracking-[0.18em] text-fg-muted">
        Passo {passo + 1} de {TOTAL}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={passo} {...slide}>
          {passo < ULTIMO ? (
            /* ---------- Passos de pergunta ---------- */
            (() => {
              const p = FORM.passos[passo];
              return (
                <fieldset className="mt-4 border-0 p-0">
                  <legend className="font-display text-2xl font-bold leading-tight text-fg-primary sm:text-3xl">
                    {p.pergunta}
                  </legend>
                  {p.ajuda && (
                    <p className="mt-2 text-sm text-fg-muted">{p.ajuda}</p>
                  )}

                  <div className="mt-7 grid gap-3">
                    {p.opcoes.map((op) => {
                      const on = selecionado(p.id, op, p.multipla);
                      return (
                        <label
                          key={op}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-4 text-sm font-medium transition-colors duration-base ease-out ${
                            on
                              ? 'border-strong bg-bg-elevated text-fg-primary'
                              : 'border-base text-fg-secondary hover:border-strong hover:text-fg-primary'
                          }`}
                        >
                          <input
                            type={p.multipla ? 'checkbox' : 'radio'}
                            name={p.id}
                            value={op}
                            checked={on}
                            onChange={() => alternar(p.id, op, p.multipla)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden
                            className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-base ${
                              p.multipla ? 'rounded-sm' : 'rounded-full'
                            } ${
                              on
                                ? 'border-fg-primary bg-fg-primary text-bg-deep'
                                : 'border-strong'
                            }`}
                          >
                            {on && <Check size={13} strokeWidth={3} />}
                          </span>
                          {op}
                        </label>
                      );
                    })}
                  </div>

                  {/* Rodapé minimalista do primeiro passo */}
                  {passo === 0 && p.rodape && (
                    <p className="mt-8 text-left text-2xs uppercase tracking-widest text-fg-muted">
                      {p.rodape}
                    </p>
                  )}
                </fieldset>
              );
            })()
          ) : (
            /* ---------- Passo final: dados ---------- */
            <div className="mt-4">
              <h3 className="font-display text-2xl font-bold leading-tight text-fg-primary sm:text-3xl">
                {FORM.dados.pergunta}
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{FORM.dados.ajuda}</p>

              <div className="mt-7 grid gap-5">
                {FORM.dados.campos.map((c) => {
                  const vazio =
                    tentouEnviar && c.obrigatorio && !(dados[c.id] ?? '').trim();
                  return (
                    <div key={c.id}>
                      <label
                        htmlFor={c.id}
                        className="block text-sm font-medium text-fg-secondary"
                      >
                        {c.label}
                        {!c.obrigatorio && (
                          <span className="ml-2 text-fg-muted">(opcional)</span>
                        )}
                      </label>
                      <input
                        id={c.id}
                        name={c.id}
                        type={c.tipo}
                        autoComplete={c.autoComplete}
                        required={c.obrigatorio}
                        aria-invalid={vazio || undefined}
                        aria-describedby={vazio ? `${c.id}-erro` : undefined}
                        value={dados[c.id] ?? ''}
                        onChange={(e) =>
                          setDados((d) => ({ ...d, [c.id]: e.target.value }))
                        }
                        className={`mt-2 h-12 w-full rounded-lg border bg-bg-deep px-4 text-fg-primary transition-colors duration-base ease-out placeholder:text-fg-subtle ${
                          vazio ? 'border-danger' : 'border-base'
                        }`}
                      />
                      {vazio && (
                        <p id={`${c.id}-erro`} className="mt-2 text-sm text-danger">
                          Preencha {c.label.toLowerCase()} para continuar.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-sm text-fg-muted">{FORM.aviso}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navegação */}
      <div className="mt-9 flex items-center justify-between gap-3">
        {passo > 0 ? (
          <button
            type="button"
            onClick={() => irPara(passo - 1)}
            className="btn btn-secondary"
          >
            <ArrowLeft size={18} />
            {FORM.voltar}
          </button>
        ) : (
          <span />
        )}

        {passo < ULTIMO ? (
          <button
            type="button"
            onClick={() => irPara(passo + 1)}
            className="btn btn-primary"
          >
            {FORM.avancar}
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={enviando}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                {FORM.enviar}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Honeypot - campo invisível para detectar bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />
        </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/20 p-6 text-center shadow-sm sm:p-9"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.25, ease: 'easeOut' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-700/10 ring-4 ring-yellow-700/20"
            >
              <Check size={32} className="text-yellow-700" strokeWidth={2.5} />
            </motion.div>

            <h3 className="font-display text-2xl font-bold text-fg-primary sm:text-3xl">
              OPA! Chegou aqui. 👀
            </h3>

            <p className="mt-4 text-fg-secondary">
              Já recebemos suas respostas. Agora deixa com a gente que nosso time entra em contato.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alternativa de WhatsApp - fora da caixa do formulário, apenas enquanto não enviado */}
      {!sucesso && (
        <div className="mt-8 text-center space-y-3">
          <p className="text-sm text-fg-muted">Prefere falar direto com a gente?</p>
          <a
            href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 hover:bg-green-600 px-6 py-3 text-sm font-medium text-white transition-all duration-base"
          >
            <img src="/ilustracoes/logo-whatsapp.png" alt="WhatsApp" className="h-4 w-4" />
            Chame no WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
}
