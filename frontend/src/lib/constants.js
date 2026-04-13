const WHATSAPP_NUMBER = '919326505598';

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20I%20want%20a%20free%20website%20audit`;

export const getWhatsAppLink = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const SERVICES = {
  core: {
    title: 'Premium Website',
    description: 'High-converting, mobile-first websites designed to bring you real clients.',
    icon: 'Globe',
  },
  branding: [
    { title: 'Logo Design', description: 'Memorable brand identity that stands out.', icon: 'Palette' },
    { title: 'Brochure Design', description: 'Professional marketing collateral.', icon: 'FileText' },
    { title: 'Visiting Cards', description: 'Premium business card design.', icon: 'CreditCard' },
  ],
  growth: [
    { title: 'Google Business & SEO', description: 'Get found on Google by local customers.', icon: 'Search' },
    { title: 'Instagram Setup', description: 'Professional social media presence.', icon: 'Instagram' },
  ],
  automation: [
    { title: 'WhatsApp Automation', description: 'Auto-respond & follow up with leads.', icon: 'MessageCircle' },
    { title: 'Chatbots', description: 'AI-powered customer engagement 24/7.', icon: 'Bot' },
    { title: 'AI Agents', description: 'Intelligent business process automation.', icon: 'Cpu' },
  ],
};

export const PORTFOLIO_ITEMS = [
  {
    title: 'Luxe Salon',
    type: 'Website',
    result: 'Started getting bookings within 2 weeks',
    category: 'website',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
  },
  {
    title: 'Urban Fitness Studio',
    type: 'Website + Branding',
    result: 'Increased inquiries by 300%',
    category: 'website',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
  },
  {
    title: 'Green Earth Organics',
    type: 'Website',
    result: '50+ online orders in first month',
    category: 'website',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
  },
  {
    title: 'Swift Legal Advisors',
    type: 'Website + SEO',
    result: 'Consistent client inquiries from Google',
    category: 'website',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
  },
  {
    title: 'Bloom Café',
    type: 'Branding + Social',
    result: '2000+ Instagram followers in 3 months',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
  },
  {
    title: 'TechFlow Solutions',
    type: 'Automation',
    result: '60% faster customer response time',
    category: 'automation',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Owner, Luxe Salon',
    text: 'We started getting booking calls within the first week of launching our new website. Absolutely worth it.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Rahul Mehta',
    role: 'Founder, Urban Fitness',
    text: 'Chetna AI Studio transformed our online presence. Our inquiries tripled in just one month.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Anita Desai',
    role: 'Manager, Green Earth Organics',
    text: 'Professional, fast, and the results speak for themselves. Our online orders keep growing.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    name: 'Vikram Singh',
    role: 'CEO, Swift Legal Advisors',
    text: 'The website and SEO package completely changed how we acquire clients. Highly recommend.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    name: 'Meera Patel',
    role: 'Owner, Bloom Café',
    text: 'From zero social media presence to 2000+ followers. The branding work was exceptional.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
];
