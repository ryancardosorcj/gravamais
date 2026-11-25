import { TitleBlock } from '../ui';

/* Peças miúdas que as seções do roteiro dividem. O dourado é o acento de
   trilha (eyebrow, número, régua) — mesmo papel que tem no ProjetoProposta. O
   limão fica só com o botão do hero e o do fecho. */

export function EyebrowTrilha({ children }) {
  return (
    <div className="flex items-center gap-5">
      <p className="font-mono text-2xs uppercase tracking-[0.24em] text-gold">{children}</p>
      <span className="h-px w-24 bg-gold/30" />
    </div>
  );
}

export function TituloSecao({ dados }) {
  return (
    <TitleBlock
      linhas={dados.titulo}
      destaque={dados.destaque}
      className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl"
    />
  );
}

/* Texto com `**negrito**` — o mesmo destaque que o PDF do roteiro usa. Fica no
   dado como string comum, para trocar a copy sem mexer em JSX. `forte` troca
   a cor do negrito (na fala do storyboard ele é dourado). */
export function Rico({ children, forte = 'font-semibold text-fg-primary' }) {
  return String(children)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((trecho, i) =>
      trecho.startsWith('**') ? (
        <strong key={i} className={forte}>
          {trecho.slice(2, -2)}
        </strong>
      ) : (
        trecho
      ),
    );
}
