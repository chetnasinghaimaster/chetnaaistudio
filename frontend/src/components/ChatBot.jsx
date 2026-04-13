import { useState, useEffect, useRef } from 'react';
import { getWhatsAppLink } from '../lib/constants';
import { MessageSquare, X, Send } from 'lucide-react';

const INITIAL_DELAY = 4000; // 4 seconds

const CHAT_FLOW = {
  start: {
    bot: "Hi! Looking to get more clients from your website?",
    options: [
      { label: 'I need a website', next: 'website' },
      { label: 'Branding help', next: 'branding' },
      { label: 'Growth & SEO', next: 'growth' },
      { label: 'Automation', next: 'automation' },
    ],
  },
  website: {
    bot: "Great choice! A premium website is the #1 way to get more clients. We're offering our Starter Package at just ₹4,999 (usually ₹15,000). Want to learn more?",
    options: [
      { label: 'Yes, tell me more!', next: 'connect' },
      { label: 'View portfolio first', next: 'portfolio_redirect' },
    ],
  },
  branding: {
    bot: "Strong branding makes your business memorable. We offer logo design, brochures, and visiting cards. Shall we discuss your brand?",
    options: [
      { label: "Let's discuss", next: 'connect' },
      { label: 'Back to options', next: 'start' },
    ],
  },
  growth: {
    bot: "We help businesses get found on Google with SEO and Google Business setup. Plus Instagram presence. Want to grow your reach?",
    options: [
      { label: "Yes, let's grow", next: 'connect' },
      { label: 'Back to options', next: 'start' },
    ],
  },
  automation: {
    bot: "WhatsApp automation, chatbots, and AI agents can handle customer inquiries 24/7 — so you never miss a lead. Interested?",
    options: [
      { label: 'Tell me more', next: 'connect' },
      { label: 'Back to options', next: 'start' },
    ],
  },
  connect: {
    bot: "Awesome! Let's chat on WhatsApp for a free consultation. No pressure, just a quick conversation about your business goals.",
    options: [
      { label: 'Chat on WhatsApp', next: 'whatsapp' },
    ],
  },
  portfolio_redirect: {
    bot: "Sure! Check out our work above. When you're ready, I'm here to help you get started.",
    options: [
      { label: 'Chat on WhatsApp', next: 'whatsapp' },
      { label: 'Back to start', next: 'start' },
    ],
  },
};

export default function ChatBot({ onTrack }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('start');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-popup after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        addBotMessage('start');
        onTrack?.('chatbot_opened', 'auto');
      }
    }, INITIAL_DELAY);
    return () => clearTimeout(timer);
  }, [hasShown]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (step) => {
    const flow = CHAT_FLOW[step];
    if (!flow) return;
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: flow.bot, options: flow.options }]);
      setCurrentStep(step);
      setTyping(false);
    }, 600);
  };

  const handleOption = (option) => {
    // Add user message
    setMessages((prev) => [...prev, { type: 'user', text: option.label }]);
    onTrack?.('chatbot_option', option.label);

    if (option.next === 'whatsapp') {
      const msg = `Hi, I'm interested in ${option.label}. Can we discuss?`;
      window.open(getWhatsAppLink(msg), '_blank');
      return;
    }

    if (option.next === 'portfolio_redirect') {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }

    addBotMessage(option.next);
  };

  const toggleChat = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    if (opening && messages.length === 0) {
      addBotMessage('start');
    }
    onTrack?.('chatbot_toggle', opening ? 'open' : 'close');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-[#333] rotate-0' : 'bg-[#3B82F6] hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
        }`}
        data-testid="chatbot-toggle"
      >
        {isOpen ? <X size={22} className="text-white" /> : <MessageSquare size={22} className="text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-40 right-6 z-40 w-[340px] max-w-[calc(100vw-48px)] bg-[#121212] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          data-testid="chatbot-window"
          style={{ maxHeight: '450px' }}
        >
          {/* Header */}
          <div className="bg-[#1a1a1a] px-5 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
              <MessageSquare size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Chetna AI Studio</p>
              <p className="text-[#888] text-xs">Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 overflow-y-auto space-y-3" style={{ maxHeight: '320px' }}>
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.type === 'bot' ? (
                  <div className="chatbot-message">
                    <div className="bg-[#1a1a1a] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#ccc] leading-relaxed">
                      {msg.text}
                    </div>
                    {/* Options (only show for last bot message) */}
                    {i === messages.length - 1 && msg.options && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.options.map((opt, j) => (
                          <button
                            key={j}
                            onClick={() => handleOption(opt)}
                            className="text-xs bg-[#0A0A0A] border border-white/10 text-white px-3 py-2 rounded-full hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all duration-200"
                            data-testid={`chatbot-option-${j}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="chatbot-message bg-[#3B82F6] rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white">
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="chatbot-message">
                <div className="bg-[#1a1a1a] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#888]">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </>
  );
}
