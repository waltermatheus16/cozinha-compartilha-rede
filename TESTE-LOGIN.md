# 🧪 Guia de Teste - Sistema de Login das Cozinhas

## 📋 Pré-requisitos

Antes de testar, certifique-se de que:

1. ✅ O banco PostgreSQL está rodando
2. ✅ As tabelas foram criadas
3. ✅ Os usuários das cozinhas foram inseridos

## 🚀 Como Testar

### 1. Verificar se o banco está rodando

```bash
# Verificar containers
docker ps

# Se não estiver rodando, iniciar
docker start app
```

### 2. Executar o script de criação do banco (se ainda não foi feito)

```bash
# Criar banco e tabelas
docker exec -i app psql -U user < init-database.sql

# Criar usuários das cozinhas
docker exec -i app psql -U user -d cozinha_compartilha_rede < add-users.sql
```

### 3. Testar conexão básica

```bash
# Testar se o banco está funcionando
npx tsx src/test-db.ts
```

### 4. Testar logins das cozinhas

```bash
# Executar teste específico de login
npx tsx src/test-login.ts
```

## 🔐 Credenciais de Teste

Todas as cozinhas têm o mesmo padrão de login:

- **Email**: `nomedacozinha@comsea.com`
- **Senha**: `123456`

### Exemplos de logins válidos:

| Cozinha | Email | Senha |
|---------|-------|-------|
| APAE | `apae@comsea.com` | `123456` |
| Cidade de Meninos | `cidade de meninos@comsea.com` | `123456` |
| Cozinha Prato Cheio | `cozinha prato cheio becao@comsea.com` | `123456` |
| Movimento de Meninos | `movimento de meninos@comsea.com` | `123456` |
| Cozinha Esperança Sul | `cozinha esperanca sul@comsea.com` | `123456` |

## 🧪 Testes Manuais

### 1. Testar via SQL direto

```bash
# Conectar ao banco
docker exec -it app psql -U user -d cozinha_compartilha_rede

# Verificar usuários criados
SELECT u.id, u.email, k.name as kitchen_name 
FROM users u 
JOIN kitchens k ON u.kitchen_id = k.id 
ORDER BY u.id;

# Testar login específico
SELECT u.*, k.name as kitchen_name, k.location
FROM users u 
JOIN kitchens k ON u.kitchen_id = k.id 
WHERE u.email = 'apae@comsea.com' AND u.password = '123456';

# Sair do psql
\q
```

### 2. Testar via código TypeScript

```typescript
import { authenticateUser } from './lib/database';

// Testar login
const user = await authenticateUser('apae@comsea.com', '123456');
console.log(user); // Deve retornar dados da cozinha APAE

// Testar login inválido
const invalidUser = await authenticateUser('apae@comsea.com', 'senhaerrada');
console.log(invalidUser); // Deve retornar null
```

## ✅ O que o teste verifica

1. **Conexão com banco** - Se o PostgreSQL está acessível
2. **Tabelas criadas** - Se as tabelas `kitchens` e `users` existem
3. **Usuários inseridos** - Se os 22 usuários foram criados
4. **Logins válidos** - Se as credenciais funcionam
5. **Segurança** - Se credenciais inválidas são rejeitadas
6. **Dados corretos** - Se os usuários estão vinculados às cozinhas corretas

## 🐛 Troubleshooting

### Erro: "relation 'users' does not exist"

```bash
# Executar script de criação da tabela users
docker exec -i app psql -U user -d cozinha_compartilha_rede < add-users.sql
```

### Erro: "no such user"

```bash
# Verificar se os usuários foram inseridos
docker exec -it app psql -U user -d cozinha_compartilha_rede -c "SELECT COUNT(*) FROM users;"
```

### Erro de conexão

```bash
# Verificar se o container está rodando
docker ps

# Reiniciar container se necessário
docker restart app
```

## 📊 Resultado Esperado

O teste deve mostrar:

```
🍽️ Testando logins das cozinhas...

1️⃣ Verificando cozinhas cadastradas...
✅ Encontradas 22 cozinhas

2️⃣ Verificando usuários criados...
✅ Encontrados 22 usuários

3️⃣ Usuários de exemplo:
   📧 apae@comsea.com → 🏠 APAE
   📧 associacaode moradores caixa d wilson@comsea.com → 🏠 Associação de Moradores Caixa D' do Wilson
   ...

4️⃣ Testando logins específicos...
✅ Login OK: apae@comsea.com → APAE
✅ Login OK: cidade de meninos@comsea.com → Cidade de Meninos
...

5️⃣ Testando login com credenciais inválidas...
✅ Segurança OK: Senha incorreta rejeitada
✅ Segurança OK: Email inexistente rejeitado

🎉 Teste de logins concluído!

📋 Resumo:
   • 22 cozinhas cadastradas
   • 22 usuários criados
   • Todos os usuários têm senha: 123456
   • Formato de email: nomedacozinha@comsea.com
```

## 🔄 Próximos Passos

Após confirmar que os logins estão funcionando:

1. **Integrar no frontend** - Criar página de login
2. **Implementar sessões** - Gerenciar login/logout
3. **Adicionar validações** - Campos obrigatórios, formato de email
4. **Implementar hash de senha** - Para maior segurança
5. **Criar sistema de recuperação** - Reset de senha
