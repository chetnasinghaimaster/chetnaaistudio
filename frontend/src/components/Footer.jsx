import { WHATSAPP_LINK } from '../lib/constants';

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#3B82F6] flex items-center justify-center font-bold text-xs text-white">
              C
            </div>
            <span className="font-['Poppins'] font-semibold text-white">Chetna AI Studio</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#888]">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#offer" className="hover:text-white transition-colors">Pricing</a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              data-testid="footer-whatsapp-link"
            >
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} Chetna AI Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
