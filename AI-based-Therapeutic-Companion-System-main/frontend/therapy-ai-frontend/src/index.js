import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ ADD THIS
import { HealthProvider } from './context/HealthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ WRAP HERE */}
    <HealthProvider>
      <App />
    </HealthProvider>
  </React.StrictMode>
);

reportWebVitals();