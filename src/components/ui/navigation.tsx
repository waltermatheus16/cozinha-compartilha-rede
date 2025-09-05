import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => window.location.href = "/"}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Logo size="sm" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">COMSEA</span>
              <span className="text-xs text-muted-foreground">Cozinhas Solidárias</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Início
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Cozinhas
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Início
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Cozinhas
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Contato
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};