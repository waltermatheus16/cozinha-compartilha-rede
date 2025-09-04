import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Target, Users2 } from "lucide-react";
import networkImage from "@/assets/network-kitchens.jpg";

export const AboutSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-3 lg:mb-4 px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm">
            Nossa Missão
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 lg:mb-6 px-2">
            Transformando Vidas Através da 
            <span className="text-primary"> Alimentação</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            As Cozinhas Solidárias nasceram da necessidade de criar uma rede de apoio 
            que vai além da alimentação, promovendo dignidade, comunidade e esperança.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img 
              src={networkImage} 
              alt="Rede de Cozinhas Solidárias" 
              className="rounded-2xl shadow-2xl w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>

          {/* Content */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 lg:mb-4 text-center lg:text-left">
                Uma Rede de Cuidado
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 lg:mb-6 text-center lg:text-left px-2 lg:px-0">
                Cada cozinha é um ponto de encontro, um espaço de acolhimento onde 
                pessoas se conectam, compartilham histórias e constroem juntas um 
                futuro mais digno e solidário.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm lg:text-base">Solidariedade</h4>
                  <p className="text-muted-foreground text-sm lg:text-base">
                    Cultivamos o cuidado mútuo e a responsabilidade coletiva em cada ação.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 lg:w-5 lg:h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm lg:text-base">Impacto Social</h4>
                  <p className="text-muted-foreground text-sm lg:text-base">
                    Focamos em transformações reais e duradouras nas comunidades.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users2 className="w-4 h-4 lg:w-5 lg:h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm lg:text-base">Comunidade</h4>
                  <p className="text-muted-foreground text-sm lg:text-base">
                    Fortalecemos vínculos locais e promovemos o protagonismo comunitário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <Card className="p-4 lg:p-6 text-center bg-primary/5 border-primary/20">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1 lg:mb-2">22</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Cozinhas em Operação</div>
          </Card>
          
          <Card className="p-4 lg:p-6 text-center bg-accent/5 border-accent/20">
            <div className="text-2xl lg:text-3xl font-bold text-accent mb-1 lg:mb-2">500+</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Refeições Diárias</div>
          </Card>
          
          <Card className="p-4 lg:p-6 text-center bg-secondary/5 border-secondary/20">
            <div className="text-2xl lg:text-3xl font-bold text-secondary mb-1 lg:mb-2">200+</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Voluntários Ativos</div>
          </Card>
          
          <Card className="p-4 lg:p-6 text-center bg-hope-green/5 border-hope-green/20">
            <div className="text-2xl lg:text-3xl font-bold text-hope-green mb-1 lg:mb-2">50k+</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Pessoas Impactadas</div>
          </Card>
        </div>
      </div>
    </section>
  );
};