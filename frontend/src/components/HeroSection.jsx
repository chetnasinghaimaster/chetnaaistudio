import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { WHATSAPP_LINK } from '../lib/constants';
import { ArrowRight, Star } from 'lucide-react';

export default function HeroSection({ onTrack }) {
  const headingRef = useScrollAnimation();
  const subRef = useScrollAnimation({ threshold: 0.1 });
  const mockupRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div ref={headingRef} className="fade-in-up">
              <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-6 font-['Inter']">
                Chetna AI Studio
              </p>
              <h1 className="font-['Poppins'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white mb-6">
                Your Website Should Bring You Clients
                <span className="text-[#888]"> — Not Just Exist.</span>
              </h1>
            </div>

            <div ref={subRef} className="fade-in-up">
              <p className="text-base sm:text-lg text-[#888] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                We design high-converting websites for businesses that want real growth.
              </p>

              {/* Trust line */}
              <div className="flex items-center gap-1 justify-center lg:justify-start mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#3B82F6] text-[#3B82F6]" />
                ))}
                <span className="text-sm text-[#888] ml-2">
                  Trusted by growing businesses &middot; 10+ Projects Delivered
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTrack?.('cta_click', 'hero')}
                  className="btn-shine inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-200 transition-all duration-300"
                  data-testid="hero-cta-button"
                >
                  Get Free Website Audit
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 text-white px-8 py-4 rounded-full text-base hover:border-white/30 transition-all duration-300"
                  data-testid="hero-secondary-cta"
                >
                  View Our Work
                </a>
              </div>

              <p className="text-xs text-[#555] mt-4 text-center lg:text-left">
                No spam. No pressure.
              </p>
            </div>
          </div>

          {/* Right Mockup */}
          <div ref={mockupRef} className="fade-in-up hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#3B82F6]/10 blur-[60px] rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121212] animate-float">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-[#0A0A0A] rounded-md px-3 py-1.5 text-xs text-[#555] text-center">
                      yourwebsite.com
                    </div>
                  </div>
                </div>
                {/* Mockup content */}
                <div className="mockup-animate">
                  <img
                    src="https://images.unsplash.com/photo-1693393035675-0edba3ad1492?w=700&q=80"
                    alt="Premium Website Mockup"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
