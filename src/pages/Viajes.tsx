import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import { useLanguage } from "@/contexts/LanguageContext";

const destinations = [
  {
    id: "chichiriviche",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    exploreLink: "/explore/chichiriviche",
    fullDayLink: "/full-day/chichiriviche"
  },
  {
    id: "canaima", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    exploreLink: "/explore/canaima",
    fullDayLink: "/full-day/canaima"
  },
  {
    id: "merida",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop", 
    exploreLink: "/explore/merida",
    fullDayLink: "/full-day/merida"
  }
];

export default function Viajes() {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <span className="text-sm text-secondary font-medium uppercase tracking-wider">
                {t.viajes.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                {t.viajes.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.viajes.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Destinations Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <DestinationCard
                  title={t.viajes.chichiriviche.title}
                  description={t.viajes.chichiriviche.description}
                  image={destinations[0].image}
                  exploreText={t.viajes.chichiriviche.exploreDestination}
                  fullDayText={t.viajes.chichiriviche.viewFullDay}
                  exploreLink={destinations[0].exploreLink}
                  fullDayLink={destinations[0].fullDayLink}
                />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <DestinationCard
                  title={t.viajes.canaima.title}
                  description={t.viajes.canaima.description}
                  image={destinations[1].image}
                  exploreText={t.viajes.canaima.exploreDestination}
                  fullDayText={t.viajes.canaima.viewFullDay}
                  exploreLink={destinations[1].exploreLink}
                  fullDayLink={destinations[1].fullDayLink}
                />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                <DestinationCard
                  title={t.viajes.merida.title}
                  description={t.viajes.merida.description}
                  image={destinations[2].image}
                  exploreText={t.viajes.merida.exploreDestination}
                  fullDayText={t.viajes.merida.viewFullDay}
                  exploreLink={destinations[2].exploreLink}
                  fullDayLink={destinations[2].fullDayLink}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
