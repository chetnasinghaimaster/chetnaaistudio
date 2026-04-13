import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAnalytics } from "./hooks/useScrollAnimation";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import CaseStudySection from "./components/CaseStudySection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import OfferSection from "./components/OfferSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LeadFormSection from "./components/LeadFormSection";
import FinalCTASection from "./components/FinalCTASection";
import ChatBot from "./components/ChatBot";
import FloatingElements from "./components/FloatingElements";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import BlogPage from "./components/BlogPage";
import BlogPostPage from "./components/BlogPostPage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LandingPage = () => {
  const { track } = useAnalytics(BACKEND_URL);
  const { trackEvent } = useGoogleAnalytics();

  const handleTrack = (eventType, section, metadata) => {
    track(eventType, section, metadata);
    trackEvent(eventType, { section, ...metadata });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-testid="landing-page">
      <Header onTrack={handleTrack} />
      <HeroSection onTrack={handleTrack} />
      <ProblemSection />
      <SolutionSection />
      <CaseStudySection onTrack={handleTrack} />
      <ServicesSection />
      <PortfolioSection onTrack={handleTrack} />
      <OfferSection onTrack={handleTrack} />
      <TestimonialsSection />
      <LeadFormSection onTrack={handleTrack} />
      <FinalCTASection onTrack={handleTrack} />
      <Footer />
      <ChatBot onTrack={handleTrack} />
      <FloatingElements onTrack={handleTrack} />
    </div>
  );
};

function App() {
  useGoogleAnalytics();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
