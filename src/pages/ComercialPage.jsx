import { useParams } from 'react-router-dom';

import Footer from '../components/Footer';
import HeroProposta from '../components/proposta/HeroProposta';
import PlanosDetalhe from '../components/proposta/PlanosDetalhe';
import PlanosSelector from '../components/PlanosSelector';
import FAQProposta from '../components/proposta/FAQProposta';
import FechoProposta from '../components/proposta/FechoProposta';
import WhatsAppFAB from '../components/WhatsAppFAB';

import MapaEstrategico from '../components/comercial/MapaEstrategico';
import PrimeirosDias from '../components/comercial/PrimeirosDias';
import EntregasProducao from '../components/comercial/EntregasProducao';
import MateriaisDoMes from '../components/comercial/MateriaisDoMes';
import JornadaObjetivo from '../components/comercial/JornadaObjetivo';
import CTAInvestimento from '../components/comercial/CTAInvestimento';

import { CLIENTES_COMERCIAL, CLIENTE_PADRAO_COMERCIAL } from '../data/comercial';

/* Segundo template de proposta — rota /comercial/:slug, paralelo ao
   /proposta/:slug (src/pages/PropostaPage.jsx). Mesma mecânica de slug →
   cliente, mesmo fallback para CLIENTE_PADRAO_* quando o slug não existe.

   Reaproveita sem alteração: HeroProposta (mesmo vídeo do hero da proposta),
   PlanosDetalhe + PlanosSelector (congelado), FAQProposta, FechoProposta,
   Footer e WhatsAppFAB. As seções novas (mapa, 30 dias, entregas, materiais
   do mês, jornada, CTA) vivem em src/components/comercial/. */
export default function ComercialPage() {
  const { slug } = useParams();
  const cliente = CLIENTES_COMERCIAL[slug] ?? CLIENTE_PADRAO_COMERCIAL;

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:rounded-md focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-on-brand"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo">
        <HeroProposta cliente={cliente} />

        <MapaEstrategico />
        <PrimeirosDias />
        <EntregasProducao />
        <MateriaisDoMes />
        <JornadaObjetivo />
        <CTAInvestimento />

        <PlanosDetalhe />
        <PlanosSelector
          precos={cliente.planos?.precos}
          promos={cliente.planos?.promos}
          inicial={cliente.planos?.inicial}
        />

        <FAQProposta />
        <FechoProposta />
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
