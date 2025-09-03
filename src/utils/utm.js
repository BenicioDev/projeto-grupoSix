/**
 * Utilitários para gerenciamento de parâmetros UTM
 * Captura, preservação e repasse de UTMs entre páginas
 */

// Captura parâmetros UTM da URL atual
export const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  // Lista de parâmetros UTM padrão
  const utmKeys = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid', // Google Ads
    'fbclid', // Facebook Ads
    'msclkid' // Microsoft Ads
  ];
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
};

// Salva UTMs no localStorage para persistência
export const saveUTMParams = (utmParams = null) => {
  const params = utmParams || getUTMParams();
  
  if (Object.keys(params).length > 0) {
    localStorage.setItem('utm_params', JSON.stringify(params));
    
    // Define expiração de 30 dias
    const expiryTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
    localStorage.setItem('utm_expiry', expiryTime.toString());
  }
};

// Recupera UTMs salvos do localStorage
export const getSavedUTMParams = () => {
  try {
    const expiry = localStorage.getItem('utm_expiry');
    const currentTime = new Date().getTime();
    
    // Verifica se os UTMs não expiraram
    if (expiry && currentTime > parseInt(expiry)) {
      localStorage.removeItem('utm_params');
      localStorage.removeItem('utm_expiry');
      return {};
    }
    
    const saved = localStorage.getItem('utm_params');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Erro ao recuperar UTMs:', error);
    return {};
  }
};

// Gera string de query com UTMs para anexar em URLs
export const buildUTMQuery = (additionalParams = {}) => {
  const savedUTMs = getSavedUTMParams();
  const currentUTMs = getUTMParams();
  
  // Prioriza UTMs atuais sobre salvos
  const allParams = { ...savedUTMs, ...currentUTMs, ...additionalParams };
  
  if (Object.keys(allParams).length === 0) {
    return '';
  }
  
  const query = new URLSearchParams(allParams).toString();
  return query ? `?${query}` : '';
};

// Adiciona UTMs a uma URL
export const addUTMsToURL = (url, additionalParams = {}) => {
  const [baseUrl, existingQuery] = url.split('?');
  const utmQuery = buildUTMQuery(additionalParams);
  
  if (!utmQuery) {
    return url;
  }
  
  if (existingQuery) {
    const existingParams = new URLSearchParams(existingQuery);
    const utmParams = new URLSearchParams(utmQuery.substring(1));
    
    // Adiciona UTMs aos parâmetros existentes
    utmParams.forEach((value, key) => {
      existingParams.set(key, value);
    });
    
    return `${baseUrl}?${existingParams.toString()}`;
  }
  
  return `${baseUrl}${utmQuery}`;
};

// Hook personalizado para usar UTMs em componentes React
export const useUTM = () => {
  const getCurrentUTMs = () => getUTMParams();
  const getSavedUTMs = () => getSavedUTMParams();
  const getAllUTMs = () => ({ ...getSavedUTMs(), ...getCurrentUTMs() });
  
  return {
    getCurrentUTMs,
    getSavedUTMs,
    getAllUTMs,
    saveUTMs: saveUTMParams,
    addUTMsToURL,
    buildUTMQuery
  };
};

// Inicializa o sistema de UTM (deve ser chamado no carregamento da página)
export const initializeUTM = () => {
  const currentUTMs = getUTMParams();
  if (Object.keys(currentUTMs).length > 0) {
    saveUTMParams(currentUTMs);
  }
};
