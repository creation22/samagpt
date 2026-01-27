import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ import
import './index.css';
import App from './App.jsx';

import ErrorBoundary from './ui/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter> {/* ✅ wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
