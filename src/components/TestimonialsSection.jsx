const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Empresária, 42 anos",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Em 3 semanas já sentia mais energia e disposição. Minha qualidade de sono melhorou muito e finalmente consegui me livrar da fadiga constante.",
      rating: 5,
      results: "100% mais energia em 21 dias",
      healthCondition: "Fadiga crônica"
    },
    {
      id: 2,
      name: "João Santos",
      role: "Engenheiro, 38 anos",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Após anos sofrendo com falta de concentração no trabalho, esse nutracêutico mudou minha vida. Meu foco e produtividade aumentaram drasticamente.",
      rating: 5,
      results: "Concentração 300% melhor",
      healthCondition: "Falta de foco"
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Professora, 45 anos",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Minha imunidade estava muito baixa e vivia gripada. Com RevitaMax, não fico doente há meses e me sinto muito mais forte e resistente.",
      rating: 5,
      results: "Imunidade fortalecida 90%",
      healthCondition: "Baixa imunidade"
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      role: "Advogado, 52 anos",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Estava com o colesterol alto e pressão descontrolada. Em 2 meses de uso, meus exames normalizaram e meu cardiologista ficou impressionado.",
      rating: 5,
      results: "Saúde cardiovascular normalizada",
      healthCondition: "Problemas cardiovasculares"
    },
    {
      id: 5,
      name: "Luciana Ferreira",
      role: "Nutricionista, 39 anos",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      content: "Como profissional da saúde, sou muito criteriosa com suplementos. RevitaMax superou todas as expectativas pelos resultados e qualidade científica.",
      rating: 5,
      results: "Aprovação profissional 100%",
      healthCondition: "Validação científica"
    },
    {
      id: 6,
      name: "Roberto Lima",
      role: "Aposentado, 64 anos",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Na minha idade, energia é fundamental. Este produto me devolveu a vitalidade que não sentia há anos. Agora consigo acompanhar meus netos!",
      rating: 5,
      results: "Vitalidade recuperada aos 64 anos",
      healthCondition: "Perda de vitalidade"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="depoimentos" className="py-20 lg:py-28 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 lg:mb-8">
            Transformações <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Reais</span> de Saúde
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto">
            Mais de 50.000 pessoas já recuperaram sua saúde e vitalidade.
          </p>

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
          </div>
        </div>

        {/* Grid de testemunhos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-20">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Header do testemunho */}
              <div className="flex items-center mb-6 lg:mb-8">
                <img
                  loading="lazy"
                  decoding="async"
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover mr-4 lg:mr-6 ring-4 ring-blue-200"
                  width="80"
                  height="80"
                  sizes="80px"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(
                      `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                        <rect width="80" height="80" fill="#f3f4f6"/>
                        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="12">
                          ${testimonial.name.charAt(0)}
                        </text>
                      </svg>`
                    )}`;
                  }}
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg lg:text-xl">{testimonial.name}</h4>
                  <p className="text-base lg:text-lg text-blue-600 font-medium">{testimonial.role}</p>
                  {/* Condição de saúde tratada */}
                  <p className="text-sm text-gray-500">Situação: {testimonial.healthCondition}</p>
                </div>
              </div>

              {/* Avaliação em estrelas */}
              <div className="flex mb-4 lg:mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Conteúdo do depoimento */}
              <blockquote className="text-gray-700 mb-6 lg:mb-8 italic text-lg lg:text-xl leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Resultado destacado com ícone de saúde */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 lg:p-5">
                <p className="text-emerald-800 font-semibold text-base lg:text-lg">
                  🏥 {testimonial.results}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de estatísticas */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-10 lg:p-16 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center relative z-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <div className="text-4xl lg:text-5xl font-bold text-yellow-300 mb-3 lg:mb-4">50.000+</div>
              <div className="text-purple-100 text-lg lg:text-xl">Vidas Transformadas</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <div className="text-4xl lg:text-5xl font-bold text-emerald-300 mb-3 lg:mb-4">97%</div>
              <div className="text-purple-100 text-lg lg:text-xl">Eficácia Comprovada</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <div className="text-4xl lg:text-5xl font-bold text-orange-300 mb-3 lg:mb-4">21</div>
              <div className="text-purple-100 text-lg lg:text-xl">Dias para Resultados</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <div className="text-4xl lg:text-5xl font-bold text-cyan-300 mb-3 lg:mb-4">60</div>
              <div className="text-purple-100 text-lg lg:text-xl">Dias de Garantia</div>
            </div>
          </div>
        </div>

        {/* Confiança e segurança específica para nutracêuticos */}
        <div className="mt-16 lg:mt-20 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 lg:mb-12">
            Mais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">1.500 Transformações</span> por Mês
          </h3>
          <div className="flex flex-wrap justify-center items-center space-x-4 lg:space-x-8">
            <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-6 py-3 text-base lg:text-lg mb-4 lg:mb-0">
              <span className="text-blue-600 mr-2">🧬</span> Base Científica
            </div>
            <div className="flex items-center bg-emerald-100 text-emerald-800 rounded-full px-6 py-3 text-base lg:text-lg mb-4 lg:mb-0">
              <span className="text-emerald-600 mr-2">🏥</span> Aprovado por Médicos
            </div>
            <div className="flex items-center bg-purple-100 text-purple-800 rounded-full px-6 py-3 text-base lg:text-lg mb-4 lg:mb-0">
              <span className="text-purple-600 mr-2">🔬</span> Testado Clinicamente
            </div>
            <div className="flex items-center bg-orange-100 text-orange-800 rounded-full px-6 py-3 text-base lg:text-lg mb-4 lg:mb-0">
              <span className="text-orange-600 mr-2">✓</span> Garantia de 60 Dias
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
