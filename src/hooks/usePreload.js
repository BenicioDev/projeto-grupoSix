import { useEffect } from 'react';

/* preload de recursos críticos
   Melhora FCP e LCP (será???) */
export const usePreload = () => {
    useEffect(() => {

        // para domínios externos
        const preconnect = (href) => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = href;
            document.head.appendChild(link);
            return link;
        };

        // DNS prefetch para melhor performance
        const dnsPrefetch = (href) => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = href;
            document.head.appendChild(link);
            return link;
        };

        const preloadedLinks = [];

        try {
            // pra recursos externos críticos
            preloadedLinks.push(preconnect('https://fonts.googleapis.com'));
            preloadedLinks.push(preconnect('https://fonts.gstatic.com'));
            preloadedLinks.push(preconnect('https://images.unsplash.com'));

            
            preloadedLinks.push(dnsPrefetch('https://www.youtube.com'));
            preloadedLinks.push(dnsPrefetch('https://i.ytimg.com'));

            // Preload crítico de CSS
            if (document.querySelector('link[href*="tailwind"]')) {
                // tilw já está carregado
            }

        } catch (error) {
            console.warn('Erro ao precarregar recursos:', error);
        }

        return () => {
            preloadedLinks.forEach(link => {
                try {
                    if (link && link.parentNode) {
                        link.parentNode.removeChild(link);
                    }
                } catch (e) {
                }
            });
        };
    }, []);

    // preload condicional de imagens
    const preloadImage = (src, priority = false) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;

            if (priority) {
                img.loading = 'eager';
                img.fetchPriority = 'high';
            } else {
                img.loading = 'lazy';
            }

            img.src = src;
        });
    };

    // preload de vídeo thumbnail
    const preloadVideoThumbnail = (videoId) => {
        const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
        return preloadImage(thumbnailUrl);
    };

    return {
        preloadImage,
        preloadVideoThumbnail
    };
};

export const useCriticalResourceHints = () => {
    useEffect(() => {
        const hints = [
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
            { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
            { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
        ];

        const addedHints = hints.map(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            if (hint.crossOrigin) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
            return link;
        });

        return () => {
            addedHints.forEach(link => {
                try {
                    document.head.removeChild(link);
                } catch (e) {
                }
            });
        };
    }, []);
};
