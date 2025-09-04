import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, ChefHat } from "lucide-react";

export const KitchensPreview = () => {
  const featuredKitchens = [
    {
      id: 1,
      name: "Cozinha Esperança",
      location: "Centro - São Paulo",
      volunteers: 15,
      dailyMeals: 80,
      status: "Ativa",
      description: "Primeira cozinha da rede, atendendo a população em situação de rua no centro da cidade.",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Cozinha Solidária Norte",
      location: "Zona Norte - SP",
      volunteers: 12,
      dailyMeals: 60,
      status: "Ativa", 
      description: "Focada no atendimento a famílias em vulnerabilidade social da região.",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Cozinha Comunitária Sul",
      location: "Zona Sul - SP",
      volunteers: 18,
      dailyMeals: 100,
      status: "Ativa",
      description: "Maior cozinha da rede, atendendo múltiplas comunidades da região sul.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="outline" className="mb-3 lg:mb-4 px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm border-primary text-primary">
            Nossa Rede
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 lg:mb-6 px-2">
            Conheça Nossas 
            <span className="text-primary"> Cozinhas</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Cada cozinha tem sua própria identidade e história, mas todas compartilham 
            o mesmo propósito: alimentar com amor e dignidade.
          </p>
        </div>

        {/* Featured Kitchens Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredKitchens.map((kitchen) => (
            <Card key={kitchen.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-border/50">
              {/* Kitchen Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-gradient opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-primary/40" />
                </div>
                <Badge className="absolute top-4 right-4 bg-primary">
                  {kitchen.status}
                </Badge>
              </div>

              {/* Kitchen Info */}
              <div className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {kitchen.name}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{kitchen.location}</span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                  {kitchen.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{kitchen.volunteers}</div>
                      <div className="text-xs text-muted-foreground truncate">Voluntários</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{kitchen.dailyMeals}</div>
                      <div className="text-xs text-muted-foreground truncate">Refeições/dia</div>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all text-sm lg:text-base"
                  onClick={() => window.location.href = `/cozinha/${kitchen.id}`}
                >
                  Ver Perfil
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center px-4">
          <p className="text-base lg:text-lg text-muted-foreground mb-6">
            Quer conhecer todas as nossas cozinhas e acompanhar suas atividades?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <Button size="lg" className="px-6 lg:px-8 text-sm lg:text-base">
              Ver Todas as Cozinhas
            </Button>
            <Button size="lg" variant="outline" className="px-6 lg:px-8 text-sm lg:text-base">
              Como Participar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};