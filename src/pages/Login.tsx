import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Heart, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção, aqui seria feita a autenticação via Supabase
    console.log("Login attempt:", formData);
  };

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
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma cozinha cadastrada?
              </p>
              <Button variant="outline" className="w-full">
                Cadastrar Nova Cozinha
              </Button>
            </div>
          </Card>

          {/* Informações de Suporte */}
          <div className="mt-8 text-center">
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