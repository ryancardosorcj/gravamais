import { useState } from 'react';

const PRECOS = {
  escala: { 4: 1500, 6: 1900, 8: 2800, 10: 3300 },
  essencial: { 4: 3000, 6: 3600 },
  pro: { 6: 4600, 8: 5200 },
};

const PROMOS = {
  escala: { 10: 2500 },
  essencial: { 6: 2990 },
  pro: { 8: 4400 },
};

const plansData = [
  {
    id: 'escala',
    name: 'ESCALA',
    description: 'Apenas vídeos + fotos. Ideal para quem já tem equipe e marketing e quer volume.',
    videoOptions: [4, 6, 8, 10],
    features: ['Estratégia e roteiros'],
    disabledFeatures: ['Análise de Resultados', 'Social Media', 'Tráfego Pago', 'Landing Page'],
    hasAds: false,
  },
  {
    id: 'essencial',
    name: 'ESSENCIAL',
    description: 'Vídeos + fotos + estratégia completa. Ideal pra quem precisa de estrutura.',
    videoOptions: [4, 6],
    features: ['Estratégia e roteiros', 'Análise de resultados/métricas', 'Social Media Smart', 'Tráfego Pago (1 plataforma)'],
    disabledFeatures: ['Criação de Landing Page'],
    hasAds: true,
    recommended: true,
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Tudo completo. Ideal para empresa que quer ir para outro patamar.',
    videoOptions: [6, 8],
    features: ['Estratégia e roteiros', 'Análise de resultados/métricas', 'Social Media Completo', 'Tráfego Pago Completo', 'Criação de Landing Page'],
    disabledFeatures: [],
    hasAds: false,
  },
];

export default function PlanosSelector() {
  const [qtd, setQtd] = useState({
    escala: 4,
    essencial: 4,
    pro: 6,
  });

  const [adsType, setAdsType] = useState('meta');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openAdsDropdown, setOpenAdsDropdown] = useState(null);

  const toggleDropdown = (plano) => {
    setOpenDropdown(openDropdown === plano ? null : plano);
  };

  const mudarQtd = (plano, novaQtd) => {
    setQtd(prev => ({ ...prev, [plano]: novaQtd }));
    setOpenDropdown(null);
  };

  const getPreco = (plano) => {
    const preco = PRECOS[plano][qtd[plano]];
    const promo = PROMOS[plano][qtd[plano]];
    return { preco, promo };
  };

  const getDiaria = (plano) => {
    return qtd[plano] >= 8 ? '1 diária' : '½ diária';
  };

  const getPhotos = (plano) => {
    return `${qtd[plano]} fotografia${qtd[plano] !== 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-brand">Planos GravaMais</h1>
          <p className="text-lg opacity-70">Escolha o plano e customize a quantidade de vídeos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plansData.map((plan) => {
            const { preco, promo } = getPreco(plan.id);
            const isPromo = !!promo;

            return (
              <div
                key={plan.id}
                className={`bg-gradient-to-br from-zinc-900 to-zinc-800 border rounded-lg p-6 flex flex-col relative ${
                  plan.recommended ? 'border-brand md:scale-105' : 'border-gray-700'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-6 bg-brand text-black px-3 py-1 rounded text-sm font-bold">
                    Recomendado
                  </div>
                )}

                <div className="mb-6 mt-2">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-sm opacity-70">{plan.description}</p>
                </div>

                <div className="flex-grow mb-6">
                  {/* Vídeos com seletor */}
                  <div className="mb-4 flex items-center gap-2">
                    <span>•</span>
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand">{qtd[plan.id]}</span>
                        <span>vídeos</span>
                        <button
                          onClick={() => toggleDropdown(plan.id)}
                          className="border border-brand text-brand px-2 py-1 rounded text-sm font-semibold hover:bg-brand hover:text-black"
                        >
                          ▼
                        </button>
                      </div>

                      {openDropdown === plan.id && (
                        <div className="absolute top-full left-0 bg-zinc-900 border border-brand rounded mt-1 z-10 min-w-40">
                          {plan.videoOptions.map(opt => (
                            <div
                              key={opt}
                              onClick={() => mudarQtd(plan.id, opt)}
                              className={`px-3 py-2 cursor-pointer flex justify-between items-center text-sm ${
                                qtd[plan.id] === opt ? 'bg-brand text-black font-semibold' : 'hover:bg-zinc-800'
                              }`}
                            >
                              <span>{opt} vídeos</span>
                              {PROMOS[plan.id]?.[opt] && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">PROMO</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Diária */}
                  <div className="mb-4 flex items-center gap-2">
                    <span>•</span>
                    <span>{getDiaria(plan.id)}</span>
                  </div>

                  {/* Fotografias */}
                  <div className="mb-4 flex items-center gap-2">
                    <span>•</span>
                    <span>{getPhotos(plan.id)}</span>
                  </div>

                  {/* Features */}
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="mb-3 flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <div>
                        {feature === 'Tráfego Pago (1 plataforma)' && plan.hasAds ? (
                          <div className="flex items-center gap-2">
                            <span id="essencial-ads-text">Tráfego Pago (Meta Ads)</span>
                            <div className="relative">
                              <button
                                onClick={() => setOpenAdsDropdown(openAdsDropdown ? null : 'ads')}
                                className="border border-brand text-brand px-2 py-0.5 rounded text-xs font-semibold hover:bg-brand hover:text-black"
                              >
                                ▼
                              </button>

                              {openAdsDropdown === 'ads' && (
                                <div className="absolute top-full left-0 bg-zinc-900 border border-brand rounded mt-1 z-10 min-w-40">
                                  {['Meta Ads', 'Google Ads'].map(ads => (
                                    <div
                                      key={ads}
                                      onClick={() => {
                                        setAdsType(ads === 'Meta Ads' ? 'meta' : 'google');
                                        document.getElementById('essencial-ads-text').textContent = `Tráfego Pago (${ads})`;
                                        setOpenAdsDropdown(null);
                                      }}
                                      className={`px-3 py-2 cursor-pointer text-sm ${
                                        (ads === 'Meta Ads' && adsType === 'meta') || (ads === 'Google Ads' && adsType === 'google')
                                          ? 'bg-brand text-black font-semibold'
                                          : 'hover:bg-zinc-800'
                                      }`}
                                    >
                                      {ads}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span>{feature}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Disabled Features */}
                  {plan.disabledFeatures.map((feature, idx) => (
                    <div key={idx} className="mb-3 flex items-start gap-2 opacity-50">
                      <span className="mt-0.5">•</span>
                      <span className="line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Preço */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-center mb-4">
                    {isPromo && (
                      <div className="text-sm opacity-60 line-through mb-1">R${preco.toLocaleString('pt-BR')}</div>
                    )}
                    <div className={`text-3xl font-bold ${isPromo ? 'text-green-500' : 'text-brand'}`}>
                      R${(promo || preco).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <button className="w-full bg-brand text-black font-bold py-3 rounded hover:scale-105 transition">
                    Escolher Plano
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
