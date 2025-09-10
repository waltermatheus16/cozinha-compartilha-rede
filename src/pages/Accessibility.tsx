import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Volume2, MousePointer, Keyboard, Users, Monitor, Settings, Mail, Heart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Accessibility = () => {
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
                Acessibilidade
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Inclusão e 
                <span className="text-primary"> Acessibilidade</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nosso compromisso em tornar a plataforma acessível para todas as pessoas, 
                promovendo inclusão digital e acesso equitativo à informação.
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
              <h3 className="font-semibold text-foreground mb-2">Visibilidade</h3>
              <p className="text-sm text-muted-foreground">Contraste adequado e design responsivo</p>
            </Card>
            
            <Card className="p-6 text-center bg-accent/5 border-accent/20">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Keyboard className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Navegação</h3>
              <p className="text-sm text-muted-foreground">Navegação por teclado e leitores de tela</p>
            </Card>
            
            <Card className="p-6 text-center bg-secondary/5 border-secondary/20">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Inclusão</h3>
              <p className="text-sm text-muted-foreground">Acessível para todas as pessoas</p>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Nosso Compromisso
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O Cozinha Compartilha Rede está comprometido em tornar nossa 
                    plataforma acessível para todas as pessoas, independentemente 
                    de suas habilidades ou tecnologias assistivas utilizadas. 
                    Acreditamos que a informação sobre segurança alimentar e 
                    solidariedade deve estar disponível para todos.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Recursos de Acessibilidade Implementados
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Keyboard className="w-5 h-5 text-primary" />
                        Navegação por Teclado
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Navegação completa usando apenas o teclado</li>
                        <li>• Indicadores visuais de foco</li>
                        <li>• Atalhos de teclado para funcionalidades principais</li>
                        <li>• Ordem lógica de tabulação</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-accent" />
                        Leitores de Tela
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Estrutura semântica adequada</li>
                        <li>• Textos alternativos para imagens</li>
                        <li>• Rótulos descritivos para formulários</li>
                        <li>• Anúncios de mudanças de estado</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-secondary/5 border-secondary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-secondary" />
                        Contraste e Visibilidade
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Contraste de cores adequado (WCAG AA)</li>
                        <li>• Textos redimensionáveis</li>
                        <li>• Indicadores visuais claros</li>
                        <li>• Design responsivo para diferentes telas</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MousePointer className="w-5 h-5 text-primary" />
                        Interação e Usabilidade
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Botões e links com tamanho adequado</li>
                        <li>• Áreas clicáveis amplas</li>
                        <li>• Feedback visual e textual</li>
                        <li>• Prevenção de erros com validação</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Keyboard className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Atalhos de Teclado
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Navegação Geral
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Próximo elemento</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Tab</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Elemento anterior</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Shift + Tab</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ativar link/botão</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Enter</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Fechar modal/menu</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Escape</kbd>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Navegação por Páginas
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ir para Home</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Alt + H</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ir para Cozinhas</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Alt + C</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ir para Login</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Alt + L</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ir para Admin</span>
                          <kbd className="bg-background px-2 py-1 rounded border text-sm">Alt + A</kbd>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Tecnologias Assistivas Suportadas
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Leitores de Tela
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• NVDA (Windows)</li>
                        <li>• JAWS (Windows)</li>
                        <li>• VoiceOver (macOS/iOS)</li>
                        <li>• TalkBack (Android)</li>
                        <li>• Orca (Linux)</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Outras Tecnologias
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Ampliadores de tela</li>
                        <li>• Software de reconhecimento de voz</li>
                        <li>• Dispositivos de entrada alternativos</li>
                        <li>• Navegadores com extensões de acessibilidade</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Padrões e Diretrizes
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nossa plataforma segue as diretrizes de acessibilidade estabelecidas por:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• WCAG 2.1 (Web Content Accessibility Guidelines) - Nível AA</li>
                    <li>• Lei Brasileira de Inclusão (LBI - Lei 13.146/2015)</li>
                    <li>• Decreto 9.296/2018 sobre acessibilidade na web</li>
                    <li>• Padrões do W3C (World Wide Web Consortium)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Melhorias Contínuas
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Estamos constantemente trabalhando para melhorar a acessibilidade 
                    de nossa plataforma. Realizamos testes regulares com usuários 
                    de tecnologias assistivas e implementamos melhorias baseadas 
                    em feedback e nas melhores práticas de acessibilidade.
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
                    Relatório de Problemas
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Se você encontrar alguma barreira de acessibilidade em nossa 
                    plataforma, por favor, entre em contato conosco. Valorizamos 
                    seu feedback e trabalharemos para resolver qualquer problema 
                    identificado.
                  </p>
                  <Card className="p-6 bg-primary/5 border-primary/20">
                    <p className="text-foreground">
                      <strong>Contato para questões de acessibilidade:</strong><br />
                      E-mail: <strong>comsea@admin.com</strong><br />
                      Assunto: "Questão de Acessibilidade"
                    </p>
                  </Card>
                </div>
              </div>
            </section>

            <section className="py-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Recursos Adicionais
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Configurações do Navegador
                      </h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• Aumentar o zoom da página (Ctrl/Cmd + +)</li>
                        <li>• Alterar tamanho da fonte</li>
                        <li>• Ativar alto contraste</li>
                        <li>• Desabilitar animações</li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-secondary/5 border-secondary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Dicas de Navegação
                      </h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• Use o botão "Voltar" para navegação</li>
                        <li>• Explore o menu de navegação principal</li>
                        <li>• Utilize a busca quando disponível</li>
                        <li>• Verifique os links de atalho</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8">
              <Card className="p-8 bg-primary/5 border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Compromisso de Acessibilidade
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      A acessibilidade é uma prioridade fundamental para o Cozinha 
                      Compartilha Rede. Estamos comprometidos em garantir que nossa 
                      plataforma seja utilizável por todas as pessoas, promovendo 
                      a inclusão digital e o acesso equitativo à informação sobre 
                      segurança alimentar e solidariedade comunitária.
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;