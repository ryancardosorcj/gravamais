import { useParams } from 'react-router-dom';

import Footer from '../components/Footer';
import MotionBanner from '../components/MotionBanner';
import WhatsAppFAB from '../components/WhatsAppFAB';
import FechoProposta from '../components/proposta/FechoProposta';
import HeroProposta from '../components/proposta/HeroProposta';
import Informacoes from '../components/roteiro/Informacoes';
import Roteiros from '../components/roteiro/Roteiros';

import { CONFIG } from '../data/site';
import {
  CLIENTES_ROTEIRO,
  CLIENTE_PADRAO_ROTEIRO,
  FECHO_ROTEIRO,
  HERO_ROTEIRO,
} from '../data/roteiro';

/* Página de roteiros — rota /roteiro/:slug. Mesma mecânica da proposta
   (slug → cliente em data/roteiro.js) e a mesma linguagem visual, mas a copy é
   toda de roteiro: nada de planos, preço ou "proposta".

   Ritmo de tons:
     hero → faixa → informações → roteiros   escuro, um bloco só
                                              (o `caixa-pe` fica nos roteiros)
     fecho                                    claro, caixa-topo + caixa-pe
     rodapé                                   escuro */
export default function RoteiroPage() {
  const { slug } = useParams();
  const cliente = CLIENTES_ROTEIRO[slug] ?? CLIENTE_PADRAO_ROTEIRO;

  const ctaHref = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    cliente.whatsappMensagem ?? CONFIG.whatsappMessage,
  )}`;

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:rounded-md focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-on-brand"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo">
        <HeroProposta cliente={cliente} textos={HERO_ROTEIRO} />
        <MotionBanner variante="outline" />
        <Informacoes />
        <Roteiros videos={cliente.videos} />
        <FechoProposta
          caixa="caixa-topo caixa-pe"
          textos={{ ...FECHO_ROTEIRO, ctaHref }}
        />
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
