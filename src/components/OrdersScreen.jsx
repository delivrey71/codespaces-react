import { useState } from 'react';
import { useApp } from './AppContext';

const FILTERS = ['All', 'Active', 'Delivered', 'Pending'];

function statusMatchesFilter(status, filter) {
  if (filter === 'All') return true;
  if (filter === 'Active') return ['in-transit', 'processing'].includes(status);
  if (filter === 'Delivered') return status === 'delivered';
  if (filter === 'Pending') return status === 'pending';
  return true;
}

function StatusBadge({ status }) {
  const map = {
    delivered: { cls: 'badge-delivered', label: 'Delivered' },
    'in-transit': { cls: 'badge-transit', label: 'In Transit' },
    pending: { cls: 'badge-pending', label: 'Pending' },
    processing: { cls: 'badge-processing', label: 'Processing' },
  };
  const { cls, label } = map[status] || map.processing;
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function OrdersScreen({ onNavigate }) {
  const { orders } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = orders.filter((o) => statusMatchesFilter(o.status, activeFilter));

  return (
    <div className="screen orders-screen">
      <div className="screen-header">
        <h1 className="screen-header__title">My Orders</h1>
      </div>

      {/* Filter tabs */}
      <div className="orders-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`orders-filter-btn${activeFilter === f ? ' orders-filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="orders-list">
        {filtered.length === 0 && (
          <div className="orders-empty">
            <span style={{ fontSize: 40 }}>📭</span>
            <p>No orders found</p>
          </div>
        )}
        {filtered.map((order) => (
          <div key={order.id} className="order-row">
            <div className="order-row__icon">📦</div>
            <div className="order-row__info">
              <div className="order-row__top">
                <p className="order-row__item">{order.item}</p>
                <StatusBadge status={order.status} />
              </div>
              <p className="order-row__route">{order.from} → {order.to}</p>
              <div className="order-row__meta">
                <span className="order-row__tracking">{order.trackingNo}</span>
                <span className="order-row__weight">{order.weight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .orders-screen { background: var(--bg); }
        .orders-filters {
          display: flex;
          gap: 8px;
          padding: 12px 20px;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .orders-filters::-webkit-scrollbar { display: none; }
        .orders-filter-btn {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          background: var(--white);
          color: var(--text-muted);
          white-space: nowrap;
          transition: all 0.15s;
        }
        .orders-filter-btn--active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .orders-list { padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }
        .orders-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 48px 0;
          color: var(--text-muted);
          font-size: 15px;
        }
        .order-row {
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 14px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: var(--shadow);
        }
        .order-row__icon {
          font-size: 28px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .order-row__info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .order-row__top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .order-row__item { font-size: 15px; font-weight: 600; }
        .order-row__route { font-size: 13px; color: var(--text-muted); }
        .order-row__meta { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); }
        .order-row__tracking { font-size: 12px; font-family: monospace; color: var(--text-muted); }
        .order-row__weight { font-size: 12px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
