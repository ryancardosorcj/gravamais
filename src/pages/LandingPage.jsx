import Header from '../components/Header';
import Hero from '../components/Hero';
import MotionBanner from '../components/MotionBanner';
import Metodo from '../components/Metodo';
import MapaMental from '../components/MapaMental';
import Clientes from '../components/Clientes';
import PortfolioDestaques from '../components/PortfolioDestaques';
import PortfolioExplora from '../components/PortfolioExplora';
import QuemSomos from '../components/QuemSomos';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WhatsAppFAB from '../components/WhatsAppFAB';

export default function LandingPage() {
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
