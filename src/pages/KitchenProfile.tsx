import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MapPin, Users, Clock, Heart, MessageCircle, Share2, Camera, Send, AlertCircle, Gift } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const KitchenProfile = () => {
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<"info" | "need" | "location">("info");

  // Mock data - em produção viria do Supabase
  const kitchen = {
    id: 1,
    name: "Cozinha Esperança",
    location: "Centro - São Paulo",
    description: "Primeira cozinha da rede, atendendo a população em situação de rua no centro da cidade há mais de 3 anos.",
    volunteers: 15,
    dailyMeals: 80,
    totalMeals: 87600,
    followers: 1200,
    contact: "(11) 99999-9999"
  };

  const posts = [
    {
      id: 1,
      type: "location",
      content: "🍽️ Distribuição hoje às 18h na Praça da Sé! Vamos servir 100 marmitas com arroz, feijão, frango e salada. Quem puder aparecer para ajudar, será muito bem-vindo!",
      timestamp: "2 horas atrás",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      type: "need",
      content: "🙏 Estamos precisando de doações de: • Arroz (10kg) • Feijão (5kg) • Óleo de cozinha • Temperos • Legumes frescos. Qualquer ajuda é muito importante!",
      timestamp: "1 dia atrás",
      likes: 45,
      comments: 12
    },
    {
      id: 3,
      type: "info",
      content: "❤️ Que alegria! Hoje completamos 3 anos de atividade. Já foram mais de 87 mil refeições servidas com muito amor. Obrigado a todos os voluntários e apoiadores que tornaram isso possível!",
      timestamp: "3 dias atrás",
      likes: 78,
      comments: 23
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    // Em produção, aqui seria enviado para o Supabase
    console.log("Criando post:", { content: newPost, type: postType });
    setNewPost("");
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case "location": return <MapPin className="w-4 h-4 text-accent" />;
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
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  CE
                </AvatarFallback>
              </Avatar>

              {/* Informações da Cozinha */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{kitchen.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{kitchen.location}</span>
                </div>
                <p className="text-white/90 mb-4 max-w-2xl">{kitchen.description}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{kitchen.volunteers}</div>
                    <div className="text-sm text-white/80">Voluntários</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{kitchen.dailyMeals}</div>
                    <div className="text-sm text-white/80">Refeições/dia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{kitchen.totalMeals.toLocaleString()}</div>
                    <div className="text-sm text-white/80">Total servido</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{kitchen.followers}</div>
                    <div className="text-sm text-white/80">Seguidores</div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col space-y-3">
                <Button variant="secondary" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Seguir
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
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

              {/* Posts */}
              {posts.map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                  {/* Header do Post */}
                  <div className="flex items-start space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">CE</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{kitchen.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {getPostIcon(post.type)}
                          <span className="ml-1">{getPostTypeLabel(post.type)}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Conteúdo do Post */}
                  <p className="text-foreground mb-4 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  <Separator className="mb-4" />

                  {/* Ações do Post */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
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
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Seg-Sex: 17h-19h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{kitchen.volunteers} voluntários ativos</span>
                  </div>
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