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

  // Dados das cozinhas - em produção viria do Supabase
  const kitchensData = {
    1: {
      id: 1,
      name: "APAE",
      location: "Santana do Livramento, RS",
      description: "Associação de Pais e Amigos dos Excepcionais, promovendo inclusão e alimentação digna para pessoas com deficiência e suas famílias.",
      volunteers: 12,
      dailyMeals: 45,
      totalMeals: 32850,
      contact: "(55) 3242-1234"
    },
    2: {
      id: 2,
      name: "Associação de Moradores Caixa D' do Wilson",
      location: "Santana do Livramento, RS",
      description: "Organização comunitária que fortalece vínculos através da alimentação solidária, promovendo o desenvolvimento local.",
      volunteers: 8,
      dailyMeals: 35,
      totalMeals: 25550,
      contact: "(55) 3242-2345"
    },
    3: {
      id: 3,
      name: "Centro Beneficente Maria Abgahair",
      location: "Santana do Livramento, RS",
      description: "Centro de assistência social dedicado ao cuidado com famílias em situação de vulnerabilidade social.",
      volunteers: 15,
      dailyMeals: 60,
      totalMeals: 43800,
      contact: "(55) 3242-3456"
    },
    4: {
      id: 4,
      name: "Cidade de Meninos",
      location: "Santana do Livramento, RS",
      description: "Projeto social focado no desenvolvimento integral de crianças e adolescentes em situação de risco social.",
      volunteers: 20,
      dailyMeals: 80,
      totalMeals: 58400,
      contact: "(55) 3242-4567"
    },
    5: {
      id: 5,
      name: "Cozinha Prato Cheio (Becão)",
      location: "Santana do Livramento, RS",
      description: "Cozinha comunitária que oferece refeições nutritivas e acolhimento para famílias da comunidade local.",
      volunteers: 10,
      dailyMeals: 50,
      totalMeals: 36500,
      contact: "(55) 3242-5678"
    },
    6: {
      id: 6,
      name: "Cozinha Vila Nova",
      location: "Santana do Livramento, RS",
      description: "Iniciativa local que fortalece a comunidade através da solidariedade alimentar e do trabalho voluntário.",
      volunteers: 14,
      dailyMeals: 55,
      totalMeals: 40150,
      contact: "(55) 3242-6789"
    },
    7: {
      id: 7,
      name: "Cozinha da Ironda Simon Bolivar",
      location: "Santana do Livramento, RS",
      description: "Cozinha comunitária que atende famílias do bairro Simon Bolivar com refeições nutritivas e acolhimento.",
      volunteers: 9,
      dailyMeals: 40,
      totalMeals: 29200,
      contact: "(55) 3242-7890"
    },
    8: {
      id: 8,
      name: "Cozinha Pai Marcos",
      location: "Santana do Livramento, RS",
      description: "Iniciativa religiosa que combina espiritualidade e solidariedade através da alimentação comunitária.",
      volunteers: 11,
      dailyMeals: 48,
      totalMeals: 35040,
      contact: "(55) 3242-8901"
    },
    9: {
      id: 9,
      name: "Conferência São Vicente de Paula",
      location: "Santana do Livramento, RS",
      description: "Organização católica dedicada ao atendimento de famílias em situação de vulnerabilidade social.",
      volunteers: 13,
      dailyMeals: 52,
      totalMeals: 37960,
      contact: "(55) 3242-9012"
    },
    10: {
      id: 10,
      name: "Clube de Mães Nossa Senhora",
      location: "Santana do Livramento, RS",
      description: "Grupo de mães que se unem para oferecer apoio alimentar e fortalecimento comunitário.",
      volunteers: 7,
      dailyMeals: 30,
      totalMeals: 21900,
      contact: "(55) 3242-0123"
    },
    11: {
      id: 11,
      name: "Creche Santa Elvira",
      location: "Santana do Livramento, RS",
      description: "Creche comunitária que oferece educação infantil e alimentação adequada para crianças carentes.",
      volunteers: 16,
      dailyMeals: 65,
      totalMeals: 47425,
      contact: "(55) 3242-1234"
    },
    12: {
      id: 12,
      name: "Creche Pai Sete",
      location: "Santana do Livramento, RS",
      description: "Centro de educação infantil que promove desenvolvimento integral através de educação e alimentação.",
      volunteers: 18,
      dailyMeals: 70,
      totalMeals: 51100,
      contact: "(55) 3242-2345"
    },
    13: {
      id: 13,
      name: "CURA (Centro Umbandista de Rituais Afros)",
      location: "Santana do Livramento, RS",
      description: "Centro religioso que combina tradições afro-brasileiras com ações sociais de alimentação comunitária.",
      volunteers: 6,
      dailyMeals: 25,
      totalMeals: 18250,
      contact: "(55) 3242-3456"
    },
    14: {
      id: 14,
      name: "Movimento de Meninos",
      location: "Santana do Livramento, RS",
      description: "Organização que trabalha com crianças e adolescentes em situação de rua, oferecendo acolhimento e alimentação.",
      volunteers: 22,
      dailyMeals: 85,
      totalMeals: 62025,
      contact: "(55) 3242-4567"
    },
    15: {
      id: 15,
      name: "Lar de Meninas",
      location: "Santana do Livramento, RS",
      description: "Instituição que acolhe meninas em situação de vulnerabilidade, oferecendo proteção e alimentação adequada.",
      volunteers: 19,
      dailyMeals: 75,
      totalMeals: 54750,
      contact: "(55) 3242-5678"
    },
    16: {
      id: 16,
      name: "Projeto Rosas de Ouro",
      location: "Santana do Livramento, RS",
      description: "Projeto social que trabalha com idosos, oferecendo atividades recreativas e alimentação balanceada.",
      volunteers: 5,
      dailyMeals: 20,
      totalMeals: 14600,
      contact: "(55) 3242-6789"
    },
    17: {
      id: 17,
      name: "Projeto Tche",
      location: "Santana do Livramento, RS",
      description: "Iniciativa cultural e social que promove tradições gaúchas através de atividades comunitárias e alimentação.",
      volunteers: 8,
      dailyMeals: 35,
      totalMeals: 25550,
      contact: "(55) 3242-7890"
    },
    18: {
      id: 18,
      name: "Projeto Alegria e Canção",
      location: "Santana do Livramento, RS",
      description: "Projeto que une música e solidariedade, oferecendo atividades artísticas e alimentação para a comunidade.",
      volunteers: 12,
      dailyMeals: 45,
      totalMeals: 32850,
      contact: "(55) 3242-8901"
    },
    19: {
      id: 19,
      name: "SIAN",
      location: "Santana do Livramento, RS",
      description: "Sistema de Informação e Atenção à Nutrição que promove segurança alimentar e nutricional na comunidade.",
      volunteers: 10,
      dailyMeals: 42,
      totalMeals: 30660,
      contact: "(55) 3242-9012"
    },
    20: {
      id: 20,
      name: "Cozinha Comunitária Centro",
      location: "Santana do Livramento, RS",
      description: "Cozinha central que atende a região central da cidade com refeições nutritivas e acolhimento.",
      volunteers: 14,
      dailyMeals: 58,
      totalMeals: 42340,
      contact: "(55) 3242-0123"
    },
    21: {
      id: 21,
      name: "Cozinha Solidária Norte",
      location: "Santana do Livramento, RS",
      description: "Iniciativa que atende a zona norte da cidade, promovendo segurança alimentar e fortalecimento comunitário.",
      volunteers: 9,
      dailyMeals: 38,
      totalMeals: 27740,
      contact: "(55) 3242-1234"
    },
    22: {
      id: 22,
      name: "Cozinha Esperança Sul",
      location: "Santana do Livramento, RS",
      description: "Cozinha comunitária da zona sul que oferece esperança e alimentação digna para famílias carentes.",
      volunteers: 17,
      dailyMeals: 68,
      totalMeals: 49640,
      contact: "(55) 3242-2345"
    }
  };

  // Obter dados da cozinha baseado no ID da URL
  const kitchenId = parseInt(window.location.pathname.split('/')[2]) || 1;
  const kitchen = kitchensData[kitchenId] || kitchensData[1];

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
                    <div className="text-2xl font-bold text-gray-900">{kitchen.dailyMeals}</div>
                    <div className="text-sm text-gray-700">Refeições/dia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{kitchen.totalMeals.toLocaleString()}</div>
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