import { createContext, useContext, useState } from 'react';

const sampleOrders = [
  {
    id: 'ORD-001',
    trackingNo: 'TRK7823456',
    item: 'Electronics Package',
    from: 'New York',
    to: 'Los Angeles',
    status: 'delivered',
    date: '2026-02-20',
    weight: '2.3 kg',
    timeline: [
      { step: 'Order Placed', date: 'Feb 17, 09:00', done: true },
      { step: 'Processing', date: 'Feb 17, 14:30', done: true },
      { step: 'Picked Up', date: 'Feb 18, 08:15', done: true },
      { step: 'In Transit', date: 'Feb 19, 11:00', done: true },
      { step: 'Delivered', date: 'Feb 20, 13:45', done: true },
    ],
  },
  {
    id: 'ORD-002',
    trackingNo: 'TRK9134782',
    item: 'Clothing Bundle',
    from: 'Chicago',
    to: 'Miami',
    status: 'in-transit',
    date: '2026-02-21',
    weight: '1.1 kg',
    timeline: [
      { step: 'Order Placed', date: 'Feb 20, 10:00', done: true },
      { step: 'Processing', date: 'Feb 20, 15:00', done: true },
      { step: 'Picked Up', date: 'Feb 21, 09:00', done: true },
      { step: 'In Transit', date: 'Feb 21, 18:30', done: true },
      { step: 'Delivered', date: 'Estimated Feb 24', done: false },
    ],
  },
  {
    id: 'ORD-003',
    trackingNo: 'TRK5621093',
    item: 'Books Collection',
    from: 'Seattle',
    to: 'Boston',
    status: 'pending',
    date: '2026-02-22',
    weight: '3.7 kg',
    timeline: [
      { step: 'Order Placed', date: 'Feb 22, 08:00', done: true },
      { step: 'Processing', date: 'Pending', done: false },
      { step: 'Picked Up', date: 'Scheduled Feb 23', done: false },
      { step: 'In Transit', date: '—', done: false },
      { step: 'Delivered', date: 'Estimated Feb 26', done: false },
    ],
  },
  {
    id: 'ORD-004',
    trackingNo: 'TRK3394821',
    item: 'Home Appliance',
    from: 'Dallas',
    to: 'Phoenix',
    status: 'processing',
    date: '2026-02-22',
    weight: '5.2 kg',
    timeline: [
      { step: 'Order Placed', date: 'Feb 22, 11:30', done: true },
      { step: 'Processing', date: 'Feb 22, 12:00', done: true },
      { step: 'Picked Up', date: 'Scheduled Feb 23', done: false },
      { step: 'In Transit', date: '—', done: false },
      { step: 'Delivered', date: 'Estimated Feb 25', done: false },
    ],
  },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [orders] = useState(sampleOrders);
  const [user] = useState({ name: 'Alex Johnson', email: 'alex@example.com' });

  return (
    <AppContext.Provider value={{ orders, user }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
