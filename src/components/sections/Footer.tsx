import { Heart, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Cozinhas Solidárias</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Uma rede de cozinhas solidárias que transforma vidas através da alimentação, 
              criando vínculos de solidariedade e fortalecendo comunidades em toda a cidade.
            </p>

            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Nossas Cozinhas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Como Ajudar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Seja Voluntário
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Transparência
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">São Paulo, SP</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">contato@cozinhassolidarias.org</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-medium text-foreground mb-2">Central de Emergência</h5>
              <p className="text-sm text-muted-foreground">
                Para situações urgentes de insegurança alimentar
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                (11) 0000-0000
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Cozinhas Solidárias. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Acessibilidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};