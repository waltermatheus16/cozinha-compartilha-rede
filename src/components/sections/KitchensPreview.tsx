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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm border-primary text-primary">
            Nossa Rede
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conheça Nossas 
            <span className="text-primary"> Cozinhas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada cozinha tem sua própria identidade e história, mas todas compartilham 
            o mesmo propósito: alimentar com amor e dignidade.
          </p>
        </div>

        {/* Featured Kitchens Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {kitchen.name}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{kitchen.location}</span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {kitchen.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-accent" />
                    <div>
                      <div className="text-sm font-semibold">{kitchen.volunteers}</div>
                      <div className="text-xs text-muted-foreground">Voluntários</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <div>
                      <div className="text-sm font-semibold">{kitchen.dailyMeals}</div>
                      <div className="text-xs text-muted-foreground">Refeições/dia</div>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  onClick={() => window.location.href = `/cozinha/${kitchen.id}`}
                >
                  Ver Perfil
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Quer conhecer todas as nossas cozinhas e acompanhar suas atividades?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Ver Todas as Cozinhas
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Como Participar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};