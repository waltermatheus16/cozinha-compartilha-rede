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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 lg:mb-6">
              Alimentando
              <span className="block text-secondary"> Esperança</span>
              <span className="block text-accent"> Construindo Comunidade</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 lg:mb-8 leading-relaxed px-2 sm:px-0">
              Uma rede de 22 cozinhas solidárias transformando vidas através da alimentação 
              e do cuidado comunitário.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-8 lg:mb-12 px-2 sm:px-0">
              <Button size="lg" variant="secondary" className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4">
                Conhecer Cozinhas
              </Button>
              <Button size="lg" variant="outline" className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 border-white text-white hover:bg-white hover:text-primary">
                Nossa História
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-1 lg:mb-2">22</div>
                <div className="text-xs sm:text-sm text-white/80">Cozinhas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-1 lg:mb-2">500+</div>
                <div className="text-xs sm:text-sm text-white/80">Refeições/Dia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">50k+</div>
                <div className="text-xs sm:text-sm text-white/80">Pessoas Atendidas</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4 lg:space-y-6 mt-8 lg:mt-0">
            <Card className="p-4 lg:p-6 bg-card/90 backdrop-blur-sm border-white/20 hover:bg-card-hover transition-all duration-300">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">Alimentação Digna</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    Refeições nutritivas e saborosas preparadas com carinho por voluntários dedicados.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 lg:p-6 bg-card/90 backdrop-blur-sm border-white/20 hover:bg-card-hover transition-all duration-300">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">Fortalecimento Comunitário</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    Criando laços de solidariedade e pertencimento em cada bairro onde atuamos.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 lg:p-6 bg-card/90 backdrop-blur-sm border-white/20 hover:bg-card-hover transition-all duration-300">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">Rede Territorial</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">
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