import { Logo } from "@/components/ui/logo";
import logoImage from "@/assets/logo-comsea.JPG";

export const LogoShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Título da seção */}
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Conselho Municipal de
            <span className="block text-primary"> Segurança Alimentar</span>
          </h2>
          
          {/* Subtítulo */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Santana do Livramento - RS
          </p>
          
          {/* Logo grande centralizado */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Efeito de sombra/glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110"></div>
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                  <img 
                    src={logoImage} 
                    alt="COMSEA Logo" 
                    className="w-full h-full object-contain rounded-full drop-shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Texto descritivo */}
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Uma rede de cozinhas solidárias que transforma vidas através da alimentação digna 
              e do fortalecimento comunitário, promovendo segurança alimentar em todo o território.
            </p>
          </div>
          
          {/* Elementos decorativos */}
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
