import { useState, useEffect } from 'react';
import { WHATSAPP_LINK } from '../lib/constants';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function FloatingElements({ onTrack }) {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onTrack?.('whatsapp_click', 'floating')}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 pulse-ring"
        data-testid="whatsapp-floating-button"
      >
        <MessageCircle size={24} className="text-white" />
      </a>

      {/* Sticky Bottom CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-500 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        } md:hidden`}
        data-testid="sticky-bottom-cta"
      >
        <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5 px-6 py-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrack?.('cta_click', 'sticky_bottom')}
            className="flex items-center justify-center gap-2 w-full bg-white text-[#0A0A0A] py-3 rounded-full font-semibold text-sm"
            data-testid="sticky-bottom-cta-button"
          >
            Get Free Audit
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
