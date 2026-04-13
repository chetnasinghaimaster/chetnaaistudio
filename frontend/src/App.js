import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAnalytics } from "./hooks/useScrollAnimation";
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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LandingPage = () => {
  const { track } = useAnalytics(BACKEND_URL);

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-testid="landing-page">
      <Header onTrack={track} />
      <HeroSection onTrack={track} />
      <ProblemSection />
      <SolutionSection />
      <CaseStudySection onTrack={track} />
      <ServicesSection />
      <PortfolioSection onTrack={track} />
      <OfferSection onTrack={track} />
      <TestimonialsSection />
      <LeadFormSection onTrack={track} />
      <FinalCTASection onTrack={track} />
      <Footer />
      <ChatBot onTrack={track} />
      <FloatingElements onTrack={track} />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
