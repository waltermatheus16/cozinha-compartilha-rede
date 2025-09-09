import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Users, Shield, AlertTriangle, CheckCircle, Mail, UserCheck, Scale, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TermsOfUse = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  window.scrollTo(0, document.body.scrollHeight);
                }, 70);
              }}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Termos de Uso
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Diretrizes e 
                <span className="text-primary"> Regras</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conheça as regras e diretrizes para uso da nossa plataforma, 
                garantindo uma experiência segura e respeitosa para todos.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center bg-primary/5 border-primary/20">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Aceitação</h3>
              <p className="text-sm text-muted-foreground">Ao usar a plataforma, você aceita estes termos</p>
            </Card>
            
            <Card className="p-6 text-center bg-accent/5 border-accent/20">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Responsabilidade</h3>
              <p className="text-sm text-muted-foreground">Seus direitos e deveres como usuário</p>
            </Card>
            
            <Card className="p-6 text-center bg-secondary/5 border-secondary/20">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Proteção</h3>
              <p className="text-sm text-muted-foreground">Limitações e proteções legais</p>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    1. Aceitação dos Termos
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Ao acessar e utilizar o <strong>Cozinha Compartilha Rede</strong>, você concorda em 
                    cumprir e estar vinculado a estes Termos de Uso. Se você não concordar 
                    com qualquer parte destes termos, não deve utilizar nossa plataforma.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    2. Descrição do Serviço
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O Cozinha Compartilha Rede é uma plataforma digital que conecta 
                    cozinhas solidárias, permitindo o compartilhamento de informações, 
                    recursos e experiências para promover a segurança alimentar e o 
                    fortalecimento comunitário.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    3. Elegibilidade
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Para utilizar nossa plataforma, você deve:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Ter pelo menos 18 anos de idade</li>
                    <li>• Representar uma cozinha solidária ou organização comunitária</li>
                    <li>• Fornecer informações verdadeiras e precisas</li>
                    <li>• Ter capacidade legal para celebrar contratos</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    4. Conta de Usuário
                  </h2>
                  
                  <div className="space-y-6">
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        4.1 Criação de Conta
                      </h3>
                      <p className="text-muted-foreground">
                        Para acessar certas funcionalidades, você deve criar uma conta 
                        fornecendo informações precisas e atualizadas.
                      </p>
                    </Card>

                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        4.2 Responsabilidade pela Conta
                      </h3>
                      <p className="text-muted-foreground">
                        Você é responsável por manter a confidencialidade de suas 
                        credenciais de login e por todas as atividades que ocorrem 
                        em sua conta.
                      </p>
                    </Card>

                    <Card className="p-6 bg-secondary/5 border-secondary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        4.3 Suspensão de Conta
                      </h3>
                      <p className="text-muted-foreground">
                        Reservamo-nos o direito de suspender ou encerrar contas que 
                        violem estes termos ou que sejam usadas de forma inadequada.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    5. Uso Aceitável
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Condutas Permitidas
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Compartilhar informações relevantes sobre atividades</li>
                        <li>• Publicar fotos e conteúdo relacionado ao trabalho social</li>
                        <li>• Interagir respeitosamente com outros usuários</li>
                        <li>• Utilizar para fins educativos e informativos</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-accent" />
                        Condutas Proibidas
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Publicar conteúdo ofensivo ou inadequado</li>
                        <li>• Usar para atividades comerciais não autorizadas</li>
                        <li>• Violar direitos de propriedade intelectual</li>
                        <li>• Interferir no funcionamento da plataforma</li>
                        <li>• Fazer upload de malware ou código malicioso</li>
                        <li>• Falsificar informações ou identidade</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    6. Conteúdo do Usuário
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        6.1 Propriedade do Conteúdo
                      </h3>
                      <p className="text-muted-foreground">
                        Você mantém a propriedade do conteúdo que publica, mas nos 
                        concede uma licença não exclusiva para usar, exibir e distribuir 
                        esse conteúdo na plataforma.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        6.2 Responsabilidade pelo Conteúdo
                      </h3>
                      <p className="text-muted-foreground">
                        Você é responsável por todo o conteúdo que publica e garante 
                        que possui os direitos necessários para compartilhá-lo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    7. Propriedade Intelectual
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A plataforma e todo seu conteúdo, incluindo design, funcionalidades, 
                    textos, gráficos e software, são propriedade do Cozinha Compartilha 
                    Rede e estão protegidos por leis de propriedade intelectual.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    8. Limitação de Responsabilidade
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A plataforma é fornecida "como está". Não garantimos que o serviço 
                    será ininterrupto ou livre de erros. Nossa responsabilidade é 
                    limitada ao máximo permitido por lei.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    9. Modificações do Serviço
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Reservamo-nos o direito de modificar, suspender ou descontinuar 
                    qualquer parte do serviço a qualquer momento, com ou sem aviso prévio.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    10. Rescisão
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Você pode encerrar sua conta a qualquer momento. Podemos suspender 
                    ou encerrar sua conta se você violar estes termos.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gavel className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    11. Lei Aplicável
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Estes termos são regidos pelas leis brasileiras. Qualquer disputa 
                    será resolvida nos tribunais competentes do Brasil.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    12. Contato
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Para questões sobre estes Termos de Uso, entre em contato conosco 
                    através do formulário de contato disponível no aplicativo ou pelo 
                    e-mail: <strong>comsea@admin.com</strong>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;