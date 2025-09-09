import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Menu, X, LogIn, LogOut, User, ChevronDown, Settings, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => window.location.href = "/"}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Logo size="sm" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">COMSEA</span>
              <span className="text-xs text-muted-foreground">Cozinhas Solidárias</span>
            </div>
          </button>

          {/* Spacer para centralizar a navegação */}
          <div className="flex-1"></div>

          {/* Desktop Navigation - Centralizada */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Início
            </a>
            <a href="#cozinhas" className="text-foreground hover:text-primary transition-colors">
              Cozinhas
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          {/* Spacer para empurrar o botão para a direita */}
          <div className="flex-1"></div>

          {/* Auth Buttons - Posicionado à extrema direita */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.kitchen_name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          if (isAdmin) {
                            navigate('/cozinha/0'); // Perfil COMSEA
                          } else {
                            navigate(`/cozinha/${user?.kitchen_id}`);
                          }
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        {isAdmin ? 'Perfil COMSEA' : 'Meu Perfil'}
                      </button>
                      <button
                        onClick={() => {
                          if (isAdmin) {
                            navigate('/cozinha/0/editar'); // Editar perfil COMSEA
                          } else {
                            navigate(`/cozinha/${user?.kitchen_id}/editar`);
                          }
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        {isAdmin ? 'Editar COMSEA' : 'Editar Perfil'}
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            navigate('/admin');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          Painel Admin
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Início
              </a>
              <a href="#cozinhas" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Cozinhas
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sobre
              </a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contato
              </a>
              
              {/* Mobile Auth Buttons */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">
                    Logado como: {user?.kitchen_name}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      if (isAdmin) {
                        navigate('/cozinha/0'); // Perfil COMSEA
                      } else {
                        navigate(`/cozinha/${user?.kitchen_id}`);
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {isAdmin ? 'Perfil COMSEA' : 'Meu Perfil'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      if (isAdmin) {
                        navigate('/cozinha/0/editar'); // Editar perfil COMSEA
                      } else {
                        navigate(`/cozinha/${user?.kitchen_id}/editar`);
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {isAdmin ? 'Editar COMSEA' : 'Editar Perfil'}
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start mb-2"
                      onClick={() => {
                        navigate('/admin');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Painel Admin
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};