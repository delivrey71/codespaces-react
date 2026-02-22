import { useApp } from './AppContext';

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

function StatCard({ value, label, color }) {
  return (
    <div className="dash-stat">
      <span className="dash-stat__value" style={{ color }}>{value}</span>
      <span className="dash-stat__label">{label}</span>
    </div>
  );
}

export function DashboardScreen({ onNavigate }) {
  const { orders, user } = useApp();

  const stats = {
    active: orders.filter((o) => ['in-transit', 'processing'].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    pending: orders.filter((o) => o.status === 'pending').length,
  };

  const recent = orders.slice(0, 3);

  return (
    <div className="screen dash-screen">
      {/* Header */}
      <div className="dash-header">
        <div>
          <p className="dash-header__greet">Good morning 👋</p>
          <h1 className="dash-header__name">{user.name}</h1>
        </div>
        <div className="dash-header__avatar" aria-hidden="true">
          {user.name.charAt(0)}
        </div>
      </div>

      <div className="dash-body">
        {/* Stats */}
        <div className="dash-stats">
          <StatCard value={stats.active} label="Active" color="var(--primary)" />
          <StatCard value={stats.delivered} label="Delivered" color="var(--success)" />
          <StatCard value={stats.pending} label="Pending" color="var(--warning)" />
        </div>

        {/* Track quick-access */}
        <div
          className="dash-track-cta"
          onClick={() => onNavigate('tracking')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              // Prevent page scroll when activating with Space
              if (e.key === ' ') {
                e.preventDefault();
              }
              onNavigate('tracking');
            }
          }}
        >
          <div>
            <p className="dash-track-cta__title">Track a Package</p>
            <p className="dash-track-cta__sub">Enter tracking number</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Recent Orders */}
        <div className="dash-section">
          <div className="dash-section__header">
            <h2 className="dash-section__title">Recent Orders</h2>
            <button className="dash-section__link" onClick={() => onNavigate('orders')}>See all</button>
          </div>
          <div className="dash-orders">
            {recent.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card__top">
                  <div>
                    <p className="order-card__item">{order.item}</p>
                    <p className="order-card__route">{order.from} → {order.to}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="order-card__bottom">
                  <span className="order-card__id">{order.trackingNo}</span>
                  <span className="order-card__date">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dash-screen { background: var(--bg); }
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 20px 16px;
          background: var(--white);
        }
        .dash-header__greet { font-size: 14px; color: var(--text-muted); }
        .dash-header__name { font-size: 22px; font-weight: 800; }
        .dash-header__avatar {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: var(--primary);
          color: white;
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dash-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 20px; }
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .dash-stat {
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          box-shadow: var(--shadow);
        }
        .dash-stat__value { font-size: 28px; font-weight: 800; line-height: 1; }
        .dash-stat__label { font-size: 12px; color: var(--text-muted); font-weight: 500; }
        .dash-track-cta {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius);
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(14,165,233,0.35);
        }
        .dash-track-cta__title { font-size: 16px; font-weight: 700; color: white; }
        .dash-track-cta__sub { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 2px; }
        .dash-section__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .dash-section__title { font-size: 17px; font-weight: 700; }
        .dash-section__link { font-size: 14px; color: var(--primary); background: none; border: none; cursor: pointer; font-weight: 600; }
        .dash-orders { display: flex; flex-direction: column; gap: 12px; }
        .order-card {
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: var(--shadow);
        }
        .order-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
        .order-card__item { font-size: 15px; font-weight: 600; }
        .order-card__route { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .order-card__bottom { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 10px; }
        .order-card__id { font-size: 12px; font-family: monospace; color: var(--text-muted); }
        .order-card__date { font-size: 12px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
