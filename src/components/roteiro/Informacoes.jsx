import {
  CalendarDays,
  CircleCheck,
  CircleHelp,
  Clapperboard,
  MessageCircle,
  ScrollText,
} from 'lucide-react';

import { INFORMACOES } from '../../data/roteiro';
import { Reveal } from '../ui';
import { EyebrowTrilha, Rico, TituloSecao } from './comum';

const ICONES = {
  aprovacao: CircleCheck,
  mensagem: MessageCircle,
  teleprompter: ScrollText,
  direcao: Clapperboard,
  calendario: CalendarDays,
  duvida: CircleHelp,
};

/* Informações importantes — a página 2 do PDF. Seis cartões iguais: é o
   combinado da gravação, lido uma vez antes dos roteiros. Escuro, dentro do
   mesmo bloco do hero. */
export default function Informacoes() {
  const dados = INFORMACOES;
  return (
    <section id="informacoes" data-tone="dark" className="section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <EyebrowTrilha>{dados.eyebrow}</EyebrowTrilha>
          <TituloSecao dados={dados} />
        </Reveal>

        <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {dados.itens.map(({ icone, titulo, texto }, i) => {
            const Icone = ICONES[icone];
            return (
              <li key={titulo}>
                <Reveal delay={0.04 * i} className="h-full">
                  <div className="h-full rounded-lg border border-subtle bg-bg-surface p-6 md:p-8">
                    {Icone && <Icone size={20} strokeWidth={1.5} className="text-gold" />}
                    <h3 className="mt-6 font-display text-lg font-bold leading-snug text-fg-primary md:text-xl">
                      {titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      <Rico>{texto}</Rico>
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
