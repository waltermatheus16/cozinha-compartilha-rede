import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { MapPin, Users, Clock, Save, ArrowLeft, Loader2, AlertCircle, Camera, X } from "lucide-react";
import { getKitchenById, updateKitchen, changePassword, adminChangePassword } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EditKitchenProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [kitchen, setKitchen] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Obter ID da cozinha da URL
  const kitchenId = parseInt(window.location.pathname.split('/')[2]);

  // Verificar se o usuário pode editar esta cozinha
  // Garantir que ambos os valores sejam numbers para comparação correta
  const userKitchenId = user?.kitchen_id !== null && user?.kitchen_id !== undefined ? Number(user.kitchen_id) : null;
  const isAdmin = user?.role === 'admin';
  const canEditKitchen = isAuthenticated && (isAdmin || userKitchenId === kitchenId);

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

  // Estados para alteração de senha
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changingPassword, setChangingPassword] = useState(false);

  // Carregar dados da cozinha
  useEffect(() => {
    // Aguardar o carregamento da autenticação
    if (isLoading) {
      return;
    }

    const loadKitchen = async () => {
      try {
        setLoading(true);
        const kitchenData = await getKitchenById(kitchenId);
        
        if (!kitchenData) {
          setError('Cozinha não encontrada');
          return;
        }

        // Verificar se o usuário pode editar - lógica mais explícita
        const canEdit = isAuthenticated && (isAdmin || userKitchenId === kitchenId);
        
        if (!canEdit) {
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
  }, [kitchenId, canEditKitchen, isLoading]);

  // Limpar mensagem de sucesso após 5 segundos
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Limpar errores cuando se abre la sección de contraseña
  useEffect(() => {
    if (showPasswordSection) {
      setError(null);
      setSuccess(false);
      setSuccessMessage('');
    }
  }, [showPasswordSection]);

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Solo administradores pueden cambiar contraseñas
    if (user?.role !== 'admin') {
      setError('Apenas administradores podem alterar senhas');
      return;
    }
    
    console.log('🔐 === INICIO CAMBIO DE CONTRASEÑA (ADMIN) ===');
    console.log('🔐 Datos del admin:', {
      userRole: user?.role,
      userId: user?.id,
      kitchenId,
      passwordData
    });
    
    // Validaciones básicas
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.log('❌ Las contraseñas no coinciden');
      setError('As senhas não coincidem');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      console.log('❌ Contraseña muy corta');
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    try {
      console.log('🔄 Iniciando cambio de contraseña...');
      setChangingPassword(true);
      setError(null);
      setSuccess(false);
      setSuccessMessage('');
      
      // Admin puede cambiar contraseña de cualquier usuario
      console.log('🔐 Admin cambiando contraseña para cocina:', kitchenId);
      const result = await adminChangePassword(0, passwordData.newPassword, user.id, kitchenId);
      
      console.log('✅ Resultado del cambio:', result);
      console.log('✅ Contraseña cambiada exitosamente');
      
      setSuccessMessage('Senha alterada com sucesso!');
      setSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordSection(false);
      
    } catch (err) {
      console.error('❌ Error en cambio de contraseña:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar senha';
      console.error('❌ Mensaje de error:', errorMessage);
      setError(errorMessage);
    } finally {
      setChangingPassword(false);
      console.log('🔐 === FIN CAMBIO DE CONTRASEÑA ===');
    }
  };

  // Loading state
  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>
              {isLoading ? 'Verificando autenticação...' : 'Carregando dados da cozinha...'}
            </p>
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
                  ✅ {successMessage || 'Perfil atualizado com sucesso!'}
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
                    <Avatar className="w-32 h-32 border-4 border-gray-200">
                      {profileImage ? (
                        <AvatarImage src={profileImage} alt="Foto da cozinha" />
                      ) : (
                        <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
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

              {/* Seção de Alteração de Senha - APENAS PARA ADMIN */}
              {user?.role === 'admin' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Alterar Senha</h3>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPasswordSection(!showPasswordSection)}
                    >
                      {showPasswordSection ? 'Cancelar' : 'Alterar Senha'}
                    </Button>
                  </div>
                
                {showPasswordSection && (
                  <form onSubmit={handlePasswordChange} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                    {success && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-600">✅ {successMessage}</p>
                      </div>
                    )}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">❌ {error}</p>
                      </div>
                    )}
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-600">
                        <strong>Admin:</strong> Você pode alterar a senha desta cozinha sem fornecer a senha atual.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Digite a nova senha (mínimo 6 caracteres)"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirme a nova senha"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowPasswordSection(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={changingPassword}
                      >
                        {changingPassword ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Alterando...
                          </>
                        ) : (
                          'Alterar Senha'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
                </div>
              )}

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
