import { useEffect, useRef, useState } from 'react';
import { useTracking } from '../hooks/useTracking';

const VideoPlayer = ({ 
  videoId = "8bRCsjRE2fQ", 
  title = "Vídeo Demonstrativo",
  autoplay = false 
}) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { trackVideoPlay } = useTracking();

  useEffect(() => {
    // Intersection Observer para lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoaded) {
          setIsInView(true);
          loadVideo();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px' // Carregar quando estiver próximo
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isLoaded]);

  const loadVideo = () => {
    if (!isLoaded) {
      setIsLoaded(true);
      
      // Preload connections apenas quando necessário
      if (!document.querySelector('link[href*="youtube.com"]')) {
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://www.youtube.com';
        document.head.appendChild(preconnect1);

        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://i.ytimg.com';
        document.head.appendChild(preconnect2);
      }
    }
  };

  const getThumbnailUrl = (quality = 'maxresdefault') => {
    return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
  };

  const handlePlayClick = () => {
    setIsLoaded(true);
    trackVideoPlay(videoId, title);
  };

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&enablejsapi=1&loading=lazy${autoplay ? '&autoplay=1' : ''}`;

  return (
    <section className="w-full max-w-6xl mx-auto mb-16 lg:mb-20 px-4">
      <div 
        ref={containerRef}
        className="relative w-full prevent-layout-shift" 
        style={{ paddingBottom: '56.25%' }}
      >
        {!isLoaded ? (
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl bg-gray-900 cursor-pointer overflow-hidden group"
            onClick={handlePlayClick}
          >
            <img
              src={getThumbnailUrl()}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src = getThumbnailUrl('hqdefault');
              }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-red-600 hover:bg-red-700 transition-colors duration-300 rounded-full p-6 lg:p-8 shadow-2xl">
                <svg 
                  className="w-12 h-12 lg:w-16 lg:h-16 text-white ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg lg:text-xl font-semibold drop-shadow-lg">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl gpu-accelerated"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            aria-label="Player de vídeo principal"
          />
        )}
      </div>
      
      <div className="mt-6 lg:mt-8 text-center">
        <p className="text-gray-600 mb-4 lg:mb-6 text-lg">
          Confira a eficácia dos nossos produtos assistindo o vídeo acima e se{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
            SURPREENDA!
          </span>
        </p>
      </div>
    </section>
  );
};

export default VideoPlayer;
