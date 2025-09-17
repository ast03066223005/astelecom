import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import './assets/css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/ProductContext';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
     <AppProvider>
        <App />
     </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
