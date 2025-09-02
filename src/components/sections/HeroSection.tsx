import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MapPin, Utensils } from "lucide-react";
import heroImage from "@/assets/hero-kitchen.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Alimentando
              <span className="block text-secondary"> Esperança</span>
              <span className="block text-accent"> Construindo Comunidade</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Uma rede de 22 cozinhas solidárias transformando vidas através da alimentação 
              e do cuidado comunitário.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Conhecer Cozinhas
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Nossa História
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">22</div>
                <div className="text-sm text-white/80">Cozinhas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-white/80">Refeições/Dia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50k+</div>
                <div className="text-sm text-white/80">Pessoas Atendidas</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/90 backdrop-blur-sm border-white/20 hover:bg-card-hover transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Alimentação Digna</h3>
                  <p className="text-muted-foreground">
                    Refeições nutritivas e saborosas preparadas com carinho por voluntários dedicados.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/90 backdrop-blur-sm border-white/20 hover:bg-card-hover transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fortalecimento Comunitário</h3>
                  <p className="text-muted-foreground">
                    Criando laços de solidariedade e pertencimento em cada bairro onde atuamos.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/90 backdrop-blur-sm border-white/20 hover:bg-card-hover transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rede Territorial</h3>
                  <p className="text-muted-foreground">
                    Presente em diferentes territórios, levando proximidade e cuidado a quem precisa.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};