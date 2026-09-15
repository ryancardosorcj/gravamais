import { Mail, MapPin } from 'lucide-react';
import { CONFIG, NAV, whatsappLink } from '../data/site';

/* Ícone do WhatsApp */
function WhatsAppIcon({ size = 16 }) {
  return (
    <img src="/ilustracoes/logo-whatsapp.png" alt="WhatsApp" style={{ width: size, height: size }} />
  );
}

/* O lucide retirou os ícones de marca por questão de trademark.
   Traço de 2px para casar com o resto do set. */
function Instagram({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer data-tone="dark" className="caixa-topo mt-4 md:mt-6">
      <div className="container-ds py-16">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src="/logo/logo-branco.png"
              alt="GravaMais Produções"
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-[38ch] text-sm text-fg-muted">
              Produtora de vídeo e performance. Conteúdo audiovisual com
              estratégia, feito para crescer negócio.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
              Navegação
            </h2>
            {/* min-h-11 = 44px: alvo de toque mínimo. O space-y cai para 1
                porque a altura do próprio link já cria o respiro. */}
            <ul className="mt-4 space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-fg-secondary transition-colors duration-base hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
              Contato
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-secondary transition-colors duration-base hover:text-brand"
                >
                  <WhatsAppIcon size={16} />
                  (11) 93367-3894
                </a>
              </li>
              <li>
                <a
                  href={CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-secondary transition-colors duration-base hover:text-brand"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONFIG.email}`}
                  className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-secondary transition-colors duration-base hover:text-brand"
                >
                  <Mail size={16} aria-hidden />
                  {CONFIG.email}
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-muted">
                <MapPin size={16} aria-hidden />
                {CONFIG.cidade}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-subtle pt-8">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} GravaMais Produções. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
