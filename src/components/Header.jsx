import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { NAV, whatsappLink } from '../data/site';

/* O header é fixo e a página muda de tom por baixo dele. Se ele não
   acompanhar, a logotipo branca desaparece sobre as seções claras.

   Em vez de escutar o scroll e calcular posições a cada frame, um
   IntersectionObserver com a raiz recortada numa faixa de 1px logo abaixo do
   header nos diz qual seção está exatamente ali. O header adota esse tom. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [tom, setTom] = useState('dark'); // o hero abre escuro
  const secoes = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const alvos = document.querySelectorAll('main [data-tone], main section');
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          const i = secoes.current.findIndex((s) => s.el === e.target);
          const dado = { el: e.target, visivel: e.isIntersecting };
          if (i === -1) secoes.current.push(dado);
          else secoes.current[i] = dado;
        });

        // A que estiver cruzando a faixa manda; se houver mais de uma, a última
        const cruzando = secoes.current.filter((s) => s.visivel);
        const alvo = cruzando[cruzando.length - 1]?.el;
        if (alvo) {
          const t =
            alvo.getAttribute('data-tone') ||
            alvo.closest('[data-tone]')?.getAttribute('data-tone') ||
            'dark';
          setTom(t);
        }
      },
      {
        // faixa de 1px logo abaixo da barra (80px de altura)
        rootMargin: '-80px 0px -100% 0px',
        threshold: 0,
      },
    );

    alvos.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  /* Quais tons são "claros" por baixo do header. `amber` (o degradê limão) e
     `wall` (a cena) entraram depois — sem eles aqui, a logotipo branca sumia
     sobre o amarelo e a preta sumia sobre a parede. */
  const claro = tom === 'light' || tom === 'amber';
  const logo = claro ? '/logo/logo-preto.png' : '/logo/logo-branco.png';

  return (
    <header
      data-tone={tom}
      className={`fixed inset-x-0 top-0 z-sticky transition-all duration-slow ease-out ${
        scrolled
          ? 'border-b border-subtle bg-bg-deep/85 backdrop-blur-xl'
          : 'border-b border-transparent !bg-transparent'
      }`}
    >
      <div className="container-ds flex h-20 items-center justify-between gap-6">
        <a
          href="#topo"
          aria-label="GravaMais Produções — início"
          className="flex h-11 shrink-0 items-center"
        >
          <img
            src={logo}
            alt="GravaMais Produções"
            className="h-10 w-auto transition-opacity duration-base md:h-11"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-fg-secondary transition-colors duration-base hover:text-fg-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden h-11 px-6 text-sm sm:inline-flex"
          >
            <MessageCircle size={17} />
            Fale Conosco
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            className="flex h-11 w-11 items-center justify-center rounded-md text-fg-primary transition-colors duration-base hover:bg-bg-elevated lg:hidden"
          >
            {aberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-subtle bg-bg-deep/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-ds flex flex-col gap-1 py-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="rounded-md px-3 py-4 font-display text-2xl font-bold text-fg-primary transition-colors duration-base hover:bg-bg-elevated"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAberto(false)}
                className="btn btn-primary mt-4"
              >
                <MessageCircle size={18} />
                Fale Conosco
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
