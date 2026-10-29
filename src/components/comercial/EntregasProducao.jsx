import { Camera, Megaphone, Video } from 'lucide-react';
import { HERO_PROPOSTA } from '../../data/proposta';
import { ENTREGAS } from '../../data/comercial';
import { Eyebrow, TitleBlock, Reveal, Card } from '../ui';

const ICONES = { Video, Camera, Megaphone };

/* 02/Da estratégia à produção — a única seção escura isolada em meio a um
   bloco claro contíguo (hero não conta: aquele bloco nunca chega a esta
   seção), por isso leva `.caixa` nas duas pontas, como uma seção avulsa.

   O vídeo em loop à esquerda é o MESMO vsl do hero (HERO_PROPOSTA.vslId),
   só numa moldura menor — por pedido do cliente ("o mesmo vídeo do hero,
   só nesse formato da referência rodando em loop"). */
export default function EntregasProducao() {
  return (
    <section data-tone="dark" className="caixa section relative overflow-hidden">
      <div className="container-ds">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg"
              style={{ aspectRatio: '4 / 5' }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://player.mediadelivery.net/embed/753229/${HERO_PROPOSTA.vslId}?autoplay=true&loop=true&muted=true&controls=false&responsive=true`}
                title="Vídeo da GravaMais em loop"
                tabIndex={-1}
                aria-hidden="true"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>{ENTREGAS.eyebrow}</Eyebrow>
              <TitleBlock
                linhas={ENTREGAS.titulo}
                destaque={ENTREGAS.destaque}
                className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl"
              />
              <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-fg-muted md:text-base">
                {ENTREGAS.lead}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {ENTREGAS.cards.map((card, i) => (
                <Reveal key={card.titulo} delay={0.1 + i * 0.08}>
                  <Card icone={ICONES[card.icone] ?? Video} titulo={card.titulo} texto={card.texto} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
