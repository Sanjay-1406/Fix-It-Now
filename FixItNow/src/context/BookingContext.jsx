import { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(null);

  const openBooking = useCallback((svc) => {
    setService(svc);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setService(null), 300);
  }, []);

  return (
    <BookingContext.Provider value={{ open, service, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}