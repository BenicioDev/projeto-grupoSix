import { useEffect, useCallback } from 'react';
import { useUTM } from '../utils/utm';

/**
 * hook personalizado para tracking de conversões e eventos
 * Integra com Google Analytics, Facebook Pixel e outras ferramentas
 */
export const useTracking = () => {
  const { getAllUTMs } = useUTM();

  useEffect(() => {
    initializeTracking();
  }, []); // Remove getAllUTMs da dependência

  const initializeTracking = () => {
    // google analitcs
    if (typeof window !== 'undefined' && window.gtag) {
      const utms = getAllUTMs();
      
      // parametro customizados com UTMs
      window.gtag('config', 'G-XXXXXXXXXX', {
        custom_map: {
          custom_parameter_1: utms.utm_source || 'direct',
          custom_parameter_2: utms.utm_medium || 'organic',
          custom_parameter_3: utms.utm_campaign || 'none'
        }
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('init', 'XXXXXXXXXXXXXXX');
      window.fbq('track', 'PageView');
    }
  };

  // visualizacao de pagina - usando useCallback para memoizar
  const trackPageView = useCallback((pageName, additionalData = {}) => {
    const utms = getAllUTMs();
    const eventData = {
      page_title: document.title,
      page_location: window.location.href,
      ...utms,
      ...additionalData
    };

    if (window.gtag) {
      window.gtag('event', 'page_view', eventData);
    }

    if (window.fbq) {
      window.fbq('track', 'PageView', eventData);
    }

    console.log('📊 Page View Tracked:', pageName, eventData);
  }, [getAllUTMs]);

  const trackVideoPlay = (videoId, videoTitle = '') => {
    const utms = getAllUTMs();
    const eventData = {
      video_id: videoId,
      video_title: videoTitle,
      event_category: 'Video',
      event_label: 'Play',
      ...utms
    };

    if (window.gtag) {
      window.gtag('event', 'video_play', eventData);
    }

    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: 'video',
        content_ids: [videoId],
        ...eventData
      });
    }
  };

  const trackCTAClick = (ctaName, ctaPosition, productId = null) => {
    const utms = getAllUTMs();
    const eventData = {
      event_category: 'CTA',
      event_label: ctaName,
      cta_position: ctaPosition,
      product_id: productId,
      ...utms
    };

    if (window.gtag) {
      window.gtag('event', 'cta_click', eventData);
    }

    if (window.fbq) {
      window.fbq('track', 'Lead', eventData);
    }

  };

  const trackBeginCheckout = (productId, productName, value, currency = 'BRL') => {
    const utms = getAllUTMs();
    const eventData = {
      currency,
      value: parseFloat(value),
      items: [{
        item_id: productId,
        item_name: productName,
        category: 'Digital Product',
        quantity: 1,
        price: parseFloat(value)
      }],
      ...utms
    };

    if (window.gtag) {
      window.gtag('event', 'begin_checkout', eventData);
    }

    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: parseFloat(value),
        currency,
        content_ids: [productId],
        content_type: 'product',
        ...utms
      });
    }

  };

  // compra realizada
  const trackPurchase = (orderId, productId, productName, value, currency = 'BRL') => {
    const utms = getAllUTMs();
    const eventData = {
      transaction_id: orderId,
      currency,
      value: parseFloat(value),
      items: [{
        item_id: productId,
        item_name: productName,
        category: 'Digital Product',
        quantity: 1,
        price: parseFloat(value)
      }],
      ...utms
    };

    if (window.gtag) {
      window.gtag('event', 'purchase', eventData);
    }

    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: parseFloat(value),
        currency,
        content_ids: [productId],
        content_type: 'product',
        transaction_id: orderId,
        ...utms
      });
    }

  };

  // tempo na página
  const trackTimeOnPage = (timeInSeconds) => {
    const eventData = {
      event_category: 'Engagement',
      event_label: 'Time on Page',
      value: timeInSeconds
    };

    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'page_engagement',
        value: timeInSeconds * 1000, 
        event_category: 'Engagement'
      });
    }

  };


  const trackScrollDepth = (percentage) => {
    const eventData = {
      event_category: 'Scroll',
      event_label: `${percentage}%`,
      value: percentage
    };

    if (window.gtag) {
      window.gtag('event', 'scroll', eventData);
    }

  };

  const trackError = (errorMessage, errorLocation = '') => {
    const eventData = {
      description: errorMessage,
      fatal: false,
      location: errorLocation
    };

    if (window.gtag) {
      window.gtag('event', 'exception', eventData);
    }

    console.error('🚨 Error Tracked:', eventData);
  };

  return {
    trackPageView,
    trackVideoPlay,
    trackCTAClick,
    trackBeginCheckout,
    trackPurchase,
    trackTimeOnPage,
    trackScrollDepth,
    trackError,
    getAllUTMs
  };
};

export const useScrollTracking = () => {
  const { trackScrollDepth } = useTracking();

  useEffect(() => {
    let trackedPercentages = new Set();
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);

      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedPercentages.has(milestone)) {
          trackedPercentages.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackScrollDepth]);
};

export const useTimeTracking = () => {
  const { trackTimeOnPage } = useTracking();

  useEffect(() => {
    const startTime = Date.now();
    let tracked30s = false;
    let tracked60s = false;
    let tracked120s = false;

    const trackingInterval = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      
      if (timeOnPage >= 30 && !tracked30s) {
        tracked30s = true;
        trackTimeOnPage(30);
      }
      
      if (timeOnPage >= 60 && !tracked60s) {
        tracked60s = true;
        trackTimeOnPage(60);
      }
      
      if (timeOnPage >= 120 && !tracked120s) {
        tracked120s = true;
        trackTimeOnPage(120);
        clearInterval(trackingInterval);
      }
    }, 1000);

    const handleBeforeUnload = () => {
      const finalTime = Math.floor((Date.now() - startTime) / 1000);
      trackTimeOnPage(finalTime);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(trackingInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackTimeOnPage]);
};
