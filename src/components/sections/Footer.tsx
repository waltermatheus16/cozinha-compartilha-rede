import { Heart, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-foreground">Cozinhas Solidárias</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto sm:mx-0 text-sm lg:text-base">
              Uma rede de cozinhas solidárias que transforma vidas através da alimentação, 
              criando vínculos de solidariedade e fortalecendo comunidades em toda a cidade.
            </p>

            <div className="flex justify-center sm:justify-start space-x-3 lg:space-x-4">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground w-8 h-8 lg:w-10 lg:h-10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground w-8 h-8 lg:w-10 lg:h-10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground w-8 h-8 lg:w-10 lg:h-10">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-3 lg:mb-4 text-sm lg:text-base">Links Rápidos</h4>
            <ul className="space-y-2 lg:space-y-3 text-muted-foreground text-sm lg:text-base">
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
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-foreground mb-3 lg:mb-4 text-sm lg:text-base">Contato</h4>
            <ul className="space-y-2 lg:space-y-3 text-muted-foreground text-sm lg:text-base">
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="break-all">contato@cozinhassolidarias.org</span>
              </li>
            </ul>

            <div className="mt-4 lg:mt-6">
              <h5 className="font-medium text-foreground mb-2 text-sm lg:text-base">Central de Emergência</h5>
              <p className="text-xs lg:text-sm text-muted-foreground mb-2">
                Para situações urgentes de insegurança alimentar
              </p>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs lg:text-sm">
                (11) 0000-0000
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6 lg:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs lg:text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Cozinhas Solidárias. Todos os direitos reservados.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs lg:text-sm text-muted-foreground">
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