import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", external: false },
    { name: "Forum", href: "https://forum.cristo.gg", external: true },
    { name: "Store", href: "https://store.cristo.gg", external: true },
    { name: "Mappa", href: "https://mappa.cristo.gg", external: true },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo a sinistra */}
          <a href="/" className="flex items-center gap-3 group">
            <img src={logoImage} alt="Cristo.gg Logo" className="h-10 w-10 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-russo tracking-wider bg-gradient-primary bg-clip-text text-transparent">
              CRISTO.GG
            </span>
          </a>

          {/* Desktop Navigation - Centrato */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="relative text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm uppercase tracking-wider after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block py-3 text-foreground hover:text-primary transition-colors font-medium uppercase tracking-wider text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
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
