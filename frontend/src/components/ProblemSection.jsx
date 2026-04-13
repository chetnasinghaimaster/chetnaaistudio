import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PROBLEM_LINES = [
  { text: 'You have a website...', delay: '0s' },
  { text: 'But no leads...', delay: '0.15s' },
  { text: 'No calls...', delay: '0.3s' },
  { text: 'No growth...', delay: '0.45s' },
];

export default function ProblemSection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="py-24 md:py-32 relative"
    >
      <div className="section-divider mb-24" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div ref={ref} className="stagger-children">
          {PROBLEM_LINES.map((line, i) => (
            <p
              key={i}
              className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white/60 mb-6"
            >
              {line.text}
            </p>
          ))}
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              That's not design.
              <br />
              <span className="text-[#3B82F6]">That's lost business.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
