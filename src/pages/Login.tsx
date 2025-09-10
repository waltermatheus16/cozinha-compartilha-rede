import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Heart, Eye, EyeOff, Loader2 } from "lucide-react";
import { login } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated, user, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Si es admin, redirigir al panel de admin
      if (user.role === 'admin') {
        navigate('/admin');
      } 
      // Si es una cozinha, redirigir al perfil de la cozinha
      else if (user.kitchen_id) {
        navigate(`/cozinha/${user.kitchen_id}`);
      }
      // Si no tiene kitchen_id pero está autenticado, redirigir a la página principal
      else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData.email, formData.password);
      
      // Usar o hook de autenticação
      authLogin(response.user);
      
      // Redirecionar para o perfil da cozinha
      navigate(`/cozinha/${response.user.kitchen_id}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Verificando autenticación...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Entrar na sua Cozinha
            </h1>
            <p className="text-muted-foreground">
              Faça login para gerenciar o perfil da sua cozinha solidária
            </p>
          </div>

          {/* Formulário de Login */}
          <Card className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email da Cozinha</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cozinha@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  <span>Lembrar de mim</span>
                </label>
                <div className="text-xs text-muted-foreground">
                  Contate o administrador para alterar senhas
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

          </Card>

          {/* Informações de Suporte */}
          <div className="mt-8 text-center">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Credenciais de Acesso</h3>
              <div className="text-xs text-blue-600 mb-2">
                <strong>Administrador:</strong><br />
                Email: comsea@admin.com<br />
                Senha: admin123
              </div>
              <div className="text-xs text-blue-600 mb-2">
                <strong>Cozinha (exemplo):</strong><br />
                Email: mariabgahair@comsea.com<br />
                Senha: 123456
              </div>
              <p className="text-xs text-blue-500 mt-2">
                Apenas administradores podem alterar senhas
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              Precisa de ajuda para acessar sua conta?
            </p>
            <Button variant="link" className="text-primary">
              Entre em contato conosco
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;