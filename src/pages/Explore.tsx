import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const destinationsInfo = {
  chichiriviche: {
    es: {
      title: "Chichiriviche",
      description: "Ubicado en el estado Falcón, Chichiriviche es un paraíso costero que ofrece algunas de las playas más hermosas de Venezuela. Sus aguas cristalinas y cayos paradisíacos lo convierten en un destino perfecto para los amantes del mar.",
      culture: "La cultura de Chichiriviche está profundamente ligada al mar. Los pescadores locales mantienen tradiciones ancestrales y la gastronomía marinera es protagonista con platos como el pescado frito, la cazuela de mariscos y el sancocho de pescado.",
      attractions: [
        "Cayo Sombrero - Playa de arena blanca con aguas turquesas",
        "Cayo Sal - Isla virgen perfecta para el descanso",
        "Cayo Peraza - Arrecifes de coral y biodiversidad marina",
        "Cayo Muerto - Paisajes únicos y experiencias inolvidables",
        "Playa Sur - Atardeceres espectaculares",
        "Manglares - Ecosistemas únicos y tours en kayak"
      ],
      history: "Chichiriviche fue fundada en el siglo XVIII como un pequeño pueblo de pescadores. Su nombre proviene de la lengua indígena y significa 'lugar de pescadores'. Con el tiempo se ha convertido en uno de los destinos turísticos más importantes de la costa venezolana."
    },
    en: {
      title: "Chichiriviche",
      description: "Located in Falcón state, Chichiriviche is a coastal paradise offering some of Venezuela's most beautiful beaches. Its crystal-clear waters and paradisiacal keys make it a perfect destination for sea lovers.",
      culture: "Chichiriviche's culture is deeply tied to the sea. Local fishermen maintain ancestral traditions and seafood gastronomy is the protagonist with dishes like fried fish, seafood casserole and fish sancocho.",
      attractions: [
        "Cayo Sombrero - White sand beach with turquoise waters",
        "Cayo Sal - Virgin island perfect for rest",
        "Cayo Peraza - Coral reefs and marine biodiversity",
        "Cayo Muerto - Unique landscapes and unforgettable experiences",
        "Playa Sur - Spectacular sunsets",
        "Mangroves - Unique ecosystems and kayak tours"
      ],
      history: "Chichiriviche was founded in the 18th century as a small fishing village. Its name comes from the indigenous language and means 'place of fishermen'. Over time it has become one of the most important tourist destinations on the Venezuelan coast."
    }
  },
  canaima: {
    es: {
      title: "Canaima",
      description: "El Parque Nacional Canaima es Patrimonio de la Humanidad de la UNESCO. Hogar del Salto Ángel, la cascada más alta del mundo, y los tepuyes, montañas de cima plana que se elevan majestuosamente sobre la selva.",
      culture: "La región de Canaima es el hogar del pueblo indígena Pemón, quienes han habitado estas tierras por milenios. Su cultura está profundamente conectada con los tepuyes, considerados montañas sagradas. Los Pemones son expertos navegantes y guías de la selva.",
      attractions: [
        "Salto Ángel - La cascada más alta del mundo (979 metros)",
        "Laguna de Canaima - Aguas rojizas únicas rodeadas de cascadas",
        "Tepuyes - Montañas de mesa de 2 mil millones de años",
        "Salto Hacha - Impresionante cascada en la laguna",
        "Isla Ratoncito - Punto panorámico en la laguna",
        "Comunidades Pemón - Cultura indígena milenaria"
      ],
      history: "Los tepuyes de Canaima son las formaciones geológicas más antiguas de la Tierra, con más de 2 mil millones de años. El Salto Ángel fue descubierto oficialmente en 1933 por el aviador Jimmy Angel, aunque los indígenas Pemón lo conocían desde tiempos ancestrales."
    },
    en: {
      title: "Canaima",
      description: "Canaima National Park is a UNESCO World Heritage Site. Home to Angel Falls, the world's highest waterfall, and the tepuis, flat-topped mountains that rise majestically above the jungle.",
      culture: "The Canaima region is home to the Pemón indigenous people, who have inhabited these lands for millennia. Their culture is deeply connected to the tepuis, considered sacred mountains. The Pemón are expert navigators and jungle guides.",
      attractions: [
        "Angel Falls - The world's highest waterfall (979 meters)",
        "Canaima Lagoon - Unique reddish waters surrounded by waterfalls",
        "Tepuis - 2 billion year old table mountains",
        "Salto Hacha - Impressive waterfall in the lagoon",
        "Ratoncito Island - Panoramic point in the lagoon",
        "Pemón Communities - Millennial indigenous culture"
      ],
      history: "The tepuis of Canaima are the oldest geological formations on Earth, over 2 billion years old. Angel Falls was officially discovered in 1933 by aviator Jimmy Angel, although the Pemón indigenous people had known it since ancestral times."
    }
  },
  merida: {
    es: {
      title: "Mérida",
      description: "Conocida como 'La Ciudad de los Caballeros' y 'El Techo de Venezuela', Mérida es un estado andino que alberga los picos más altos del país, incluyendo el Pico Bolívar a 4,978 metros. Su clima frío, cultura cafetalera y paisajes montañosos la hacen única.",
      culture: "La cultura merideña es una mezcla de tradiciones andinas, españolas e indígenas. Es famosa por su café de altura, sus dulces típicos como las acemas y piñonate, y festividades como la Feria del Sol. Los merideños son conocidos por su hospitalidad y conservan tradiciones como los parranderos y La Paradura del Niño.",
      attractions: [
        "Teleférico de Mérida - El más alto y largo del mundo",
        "Pico Bolívar - La cumbre más alta de Venezuela (4,978 m)",
        "Pico El Águila - El punto más alto de la carretera venezolana (4,118 m)",
        "Parque Nacional Sierra Nevada - Paisajes alpinos únicos",
        "Los Nevados - Pueblo tradicional andino",
        "Laguna de Mucubají - Laguna glaciar de aguas cristalinas",
        "Parque La Venezuela de Antier - Museo viviente de arquitectura colonial"
      ],
      history: "Mérida fue fundada en 1558 por Juan Rodríguez Suárez. Su ubicación en los Andes la convirtió en un importante centro colonial y posteriormente en un polo educativo con la Universidad de Los Andes, una de las más antiguas de Venezuela. Los páramos y picos nevados han sido parte de la identidad merideña por siglos."
    },
    en: {
      title: "Mérida",
      description: "Known as 'The City of Gentlemen' and 'The Roof of Venezuela', Mérida is an Andean state that houses the country's highest peaks, including Pico Bolívar at 4,978 meters. Its cold climate, coffee culture and mountain landscapes make it unique.",
      culture: "Mérida's culture is a mixture of Andean, Spanish and indigenous traditions. It is famous for its high-altitude coffee, typical sweets like acemas and piñonate, and festivities like the Sun Fair. Merideños are known for their hospitality and preserve traditions like the parranderos and La Paradura del Niño.",
      attractions: [
        "Mérida Cable Car - The highest and longest in the world",
        "Pico Bolívar - Venezuela's highest peak (4,978 m)",
        "Pico El Águila - The highest point of the Venezuelan highway (4,118 m)",
        "Sierra Nevada National Park - Unique alpine landscapes",
        "Los Nevados - Traditional Andean village",
        "Mucubají Lagoon - Glacial lagoon with crystal-clear waters",
        "La Venezuela de Antier Park - Living museum of colonial architecture"
      ],
      history: "Mérida was founded in 1558 by Juan Rodríguez Suárez. Its location in the Andes made it an important colonial center and later an educational hub with the University of Los Andes, one of the oldest in Venezuela. The páramos and snowy peaks have been part of Mérida's identity for centuries."
    }
  }
};

