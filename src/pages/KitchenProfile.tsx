import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { MapPin, Users, Clock, Heart, MessageCircle, Share2, Camera, Send, AlertCircle, Gift, Loader2, Trash2, Edit3, LogIn } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getKitchenById, getPostsByKitchen, createPost, deletePost } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const KitchenProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<"info" | "need" | "location">("info");
  const [kitchen, setKitchen] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obter ID da cozinha da URL
  const kitchenId = parseInt(window.location.pathname.split('/')[2]);
  
  // Verificar se o usuário pode gerenciar esta cozinha
  const canManageKitchen = isAuthenticated && user?.kitchen_id === kitchenId;

  // Carregar dados da cozinha e posts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [kitchenData, postsData] = await Promise.all([
          getKitchenById(kitchenId),
          getPostsByKitchen(kitchenId)
        ]);
        
        if (!kitchenData) {
          setError('Cozinha não encontrada');
          return;
        }
        
        setKitchen(kitchenData);
        setPosts(postsData);
      } catch (err) {
        setError('Erro ao carregar dados da cozinha');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [kitchenId]);

  const handleCreatePost = async () => {
    if (!newPost.trim() || !kitchen || !isAuthenticated) return;
    
    try {
      const newPostData = await createPost(kitchen.id, postType, newPost);
      setPosts([newPostData, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error('Erro ao criar post:', err);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!isAuthenticated) return;
    
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Erro ao deletar post:', err);
    }
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case "location": return <MapPin className="w-4 h-4 text-black" />;
      case "need": return <AlertCircle className="w-4 h-4 text-secondary" />;
      default: return <Heart className="w-4 h-4 text-primary" />;
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case "location": return "Local de Distribuição";
      case "need": return "Necessidade";
      default: return "Informação";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Carregando dados da cozinha...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !kitchen) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-red-500">{error || 'Cozinha não encontrada'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header da Cozinha */}
        <div className="bg-hero-gradient relative">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar da Cozinha */}
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                {kitchen.avatar_url ? (
                  <AvatarImage src={kitchen.avatar_url} alt={`Foto da ${kitchen.name}`} />
                ) : (
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {kitchen.name ? kitchen.name.charAt(0).toUpperCase() : 'C'}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Informações da Cozinha */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{kitchen.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <span className="text-lg text-gray-800">{kitchen.location}</span>
                </div>
                <p className="text-gray-700 mb-4 max-w-2xl">{kitchen.description}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{kitchen.volunteers}</div>
                    <div className="text-sm text-gray-700">Voluntários</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{kitchen.daily_meals}</div>
                    <div className="text-sm text-gray-700">Refeições/dia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{kitchen.total_meals?.toLocaleString()}</div>
                    <div className="text-sm text-gray-700">Total servido</div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col space-y-3">
                <Button variant="default" size="lg">
                  Contato
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feed de Posts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Criar Post - Só visível para a própria cozinha */}
              {canManageKitchen ? (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Criar nova publicação</h3>
                
                {/* Tipo de Post */}
                <div className="flex space-x-2 mb-4">
                  <Button 
                    variant={postType === "info" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPostType("info")}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    Informação
                  </Button>
                  <Button 
                    variant={postType === "location" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPostType("location")}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Local
                  </Button>
                  <Button 
                    variant={postType === "need" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setPostType("need")}
                  >
                    <Gift className="w-4 h-4 mr-1" />
                    Necessidade
                  </Button>
                </div>

                <Textarea 
                  placeholder={
                    postType === "location" ? "Onde será a próxima distribuição? Horário e local..." :
                    postType === "need" ? "Do que vocês estão precisando? Ingredientes, utensílios..." :
                    "Compartilhe novidades, histórias ou informações importantes..."
                  }
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4"
                  rows={4}
                />

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Adicionar Foto
                  </Button>
                  <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Publicar
                  </Button>
                </div>
              </Card>
              ) : null}

              {/* Posts */}
              {posts.length === 0 ? (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">Nenhum post ainda. Seja o primeiro a compartilhar algo!</p>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                    {/* Header do Post */}
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {kitchen.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{kitchen.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {getPostIcon(post.type)}
                            <span className="ml-1">{getPostTypeLabel(post.type)}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {/* Conteúdo do Post */}
                    <p className="text-foreground mb-4 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    <Separator className="mb-4" />

                    {/* Ações do Post */}
                    {canManageKitchen && (
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground hover:text-blue-600"
                          onClick={() => {/* TODO: Implementar edição */}}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground hover:text-red-600"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informações de Contato */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Informações</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{kitchen.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{kitchen.volunteers} voluntários ativos</span>
                  </div>
                  {kitchen.contact_phone && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Contato: {kitchen.contact_phone}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Como Ajudar */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Como Ajudar</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Gift className="w-4 h-4 mr-2" />
                    Fazer Doação
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Ser Voluntário
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Divulgar
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenProfile;