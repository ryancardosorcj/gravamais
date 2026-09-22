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

const INICIAL = { escala: 4, essencial: 4, pro: 6 };

/* Uma proposta pode negociar preço, promoção e quantidade de partida sem que
   as outras mudem: o cliente passa só o plano que muda, e a tabela daquele
   plano é SUBSTITUÍDA, não mesclada por quantidade. Mesclar por quantidade
   tornaria impossível remover uma faixa de preço — e `promos: { escala: null }`
   é justamente como se tira uma promoção de um cliente. */
function comOverride(padrao, override) {
  if (!override) return padrao;
  const saida = { ...padrao };
  for (const [plano, tabela] of Object.entries(override)) {
    saida[plano] = tabela ?? {};
  }
  return saida;
}

export default function PlanosSelector({ precos, promos, inicial }) {
  const PRECO_TAB = comOverride(PRECOS, precos);
  const PROMO_TAB = comOverride(PROMOS, promos);

  const [qtd, setQtd] = useState({ ...INICIAL, ...inicial });
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
    const preco = PRECO_TAB[plano][qtd[plano]];
    const promo = PROMO_TAB[plano][qtd[plano]];
    return { preco, promo };
  };

  const getDiaria = (plano) => qtd[plano] >= 8 ? '1 diária' : '½ diária';
  const getPhotos = (plano) => `${qtd[plano]} fotografia${qtd[plano] !== 1 ? 's' : ''}`;

  const plans = [
    {
      id: 'escala',
      name: 'ESCALA',
      description: 'Apenas vídeos + fotos. Ideal para quem já tem equipe e marketing e quer volume.',
      videoOptions: [4, 6, 8, 10],
      features: ['Estratégia e roteiros'],
      disabledFeatures: ['Análise de Resultados', 'Social Media', 'Tráfego Pago', 'Landing Page'],
      recommended: false,
    },
    {
      id: 'essencial',
      name: 'ESSENCIAL',
      description: 'Vídeos + fotos + estratégia completa. Ideal pra quem precisa de estrutura.',
      videoOptions: [4, 6],
      features: ['Estratégia e roteiros', 'Análise de resultados/métricas', 'Reunião mensal', 'Social Media Smart', 'Tráfego Pago (1 plataforma)'],
      disabledFeatures: ['Criação de Landing Page'],
      recommended: true,
      hasAds: true,
    },
    {
      id: 'pro',
      name: 'PRO',
      description: 'Tudo completo. Ideal para empresa que quer ir para outro patamar.',
      videoOptions: [6, 8],
      features: ['Estratégia e roteiros', 'Análise de resultados/métricas', 'Reunião mensal', 'Social Media Completo', 'Tráfego Pago Completo', 'Criação de Landing Page'],
      disabledFeatures: [],
      recommended: false,
    },
  ];

  const DropdownMenu = ({ plano, options, onSelect }) => (
    <div className="absolute top-full left-0 bg-zinc-900 border border-brand rounded mt-1 z-10 min-w-40 shadow-lg">
      {options.map(opt => (
        <div
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-3 py-2 cursor-pointer flex justify-between items-center text-sm border-b border-zinc-800 last:border-b-0 ${
            qtd[plano] === opt ? 'bg-brand text-black font-semibold' : 'hover:bg-zinc-800 text-white'
          }`}
        >
          <span>{opt} vídeos</span>
          {PROMO_TAB[plano]?.[opt] && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded ml-2">PROMO</span>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* text-5xl é fixo em 3.5rem; com o título novo (bem mais longo que
              o anterior) isso viraria seis linhas a 375px. Mesma escala dos
              demais títulos do projeto. */}
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-brand to-yellow-500 bg-clip-text text-transparent">
              Três formatos. Uma decisão de posicionamento.
            </span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const { preco, promo } = getPreco(plan.id);
            const isPromo = !!promo;

            return (
              <div
                key={plan.id}
                className={`relative transition-all duration-300 ${
                  plan.recommended ? 'md:scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-6 bg-brand text-black px-4 py-1 rounded-full text-xs font-bold">
                    Recomendado
                  </div>
                )}

                <div
                  className={`bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border rounded-xl p-8 flex flex-col h-full ${
                    plan.recommended
                      ? 'border-brand shadow-2xl shadow-yellow-500/20'
                      : 'border-zinc-700 hover:border-brand/50'
                  }`}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex-grow mb-8">
                    {/* Vídeos */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-brand text-lg">•</span>
                      <div className="flex items-center gap-2 relative">
                        <span className="font-bold text-brand text-lg">{qtd[plan.id]}</span>
                        <span className="text-gray-300">vídeos</span>
                        <button
                          onClick={() => toggleDropdown(plan.id)}
                          className="border border-brand text-brand px-2.5 py-1 rounded text-sm font-semibold hover:bg-brand hover:text-black transition"
                        >
                          ▼
                        </button>
                        {openDropdown === plan.id && (
                          <DropdownMenu
                            plano={plan.id}
                            options={plan.videoOptions}
                            onSelect={(newQtd) => mudarQtd(plan.id, newQtd)}
                          />
                        )}
                      </div>
                    </div>

                    {/* Diária */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-brand text-lg">•</span>
                      <span className="text-gray-300">{getDiaria(plan.id)}</span>
                    </div>

                    {/* Fotografias */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-brand text-lg">•</span>
                      <span className="text-gray-300">{getPhotos(plan.id)}</span>
                    </div>

                    {/* Enabled Features */}
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="mb-3 flex items-start gap-3">
                        <span className="text-brand text-lg mt-0">•</span>
                        <div className="text-gray-300">
                          {feature.includes('Tráfego Pago (1 plataforma)') && plan.hasAds ? (
                            <div className="flex items-center gap-2 relative">
                              <span>Tráfego Pago ({adsType === 'meta' ? 'Meta' : 'Google'} Ads)</span>
                              <button
                                onClick={() => setOpenAdsDropdown(openAdsDropdown ? null : 'ads')}
                                className="border border-brand text-brand px-2 py-0.5 rounded text-xs font-semibold hover:bg-brand hover:text-black transition"
                              >
                                ▼
                              </button>
                              {openAdsDropdown === 'ads' && (
                                <div className="absolute top-full left-0 bg-zinc-900 border border-brand rounded mt-1 z-10 min-w-40 shadow-lg">
                                  {['Meta', 'Google'].map(ads => (
                                    <div
                                      key={ads}
                                      onClick={() => {
                                        setAdsType(ads === 'Meta' ? 'meta' : 'google');
                                        setOpenAdsDropdown(null);
                                      }}
                                      className={`px-3 py-2 cursor-pointer text-sm border-b border-zinc-800 last:border-b-0 ${
                                        (ads === 'Meta' && adsType === 'meta') || (ads === 'Google' && adsType === 'google')
                                          ? 'bg-brand text-black font-semibold'
                                          : 'hover:bg-zinc-800 text-white'
                                      }`}
                                    >
                                      {ads} Ads
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span>{feature}</span>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Disabled Features */}
                    {plan.disabledFeatures.map((feature, idx) => (
                      <div key={idx} className="mb-3 flex items-start gap-3 opacity-50">
                        <span className="text-brand text-lg mt-0">•</span>
                        <span className="text-gray-500 line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Preço */}
                  <div className="border-t border-zinc-700 pt-6 text-center">
                    {isPromo && (
                      <div className="text-sm text-gray-500 line-through mb-2">
                        R${preco.toLocaleString('pt-BR')}
                      </div>
                    )}
                    <div
                      className={`text-3xl font-bold mb-4 ${
                        isPromo ? 'text-green-500 text-4xl animate-pulse' : 'text-brand'
                      }`}
                    >
                      R${(promo || preco).toLocaleString('pt-BR')}
                    </div>
                    <button className="w-full bg-brand text-black font-bold py-3 rounded-lg hover:scale-105 transition-transform duration-200">
                      Escolher Plano
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* A ressalva fecha a seção em vez de abrir: no meio, logo abaixo do
            título, ela competia com os cards pela atenção. */}
        <p className="mt-14 max-w-[64ch] border-t border-zinc-800 pt-6 text-xs leading-relaxed text-gray-500">
          O ESSENCIAL é onde a maioria das marcas acelera. ESCALA para começar;
          PRO para escalar. O escopo final é validado antes do início.
        </p>
      </div>
    </div>
  );
}
