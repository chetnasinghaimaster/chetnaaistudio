import { useState } from 'react';
import { getWhatsAppLink } from '../lib/constants';
import { Send } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function LeadForm({ onTrack }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service_interest: 'website', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setSubmitting(true);
    try {
      await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      onTrack?.('lead_submit', 'lead_form', { service: form.service_interest });
      setSubmitted(true);

      // Redirect to WhatsApp
      const msg = `Hi, I'm ${form.name}. I'm interested in ${form.service_interest}. ${form.message}`;
      setTimeout(() => {
        window.open(getWhatsAppLink(msg), '_blank');
      }, 1000);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-[#121212] rounded-2xl p-8 border border-white/5 text-center" data-testid="lead-form-success">
        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <Send size={22} className="text-green-400" />
        </div>
        <h3 className="font-['Poppins'] text-xl font-semibold text-white mb-2">We've Got Your Details!</h3>
        <p className="text-sm text-[#888]">Redirecting you to WhatsApp...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121212] rounded-2xl p-6 md:p-8 border border-white/5 space-y-4"
      data-testid="lead-form"
    >
      <h3 className="font-['Poppins'] text-lg font-semibold text-white mb-2">Get Your Free Audit</h3>

      <div>
        <input
          type="text"
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
          data-testid="lead-form-name"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
          data-testid="lead-form-email"
        />
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
          data-testid="lead-form-phone"
        />
      </div>

      <div>
        <select
          value={form.service_interest}
          onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]/50 transition-colors appearance-none"
          data-testid="lead-form-service"
        >
          <option value="website">Premium Website</option>
          <option value="branding">Branding</option>
          <option value="growth">Growth & SEO</option>
          <option value="automation">Automation</option>
        </select>
      </div>

      <div>
        <textarea
          placeholder="Tell us about your business (optional)"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#3B82F6]/50 transition-colors resize-none"
          data-testid="lead-form-message"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#3B82F6] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
        data-testid="lead-form-submit"
      >
        {submitting ? 'Submitting...' : 'Get Free Audit'}
      </button>

      <p className="text-xs text-[#555] text-center">No spam. No pressure.</p>
    </form>
  );
}
