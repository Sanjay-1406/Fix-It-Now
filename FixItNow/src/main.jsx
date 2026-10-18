import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BookingProvider } from './context/BookingContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </StrictMode>
);