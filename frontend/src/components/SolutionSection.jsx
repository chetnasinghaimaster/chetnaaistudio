import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Target, Paintbrush, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    icon: Target,
    step: '01',
    title: 'Strategy',
    description: 'We analyze your business, audience, and competition to build a website blueprint that converts.',
  },
  {
    icon: Paintbrush,
    step: '02',
    title: 'Premium Design',
    description: 'Clean, modern, mobile-first designs that establish trust and make your business look premium.',
  },
  {
    icon: TrendingUp,
    step: '03',
    title: 'Conversion System',
    description: 'Every element is optimized — from CTAs to WhatsApp integration — so visitors become clients.',
  },
];

export default function SolutionSection() {
  const headRef = useScrollAnimation();
  const cardsRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="solution"
      data-testid="solution-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="fade-in-up text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
            How It Works
          </p>
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Our 3-Step System
          </h2>
        </div>

        <div ref={cardsRef} className="stagger-children grid md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="service-card bg-[#121212] rounded-2xl p-8 border border-white/5 relative group"
                data-testid={`solution-step-${item.step}`}
              >
                <div className="absolute top-6 right-6 text-5xl font-bold text-white/[0.03] font-['Poppins']">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-6 group-hover:bg-[#3B82F6]/20 transition-colors duration-300">
                  <Icon size={22} className="text-[#3B82F6]" />
                </div>
                <h3 className="font-['Poppins'] text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#888] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
