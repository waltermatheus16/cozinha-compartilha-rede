# Logins das Cozinhas - COMSEA

## Usuário Administrador
- **Email**: `comsea@admin.com`
- **Senha**: `123456`
- **Acesso**: Painel administrativo completo
- **Perfil**: COMSEA - Conselho Municipal de Segurança Alimentar (ID: 0)

## Logins das Cozinhas
Todas as cozinhas usam a senha: **`123456`**

| ID | Email | Nome da Cozinha |
|----|-------|-----------------|
| 1 | `apae@comsea.com` | APAE |
| 2 | `caixadwilson@comsea.com` | Associação de Moradores Caixa D' do Wilson |
| 3 | `mariabgahair@comsea.com` | Centro Beneficente Maria Abgahair |
| 4 | `cidademeninos@comsea.com` | Cidade de Meninos |
| 5 | `pratocheio@comsea.com` | Cozinha Prato Cheio (Becão) |
| 6 | `vilanova@comsea.com` | Cozinha Vila Nova |
| 7 | `simonbolivar@comsea.com` | Cozinha da Ironda Simon Bolivar |
| 8 | `paimarcos@comsea.com` | Cozinha Pai Marcos |
| 9 | `vicentedepaula@comsea.com` | Conferência São Vicente de Paula |
| 10 | `nossasenhora@comsea.com` | Clube de Mães Nossa Senhora |
| 11 | `santaelvira@comsea.com` | Creche Santa Elvira |
| 12 | `paisete@comsea.com` | Creche Pai Sete |
| 13 | `cura@comsea.com` | CURA (Centro Umbandista de Rituais Afros) |
| 14 | `movimentomeninos@comsea.com` | Movimento de Meninos |
| 15 | `larmeninas@comsea.com` | Lar de Meninas |
| 16 | `rosasouro@comsea.com` | Projeto Rosas de Ouro |
| 17 | `projetotche@comsea.com` | Projeto Tche |
| 18 | `alegriacancao@comsea.com` | Projeto Alegria e Canção |
| 19 | `sian@comsea.com` | SIAN |
| 20 | `centro@comsea.com` | Cozinha Comunitária Centro |
| 21 | `norte@comsea.com` | Cozinha Solidária Norte |
| 22 | `sul@comsea.com` | Cozinha Esperança Sul |

## Como Usar

### Para Fazer Login:
1. Acesse `http://localhost:5173/login`
2. Digite o email da cozinha (ex: `apae@comsea.com`)
3. Digite a senha: `123456`
4. Clique em "Entrar"

### Para Acessar o Painel Admin:
1. Faça login com `comsea@admin.com` e senha `123456`
2. Clique em "Painel Admin" no menu
3. Gerencie todas as cozinhas da rede

## Status do Sistema
- ✅ Backend rodando em: `http://localhost:3001`
- ✅ Frontend rodando em: `http://localhost:5173`
- ✅ Banco de dados: PostgreSQL (Docker)
- ✅ Todos os logins testados e funcionando

## Comandos Úteis

### Verificar se o sistema está rodando:
```bash
curl http://localhost:3001/api/kitchens
curl http://localhost:5173
```

### Testar login via API:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"apae@comsea.com","password":"123456"}'
```

### Conectar ao banco de dados:
```bash
docker exec -it app psql -U user -d cozinha_compartilha_rede
```
