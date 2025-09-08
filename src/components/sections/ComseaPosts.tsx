import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Heart, MessageCircle, Info, AlertTriangle } from "lucide-react";
import { getPostsByKitchen } from "@/lib/api";

const ComseaPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const postsPerPage = 2;

  useEffect(() => {
    const loadComseaPosts = async () => {
      try {
        setLoading(true);
        const postsData = await getPostsByKitchen(0); // ID 0 = COMSEA
        setPosts(postsData);
      } catch (err) {
        console.error('Erro ao carregar posts do COMSEA:', err);
      } finally {
        setLoading(false);
      }
    };

    loadComseaPosts();
  }, []);

  // Auto-play do carrossel
  useEffect(() => {
    if (posts.length === 0 || isAutoPlayPaused) return;

    const totalPages = Math.ceil(posts.length / postsPerPage);
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [posts.length, postsPerPage, isAutoPlayPaused]);

  const nextPage = () => {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setIsAutoPlayPaused(true);
  };

  const prevPage = () => {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlayPaused(true);
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'need':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getPostBadgeColor = (type: string) => {
    switch (type) {
      case 'location':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'need':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'info':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'location':
        return 'Localização';
      case 'need':
        return 'Necessidade';
      case 'info':
        return 'Informação';
      default:
        return 'Post';
    }
  };

  if (loading) {
    return (
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[500px] bg-muted rounded-lg"></div>
                <div className="h-[500px] bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3 lg:mb-4 px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm">
              Notícias & Informações
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 lg:mb-6 px-2">
              Posts do 
              <span className="text-primary"> COMSEA</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-8">
              Acompanhe as últimas notícias, campanhas e informações do Conselho Municipal de Segurança Alimentar
            </p>
            <Card className="p-8 bg-background/50 border-border">
              <p className="text-muted-foreground">Nenhum post disponível no momento.</p>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-3 lg:mb-4 px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm">
            Notícias & Informações
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 lg:mb-6 px-2">
            Posts do 
            <span className="text-primary"> COMSEA</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Acompanhe as últimas notícias, campanhas e informações do Conselho Municipal de Segurança Alimentar
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          {/* Grid de Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentPosts.map((post, index) => (
              <Card key={post.id} className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-background via-background/95 to-muted/10 relative h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
                <div className="relative z-10 p-3 lg:p-4 h-full flex flex-col">
                  {/* Header do Post */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Badge className={`${getPostBadgeColor(post.type)} flex items-center space-x-2 px-3 py-1.5 text-sm font-medium`}>
                        {getPostIcon(post.type)}
                        <span>{getPostTypeLabel(post.type)}</span>
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
                        <span>{new Date(post.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        <Heart className="w-4 h-4" />
                        <span className="font-medium">{post.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">{post.comments_count || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo do Post */}
                  <div className="mb-3 flex-1 overflow-hidden">
                    <div className="prose prose-lg max-w-none h-full">
                      <div className={`text-foreground text-sm lg:text-base leading-relaxed whitespace-pre-wrap font-medium space-y-1 ${post.image_url ? 'max-h-48 overflow-y-auto' : 'h-full overflow-y-auto'}`}>
                        {post.content.split('\n').map((line, lineIndex) => {
                          // Detectar linhas que começam com emoji e texto
                          const emojiMatch = line.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)/u);
                          if (emojiMatch) {
                            const emoji = emojiMatch[0];
                            const text = line.slice(emoji.length).trim();
                            return (
                              <div key={lineIndex} className="flex items-start space-x-2 py-0.5">
                                <span className="text-xl flex-shrink-0 mt-0.5">{emoji}</span>
                                <span className="flex-1">{text}</span>
                              </div>
                            );
                          }
                          // Detectar linhas que começam com bullet points
                          if (line.trim().startsWith('•')) {
                            return (
                              <div key={lineIndex} className="flex items-start space-x-2 py-0.5 ml-3">
                                <span className="text-primary font-bold mt-0.5">•</span>
                                <span className="flex-1">{line.trim().slice(1).trim()}</span>
                              </div>
                            );
                          }
                          // Linhas normais
                          return line.trim() ? (
                            <div key={lineIndex} className="py-0.5">
                              {line}
                            </div>
                          ) : (
                            <div key={lineIndex} className="h-1"></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Imagem do Post (se houver) */}
                  {post.image_url && (
                    <div className="mb-4 h-48">
                      <div className="relative overflow-hidden rounded-lg shadow-md h-full">
                        <img
                          src={post.image_url}
                          alt="Imagem do post"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  )}

                  {/* Footer do Post */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-border/50 gap-2 mt-auto">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">C</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Postado por </span>
                        <span className="font-semibold text-foreground">{post.kitchen_name}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                      <span>Post {startIndex + index + 1}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navegação do Carrossel */}
          {totalPages > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-background/95 backdrop-blur-sm shadow-xl hover:bg-primary/5 hover:border-primary/30 border-border/50 transition-all duration-200 hover:scale-105 z-20"
                onClick={prevPage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-background/95 backdrop-blur-sm shadow-xl hover:bg-primary/5 hover:border-primary/30 border-border/50 transition-all duration-200 hover:scale-105 z-20"
                onClick={nextPage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Indicadores */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-300 ${
                    index === currentPage 
                      ? 'w-8 h-3 bg-primary rounded-full shadow-lg' 
                      : 'w-3 h-3 bg-muted rounded-full hover:bg-primary/50 hover:scale-110'
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Botão para ver todos os posts */}
        <div className="text-center mt-6 lg:mt-8">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/cozinha/0'}
            className="px-8 py-3 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            Ver todos os posts do COMSEA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComseaPosts;
