import { Card } from "@/components/ui/card";
import italiaImage from "@/assets/italia-mode.jpg";
import infernoImage from "@/assets/inferno-mode.jpg";
import comingSoonImage from "@/assets/coming-soon.jpg";

const GameModes = () => {
  const modes = [
    {
      title: "Italia",
      description: "Esplora l'Italia in Minecraft! Costruisci, commercia e domina.",
      image: italiaImage,
      available: true,
    },
    {
      title: "Inferno",
      description: "Combatti, guadagna anime e ottieni cuori.",
      image: infernoImage,
      available: true,
    },
    {
      title: "Coming Soon",
      description: "Una nuova modalità sta per arrivare. Resta sintonizzato!",
      image: comingSoonImage,
      available: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Le Nostre <span className="bg-gradient-primary bg-clip-text text-transparent">Modalità</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Scopri le nostre modalità di gioco uniche. Ogni modalità offre un'esperienza diversa con funzionalità esclusive.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {modes.map((mode, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={mode.image}
                  alt={mode.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                {!mode.available && (
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    In Arrivo
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                  {mode.title}
                </h3>
                <p className="text-muted-foreground">{mode.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameModes;
