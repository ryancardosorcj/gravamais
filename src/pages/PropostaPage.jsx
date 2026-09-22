import { useParams } from 'react-router-dom';

import Clientes from '../components/Clientes';
import Footer from '../components/Footer';
import MapaMental from '../components/MapaMental';
import MotionBanner from '../components/MotionBanner';
import PlanosSelector from '../components/PlanosSelector';
import WhatsAppFAB from '../components/WhatsAppFAB';

import FAQProposta from '../components/proposta/FAQProposta';
import FechoProposta from '../components/proposta/FechoProposta';
import HeroProposta from '../components/proposta/HeroProposta';
import NossaLeitura from '../components/proposta/NossaLeitura';
import NossoOlhar from '../components/proposta/NossoOlhar';
import PlanosDetalhe from '../components/proposta/PlanosDetalhe';
import PortfolioProposta from '../components/proposta/PortfolioProposta';

import { CLIENTES_PROPOSTA, CLIENTE_PADRAO, METODO_PROPOSTA } from '../data/proposta';

/* Página de proposta — um template. O :slug escolhe o cliente em
   CLIENTES_PROPOSTA; todo o resto do conteúdo vive em data/proposta.js.

   Sem Header: a seção 1 já assina a página com as duas logos, e uma barra fixa
   brigaria com o vídeo de fundo. A proposta é uma leitura linear — não há para
   onde navegar.

   RITMO DE TONS. As seções escuras contíguas formam um bloco só: a primeira
   leva `caixa-topo`, a última `caixa-pe`, e as do meio não levam nada. O
   off-white do body é o que aparece nos cantos arredondados — por isso um
   `caixa-*` perdido no meio de um bloco abre dois buracos claros. */
export default function PropostaPage() {
  const { slug } = useParams();
  const cliente = CLIENTES_PROPOSTA[slug] ?? CLIENTE_PADRAO;

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:rounded-md focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-on-brand"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo">
        {/* --- Bloco escuro: hero → leitura → portfólio → prova → método →
            escopo → preço. Nenhum `caixa-*` aqui dentro: o arredondamento só
            marca as PONTAS de um bloco, e este só termina no FAQ. --- */}
        <HeroProposta cliente={cliente} />
        {/* Costura entre o hero e o texto — o ticker escuro segura a virada. */}
        <MotionBanner variante="outline" />

        <NossaLeitura />
        <PortfolioProposta itens={cliente.portfolio} />
        <Clientes />

        {/* Mesma trilha da LP, outra moldura: título próprio, sem a ressalva e
            sem `caixa-topo`, porque aqui ela não abre o bloco escuro. */}
        <MapaMental
          titulo={METODO_PROPOSTA.titulo}
          destaque={METODO_PROPOSTA.destaque}
          lead={METODO_PROPOSTA.lead}
          ressalva={null}
          caixa=""
        />

        {/* A leitura daquela empresa entra DEPOIS do método e ANTES dos planos:
            o mapa mostra como trabalhamos, o olhar mostra que estudamos este
            cliente, e só então a proposta apresenta os caminhos. */}
        <NossoOlhar cliente={cliente} />

        <PlanosDetalhe />
        <PlanosSelector
          precos={cliente.planos?.precos}
          promos={cliente.planos?.promos}
          inicial={cliente.planos?.inicial}
        />

        {/* --- Bloco claro que fecha a página --- */}
        <FAQProposta />
        <FechoProposta />
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
