import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { WHATSAPP_LINK } from '../lib/constants';
import { ArrowRight } from 'lucide-react';

export default function CaseStudySection({ onTrack }) {
  const [sliderPos, setSliderPos] = useState(50);
  const ref = useScrollAnimation();

  return (
    <section
      id="casestudy"
      data-testid="casestudy-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={ref} className="fade-in-up">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
              Featured Case Study
            </p>
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              From No Presence to
              <br />
              <span className="text-[#888]">Consistent Inquiries</span>
            </h2>
          </div>

          {/* Before / After Slider */}
          <div className="max-w-4xl mx-auto">
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 h-[300px] sm:h-[400px] md:h-[500px] cursor-col-resize select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSliderPos(((e.clientX - rect.left) / rect.width) * 100);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                setSliderPos(((touch.clientX - rect.left) / rect.width) * 100);
              }}
              data-testid="before-after-slider"
            >
              {/* After (Full) */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1693393035675-0edba3ad1492?w=900&q=80"
                  alt="After redesign"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium border border-white/10">
                  After
                </div>
              </div>

              {/* Before (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1720135885007-454165745e21?w=900&q=80"
                  alt="Before redesign"
                  className="w-full h-full object-cover grayscale brightness-50"
                  style={{ minWidth: '100%', width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
                />
                <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium border border-white/10">
                  Before
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-4 bg-[#0A0A0A] rounded-full" />
                    <div className="w-0.5 h-4 bg-[#0A0A0A] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA below */}
            <div className="text-center mt-10">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrack?.('cta_click', 'casestudy')}
                className="inline-flex items-center gap-2 bg-[#3B82F6] text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                data-testid="casestudy-cta-button"
              >
                Get Results Like This
                <ArrowRight size={18} />
              </a>
              <p className="text-xs text-[#555] mt-3">No spam. No pressure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
