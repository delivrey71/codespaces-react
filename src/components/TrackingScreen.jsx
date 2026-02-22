import { useState } from 'react';
import { toast } from 'sonner';
import { useApp } from './AppContext';

function TrackingTimeline({ timeline }) {
  return (
    <div className="timeline">
      {timeline.map((step, i) => (
        <div key={i} className={`timeline-step${step.done ? ' timeline-step--done' : ''}`}>
          <div className="timeline-step__dot">
            {step.done && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          {i < timeline.length - 1 && <div className="timeline-step__line" />}
          <div className="timeline-step__content">
            <p className="timeline-step__label">{step.step}</p>
            <p className="timeline-step__date">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TrackingScreen({ onNavigate }) {
  const { orders } = useApp();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) { toast.error('Enter a tracking number'); return; }
    const found = orders.find((o) => o.trackingNo.toUpperCase() === trimmed);
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
      toast.error('No shipment found for that tracking number');
    }
  };

  const statusMap = {
    delivered: { cls: 'badge-delivered', label: 'Delivered' },
    'in-transit': { cls: 'badge-transit', label: 'In Transit' },
    pending: { cls: 'badge-pending', label: 'Pending' },
    processing: { cls: 'badge-processing', label: 'Processing' },
  };

  return (
    <div className="screen track-screen">
      <div className="screen-header">
        <h1 className="screen-header__title">Track Package</h1>
      </div>

      <div className="track-body">
        <form className="track-form" onSubmit={handleTrack}>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. TRK9134782"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setNotFound(false); setResult(null); }}
            autoCapitalize="characters"
          />
          <button className="btn btn-primary" type="submit" style={{ width: 'auto', padding: '13px 20px', flexShrink: 0 }}>
            Track
          </button>
        </form>

        {/* Hint chips */}
        <div className="track-hints">
          <p className="text-muted" style={{ fontSize: 13, marginBottom: 6 }}>Try a sample:</p>
          <div className="track-hints__chips">
            {orders.map((o) => (
              <button key={o.id} className="track-hint-chip"
                onClick={() => { setQuery(o.trackingNo); setResult(o); setNotFound(false); }}>
                {o.trackingNo}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="track-result">
            <div className="track-result__header">
              <div>
                <p className="track-result__item">{result.item}</p>
                <p className="track-result__route">{result.from} → {result.to}</p>
              </div>
              <span className={`badge ${(statusMap[result.status] || statusMap.processing).cls}`}>
                {(statusMap[result.status] || statusMap.processing).label}
              </span>
            </div>
            <div className="track-result__meta">
              <span>📦 {result.weight}</span>
              <span>🗓 {result.date}</span>
            </div>
            <div className="divider" />
            <TrackingTimeline timeline={result.timeline} />
          </div>
        )}

        {notFound && (
          <div className="track-not-found">
            <span style={{ fontSize: 40 }}>🔍</span>
            <p>No shipment found</p>
            <p className="text-muted">Check the tracking number and try again</p>
          </div>
        )}
      </div>

      <style>{`
        .track-screen { background: var(--bg); }
        .track-body { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
        .track-form { display: flex; gap: 10px; }
        .track-hints__chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .track-hint-chip {
          padding: 5px 12px;
          border-radius: 999px;
          border: 1.5px solid var(--border);
          font-size: 12px;
          font-family: monospace;
          cursor: pointer;
          background: var(--white);
          color: var(--text-muted);
          transition: all 0.15s;
        }
        .track-hint-chip:hover { border-color: var(--primary); color: var(--primary); }
        .track-result {
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: var(--shadow-md);
        }
        .track-result__header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .track-result__item { font-size: 16px; font-weight: 700; }
        .track-result__route { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .track-result__meta { display: flex; gap: 16px; font-size: 13px; color: var(--text-muted); }
        .track-not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 48px 0;
          text-align: center;
          font-size: 15px;
          font-weight: 500;
        }
        /* Timeline */
        .timeline { display: flex; flex-direction: column; }
        .timeline-step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          position: relative;
          padding-bottom: 20px;
        }
        .timeline-step:last-child { padding-bottom: 0; }
        .timeline-step__dot {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 2.5px solid var(--border);
          background: var(--white);
          flex-shrink: 0;
          margin-top: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .timeline-step--done .timeline-step__dot {
          background: var(--success);
          border-color: var(--success);
        }
        .timeline-step__line {
          position: absolute;
          left: 10px;
          top: 22px;
          width: 2px;
          bottom: 0;
          background: var(--border);
          z-index: 0;
        }
        .timeline-step--done + .timeline-step .timeline-step__line,
        .timeline-step--done .timeline-step__line {
          background: var(--success);
        }
        .timeline-step__content { flex: 1; }
        .timeline-step__label { font-size: 14px; font-weight: 600; }
        .timeline-step__date { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
      `}</style>
    </div>
  );
}
