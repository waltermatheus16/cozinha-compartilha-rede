import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  MapPin, 
  Users, 
  Clock, 
  Loader2, 
  AlertCircle,
  Save,
  X,
  Camera
} from "lucide-react";
import { getKitchens, createKitchen, updateKitchen, deleteKitchen } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [kitchens, setKitchens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingKitchen, setEditingKitchen] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Formulário para nova cozinha
  const [newKitchen, setNewKitchen] = useState({
    name: "",
    description: "",
    location: "",
    contact_phone: "",
    contact_email: "",
    volunteers: 0,
    daily_meals: 0,
    avatar_url: ""
  });

  // Formulário para editar cozinha
  const [editKitchen, setEditKitchen] = useState({
    name: "",
    description: "",
    location: "",
    contact_phone: "",
    contact_email: "",
    volunteers: 0,
    daily_meals: 0,
    avatar_url: ""
  });

  // Estados para upload de imagem
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // Verificar se o usuário é administrador
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Carregar cozinhas
  useEffect(() => {
    const loadKitchens = async () => {
      try {
        setLoading(true);
        const data = await getKitchens();
        setKitchens(data);
      } catch (err) {
        setError('Erro ao carregar cozinhas');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    loadKitchens();
  }, []);

  // Filtrar cozinhas por termo de busca
  const filteredKitchens = kitchens.filter(kitchen =>
    kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kitchen.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Criar nova cozinha
  const handleCreateKitchen = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      const dataToSend = { ...newKitchen };
      
      // Se há uma nova imagem, converter para base64
      if (newImageFile) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(newImageFile);
        });
        dataToSend.avatar_url = base64;
      }

      const createdKitchen = await createKitchen(dataToSend);
      setKitchens(prev => [...prev, createdKitchen]);
      setIsCreateDialogOpen(false);
      resetNewKitchenForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar cozinha');
    } finally {
      setSaving(false);
    }
  };

  // Editar cozinha
  const handleEditKitchen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKitchen) return;

    try {
      setSaving(true);
      setError(null);

      const dataToSend = { ...editKitchen };
      
      // Se há uma nova imagem, converter para base64
      if (editImageFile) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(editImageFile);
        });
        dataToSend.avatar_url = base64;
      }

      const updatedKitchen = await updateKitchen(editingKitchen.id, dataToSend);
      setKitchens(prev => prev.map(k => k.id === editingKitchen.id ? updatedKitchen : k));
      setIsEditDialogOpen(false);
      setEditingKitchen(null);
      resetEditKitchenForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar cozinha');
    } finally {
      setSaving(false);
    }
  };

  // Deletar cozinha
  const handleDeleteKitchen = async (kitchenId: number) => {
    try {
      await deleteKitchen(kitchenId);
      setKitchens(prev => prev.filter(k => k.id !== kitchenId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar cozinha');
    }
  };

  // Abrir diálogo de edição
  const openEditDialog = (kitchen: any) => {
    setEditingKitchen(kitchen);
    setEditKitchen({
      name: kitchen.name || "",
      description: kitchen.description || "",
      location: kitchen.location || "",
      contact_phone: kitchen.contact_phone || "",
      contact_email: kitchen.contact_email || "",
      volunteers: kitchen.volunteers || 0,
      daily_meals: kitchen.daily_meals || 0,
      avatar_url: kitchen.avatar_url || ""
    });
    setEditImagePreview(kitchen.avatar_url || null);
    setIsEditDialogOpen(true);
  };

  // Resetar formulários
  const resetNewKitchenForm = () => {
    setNewKitchen({
      name: "",
      description: "",
      location: "",
      contact_phone: "",
      contact_email: "",
      volunteers: 0,
      daily_meals: 0,
      avatar_url: ""
    });
    setNewImageFile(null);
    setNewImagePreview(null);
  };

  const resetEditKitchenForm = () => {
    setEditKitchen({
      name: "",
      description: "",
      location: "",
      contact_phone: "",
      contact_email: "",
      volunteers: 0,
      daily_meals: 0,
      avatar_url: ""
    });
    setEditImageFile(null);
    setEditImagePreview(null);
  };

  // Handlers para upload de imagem
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      
      setNewImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      
      setEditImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Carregando painel administrativo...</p>
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
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-gray-700">Gerencie as cozinhas da rede</p>
              </div>
              <Badge variant="outline" className="text-sm">
                {user?.email}
              </Badge>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Barra de Busca e Ações */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar cozinhas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Cozinha
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nova Cozinha</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateKitchen} className="space-y-4">
                  {/* Foto de Perfil */}
                  <div className="space-y-4">
                    <Label>Foto de Perfil</Label>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        {newImagePreview ? (
                          <AvatarImage src={newImagePreview} alt="Preview" />
                        ) : (
                          <AvatarFallback>
                            <Camera className="w-6 h-6" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <Label htmlFor="new-image" className="cursor-pointer">
                          <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            <Camera className="w-4 h-4" />
                            <span>Adicionar Foto</span>
                          </div>
                        </Label>
                        <Input
                          id="new-image"
                          type="file"
                          accept="image/*"
                          onChange={handleNewImageChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informações Básicas */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-name">Nome da Cozinha *</Label>
                      <Input
                        id="new-name"
                        value={newKitchen.name}
                        onChange={(e) => setNewKitchen(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nome da cozinha"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-location">Localização *</Label>
                      <Input
                        id="new-location"
                        value={newKitchen.location}
                        onChange={(e) => setNewKitchen(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Cidade, Estado"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-description">Descrição</Label>
                    <Textarea
                      id="new-description"
                      value={newKitchen.description}
                      onChange={(e) => setNewKitchen(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva a missão e atividades da cozinha"
                      rows={3}
                    />
                  </div>

                  {/* Informações de Contato */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-phone">Telefone</Label>
                      <Input
                        id="new-phone"
                        value={newKitchen.contact_phone}
                        onChange={(e) => setNewKitchen(prev => ({ ...prev, contact_phone: e.target.value }))}
                        placeholder="(55) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-email">Email</Label>
                      <Input
                        id="new-email"
                        type="email"
                        value={newKitchen.contact_email}
                        onChange={(e) => setNewKitchen(prev => ({ ...prev, contact_email: e.target.value }))}
                        placeholder="contato@cozinha.com"
                      />
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-volunteers">Voluntários</Label>
                      <Input
                        id="new-volunteers"
                        type="number"
                        min="0"
                        value={newKitchen.volunteers}
                        onChange={(e) => setNewKitchen(prev => ({ ...prev, volunteers: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-meals">Refeições por Dia</Label>
                      <Input
                        id="new-meals"
                        type="number"
                        min="0"
                        value={newKitchen.daily_meals}
                        onChange={(e) => setNewKitchen(prev => ({ ...prev, daily_meals: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreateDialogOpen(false);
                        resetNewKitchenForm();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Criar Cozinha
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Cozinhas */}
          <div className="grid gap-4">
            {filteredKitchens.map((kitchen) => (
              <Card key={kitchen.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      {kitchen.avatar_url ? (
                        <AvatarImage src={kitchen.avatar_url} alt={kitchen.name} />
                      ) : (
                        <AvatarFallback className="text-lg font-bold">
                          {kitchen.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{kitchen.name}</h3>
                      <p className="text-gray-600 mb-2">{kitchen.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{kitchen.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{kitchen.volunteers} voluntários</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{kitchen.daily_meals} refeições/dia</span>
                        </div>
                      </div>
                      
                      {kitchen.contact_phone && (
                        <p className="text-sm text-gray-500 mt-1">
                          📞 {kitchen.contact_phone}
                        </p>
                      )}
                      {kitchen.contact_email && (
                        <p className="text-sm text-gray-500">
                          ✉️ {kitchen.contact_email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(kitchen)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir a cozinha "{kitchen.name}"? 
                            Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteKitchen(kitchen.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredKitchens.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Nenhuma cozinha encontrada para o termo de busca.' : 'Nenhuma cozinha cadastrada.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Cozinha</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditKitchen} className="space-y-4">
            {/* Foto de Perfil */}
            <div className="space-y-4">
              <Label>Foto de Perfil</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  {editImagePreview ? (
                    <AvatarImage src={editImagePreview} alt="Preview" />
                  ) : (
                    <AvatarFallback>
                      <Camera className="w-6 h-6" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <Label htmlFor="edit-image" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Camera className="w-4 h-4" />
                      <span>Alterar Foto</span>
                    </div>
                  </Label>
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="hidden"
                  />
                </div>
                {editImagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditImagePreview(null);
                      setEditImageFile(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome da Cozinha *</Label>
                <Input
                  id="edit-name"
                  value={editKitchen.name}
                  onChange={(e) => setEditKitchen(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome da cozinha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Localização *</Label>
                <Input
                  id="edit-location"
                  value={editKitchen.location}
                  onChange={(e) => setEditKitchen(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Cidade, Estado"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={editKitchen.description}
                onChange={(e) => setEditKitchen(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva a missão e atividades da cozinha"
                rows={3}
              />
            </div>

            {/* Informações de Contato */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  value={editKitchen.contact_phone}
                  onChange={(e) => setEditKitchen(prev => ({ ...prev, contact_phone: e.target.value }))}
                  placeholder="(55) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editKitchen.contact_email}
                  onChange={(e) => setEditKitchen(prev => ({ ...prev, contact_email: e.target.value }))}
                  placeholder="contato@cozinha.com"
                />
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-volunteers">Voluntários</Label>
                <Input
                  id="edit-volunteers"
                  type="number"
                  min="0"
                  value={editKitchen.volunteers}
                  onChange={(e) => setEditKitchen(prev => ({ ...prev, volunteers: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-meals">Refeições por Dia</Label>
                <Input
                  id="edit-meals"
                  type="number"
                  min="0"
                  value={editKitchen.daily_meals}
                  onChange={(e) => setEditKitchen(prev => ({ ...prev, daily_meals: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingKitchen(null);
                  resetEditKitchenForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
