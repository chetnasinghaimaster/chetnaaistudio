import { useScrollAnimation } from '../hooks/useScrollAnimation';
import LeadForm from './LeadForm';

export default function LeadFormSection({ onTrack }) {
  const ref = useScrollAnimation();

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div ref={ref} className="fade-in-up">
            <p className="text-sm uppercase tracking-[0.2em] text-[#3B82F6] font-semibold mb-4">
              Get Started
            </p>
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-base text-[#888] leading-relaxed mb-6">
              Fill out the form and we'll get back to you within 24 hours with a free website audit and strategy call.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-[#ccc]">Free website audit & strategy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-[#ccc]">No commitment required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-[#ccc]">Response within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div>
            <LeadForm onTrack={onTrack} />
          </div>
        </div>
      </div>
    </section>
  );
}
