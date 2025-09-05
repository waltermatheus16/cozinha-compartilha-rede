# 🗄️ Setup do Banco de Dados - Cozinha Compartilha Rede

## 📋 Arquivos Criados

- `init-database.sql` - Script DDL completo com tabelas e dados
- `src/lib/database.ts` - Funções de conexão e CRUD
- `src/test-db.ts` - Script de teste da conexão
- `setup-database.sh` - Script automatizado de setup

## 🚀 Execução Rápida

```bash
# Executar setup automatizado
./setup-database.sh
```

## 📝 Execução Manual

### 1. Verificar Container PostgreSQL

```bash
# Verificar se está rodando
docker ps

# Se não estiver, iniciar
docker start app
```

### 2. Executar Script DDL

```bash
# Executar script de criação
docker exec -i app psql -U user < init-database.sql
```

### 3. Instalar Dependências

```bash
npm install pg @types/pg
```

### 4. Testar Conexão

```bash
npx tsx src/test-db.ts
```

## 🗂️ Estrutura do Banco

### Tabelas Criadas

- **kitchens** - Dados das cozinhas solidárias
- **posts** - Feed de publicações das cozinhas
- **comments** - Comentários nos posts
- **volunteers** - Voluntários de cada cozinha
- **donations** - Doações recebidas

### Dados Inseridos

- ✅ 22 cozinhas solidárias
- ✅ 6 posts de exemplo
- ✅ 4 comentários de exemplo
- ✅ 6 voluntários de exemplo
- ✅ 4 doações de exemplo

## 🔧 Comandos Úteis

### Conectar ao Banco

```bash
docker exec -it app psql -U user -d cozinha_compartilha_rede
```

### Comandos SQL Úteis

```sql
-- Ver todas as tabelas
\dt

-- Ver dados das cozinhas
SELECT id, name, volunteers, daily_meals FROM kitchens LIMIT 5;

-- Ver posts recentes
SELECT p.id, p.type, p.content, k.name as kitchen_name 
FROM posts p 
JOIN kitchens k ON p.kitchen_id = k.id 
ORDER BY p.created_at DESC 
LIMIT 5;

-- Estatísticas gerais
SELECT 
  COUNT(*) as total_kitchens,
  SUM(volunteers) as total_volunteers,
  SUM(daily_meals) as total_daily_meals,
  SUM(total_meals) as total_meals_served
FROM kitchens;

-- Sair do psql
\q
```

## 🔌 Integração com Frontend

### Exemplo de Uso

```typescript
import { getKitchens, getKitchenById, createPost } from './lib/database';

// Buscar todas as cozinhas
const kitchens = await getKitchens();

// Buscar cozinha específica
const kitchen = await getKitchenById(1);

// Criar novo post
const newPost = await createPost(1, 'info', 'Novo post da cozinha!');
```

### Funções Disponíveis

- `getKitchens()` - Lista todas as cozinhas
- `getKitchenById(id)` - Busca cozinha por ID
- `getKitchenStats()` - Estatísticas gerais
- `getPostsByKitchen(kitchenId)` - Posts de uma cozinha
- `createPost(kitchenId, type, content)` - Criar post
- `likePost(postId)` - Curtir post
- `getCommentsByPost(postId)` - Comentários de um post
- `createComment(postId, content, authorName)` - Criar comentário
- `getVolunteersByKitchen(kitchenId)` - Voluntários de uma cozinha
- `addVolunteer(kitchenId, name, email, phone, role)` - Adicionar voluntário
- `getDonationsByKitchen(kitchenId)` - Doações de uma cozinha
- `addDonation(kitchenId, amount, description, donorName)` - Adicionar doação
- `searchKitchens(query)` - Buscar cozinhas
- `getTopKitchensByMeals(limit)` - Top cozinhas por refeições
- `getRecentActivity(limit)` - Atividade recente

## 🐛 Troubleshooting

### Container não está rodando

```bash
docker start app
```

### Erro de conexão

```bash
# Verificar se o banco existe
docker exec -it app psql -U user -c "\l"

# Verificar se as tabelas existem
docker exec -it app psql -U user -d cozinha_compartilha_rede -c "\dt"
```

### Reinstalar dependências

```bash
npm install pg @types/pg
```

## 📊 Próximos Passos

1. **Integrar no Frontend** - Substituir dados hardcoded
2. **Implementar CRUD** - Adicionar/editar/deletar funcionalidades
3. **Adicionar Autenticação** - Sistema de login para cozinhas
4. **Implementar Real-time** - Atualizações em tempo real
5. **Adicionar Upload** - Sistema de upload de imagens

## 🔗 Recursos Úteis

- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
- [Node.js pg](https://node-postgres.com/)
- [Docker PostgreSQL](https://hub.docker.com/_/postgres)
