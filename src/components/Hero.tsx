import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Cristo.gg
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-8">
          Unisciti alla nostra community e vivi un'esperienza unica su Minecraft!
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
        >
          Entra Ora
        </Button>
      </div>
    </section>
  );
};

export default Hero;
