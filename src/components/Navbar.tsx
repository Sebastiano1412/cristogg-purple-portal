import { Menu, X, Home, ShoppingBag, Map, FileText, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home, external: false },
    { name: "Regolamento", href: "/regolamento", icon: FileText, external: false },
    { name: "Guide", href: "/guide", icon: BookOpen, external: false },
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

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div className="fixed top-20 left-4 right-4 z-[60] md:hidden animate-fade-in">
            <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-3xl p-6 shadow-glow animate-scale-in">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="space-y-2 mt-8">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 py-4 px-4 text-foreground hover:bg-primary/30 rounded-2xl transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="font-medium text-lg">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
