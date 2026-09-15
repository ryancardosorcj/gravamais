import { useState, useMemo } from 'react';
import { VIDEOS_BUNNY } from '../data/site';
import { Section, TitleBlock, Reveal } from './ui';

/* Portfólio em grid de vídeos do Bunny.

   - Filtros por categoria
   - Grid responsivo 2/3/4 cols
   - Autoplay + muted por padrão
   - Clique abre fullscreen com som
   - Lazy load dos iframes */

export default function PortfolioBunny() {
  const [categoria, setCategoria] = useState('Todos');

  // Categorias únicas + "Todos"
  const categorias = useMemo(() => {
    const uniq = [...new Set(VIDEOS_BUNNY.map(v => v.categoria))];
    return ['Todos', ...uniq.sort()];
  }, []);

  // Filtra vídeos
  const videosVistos = useMemo(() => {
    if (categoria === 'Todos') return VIDEOS_BUNNY;
    return VIDEOS_BUNNY.filter(v => v.categoria === categoria);
  }, [categoria]);

  return (
    <Section id="portfolio" tone="dark">
      <Reveal>
        <div className="mx-auto max-w-5xl">
          <TitleBlock
            linhas={['Portfólio', 'de vídeos']}
            destaque={0}
            className="mx-auto max-w-[22ch] font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl"
          />
          <p className="lead mx-auto mt-7 max-w-[60ch]">
            Veja alguns dos projetos que entregamos com estratégia, qualidade e foco em resultados.
          </p>
        </div>
      </Reveal>

      {/* Filtros por categoria */}
      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap justify-center gap-3 md:mt-16">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-base ease-out ${
                categoria === cat
                  ? 'border-brand bg-brand text-on-brand'
                  : 'border-base bg-transparent text-fg-primary hover:border-brand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid de vídeos */}
      <Reveal delay={0.15}>
        <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {videosVistos.map(video => (
            <div
              key={video.id}
              className="overflow-hidden rounded-lg bg-bg-elevated"
            >
              <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
                <iframe
                  src={`https://player.mediadelivery.net/embed/753229/${video.id}?autoplay=false&loop=true&muted=true&preload=true&responsive=true`}
                  loading="lazy"
                  style={{
                    border: 0,
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '100%',
                  }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Contagem */}
      <Reveal delay={0.2}>
        <p className="mt-12 text-center text-sm text-fg-muted">
          {videosVistos.length} vídeo{videosVistos.length !== 1 ? 's' : ''} em {categoria}
        </p>
      </Reveal>
    </Section>
  );
}
