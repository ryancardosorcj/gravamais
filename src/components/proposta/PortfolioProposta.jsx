import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { PORTFOLIO_PROPOSTA } from '../../data/proposta';
import { TitleBlock, Reveal } from '../ui';

/* Portfólio da proposta — recorte curado, não o acervo inteiro.
   Grade estática em vez do carrossel da LP: aqui são oito peças escolhidas
   para cobrir as quatro categorias, e quem lê uma proposta precisa conseguir
   parar em cada uma. Card, hover e modal são os mesmos do PortfolioDestaques. */
export default function PortfolioProposta() {
  const [selecionado, setSelecionado] = useState(null);

  return (
    <section
      id="portfolio"
      data-tone="dark"
      className="section relative overflow-hidden"
    >
      <div className="container-ds">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <TitleBlock
              linhas={PORTFOLIO_PROPOSTA.titulo}
              destaque={PORTFOLIO_PROPOSTA.destaque}
              className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl"
            />
            <p className="lead mx-auto mt-6">{PORTFOLIO_PROPOSTA.lead}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:mt-16 md:gap-6 lg:grid-cols-4">
          {PORTFOLIO_PROPOSTA.itens.map((video, i) => (
            <li key={`${video.id}-${i}`}>
              <Reveal delay={0.04 * i}>
                <Card video={video} onClick={() => setSelecionado(video)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {selecionado && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelecionado(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelecionado(null)}
              className="absolute -top-10 right-0 text-white transition-colors hover:text-fg-muted"
              aria-label="Fechar"
            >
              <X size={28} />
            </button>
            <div style={{ aspectRatio: '16 / 9' }} className="overflow-hidden rounded-lg">
              <iframe
                src={`https://player.mediadelivery.net/embed/753229/${selecionado.id}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
                title={selecionado.titulo}
                loading="lazy"
                style={{ border: 0, width: '100%', height: '100%' }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Card({ video, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Reproduzir: ${video.titulo}`}
      className="group block w-full overflow-hidden rounded-lg border border-base text-left transition-transform duration-base ease-out hover:scale-[1.03] hover:border-brand"
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundImage: video.thumbnail,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-base group-hover:opacity-40" />

        <div className="absolute inset-0 z-raised flex items-center justify-center opacity-0 transition-opacity duration-base group-hover:opacity-100">
          <span className="rounded-full bg-brand p-3 text-on-brand">
            <Play size={22} fill="currentColor" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-raised bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-4 pt-8">
          <span className="font-mono text-2xs uppercase tracking-[0.16em] text-white/60">
            {video.categoria}
          </span>
          <h3 className="mt-1 line-clamp-2 text-xs font-light text-white">
            {video.titulo}
          </h3>
        </div>
      </div>
    </button>
  );
}
