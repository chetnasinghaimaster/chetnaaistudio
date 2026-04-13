import { useEffect } from 'react';

const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export function useGoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID) return;

    // Load gtag.js
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { send_page_view: true });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const trackEvent = (eventName, params = {}) => {
    if (window.gtag && GA_ID) {
      window.gtag('event', eventName, params);
    }
  };

  const trackPageView = (path, title) => {
    if (window.gtag && GA_ID) {
      window.gtag('config', GA_ID, { page_path: path, page_title: title });
    }
  };

  return { trackEvent, trackPageView, isEnabled: !!GA_ID };
}
