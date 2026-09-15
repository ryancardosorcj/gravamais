import { Clapperboard, Camera, Share2, TrendingUp } from 'lucide-react';
import { SERVICOS } from '../data/site';
import { Section, Eyebrow, TitleBlock, Reveal, Card } from './ui';

/* Vídeo é o produto; social media e tráfego são satélites. A hierarquia da
   oferta vem da ORDEM de leitura — o primeiro card é o primeiro que se lê.
   (Havia aqui um `destaque: true` que o Card nunca leu: dado morto prometendo
   um realce que não existia.) */
const CARDS = [
  {
    icone: Clapperboard,
    titulo: 'Produção de Vídeo',
    texto:
      'Institucionais, comerciais, filmes de marca e conteúdo para redes. Do roteiro à entrega final.',
  },
  {
    icone: Camera,
    titulo: 'Fotografia',
    texto: 'Ensaios, cobertura de eventos e foto de produto.',
  },
  {
    icone: Share2,
    titulo: 'Social Media',
    texto:
      'Linha editorial, cortes e publicação. O conteúdo trabalha todos os dias.',
  },
  {
    icone: TrendingUp,
    titulo: 'Tráfego Pago',
    texto: 'Verba onde o criativo já provou que performa.',
  },
];

export default function Servicos() {
  return (
    <Section id="servicos" tone="light">
      <Reveal>
        <Eyebrow>{SERVICOS.eyebrow}</Eyebrow>
        <TitleBlock
          linhas={SERVICOS.titulo}
          destaque={SERVICOS.destaque}
          className="title-section mt-6"
        />
        <p className="lead mt-8">{SERVICOS.lead}</p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <Reveal key={c.titulo} delay={i * 0.08}>
            <Card {...c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
