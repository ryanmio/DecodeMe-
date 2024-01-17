   // utils/analytics.js
   import ReactGA from 'react-ga';

   export const initGA = () => {
     console.log('GA init');
     ReactGA.initialize('Your-Google-Analytics-Tracking-ID');
   };

   export const logPageView = () => {
     console.log(`Logging pageview for ${window.location.pathname}`);
     ReactGA.set({ page: window.location.pathname });
     ReactGA.pageview(window.location.pathname);
   };

   export const logEvent = (category = '', action = '') => {
     if (category && action) {
       ReactGA.event({ category, action });
     }
   };

   export const logError = (description = '', fatal = false) => {
     if (description) {
       ReactGA.exception({ description, fatal });
     }
   };