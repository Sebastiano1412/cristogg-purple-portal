import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const Community = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-primary p-12 md:p-16 text-center shadow-glow">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Unisciti alla Community
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Entra nel nostro Discord per restare aggiornato, chattare con altri giocatori e partecipare agli eventi!
          </p>
          <Button
            size="lg"
            asChild
            className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6"
          >
            <a
              href="https://discord.gg/cristogg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Entra su Discord
            </a>
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default Community;
