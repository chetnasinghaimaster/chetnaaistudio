import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TESTIMONIALS } from '../lib/constants';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const headRef = useScrollAnimation();
  const cardRef = useScrollAnimation({ threshold: 0.1 });

  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="fade-in-up text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
            Testimonials
          </p>
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            What Our Clients Say
          </h2>
        </div>

        {/* Desktop: Horizontal Cards */}
        <div ref={cardRef} className="fade-in-up hidden md:grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-[#121212] rounded-2xl p-6 border border-white/5 relative"
              data-testid={`testimonial-card-${i}`}
            >
              <Quote size={28} className="text-[#3B82F6]/20 mb-4" />
              <p className="text-[#ccc] text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-[#888] text-xs">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mt-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-[#3B82F6] text-[#3B82F6]" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden" data-testid="testimonials-carousel">
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
            <Quote size={28} className="text-[#3B82F6]/20 mb-4" />
            <p className="text-[#ccc] text-sm leading-relaxed mb-6">
              "{TESTIMONIALS[active].text}"
            </p>
            <div className="flex items-center gap-3">
              <img
                src={TESTIMONIALS[active].avatar}
                alt={TESTIMONIALS[active].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white text-sm font-medium">{TESTIMONIALS[active].name}</p>
                <p className="text-[#888] text-xs">{TESTIMONIALS[active].role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-3">
              {[...Array(TESTIMONIALS[active].rating)].map((_, j) => (
                <Star key={j} size={12} className="fill-[#3B82F6] text-[#3B82F6]" />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/30 transition-colors"
              data-testid="testimonial-prev"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === active ? 'bg-[#3B82F6]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/30 transition-colors"
              data-testid="testimonial-next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
