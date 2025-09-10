import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, AlertCircle, Mail, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivacyPolicy = () => {
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
                }, 90);
              }}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Política de Privacidade
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Transparência e 
                <span className="text-primary"> Proteção</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sua privacidade é fundamental para nós. Conheça como coletamos, 
                usamos e protegemos suas informações pessoais.
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
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparência</h3>
              <p className="text-sm text-muted-foreground">Informações claras sobre coleta e uso de dados</p>
            </Card>
            
            <Card className="p-6 text-center bg-accent/5 border-accent/20">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Segurança</h3>
              <p className="text-sm text-muted-foreground">Proteção robusta dos seus dados pessoais</p>
            </Card>
            
            <Card className="p-6 text-center bg-secondary/5 border-secondary/20">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Controle</h3>
              <p className="text-sm text-muted-foreground">Você tem controle total sobre suas informações</p>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    1. Informações Gerais
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Esta Política de Privacidade descreve como o <strong>Cozinha Compartilha Rede</strong> 
                    ("nós", "nosso" ou "aplicativo") coleta, usa e protege suas informações 
                    pessoais quando você utiliza nossa plataforma de conexão entre cozinhas solidárias.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    2. Informações que Coletamos
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Informações Pessoais
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Nome completo</li>
                        <li>• Endereço de e-mail</li>
                        <li>• Número de telefone</li>
                        <li>• Informações da cozinha</li>
                        <li>• Fotos e imagens compartilhadas</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-accent" />
                        Informações de Uso
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Dados de navegação</li>
                        <li>• Interações com posts</li>
                        <li>• Horários de acesso</li>
                        <li>• Informações do dispositivo</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    3. Como Usamos suas Informações
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Fornecer e melhorar nossos serviços</li>
                      <li>• Facilitar comunicação entre cozinhas</li>
                      <li>• Gerenciar contas e autenticação</li>
                    </ul>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Enviar notificações importantes</li>
                      <li>• Analisar uso para melhorias</li>
                      <li>• Cumprir obrigações legais</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    4. Compartilhamento de Informações
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <strong>Não vendemos, alugamos ou compartilhamos</strong> suas informações pessoais 
                    com terceiros, exceto nas seguintes situações:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Com seu consentimento explícito</li>
                    <li>• Para cumprir obrigações legais</li>
                    <li>• Para proteger direitos e segurança</li>
                    <li>• Com prestadores de serviços (sob acordos de confidencialidade)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    5. Segurança dos Dados
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Implementamos medidas de segurança técnicas e organizacionais 
                    apropriadas para proteger suas informações contra acesso não autorizado, 
                    alteração, divulgação ou destruição. Isso inclui criptografia, 
                    controles de acesso e monitoramento regular de segurança.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    6. Seus Direitos
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Você tem os seguintes direitos em relação às suas informações pessoais:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Acessar suas informações pessoais</li>
                      <li>• Corrigir informações incorretas</li>
                      <li>• Solicitar a exclusão de suas informações</li>
                    </ul>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Retirar seu consentimento</li>
                      <li>• Portabilidade de dados</li>
                      <li>• Opor-se ao processamento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    7. Retenção de Dados
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Mantemos suas informações pessoais apenas pelo tempo necessário 
                    para cumprir os propósitos descritos nesta política, a menos que 
                    um período de retenção mais longo seja exigido ou permitido por lei.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    8. Alterações nesta Política
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Podemos atualizar esta Política de Privacidade periodicamente. 
                    Notificaremos você sobre mudanças significativas através do 
                    aplicativo ou por e-mail. Recomendamos que revise esta política 
                    regularmente.
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
                    9. Contato
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou 
                    sobre como tratamos suas informações pessoais, entre em contato 
                    conosco através do formulário de contato disponível no aplicativo 
                    ou pelo e-mail: <strong>comsea@admin.com</strong>
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

export default PrivacyPolicy;