import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PropostaPage from './pages/PropostaPage';

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/proposta/:slug" element={<PropostaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
