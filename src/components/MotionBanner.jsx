import {
  Compass,
  PenLine,
  Crosshair,
  Lightbulb,
  Gem,
  Clapperboard,
  TrendingUp,
  Repeat,
} from 'lucide-react';

/* Faixa em movimento que costura duas seções.

   Duas variantes, e as duas carregam a mesma sombra:
     white · branca. Sobre uma seção clara, branco no branco não seria nada —
             a sombra é o que a levanta da página.
     amber · o limão da marca. Mesma história: o limão tem 1,10:1 de separação
             contra o branco, então sem a sombra a faixa não teria contorno.

   Sem estrelas entre os itens: quem separa é o gap do trilho.

   A lista é duplicada e o trilho anda exatamente -50%, então a emenda do loop
   cai no início da 2ª cópia e fica invisível. Anima-se `transform`, nunca
   `left` — nada de reflow. */

const ITENS = [
  { icone: Compass, texto: 'Estratégia' },
  { icone: PenLine, texto: 'Conteúdo' },
  { icone: Crosshair, texto: 'Posicionamento' },
  { icone: Lightbulb, texto: 'Criatividade' },
  { icone: Gem, texto: 'Branding' },
  { icone: Clapperboard, texto: 'Produção Audiovisual' },
  { icone: TrendingUp, texto: 'Resultados' },
  { icone: Repeat, texto: 'Consistência' },
];

export default function MotionBanner({ variante = 'white', itens = ITENS, className = '' }) {
  const lista = [...itens, ...itens];
  const classe =
    variante === 'amber'
      ? 'ticker-amber'
      : variante === 'outline'
        ? 'ticker-outline'
        : 'ticker-white';

  return (
    <div aria-label="O que fazemos" className={`ticker ${classe} ${className}`}>
      <div className="ticker-track">
        {lista.map(({ icone: Icone, texto }, i) => (
          <span
            key={i}
            className="ticker-item"
            aria-hidden={i >= itens.length ? 'true' : undefined}
          >
            <Icone size={22} strokeWidth={1.75} aria-hidden />
            {texto}
          </span>
        ))}
      </div>
    </div>
  );
}
