import { Globe } from 'lucide-react';
import { CONFIG, whatsappLink } from '../../data/site';
import { FECHO } from '../../data/proposta';
import { TitleBlock, Reveal } from '../ui';

/* O lucide não exporta ícones de marca (trademark) — mesmo SVG inline do
   rodapé, traço de 2px para casar com o resto do set. */
function Instagram({ size = 18 }) {
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

function WhatsAppIcon({ size = 18 }) {
  return (
    <img
      src="/ilustracoes/logo-whatsapp.png"
      alt=""
      style={{ width: size, height: size }}
    />
  );
}

/* Fecho — assinatura e contato. Os dados saem de CONFIG em site.js, que já
   alimenta todos os CTAs da LP: nada de número hardcodado aqui.

   Tom CLARO com `caixa-pe`, fechando o bloco que o FAQ abriu — é o mesmo
   arranjo do fim da LP (CTA claro, depois o rodapé escuro). Por isso a
   assinatura aqui é a logo PRETA: a branca sumiria no fundo. */
export default function FechoProposta() {
  const contatos = [
    {
      icone: WhatsAppIcon,
      texto: '(11) 93367-3894',
      href: whatsappLink,
      externo: true,
    },
    {
      icone: Instagram,
      texto: '@gravamaisproducoes',
      href: CONFIG.instagram,
      externo: true,
    },
    {
      icone: Globe,
      texto: 'gravamaisproducoes.com.br',
      href: 'https://gravamaisproducoes.com.br',
      externo: true,
    },
  ];

  return (
    <section id="contato" data-tone="light" className="caixa-pe section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <TitleBlock
              linhas={FECHO.titulo}
              destaque={FECHO.destaque}
              className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
            />

            <img
              src="/logo/logo-preto.png"
              alt="GravaMais Produções"
              width="360"
              height="120"
              className="mx-auto mt-12 h-12 w-auto object-contain md:h-14"
            />

            <p className="mt-12 font-mono text-2xs uppercase tracking-[0.2em] text-fg-subtle">
              {FECHO.eyebrow}
            </p>

            <ul className="mt-6 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-10">
              {contatos.map(({ icone: Icone, texto, href, externo }) => (
                <li key={texto}>
                  <a
                    href={href}
                    {...(externo
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-secondary transition-colors duration-base hover:text-brand"
                  >
                    <Icone size={18} />
                    {texto}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                Falar com a GravaMais
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
