import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, ChefHat } from "lucide-react";

export const KitchensPreview = () => {
  const allKitchens = [
    { id: 1, name: "APAE", volunteers: 12, dailyMeals: 45 },
    { id: 2, name: "Associação de Moradores Caixa D' do Wilson", volunteers: 8, dailyMeals: 35 },
    { id: 3, name: "Centro Beneficente Maria Abgahair", volunteers: 15, dailyMeals: 60 },
    { id: 4, name: "Cidade de Meninos", volunteers: 20, dailyMeals: 80 },
    { id: 5, name: "Cozinha Prato Cheio (Becão)", volunteers: 10, dailyMeals: 50 },
    { id: 6, name: "Cozinha Vila Nova", volunteers: 14, dailyMeals: 55 },
    { id: 7, name: "Cozinha da Ironda Simon Bolivar", volunteers: 9, dailyMeals: 40 },
    { id: 8, name: "Cozinha Pai Marcos", volunteers: 11, dailyMeals: 48 },
    { id: 9, name: "Conferência São Vicente de Paula", volunteers: 13, dailyMeals: 52 },
    { id: 10, name: "Clube de Mães Nossa Senhora", volunteers: 7, dailyMeals: 30 },
    { id: 11, name: "Creche Santa Elvira", volunteers: 16, dailyMeals: 65 },
    { id: 12, name: "Creche Pai Sete", volunteers: 18, dailyMeals: 70 },
    { id: 13, name: "CURA (Centro Umbandista de Rituais Afros)", volunteers: 6, dailyMeals: 25 },
    { id: 14, name: "Movimento de Meninos", volunteers: 22, dailyMeals: 85 },
    { id: 15, name: "Lar de Meninas", volunteers: 19, dailyMeals: 75 },
    { id: 16, name: "Projeto Rosas de Ouro", volunteers: 5, dailyMeals: 20 },
    { id: 17, name: "Projeto Tche", volunteers: 8, dailyMeals: 35 },
    { id: 18, name: "Projeto Alegria e Canção", volunteers: 12, dailyMeals: 45 },
    { id: 19, name: "SIAN", volunteers: 10, dailyMeals: 42 },
    { id: 20, name: "Cozinha Comunitária Centro", volunteers: 14, dailyMeals: 58 },
    { id: 21, name: "Cozinha Solidária Norte", volunteers: 9, dailyMeals: 38 },
    { id: 22, name: "Cozinha Esperança Sul", volunteers: 17, dailyMeals: 68 }
  ];

  return (
    <section id="cozinhas" className="py-12 lg:py-20 bg-background">
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

        {/* All Kitchens Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4 mb-12">
          {allKitchens.map((kitchen) => (
            <Card 
              key={kitchen.id} 
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 overflow-hidden"
            >
              {/* Kitchen Info */}
              <div className="p-3 lg:p-4 flex flex-col h-full">
                <div className="text-center flex-grow">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                    <ChefHat className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xs lg:text-sm font-semibold text-foreground mb-1 lg:mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[2.5rem] flex items-center justify-center">
                    {kitchen.name}
                  </h3>
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    Santana do Livramento, RS
                  </div>

                  {/* Kitchen Stats */}
                  <div className="space-y-1 lg:space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-accent" />
                        <span className="text-muted-foreground">Vol.</span>
                      </div>
                      <span className="font-semibold">{kitchen.volunteers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-secondary" />
                        <span className="text-muted-foreground">Ref.</span>
                      </div>
                      <span className="font-semibold">{kitchen.dailyMeals}</span>
                    </div>
                  </div>
                </div>

                {/* Ver Perfil Button - Always at bottom */}
                <div className="mt-auto pt-2 lg:pt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs py-1 h-7 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    onClick={() => window.location.href = `/cozinha/${kitchen.id}`}
                  >
                    Ver Perfil
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="text-center px-4">
          <p className="text-base lg:text-lg text-muted-foreground">
            Conheça as 22 cozinhas solidárias que fazem parte da nossa rede em Santana do Livramento
          </p>
        </div>
      </div>
    </section>
  );
};