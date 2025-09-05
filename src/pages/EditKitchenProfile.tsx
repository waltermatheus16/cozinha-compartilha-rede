import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { MapPin, Users, Clock, Save, ArrowLeft, Loader2, AlertCircle, Camera, X } from "lucide-react";
import { getKitchenById, updateKitchen } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EditKitchenProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [kitchen, setKitchen] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Obter ID da cozinha da URL
  const kitchenId = parseInt(window.location.pathname.split('/')[2]) || 1;

  // Verificar se o usuário pode editar esta cozinha
  // Garantir que ambos os valores sejam numbers para comparação correta
  const userKitchenId = user?.kitchen_id ? Number(user.kitchen_id) : null;
  const canEditKitchen = isAuthenticated && userKitchenId === kitchenId;

  // Formulário de edição
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contact_phone: "",
    contact_email: "",
    volunteers: 0,
    daily_meals: 0,
    avatar_url: ""
  });

  // Estado para foto de perfil
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Carregar dados da cozinha
  useEffect(() => {
    const loadKitchen = async () => {
      try {
        setLoading(true);
        const kitchenData = await getKitchenById(kitchenId);
        
        if (!kitchenData) {
          setError('Cozinha não encontrada');
          return;
        }

        // Verificar se o usuário pode editar
        if (!canEditKitchen) {
          setError('Você não tem permissão para editar esta cozinha');
          return;
        }
        
        setKitchen(kitchenData);
        setFormData({
          name: kitchenData.name || "",
          description: kitchenData.description || "",
          location: kitchenData.location || "",
          contact_phone: kitchenData.contact_phone || "",
          contact_email: kitchenData.contact_email || "",
          volunteers: kitchenData.volunteers || 0,
          daily_meals: kitchenData.daily_meals || 0,
          avatar_url: kitchenData.avatar_url || ""
        });
        
        // Configurar foto de perfil
        if (kitchenData.avatar_url) {
          setProfileImage(kitchenData.avatar_url);
        }
      } catch (err) {
        setError('Erro ao carregar dados da cozinha');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    loadKitchen();
  }, [kitchenId, canEditKitchen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kitchen) return;

    try {
      setSaving(true);
      setError(null);
      
      // Preparar dados para envio
      const dataToSend = { ...formData };
      
      // Se há uma nova imagem, converter para base64
      if (imageFile) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
        dataToSend.avatar_url = base64;
      }
      
      await updateKitchen(kitchenId, dataToSend);
      setSuccess(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate(`/cozinha/${kitchenId}`);
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido');
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setProfileImage(null);
    setFormData(prev => ({
      ...prev,
      avatar_url: ""
    }));
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
            <p className="text-red-500 mb-4">{error || 'Cozinha não encontrada'}</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-hero-gradient relative">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate(`/cozinha/${kitchenId}`)}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
                <p className="text-gray-700">Atualize as informações da sua cozinha</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">
                  ✅ Perfil atualizado com sucesso! Redirecionando...
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Foto de Perfil */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Foto de Perfil</h3>
                
                <div className="flex items-center space-x-6">
                  {/* Preview da foto */}
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-gray-200">
                      {profileImage ? (
                        <AvatarImage src={profileImage} alt="Foto da cozinha" />
                      ) : (
                        <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                          {formData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    {/* Botão para remover foto */}
                    {profileImage && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                        onClick={removeImage}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  
                  {/* Controles de upload */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Camera className="w-4 h-4" />
                        <span>{profileImage ? 'Alterar Foto' : 'Adicionar Foto'}</span>
                      </div>
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500">
                      PNG, JPG ou JPEG. Máximo 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Básicas</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Cozinha</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome da cozinha"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Cidade, Estado"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva a missão e atividades da cozinha"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações de Contato</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Telefone</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone}
                      onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                      placeholder="(55) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => handleInputChange('contact_email', e.target.value)}
                      placeholder="contato@cozinha.com"
                    />
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Estatísticas</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volunteers">Número de Voluntários</Label>
                    <Input
                      id="volunteers"
                      type="number"
                      min="0"
                      value={formData.volunteers}
                      onChange={(e) => handleInputChange('volunteers', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daily_meals">Refeições por Dia</Label>
                    <Input
                      id="daily_meals"
                      type="number"
                      min="0"
                      value={formData.daily_meals}
                      onChange={(e) => handleInputChange('daily_meals', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/cozinha/${kitchenId}`)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditKitchenProfile;
