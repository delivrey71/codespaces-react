import { useState } from 'react';
import { toast } from 'sonner';

const FAQS = [
  {
    q: 'How do I track my package?',
    a: 'Go to the Track tab, enter your tracking number, and tap "Track". You can find your tracking number in your order confirmation email.',
  },
  {
    q: 'What do the different statuses mean?',
    a: 'Processing: order received and being prepared. Pending: waiting for pickup. In Transit: on its way to you. Delivered: package has arrived.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3–5 business days. Express delivery is 1–2 business days. International shipments may take 7–14 days.',
  },
  {
    q: 'What if my package is missing or damaged?',
    a: 'Please contact our support team within 7 days of the expected delivery date. Use the form below to submit a ticket and we will investigate promptly.',
  },
  {
    q: 'Can I change the delivery address?',
    a: 'Address changes can be made before the package is picked up. Once in transit, we cannot guarantee changes. Contact support as soon as possible.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__question" onClick={() => setOpen((v) => !v)}>
        <span>{q}</span>
        <svg className="faq-item__chevron" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M5 7L9 11L13 7" stroke="#64748B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <p className="faq-item__answer">{a}</p>}
    </div>
  );
}

export function SupportScreen({ onNavigate }) {
  const [form, setForm] = useState({ subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Ticket submitted! We\'ll reply within 24 hours.');
      setForm({ subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="screen support-screen">
      <div className="screen-header">
        <h1 className="screen-header__title">Support</h1>
      </div>

      <div className="support-body">
        {/* Contact chips */}
        <div className="support-contacts">
          <a href="tel:+18005551234" className="support-contact-chip">
            <span>📞</span> 1-800-555-1234
          </a>
          <a href="mailto:support@swiftdeliver.com" className="support-contact-chip">
            <span>✉️</span> support@swiftdeliver.com
          </a>
        </div>

        {/* FAQ */}
        <div className="support-section">
          <h2 className="support-section__title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="support-section">
          <h2 className="support-section__title">Submit a Ticket</h2>
          <form className="support-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="sup-subject">Subject</label>
              <input id="sup-subject" className="form-input" type="text"
                placeholder="e.g. Missing package" value={form.subject} onChange={set('subject')} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sup-message">Message</label>
              <textarea id="sup-message" className="form-input support-textarea"
                placeholder="Describe your issue…" rows={4}
                value={form.message} onChange={set('message')} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Sending…' : 'Submit Ticket'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .support-screen { background: var(--bg); }
        .support-body { padding: 20px; display: flex; flex-direction: column; gap: 24px; }
        .support-contacts { display: flex; gap: 10px; flex-wrap: wrap; }
        .support-contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 999px;
          border: 1.5px solid var(--border);
          background: var(--white);
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          text-decoration: none;
          transition: background 0.15s;
        }
        .support-contact-chip:hover { background: var(--primary-light); border-color: var(--primary); }
        .support-section { display: flex; flex-direction: column; gap: 12px; }
        .support-section__title { font-size: 17px; font-weight: 700; }
        .faq-list {
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-item:last-child { border-bottom: none; }
        .faq-item__question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 14px 16px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          gap: 10px;
        }
        .faq-item__chevron {
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .faq-item--open .faq-item__chevron { transform: rotate(180deg); }
        .faq-item__answer {
          padding: 0 16px 14px;
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .support-form { display: flex; flex-direction: column; gap: 14px; }
        .support-textarea { resize: vertical; min-height: 100px; }
      `}</style>
    </div>
  );
}
