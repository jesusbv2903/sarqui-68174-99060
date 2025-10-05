import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Index() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Welcome Section */}
        <section id="welcome" className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in [animation-delay:100ms]">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t.home.welcome.title}
                </h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {t.home.welcome.description}
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/about">
                    Conocer Más <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:300ms]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop"
                    alt="Angel Falls Venezuela" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop"
                    alt="Venezuelan beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1526491109672-74240d3dee82?w=400&h=300&fit=crop"
                    alt="Andes mountains" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-accent font-medium uppercase tracking-wider">
                {t.home.benefits.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {t.home.benefits.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
                  <ArrowRight className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t.home.benefits.visibility.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.home.benefits.visibility.description}</p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t.home.benefits.credibility.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.home.benefits.credibility.description}</p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
                  <Gift className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t.home.benefits.support.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.home.benefits.support.description}</p>
              </div>
            </div>
          </div>
        </section>
        
        
        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.home.cta.title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t.home.cta.description}
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg">
                <Link to="/about">{t.home.cta.cta}</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <svg 
              className="absolute bottom-0 w-full h-24 fill-background"
              preserveAspectRatio="none"
              viewBox="0 0 1440 74"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                className="animate-wave opacity-50"
              />
              <path 
                d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                className="animate-wave opacity-100 [animation-delay:-4s]"
              />
            </svg>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
