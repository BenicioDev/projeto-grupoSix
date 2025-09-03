import { useNavigate } from 'react-router-dom';
import { useUTM } from '../utils/utm';
import { useTracking } from '../hooks/useTracking';

const ProductSection = () => {
  const navigate = useNavigate();
  const { addUTMsToURL } = useUTM();
  const { trackCTAClick, trackBeginCheckout } = useTracking();

  const products = [
    {
      id: 1,
      name: "RevitaMax Pro - Fórmula Completa",
      originalPrice: "R$ 397,00",
      salePrice: "R$ 197,00",
      discount: "50%",
      features: [
        "90 cápsulas de alta concentração",
        "Fórmula patenteada exclusiva",
        "Acompanhamento nutricional por 6 meses",
        "Garantia de resultados em 21 dias",
        "Certificado de pureza e potência",
        "Frete grátis para todo o Brasil"
      ],
      highlight: true,
      badges: ["MAIS VENDIDO", "RESULTADOS GARANTIDOS"]
    },
    {
      id: 2,
      name: "RevitaMax Essencial",
      originalPrice: "R$ 247,00",
      salePrice: "R$ 97,00",
      discount: "61%",
      features: [
        "60 cápsulas concentradas",
        "Fórmula base cientificamente testada",
        "Suporte nutricional básico",
        "Garantia de satisfação 30 dias",
        "Certificado de qualidade"
      ],
      highlight: false,
      badges: ["INICIANTE"]
    }
  ];

  const handleCTAClick = (productId) => {
    const product = products.find(p => p.id === productId);

    // clique no CTA
    trackCTAClick(`product_${productId}_cta`, 'product_section', productId);

    // inicio do checkout
    const value = productId === 1 ? '197.00' : '97.00';
    trackBeginCheckout(productId, product.name, value);

    // navegação para checkout com UTMs usando React Router
    const checkoutUrl = addUTMsToURL(`/checkout?product=${productId}`, {
      utm_content: `product_${productId}_cta`
    });

    console.log('Navegando para:', checkoutUrl);
    // Usar navigate ao invés de window.location.href para não recarregar a página
    navigate(checkoutUrl);

  };

  return (
    <section id="produto" className="py-20 lg:py-28 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 lg:mb-8">
            Escolha Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Fórmula</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto">
            Nutracêuticos de última geração com tecnologia patenteada.
            Mais de 50.000 vidas transformadas pela ciência!
          </p>

          {/* Badges de credibilidade */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Aprovado por Médicos
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Estudos Clínicos
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Resultados Comprovados
            </div>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Garantia Total
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-12 transition-all hover:scale-105 hover:shadow-3xl border ${product.highlight ? 'ring-4 ring-purple-500 ring-opacity-50 border-purple-200' : 'border-gray-200'
                }`}
            >
              {(product.highlight || product.badges) && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.badges?.map((badge, index) => (
                    <span key={index} className={`text-white px-6 py-2 rounded-full text-sm lg:text-base font-bold shadow-lg ${badge === "MAIS VENDIDO" ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" :
                      badge === "RESULTADOS GARANTIDOS" ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                        "bg-gradient-to-r from-blue-500 to-indigo-500"
                      }`}>
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-center mb-8 lg:mb-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">
                  {product.name}
                </h3>

                {/* Selo de confiança */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-4 py-2">
                    <span className="text-green-800 font-semibold text-sm">🧬 Fórmula Patenteada</span>
                  </div>
                </div>

                <div className="mb-6 lg:mb-1">
                  <span className="text-xl lg:text-2xl text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                  <div className="flex items-center justify-center space-x-3 lg:space-x-4 mt-2">
                    <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {product.salePrice}
                    </span>
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 lg:px-4 lg:py-3 rounded-full text-base lg:text-lg font-bold shadow-lg">
                      -{product.discount}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-base lg:text-lg">
                  ou 12x de R$ {(parseFloat(product.salePrice.replace('R$ ', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')} no cartão
                </p>
              </div>

              <ul className="space-y-4 lg:space-y-5 mb-10 lg:mb-12">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700 text-lg lg:text-xl">
                    <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCTAClick(product.id)}
                className={`w-full py-5 lg:py-6 px-8 lg:px-10 rounded-xl font-bold text-xl lg:text-2xl transition-all duration-300 transform hover:scale-105 shadow-xl ${product.highlight
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white shadow-purple-500/25'
                  : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white'
                  }`}
              >
                QUERO TRANSFORMAR MINHA SAÚDE
              </button>

              <div className="mt-6 lg:mt-8 text-center">
                <div className="flex items-center justify-center space-x-3 lg:space-x-4 text-base lg:text-lg text-gray-600">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Pagamento 100% Seguro</span>
                </div>

                {/* Selo de satisfação */}
                <div className="mt-4 text-sm text-gray-500">
                  🏆 Produto Nº1 em Nutracêuticos no Brasil
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garantia expandida para nutracêuticos */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto shadow-xl">
            <div className="flex items-center justify-center mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-emerald-800 mb-4 lg:mb-6">
              Garantia Científica de 60 Dias
            </h3>
            <p className="text-emerald-700 text-lg lg:text-xl leading-relaxed mb-6">
              Se você não sentir diferença real na sua saúde e energia em 60 dias,
              devolvemos 100% do seu investimento.
            </p>

            {/* Benefícios da garantia */}
            <div className="grid md:grid-cols-3 gap-6 text-emerald-700">
              <div className="text-center">
                <div className="text-3xl mb-2">⏰</div>
                <div className="font-semibold">60 Dias Completos</div>
                <div className="text-sm">Para testar todos os benefícios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold">Reembolso Total</div>
                <div className="text-sm">Sem questões ou complicações</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔬</div>
                <div className="font-semibold">Base Científica</div>
                <div className="text-sm">Resultados comprovados ou dinheiro de volta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
