import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { WHATSAPP_LINK } from '../lib/constants';
import { Check, ArrowRight, Shield } from 'lucide-react';

const INCLUDES = [
  'Premium Website Design',
  'Custom Logo Design',
  'Mobile Optimization',
  'WhatsApp Integration',
  'Google Business Setup',
  'Basic SEO Optimization',
];

export default function OfferSection({ onTrack }) {
  const ref = useScrollAnimation();

  return (
    <section
      id="offer"
      data-testid="offer-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div ref={ref} className="fade-in-up">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
              Limited Offer
            </p>
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Starter Package for
              <br />
              <span className="text-[#888]">Small Businesses</span>
            </h2>
          </div>

          {/* Pricing Card */}
          <div className="bg-[#121212] rounded-2xl border border-white/10 p-8 md:p-12 relative overflow-hidden">
            {/* Accent border top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-2xl text-[#555] price-strike font-['Poppins']">
                  &#8377;15,000
                </span>
                <span className="font-['Poppins'] text-5xl sm:text-6xl font-bold text-white">
                  &#8377;4,999
                </span>
              </div>
              <p className="text-sm text-[#888]">One-time payment &middot; No hidden fees</p>
            </div>

            {/* Includes */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto">
              {INCLUDES.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#3B82F6]" />
                  </div>
                  <span className="text-sm text-[#ccc]">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrack?.('cta_click', 'offer')}
                className="btn-shine inline-flex items-center gap-2 bg-[#3B82F6] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                data-testid="offer-cta-button"
              >
                Claim This Offer
                <ArrowRight size={20} />
              </a>
              <p className="text-xs text-[#555] mt-4">Only 5 project slots per week</p>

              {/* Trust guarantee */}
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-[#888]">
                <Shield size={16} className="text-[#3B82F6]" />
                <span>If you're not satisfied, we redesign it FREE.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
