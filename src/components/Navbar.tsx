import { Menu, X, Home, MessageSquare, ShoppingBag, Map } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home, external: false },
    { name: "Forum", href: "https://forum.cristo.gg", icon: MessageSquare, external: true },
    { name: "Store", href: "https://store.cristo.gg", icon: ShoppingBag, external: true },
    { name: "Mappa", href: "https://mappa.cristo.gg", icon: Map, external: true },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full shadow-glow px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo a sinistra */}
          <a href="/" className="flex items-center gap-3 group">
            <img src={logoImage} alt="Cristo.gg Logo" className="h-9 w-9 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:block text-lg font-russo tracking-wider bg-gradient-primary bg-clip-text text-transparent">
              CRISTO.GG
            </span>
          </a>

          {/* Desktop Navigation - Centrato */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-foreground hover:bg-primary/30 transition-all duration-200 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-primary/30"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 mt-4 border-t border-primary/30 animate-fade-in">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 py-3 px-2 text-foreground hover:bg-primary/20 rounded-lg transition-colors"
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
