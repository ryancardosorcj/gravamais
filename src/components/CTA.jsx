import { CTA as C } from '../data/site';
import { Eyebrow, TitleBlock, Reveal } from './ui';
import Formulario from './Formulario';

/* Fechamento — o convite e o formulário.
   O botão único de WhatsApp saiu: quem converte aqui agora é o formulário, que
   chega na conversa com as respostas já escritas. O FAB flutuante segue na
   página para quem só quer falar direto, sem responder nada. */
export default function CTA() {
  return (
    /* Tom CLARO, não mais âmbar: o degradê amarelo saiu e o fechamento é
       branco. Com isso o limão fica restrito ao botão e ao acento do título —
       menos superfície amarela na página ainda.
       O -mt puxa a seção para trás da anterior, que é escura: assim o branco é
       o que aparece nos cantos arredondados dela, sem vão nenhum no meio. */
    <section
      id="contato"
      data-tone="light"
      className="caixa-pe relative -mt-10 overflow-hidden pt-10 md:-mt-14 md:pt-14"
    >
      <div className="container-ds section relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{C.eyebrow}</Eyebrow>
            </div>

            <TitleBlock
              linhas={C.titulo}
              destaque={C.destaque}
              className="title-section mt-6"
            />

            <p className="lead mx-auto mt-8">{C.lead}</p>
          </div>
        </Reveal>

        <Formulario />
      </div>
    </section>
  );
}
