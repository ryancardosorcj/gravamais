import { METODO } from '../data/site';
import { TitleBlock, Reveal } from './ui';

/* O problema — texto à esquerda, ilustração à direita, como na referência.

   A seção é uma CAIXA branca de largura total sobre o off-white da página:
   só os cantos são arredondados. Ela é o único bloco claro entre o hero e o
   mapa, então é ela que marca a virada de cor.

   A ilustração é `ref 2.png` do material do cliente, com o fundo transparente
   já aparado. Transparente importa: assim ela se assenta na caixa branca sem
   deixar retângulo, e continuaria funcionando se a seção mudasse de tom. */
export default function Metodo() {
  return (
    <section
      id="problema"
      data-tone="light"
      className="caixa section relative overflow-hidden"
    >
      <div className="container-ds">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <Reveal>
            <TitleBlock
              linhas={METODO.titulo}
              destaque={METODO.destaque}
              /* Entrelinha curta de volta: sem a caixa preta não há mais nada
                 para separar, e o bloco só ganha com o aperto. */
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            />
            <p className="lead mt-10 max-w-[46ch]">{METODO.lead}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <img
              src="/ilustracoes/metodo.webp"
              alt="Câmera em gravação ao centro, ligada por um arco às etapas de estratégia, conteúdo, distribuição, resultados e crescimento"
              width="1400"
              height="906"
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-2xl lg:max-w-none"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
