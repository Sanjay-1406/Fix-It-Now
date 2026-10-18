export const BASE_FARE = 100;            // Visiting / basic charges

export const PRIORITIES = [
  {
    id: 'standard',
    label: 'Standard',
    desc: 'Next available slot',
    surcharge: 0,
    eta: 'Within 4 hours',
  },
  {
    id: 'priority',
    label: 'Priority',
    desc: 'Jump the queue',
    surcharge: 100,
    eta: 'Within 60 mins',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    desc: 'Immediate dispatch',
    surcharge: 250,
    eta: 'Within 30 mins',
  },
];

export const DATES = [
  { id: 'today',     label: 'Today',         sub: 'Available now' },
  { id: 'tomorrow',  label: 'Tomorrow',      sub: 'Full day slots' },
  { id: 'this-week', label: 'This Weekend',  sub: 'Sat / Sun' },
  { id: 'next-week', label: 'Next Week',     sub: 'Pick a slot later' },
];

export const DISTANCE_RATE = 12;  // ₹ per km beyond 5 km
export const FREE_KM = 5;

export function calculateBill({ priority = 'standard', distanceKm = 0, hasCoupon = false }) {
  const priorityObj = PRIORITIES.find((p) => p.id === priority) ?? PRIORITIES[0];
  const extraKm = Math.max(0, distanceKm - FREE_KM);

  const basic = BASE_FARE;
  const priorityFee = priorityObj.surcharge;
  const distanceFee = Math.round(extraKm * DISTANCE_RATE);
  const platformFee = 20;
  const gstRate = 0.18;

  const subtotal = basic + priorityFee + distanceFee + platformFee;
  const discount = hasCoupon ? Math.round(subtotal * 0.1) : 0;
  const taxable = subtotal - discount;
  const gst = Math.round(taxable * gstRate);
  const total = taxable + gst;

  return {
    basic,
    priorityFee,
    priorityLabel: priorityObj.label,
    distanceFee,
    extraKm,
    platformFee,
    discount,
    gst,
    subtotal,
    total,
  };
}

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);