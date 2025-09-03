import { useTracking } from '../hooks/useTracking';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { trackCTAClick } = useTracking();

  const handleNavigationClick = (linkName, targetSection) => {
    trackCTAClick(`footer_${linkName}`, 'footer', targetSection);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white">
      {/* Seção principal do footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Empresa Premium</span>
            </h3>
            <p className="text-gray-300 mb-8 lg:mb-10 leading-relaxed text-lg lg:text-xl">
              Transformando vidas através de conteúdo de alta qualidade e metodologias comprovadas. 
              Mais de 10.000 clientes satisfeitos em todo o Brasil.
            </p>
          </div>

          <div>
            <h4 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Links Úteis</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><a href="#sobre-nos" onClick={() => handleNavigationClick('sobre_nos', 'sobre-nos')} className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl hover:translate-x-2 transform inline-block">Sobre Nós</a></li>
              <li><a href="#como-funciona" onClick={() => handleNavigationClick('como_funciona', 'como-funciona')} className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl hover:translate-x-2 transform inline-block">Como Funciona</a></li>
              <li><a href="#depoimentos" onClick={() => handleNavigationClick('depoimentos', 'depoimentos')} className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl hover:translate-x-2 transform inline-block">Depoimentos</a></li>
              <li><a href="#produto" onClick={() => handleNavigationClick('produto', 'produto')} className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl hover:translate-x-2 transform inline-block">Produto</a></li>
              <li><a href="#contato" onClick={() => handleNavigationClick('contato', 'contato')} className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl hover:translate-x-2 transform inline-block">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Suporte</h4>
            <ul className="space-y-3 lg:space-y-4 text-gray-300">
              <li className="flex items-center text-lg lg:text-xl">
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 lg:mr-4">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                suporte@teste.com
              </li>
              <li className="flex items-center text-lg lg:text-xl">
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 lg:mr-4">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                (11) 99999-9999
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-wrap justify-center lg:justify-start space-x-4 lg:space-x-8 text-base lg:text-lg">
              <a href="/politica-privacidade" className="text-gray-400 hover:text-blue-400 transition-colors mb-2 lg:mb-0 hover:underline">
                Política de Privacidade
              </a>
              <a href="/termos-uso" className="text-gray-400 hover:text-purple-400 transition-colors mb-2 lg:mb-0 hover:underline">
                Termos de Uso
              </a>
              <a 
                href="#inicio" 
                onClick={() => handleNavigationClick('voltar_topo', 'inicio')}
                className="text-gray-400 hover:text-yellow-400 transition-colors mb-2 lg:mb-0 hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Voltar ao Topo
              </a>
            </div>
            
            <div className="text-base lg:text-lg text-gray-400 text-center lg:text-right">
              <p>© {currentYear} - Todos os direitos reservados a Gabriel Benicio.</p>
              <p className="mt-2">CNPJ: 00.000.000/0001-00</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
