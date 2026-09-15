import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { PORTFOLIO } from '../data/site';

export default function PortfolioDestaques() {
  const [videoSelecionado, setVideoSelecionado] = useState(null);
  const videos = PORTFOLIO.destaques;
  const videosDuplicados = [...videos, ...videos];

  return (
    <section id="portfolio" data-tone="dark" className="section overflow-hidden">
      {/* Texto acima do carrossel */}
      <div className="container-ds mb-12 md:mb-16 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-light text-fg-primary">
          É assim que a estratégia{' '}
          <span className="accent text-brand">ganha forma</span>.
        </h2>
      </div>

      <style>{`
        @keyframes scrollLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${videos.length} * (100% / 5)));
          }
        }

        .carousel-track {
          animation: scrollLoop 28s linear infinite;
        }

        @media (min-width: 768px) {
          .carousel-track {
            animation: scrollLoop 50s linear infinite;
          }
        }
      `}</style>

      <div className="carousel-wrapper overflow-hidden w-full">
        <div className="carousel-track flex gap-4 md:gap-6">
          {videosDuplicados.map((video, idx) => (
            <CardDestaque
              key={idx}
              video={video}
              onClick={() => setVideoSelecionado(video)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {videoSelecionado && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setVideoSelecionado(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoSelecionado(null)}
              className="absolute -top-10 right-0 text-white hover:text-fg-muted transition-colors"
              aria-label="Fechar"
            >
              <X size={28} />
            </button>

            {/* Player */}
            <div style={{ aspectRatio: '16 / 9' }} className="rounded-lg overflow-hidden">
              <iframe
                src={`https://player.mediadelivery.net/embed/753229/${videoSelecionado.id}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
                loading="lazy"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                }}
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

function CardDestaque({ video, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group flex-shrink-0 w-64 md:w-72 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 border border-border-base hover:border-brand"
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundImage: video.thumbnail || 'linear-gradient(135deg, #4b5563 0%, #2d3748 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#2d3748',
        }}
      >
        {/* Overlay ao hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Play button — aparece só no hover */}
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="rounded-full bg-brand p-3 text-on-brand">
            <Play size={24} fill="currentColor" />
          </div>
        </div>

        {/* Título */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 py-4">
          <h3 className="font-light text-xs text-fg-primary line-clamp-2">
            {video.titulo}
          </h3>
        </div>
      </div>
    </div>
  );
}
