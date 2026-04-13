import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { WHATSAPP_LINK } from '../lib/constants';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection({ onTrack }) {
  const ref = useScrollAnimation();

  return (
    <section
      id="final-cta"
      data-testid="final-cta-section"
      className="py-24 md:py-40 relative"
    >
      <div className="section-divider mb-24" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
        <div ref={ref} className="fade-in-up">
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#888] mb-2">
            Still thinking?
          </h2>
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-10">
            Or ready to get clients?
          </h2>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrack?.('cta_click', 'final')}
            className="btn-shine inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300"
            data-testid="final-cta-button"
          >
            Get Free Website Audit
            <ArrowRight size={22} />
          </a>

          <p className="text-sm text-[#555] mt-5">
            No spam. No pressure.
          </p>

          <p className="text-xs text-[#444] mt-2">
            Only 5 project slots available this week
          </p>
        </div>
      </div>
    </section>
  );
}
