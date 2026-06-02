import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import { WHATSAPP_LINK, CONTACT_EMAIL } from '../lib/constants';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#offer' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Blog', href: '/blog', isRoute: true },
];

export default function Header({ onTrack }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    onTrack?.('nav_click', href);
  };

  return (
    <header
      data-testid="sticky-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group" data-testid="header-logo">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-sm text-white">
              C
            </div>
            <span className="font-['Poppins'] font-bold text-lg tracking-tight text-white">
              Chetna AI Studio
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-[#888] hover:text-white transition-colors duration-300"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm text-[#888] hover:text-white transition-colors duration-300"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              )
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-[#888] hover:text-white transition-colors duration-300"
              data-testid="nav-email"
              title={CONTACT_EMAIL}
            >
              <Mail size={16} />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrack?.('cta_click', 'header')}
              className="bg-white text-[#0A0A0A] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all duration-300"
              data-testid="header-cta-button"
            >
              Get Free Audit
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5" data-testid="mobile-menu">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#888] hover:text-white transition-colors py-2"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-[#888] hover:text-white transition-colors py-2"
                >
                  {item.label}
                </a>
              )
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#888] hover:text-white transition-colors py-2 flex items-center gap-2"
            >
              <Mail size={16} />
              {CONTACT_EMAIL}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0A0A0A] px-5 py-3 rounded-full text-sm font-semibold text-center hover:bg-gray-200 transition-all mt-2"
              data-testid="mobile-cta-button"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
