import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowToJoin from "@/components/HowToJoin";
import GameModes from "@/components/GameModes";
import DiscordCTA from "@/components/DiscordCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowToJoin />
      <GameModes />
      <DiscordCTA />
      <Footer />
    </div>
  );
};

export default Index;
