import { Card } from "@/components/ui/card";
import javaTutorial from "@/assets/java-tutorial.png";
import bedrockTutorial from "@/assets/bedrock-tutorial.webp";
import consoleTutorial from "@/assets/console-tutorial.webp";

const HowToJoin = () => {
  const tutorials = [
    {
      title: "Java Edition",
      icon: "🟩",
      image: javaTutorial,
      steps: [
        'Apri Minecraft',
        'Vai su "Multigiocatore"',
        'Clicca su "Aggiungi Server"',
        'Inserisci come nome "Cristo.gg"',
        'Inserisci come indirizzo "cristo.gg"',
        'Clicca "Fatto" e connettiti!'
      ]
    },
    {
      title: "Bedrock Edition",
      icon: "⛏️",
      image: bedrockTutorial,
      steps: [
        'Apri Minecraft Bedrock con l\'ultima versione',
        'Vai su "Gioca" e poi "Server"',
        'Scorri in basso e clicca "Aggiungi server"',
        'Inserisci come nome "Cristo"',
        'Inserisci come indirizzo "bedrock.cristo.gg"',
        'Inserisci come porta "19132"',
        'Clicca "Salva" e connettiti!'
      ]
    },
    {
      title: "Console Edition",
      icon: "🎮",
      image: consoleTutorial,
      steps: [
        'Andate nella schermata "Amici"',
        'Cliccate il pulsante "Cerca giocatori" o "Search players"',
        'Sulla barra di ricerca scrivete "botCristoGG"',
        'Aggiungetelo agli amici',
        'Il BOT accetterà la richiesta entro 30 secondi',
        'Vi inviterà automaticamente a giocare sul server!'
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Come <span className="bg-gradient-primary bg-clip-text text-transparent">Entrare</span> su Cristo.gg
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-poppins">
          Scopri come entrare su Cristo.gg da Java, Bedrock e Console con i tutorial qui sotto!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tutorials.map((tutorial, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{tutorial.icon}</span>
                  <h3 className="text-2xl font-russo bg-gradient-primary bg-clip-text text-transparent">
                    {tutorial.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {tutorial.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold font-poppins">
                        {stepIndex + 1}
                      </span>
                      <p className="text-sm text-foreground/80 font-poppins">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
