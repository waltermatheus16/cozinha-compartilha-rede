# Sistema Administrativo - Cozinha Compartilha Rede

## Usuário Administrador

Foi criado um usuário administrador com as seguintes credenciais:

- **Email**: `comsea@admin.com`
- **Senha**: `123456`
- **Role**: `admin`

## Funcionalidades Implementadas

### 1. Sistema de Autenticação e Roles
- ✅ Usuário administrador criado no banco de dados
- ✅ Sistema de roles implementado (admin, kitchen)
- ✅ Verificação de permissões no frontend
- ✅ Hook `useAuth` atualizado com `isAdmin`

### 2. Funcionalidades CRUD para Cozinhas
- ✅ **Criar** nova cozinha (`POST /api/kitchens`)
- ✅ **Ler** lista de cozinhas (`GET /api/kitchens`)
- ✅ **Atualizar** cozinha existente (`PUT /api/kitchens/:id`)
- ✅ **Deletar** cozinha (`DELETE /api/kitchens/:id`)

### 3. Interface Administrativa
- ✅ Painel administrativo completo (`/admin`)
- ✅ Listagem de todas as cozinhas
- ✅ Busca por nome ou localização
- ✅ Formulário para criar nova cozinha
- ✅ Formulário para editar cozinha existente
- ✅ Confirmação de exclusão com AlertDialog
- ✅ Upload de imagens (base64)
- ✅ Validação de formulários

### 4. Navegação
- ✅ Link "Painel Admin" no menu de navegação (apenas para admins)
- ✅ Rota `/admin` protegida por autenticação
- ✅ Redirecionamento automático se não for admin

## Como Usar

### 1. Fazer Login como Administrador
1. Acesse a página de login (`/login`)
2. Use as credenciais:
   - Email: `comsea@admin.com`
   - Senha: `123456`
3. Após o login, você verá o link "Painel Admin" no menu

### 2. Acessar o Painel Administrativo
1. Clique em "Painel Admin" no menu de navegação
2. Ou acesse diretamente `/admin`

### 3. Gerenciar Cozinhas

#### Criar Nova Cozinha
1. Clique no botão "Nova Cozinha"
2. Preencha os campos obrigatórios (Nome e Localização)
3. Adicione uma foto de perfil (opcional)
4. Clique em "Criar Cozinha"

#### Editar Cozinha Existente
1. Clique no ícone de edição (lápis) na cozinha desejada
2. Modifique os campos necessários
3. Altere a foto se necessário
4. Clique em "Salvar Alterações"

#### Excluir Cozinha
1. Clique no ícone de lixeira na cozinha desejada
2. Confirme a exclusão no diálogo de confirmação
3. A cozinha será removida permanentemente

#### Buscar Cozinhas
1. Use a barra de busca no topo do painel
2. Digite o nome da cozinha ou localização
3. Os resultados serão filtrados automaticamente

## Estrutura do Banco de Dados

### Tabela `users`
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    kitchen_id INTEGER REFERENCES kitchens(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'kitchen',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Usuário Administrador
```sql
INSERT INTO users (kitchen_id, email, password, role) VALUES
(NULL, 'comsea@admin.com', '123456', 'admin');
```

## Segurança

- ✅ Apenas usuários com `role = 'admin'` podem acessar o painel
- ✅ Redirecionamento automático se não for administrador
- ✅ Validação de formulários no frontend e backend
- ✅ Confirmação obrigatória para exclusões
- ✅ Upload de imagens com validação de tipo e tamanho
- ✅ Query de login corrigida para suportar usuários administradores (LEFT JOIN)

## Arquivos Modificados/Criados

### Backend
- `server.cjs` - Adicionadas rotas CRUD para cozinhas
- `add-admin-user.sql` - Script para criar usuário administrador

### Frontend
- `src/hooks/useAuth.tsx` - Adicionado suporte a roles
- `src/lib/api.ts` - Adicionadas funções CRUD
- `src/pages/AdminPanel.tsx` - Interface administrativa completa
- `src/components/ui/navigation.tsx` - Link para painel admin
- `src/App.tsx` - Rota para painel administrativo

## Próximos Passos (Opcionais)

1. **Middleware de Autenticação**: Implementar middleware no backend para verificar roles
2. **Logs de Auditoria**: Registrar ações administrativas
3. **Paginação**: Implementar paginação para listas grandes
4. **Exportação**: Permitir exportar dados das cozinhas
5. **Backup**: Sistema de backup automático
6. **Notificações**: Sistema de notificações para mudanças

## Comandos Úteis

### Conectar ao Banco de Dados
```bash
docker exec -it app psql -U user -d cozinha_compartilha_rede
```

### Verificar Usuário Administrador
```sql
SELECT * FROM users WHERE email = 'comsea@admin.com';
```

### Listar Todas as Cozinhas
```sql
SELECT id, name, location, volunteers, daily_meals FROM kitchens ORDER BY name;
```

### Executar o Sistema
```bash
npm run dev:full
```

O sistema estará disponível em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Painel Admin: http://localhost:5173/admin
