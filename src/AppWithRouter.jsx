import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PropostaPage from './pages/PropostaPage';
import ComercialPage from './pages/ComercialPage';
import RoteiroPage from './pages/RoteiroPage';

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/proposta/:slug" element={<PropostaPage />} />
        <Route path="/comercial/:slug" element={<ComercialPage />} />
        <Route path="/roteiro/:slug" element={<RoteiroPage />} />
      </Routes>
    </BrowserRouter>
  );
}
