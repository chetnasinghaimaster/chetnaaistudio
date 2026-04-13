import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SERVICES } from '../lib/constants';
import { Globe, Palette, FileText, CreditCard, Search, Instagram, MessageCircle, Bot, Cpu } from 'lucide-react';

const ICON_MAP = { Globe, Palette, FileText, CreditCard, Search, Instagram, MessageCircle, Bot, Cpu };

function ServiceCard({ title, description, icon, large }) {
  const Icon = ICON_MAP[icon];
  return (
    <div
      className={`service-card bg-[#121212] rounded-2xl p-6 md:p-8 border border-white/5 ${
        large ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
        large ? 'bg-[#3B82F6]/15 w-12 h-12' : 'bg-white/5'
      }`}>
        {Icon && <Icon size={large ? 24 : 20} className={large ? 'text-[#3B82F6]' : 'text-white/70'} />}
      </div>
      {large && (
        <span className="inline-block text-xs uppercase tracking-wider text-[#3B82F6] font-semibold mb-2 bg-[#3B82F6]/10 px-2.5 py-1 rounded-full">
          Core Service
        </span>
      )}
      <h3 className={`font-['Poppins'] font-semibold text-white mb-2 ${large ? 'text-2xl' : 'text-base'}`}>
        {title}
      </h3>
      <p className={`text-[#888] leading-relaxed ${large ? 'text-base' : 'text-sm'}`}>
        {description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  const headRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ threshold: 0.05 });

  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="fade-in-up text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
            What We Do
          </p>
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Everything Your Business Needs
            <br className="hidden sm:block" />
            <span className="text-[#888]"> to Grow Online</span>
          </h2>
          <p className="text-base text-[#888] max-w-xl mx-auto">
            We specialize in websites — and support you with everything else.
          </p>
        </div>

        <div ref={gridRef} className="fade-in-up">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {/* Core - Large card */}
            <ServiceCard {...SERVICES.core} large />

            {/* Branding */}
            <div className="md:col-span-2 space-y-4 md:space-y-6">
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#555] font-semibold px-1">Branding</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {SERVICES.branding.map((s) => (
                  <ServiceCard key={s.title} {...s} />
                ))}
              </div>
            </div>

            {/* Growth */}
            <div className="md:col-span-2 space-y-4 md:space-y-6">
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#555] font-semibold px-1">Growth</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {SERVICES.growth.map((s) => (
                  <ServiceCard key={s.title} {...s} />
                ))}
              </div>
            </div>

            {/* Automation */}
            <div className="md:col-span-2 space-y-4 md:space-y-6">
              <h4 className="text-xs uppercase tracking-[0.15em] text-[#555] font-semibold px-1">Automation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {SERVICES.automation.map((s) => (
                  <ServiceCard key={s.title} {...s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
