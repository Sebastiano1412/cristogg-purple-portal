import { Menu, X, Home, MessageSquare, ShoppingBag, Map, Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home, external: false },
    { name: "Forum", href: "https://forum.cristo.gg", icon: MessageSquare, external: true },
    { name: "Store", href: "https://store.cristo.gg", icon: ShoppingBag, external: true },
    { name: "Mappa", href: "https://mappa.cristo.gg", icon: Map, external: true },
    { name: "Coral CUP", href: "#", icon: Trophy, external: false },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          {/* Logo - posizionato a sinistra solo su mobile */}
          <div className="absolute left-0 md:hidden">
            <a href="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cristo.gg
            </a>
          </div>

          {/* Desktop Navigation - Centrato */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute right-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 py-3 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
