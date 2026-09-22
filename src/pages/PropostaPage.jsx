import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFAB from '../components/WhatsAppFAB';
import PlanosSelector from '../components/PlanosSelector';

export default function PropostaPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <PlanosSelector />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
