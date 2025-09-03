//meta tags para SEO
export const SEO_CONFIG = {
  default: {
    title: "RevitaMax Pro - Nutracêutico Revolucionário | Energia e Saúde em 21 Dias",
    description: "Descubra o nutracêutico científico que está transformando vidas. Fórmula patenteada, resultados comprovados em 21 dias. 60 dias de garantia.",
    keywords: "nutracêuticos, suplementos, energia, saúde, vitalidade, fadiga, imunidade, concentração, científico, comprovado",
    author: "RevitaMax Scientific",
    language: "pt-BR",
    robots: "index, follow",
    canonical: "https://revitamax-pro.com",
    ogType: "product",
    ogImage: "/images/revitamax-social.jpg",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    twitterCard: "summary_large_image"
  },
  thankYou: {
    title: "Compra Confirmada - Sua Jornada de Saúde Começa Agora | RevitaMax",
    description: "Parabéns! Você deu o primeiro passo para transformar sua saúde. Acesse suas informações de acompanhamento.",
    robots: "noindex, nofollow"
  }
};


export const IMAGE_CONFIG = {
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1200
  },
  
  formats: ['webp', 'jpg', 'png'],
  
  quality: {
    hero: 85,
    testimonials: 80,
    thumbnails: 75,
    background: 70
  },
  
  // lazy loading 
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1
  }
};

export const IMAGES = {
  hero: {
    desktop: '/images/hero-1200w.webp',
    tablet: '/images/hero-768w.webp', 
    mobile: '/images/hero-480w.webp',
    fallback: '/images/hero-1200w.jpg'
  },
  testimonials: {
    maria: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    joao: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    ana: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    carlos: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    luciana: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    roberto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80'
  }
};

export const VIDEO_CONFIG = {
  youtube: {
    params: {
      rel: 0, // videos relacionados
      modestbranding: 1, // branding reduzido
      showinfo: 0, //informações
      iv_load_policy: 3, // nao carregar anotações
      cc_load_policy: 0, // nao legendas
      playsinline: 1, // play inline em mobile
      enablejsapi: 1 // habilitar API JavaScript
    },
    preconnectDomains: [
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
      'https://i.ytimg.com'
    ]
  }
};

export const PERFORMANCE_CONFIG = {
  
  // preload
  preload: [
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { href: '/images/hero-480w.webp', as: 'image', media: '(max-width: 768px)' },
    { href: '/images/hero-1200w.webp', as: 'image', media: '(min-width: 769px)' }
  ],
  
  // Recursos para prefetch
  prefetch: [
    '/obrigado',
    '/api/conversion-tracking'
  ]
};



//aplicar meta tags
export const applyMetaTags = (config = SEO_CONFIG.default) => {
  document.title = config.title;
  
  const metaTags = [
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords },
    { name: 'author', content: config.author },
    { name: 'robots', content: config.robots },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.ogType },
    { property: 'og:image', content: config.ogImage },
    { property: 'og:image:width', content: config.ogImageWidth },
    { property: 'og:image:height', content: config.ogImageHeight },
    { name: 'twitter:card', content: config.twitterCard },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: config.ogImage }
  ];
  
  metaTags.forEach(tag => {
    let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      if (tag.name) element.setAttribute('name', tag.name);
      if (tag.property) element.setAttribute('property', tag.property);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', tag.content);
  });
  
  if (config.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', config.canonical);
  }
};
