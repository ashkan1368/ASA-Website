import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LocalizationProvider } from './i18n/LocalizationContext';

createRoot(document.getElementById('root')!).render(
  <LocalizationProvider initialLang="fa">
    <App />
  </LocalizationProvider>
);
