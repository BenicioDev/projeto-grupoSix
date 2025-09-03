import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { initializeUTM } from '../utils/utm';
import { applyMetaTags, SEO_CONFIG } from '../config/optimization';
import { useTracking } from '../hooks/useTracking';

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackPageView } = useTracking();
  const [isLoading, setIsLoading] = useState(true);

  const productId = useMemo(() => {
    return searchParams.get('product') || '1';
  }, [searchParams]);

  const productInfo = useMemo(() => {
    const products = {
      '1': {
        name: 'RevitaMax Pro - Fórmula Completa',
        price: 'R$ 197,00',
        originalPrice: 'R$ 397,00',
        discount: '50%'
      },
      '2': {
        name: 'RevitaMax Essencial',
        price: 'R$ 97,00', 
        originalPrice: 'R$ 247,00',
        discount: '61%'
      }
    };
    return products[productId] || products['1'];
  }, [productId]);

  useEffect(() => {
    const initializePage = () => {
      // inicializa UTM
      initializeUTM();
      
      // meta tags para checkout
      applyMetaTags({
        ...SEO_CONFIG.default,
        title: "Checkout Seguro - RevitaMax Pro",
        description: "Finalize sua compra com segurança total. Transforme sua saúde hoje mesmo!",
        robots: "noindex, nofollow"
      });

      // trak página de checkout
      trackPageView('Checkout', {
        page_type: 'checkout_page',
        funnel_step: 'checkout',
        product_id: productId
      });

      setIsLoading(false);
    };

    initializePage();
  }, [productId, trackPageView]);

  const handlePurchase = () => {
    const orderId = `VSL-${Date.now()}`;
    
    
    alert('Processando pagamento...');
    
    setTimeout(() => {
      navigate(`/obrigado?order=${orderId}&product=${productId}`);
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Finalize Sua Compra Segura
            </h1>
            <p className="text-xl text-gray-600">
              🔒 Ambiente 100% Seguro - SSL Criptografado
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dados de Cobrança
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="00000-000"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {productInfo.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 line-through">
                      {productInfo.originalPrice}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      -{productInfo.discount}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mt-2">
                    {productInfo.price}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span>{productInfo.price}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Frete:</span>
                  <span className="text-green-600 font-bold">GRÁTIS</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-indigo-600">{productInfo.price}</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg mt-6"
              >
                🔒 FINALIZAR COMPRA SEGURA
              </button>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-gray-600">
                  ✅ Pagamento 100% Seguro SSL
                </p>
                <p className="text-sm text-gray-600">
                  ✅ Garantia de 30 dias
                </p>
                <p className="text-sm text-gray-600">
                  ✅ Entrega em todo Brasil
                </p>
              </div>
            </div>
          </div>

          {/* Garantias */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Suas Garantias de Segurança
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Pagamento Seguro</h4>
                  <p className="text-gray-600">Criptografia SSL de nível bancário</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Garantia Total</h4>
                  <p className="text-gray-600">30 dias para devolução</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚚</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Entrega Expressa</h4>
                  <p className="text-gray-600">Frete grátis para todo Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
