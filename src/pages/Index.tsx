import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServerInfo from "@/components/ServerInfo";
import GameModes from "@/components/GameModes";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ServerInfo />
      <GameModes />
      <Community />
      <Footer />
    </div>
  );
};

export default Index;
