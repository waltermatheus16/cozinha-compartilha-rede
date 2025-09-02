import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Cozinhas Solidárias</span>
          </div>

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

          {/* Login Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:flex"
              onClick={() => window.location.href = "/login"}
            >
              Entrar
            </Button>
            <Button className="hidden sm:flex">
              Cadastrar Cozinha
            </Button>
            
            {/* Mobile menu button */}
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
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = "/login"}
                >
                  Entrar
                </Button>
                <Button size="sm">
                  Cadastrar Cozinha
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};