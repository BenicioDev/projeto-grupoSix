import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initializeUTM, useUTM } from '../utils/utm';
import { applyMetaTags, SEO_CONFIG } from '../config/optimization';
import { useTracking } from '../hooks/useTracking';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const { getAllUTMs } = useUTM();
  const { trackPageView, trackPurchase } = useTracking();
  const [utmData, setUtmData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Gera orderId uma única vez usando useMemo
  const orderId = useMemo(() => {
    return searchParams.get('order') || `VSL-${Date.now()}`;
  }, [searchParams]);

  // Gera productId uma única vez
  const productId = useMemo(() => {
    return searchParams.get('product') || '1';
  }, [searchParams]);

  const initializePageData = useCallback(() => {
    if (isInitialized) return;

    initializeUTM();
    
    applyMetaTags(SEO_CONFIG.thankYou);
    
    const allUTMs = getAllUTMs();
    setUtmData(allUTMs);

    console.log('Order ID (generated once):', orderId);  
    
    const customerInfo = {
      orderId,
      productId,
      productName: productId === '1' ? 'Produto Premium' : 'Produto Básico',
      amount: productId === '1' ? 'R$ 197,00' : 'R$ 97,00',
      value: productId === '1' ? '197.00' : '97.00',
      customerName: 'Cliente', 
      email: 'cliente@email.com' 
    };
    
    setCustomerData(customerInfo);

    trackPageView('Thank_You', {
      page_type: 'conversion_page',
      funnel_step: 'conversion',
      order_id: orderId,
      product_id: productId
    });

    trackPurchase(
      orderId,
      productId,
      customerInfo.productName,
      customerInfo.value
    );

    setIsInitialized(true);
  }, [isInitialized, orderId, productId, getAllUTMs, trackPageView, trackPurchase]);

  useEffect(() => {
    initializePageData();
  }, [initializePageData]);

  const downloadResources = () => {
    alert('Iniciando download dos materiais exclusivos...');
  };

  const accessMembersArea = () => {
    alert('Redirecionando para a área de membros...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header de sucesso */}
      <div className="bg-green-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Compra realizada com sucesso!</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Seção principal de confirmação */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎉 Parabéns, {customerData.customerName}!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Sua jornada de transformação começa agora!
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Detalhes da Sua Compra
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Pedido:</span>
                <span className="font-semibold">{customerData.orderId}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Produto:</span>
                <span className="font-semibold">{customerData.productName}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Valor:</span>
                <span className="font-semibold text-green-600">{customerData.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{customerData.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos passos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Baixe Seus Materiais
              </h3>
              <p className="text-gray-600 mb-6">
                Acesse imediatamente todos os materiais exclusivos e comece sua transformação hoje mesmo.
              </p>
              <button
                onClick={downloadResources}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Baixar Materiais Agora
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Acesse a Área de Membros
              </h3>
              <p className="text-gray-600 mb-6">
                Entre na comunidade exclusiva e tenha acesso ao suporte especializado 24/7.
              </p>
              <button
                onClick={accessMembersArea}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Acessar Área de Membros
              </button>
            </div>
          </div>
        </div>

        {/* Cronograma */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Seu Cronograma de Transformação
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { day: "Hoje", title: "Acesso Liberado", description: "Baixe os materiais e comece imediatamente" },
              { day: "7 Dias", title: "Primeiros Resultados", description: "Veja as primeiras mudanças acontecerem" },
              { day: "15 Dias", title: "Aceleração", description: "Resultados se tornam mais evidentes" },
              { day: "30 Dias", title: "Transformação", description: "Vida completamente transformada" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="font-bold text-blue-600">{index + 1}</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{phase.day}</h4>
                <h5 className="font-semibold text-gray-800 mb-2">{phase.title}</h5>
                <p className="text-sm text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Informações importantes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-yellow-800 mb-3">
            📧 Informações Importantes
          </h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Você receberá um email de confirmação em até 5 minutos</li>
            <li>• Seus dados de acesso foram enviados para {customerData.email}</li>
            <li>• Verifique sua caixa de spam caso não encontre o email</li>
            <li>• O suporte está disponível 24/7 para qualquer dúvida</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
