import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PORTFOLIO_ITEMS, WHATSAPP_LINK } from '../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function PortfolioSection({ onTrack }) {
  const headRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ threshold: 0.05 });

  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="fade-in-up text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
            Our Work
          </p>
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Results That Speak
          </h2>
          <p className="text-base text-[#888] max-w-lg mx-auto">
            Every project is designed with one goal: getting you more clients.
          </p>
        </div>

        <div ref={gridRef} className="fade-in-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div
              key={i}
              className="portfolio-card group rounded-2xl overflow-hidden border border-white/5 bg-[#121212] cursor-pointer"
              data-testid={`portfolio-item-${i}`}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="portfolio-overlay absolute inset-0 bg-[#0A0A0A]/70 opacity-0 flex items-center justify-center transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-['Poppins'] font-semibold text-white">{item.title}</h3>
                  <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-[#888]">{item.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrack?.('cta_click', 'portfolio')}
            className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-blue-400 transition-colors font-medium"
            data-testid="portfolio-cta"
          >
            Want results like these? Let's talk
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