export default function Explore() {
  const { t, language } = useLanguage();
  const [selectedDestination, setSelectedDestination] = useState<"chichiriviche" | "canaima" | "merida">("chichiriviche");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const currentInfo = destinationsInfo[selectedDestination][language as "es" | "en"];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <span className="text-sm text-secondary font-medium uppercase tracking-wider">
                {t.explore.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                {t.explore.title}
              </h1>
            </div>
          </div>
        </section>
        
        {/* Destination Selection */}
        <section className="section">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant={selectedDestination === "chichiriviche" ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedDestination("chichiriviche")}
                className="min-w-[160px]"
              >
                Chichiriviche
              </Button>
              <Button
                variant={selectedDestination === "canaima" ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedDestination("canaima")}
                className="min-w-[160px]"
              >
                Canaima
              </Button>
              <Button
                variant={selectedDestination === "merida" ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedDestination("merida")}
                className="min-w-[160px]"
              >
                Mérida
              </Button>
            </div>
            
            {/* Destination Info */}
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-4">{currentInfo.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentInfo.description}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {language === "es" ? "Atracciones Principales" : "Main Attractions"}
                  </h3>
                  <ul className="space-y-3">
                    {currentInfo.attractions.map((attraction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {language === "es" ? "Cultura" : "Culture"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentInfo.culture}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {language === "es" ? "Historia" : "History"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentInfo.history}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
