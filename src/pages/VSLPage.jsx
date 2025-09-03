import { useEffect, lazy, Suspense } from 'react';
import { initializeUTM } from '../utils/utm';
import { applyMetaTags, SEO_CONFIG } from '../config/optimization';
import { useTracking, useScrollTracking, useTimeTracking } from '../hooks/useTracking';
import { usePreload, useCriticalResourceHints } from '../hooks/usePreload';

// Lazy loading dos componentes não críticos
const VideoPlayer = lazy(() => import('../components/VideoPlayer'));
const ProductSection = lazy(() => import('../components/ProductSection'));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const Footer = lazy(() => import('../components/Footer'));

// Componente de loading otimizado
const ComponentSkeleton = ({ height = 'h-96' }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg ${height} w-full prevent-layout-shift`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

const VSLPage = () => {
  const { trackPageView, trackCTAClick } = useTracking();
  const { preloadVideoThumbnail } = usePreload();

  useCriticalResourceHints();
  useScrollTracking();
  useTimeTracking();

  useEffect(() => {
    initializeUTM();

    applyMetaTags(SEO_CONFIG.default);

    preloadVideoThumbnail('8bRCsjRE2fQ').catch(console.warn);

    trackPageView('VSL_Home', {
      page_type: 'landing_page',
      funnel_step: 'awareness'
    });

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "RevitaMax Pro - Fórmula Avançada",
      "description": "Produto revolucionário com fórmula patenteada para energia, vitalidade e saúde completa em 21 dias",
      "brand": {
        "@type": "Brand",
        "name": "RevitaMax Scientific"
      },
      "category": "Nutracêuticos",
      "manufacturer": {
        "@type": "Organization",
        "name": "RevitaMax Labs"
      },
      "offers": {
        "@type": "Offer",
        "price": "197.00",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString(),
        "priceValidUntil": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        "seller": {
          "@type": "Organization",
          "name": "RevitaMax Scientific"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "15847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Certificação",
          "value": "✓ Aprovado por Médicos"
        },
        {
          "@type": "PropertyValue",
          "name": "Garantia",
          "value": "60 dias"
        },
        {
          "@type": "PropertyValue",
          "name": "Resultados",
          "value": "21 dias"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [trackPageView]);

  const handleFinalCTA = () => {
    trackCTAClick('final_cta', 'bottom_page', 'premium');
  };

  const handleHeaderCTA = () => {
    trackCTAClick('header_cta', 'hero_section', 'video');
    document.getElementById('como-funciona')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <header id="inicio" className="hero-section bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 py-24 lg:py-32 px-4 relative overflow-hidden">
        {/* bg principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-blue-600/90"></div>
        <div className="absolute inset-0 opacity-30 prevent-layout-shift"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* max 16 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
            Transforme Sua{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">
              Saúde Definitivamente!
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed">
            Descubra o nutracêutico revolucionário que está mudando vidas!
          </p>

          <div className="flex flex-wrap justify-center items-center space-x-4 lg:space-x-12 mb-16 text-base lg:text-lg text-blue-100">
            <div className="flex items-center mb-4 lg:mb-0 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-yellow-300 mr-2 text-xl">⭐</span>
              <span>4.9/5 (15.847 avaliações)</span>
            </div>
            <div className="flex items-center mb-4 lg:mb-0 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-emerald-300 mr-2 text-xl">✓</span>
              <span>Garantia de 60 dias</span>
            </div>
            <div className="flex items-center mb-4 lg:mb-0 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-cyan-300 mr-2 text-xl">🧬</span>
              <span>Base científica comprovada</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mb-8 px-6 py-4 w-full gap-4">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-6 py-4 rounded-full text-base font-semibold mb-6 shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              +50.000 Vidas Transformadas pela Ciência
            </div>

            <button
              onClick={handleHeaderCTA}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-300 hover:via-orange-300 hover:to-red-300 text-gray-900 px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-bold text-xl lg:text-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25 transform"
            >
              QUERO GARANTIR O MEU!
            </button>
          </div>

        </div>
      </header>

      <section id="como-funciona" className="py-12 lg:py-24 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <Suspense fallback={<ComponentSkeleton height="h-96" />}>
          <VideoPlayer
            videoId="8bRCsjRE2fQ"
            title="Descoberta Científica que Está Revolucionando a Saúde"
            autoplay={false}
          />
        </Suspense>
      </section>

      <section className="py-12 lg:py-16 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="max-w-6xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 drop-shadow-lg">
            🔥 A PROMOÇÃO TERMINA EM:
          </h2>
          <div className="flex justify-center space-x-6 lg:space-x-8 text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <div className="bg-white/95 backdrop-blur-sm text-red-600 px-6 py-4 lg:px-8 lg:py-6 rounded-xl shadow-2xl">
              <div>23</div>
              <div className="text-sm lg:text-base font-normal text-red-500">HORAS</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm text-red-600 px-6 py-4 lg:px-8 lg:py-6 rounded-xl shadow-2xl">
              <div>59</div>
              <div className="text-sm lg:text-base font-normal text-red-500">MIN</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm text-red-600 px-6 py-4 lg:px-8 lg:py-6 rounded-xl shadow-2xl">
              <div>47</div>
              <div className="text-sm lg:text-base font-normal text-red-500">SEG</div>
            </div>
          </div>
          <p className="text-lg lg:text-xl drop-shadow-md">
            Apenas <span className="font-bold text-yellow-300">47 unidades</span> restantes com desconto de 60%
          </p>
        </div>
      </section>

      <Suspense fallback={<ComponentSkeleton height="h-screen" />}>
        <ProductSection />
      </Suspense>

      <section id="sobre-nos" className="py-20 lg:py-28 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 lg:mb-8">
              Por Que Escolher Nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Método?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: "🎯",
                title: "Metodologia Comprovada",
                description: "Sistema testado e aprovado por mais de 10.000 pessoas com resultados documentados.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: "⚡",
                title: "Resultados Rápidos",
                description: "Primeiros resultados visíveis em 7 dias, transformação completa em 30 dias.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: "🛡️",
                title: "Garantia Total",
                description: "30 dias de garantia incondicional. Não funcionou? Devolvemos 100% do investimento.",
                color: "from-emerald-500 to-teal-600"
              },
              {
                icon: "📱",
                title: "Acesso Vitalício",
                description: "Conteúdo disponível 24/7 em qualquer dispositivo, para sempre.",
                color: "from-purple-500 to-indigo-600"
              },
              {
                icon: "👥",
                title: "Suporte Especializado",
                description: "Equipe de especialistas disponível para tirar suas dúvidas e acelerar seus resultados.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: "📈",
                title: "Atualizações Gratuitas",
                description: "Receba todas as atualizações e novos conteúdos sem custo adicional.",
                color: "from-cyan-500 to-blue-500"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 lg:p-10 shadow-xl text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20">
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6 lg:mb-8`}>
                  <div className="text-4xl lg:text-5xl">{benefit.icon}</div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">{benefit.title}</h3>
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<ComponentSkeleton height="h-96" />}>
        <TestimonialsSection />
      </Suspense>

      <section id="contato" className="py-20 lg:py-28 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 6s ease-in-out infinite'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 lg:mb-12 drop-shadow-lg">
            Não Perca Esta <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Oportunidade Única</span>
          </h2>
          <p className="text-xl lg:text-2xl mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed text-purple-100">
            Junte-se a mais de 10.000 pessoas que já transformaram suas vidas.
            Garantia de 30 dias ou seu dinheiro de volta.
          </p>

          <div className="space-y-6 lg:space-y-8">
            <button
              onClick={handleFinalCTA}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-300 hover:via-orange-300 hover:to-red-300 text-gray-900 px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-bold text-xl lg:text-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25 transform"
            >
              QUERO TRANSFORMAR MINHA VIDA AGORA
            </button>

            <div className="flex flex-wrap justify-center items-center space-x-4 lg:space-x-8 text-base lg:text-lg text-purple-200">
              <span className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-2 lg:mb-0">
                <span className="text-emerald-300 mr-2">✓</span> Acesso Imediato
              </span>
              <span className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-2 lg:mb-0">
                <span className="text-emerald-300 mr-2">✓</span> Garantia de 30 Dias
              </span>
              <span className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-2 lg:mb-0">
                <span className="text-emerald-300 mr-2">✓</span> Suporte Completo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Suspense fallback={<ComponentSkeleton height="h-64" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default VSLPage;
