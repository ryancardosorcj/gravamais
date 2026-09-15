import Header from './components/Header';
import Hero from './components/Hero';
import MotionBanner from './components/MotionBanner';
import Metodo from './components/Metodo';
import MapaMental from './components/MapaMental';
import Clientes from './components/Clientes';
import PortfolioDestaques from './components/PortfolioDestaques';
import PortfolioExplora from './components/PortfolioExplora';
import QuemSomos from './components/QuemSomos';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';

/* Ritmo de tons da página — a luz muda entre cenas, como num filme:

     hero        escuro ┐
     faixa       escura ┘ caixa-pe fecha o bloco
     o problema  claro    CAIXA branca — texto + ilustração
     o mapa      escuro ┐ caixa-topo abre o bloco
     marcas      escuro │ os logos têm fundo escuro e se fundem
     portfólio   escuro │
     quem somos  parede ┘ caixa-pe fecha o bloco
     CTA         âmbar    CAIXA — a única superfície amarela da página
     rodapé      escuro   caixa-topo

   Cada seção ocupa a LARGURA TODA; o que arredonda são só os cantos, e o que
   aparece neles é o off-white do body. Blocos vizinhos de mesmo tom formam
   uma caixa só — por isso marcas e portfólio não levam classe nenhuma.

   Saíram da página: Serviços (o mapa faz o trabalho dele, e melhor) e Processo
   (as 4 etapas eram os mesmos nós do mapa — explicar duas vezes enfraquecia as
   duas). Os arquivos continuam no projeto, desmontados.

   Depoimentos ficam de fora até existirem depoimentos reais.
*/
export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:rounded-md focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-on-brand"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        {/* Fecha o bloco escuro do hero: a próxima seção é a caixa branca. */}
        <MotionBanner variante="outline" className="caixa-pe" />
        <Metodo />
        <MapaMental />
        <Clientes />
        <PortfolioDestaques />
        <PortfolioExplora />
        <QuemSomos />
        <CTA />
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
