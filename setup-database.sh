#!/bin/bash

echo "🚀 Configurando banco de dados PostgreSQL para Cozinha Compartilha Rede"
echo "=================================================================="

# Verificar se o container está rodando
echo "1️⃣ Verificando se o container PostgreSQL está rodando..."
if ! docker ps | grep -q "app"; then
    echo "❌ Container 'app' não está rodando!"
    echo "🔧 Iniciando container..."
    docker start app
    sleep 5
fi

echo "✅ Container está rodando!"

# Executar o script DDL
echo ""
echo "2️⃣ Executando script de criação do banco..."
docker exec -i app psql -U user < init-database.sql

if [ $? -eq 0 ]; then
    echo "✅ Banco de dados criado com sucesso!"
else
    echo "❌ Erro ao criar banco de dados!"
    exit 1
fi

# Instalar dependências
echo ""
echo "3️⃣ Instalando dependências do Node.js..."
npm install pg @types/pg

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas!"
else
    echo "❌ Erro ao instalar dependências!"
    exit 1
fi

# Testar conexão
echo ""
echo "4️⃣ Testando conexão com o banco..."
npx tsx src/test-db.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup concluído com sucesso!"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Integrar as funções do database.ts no seu frontend"
    echo "2. Substituir dados hardcoded pelas queries do banco"
    echo "3. Implementar funcionalidades de CRUD"
    echo ""
    echo "🔗 Comandos úteis:"
    echo "• Conectar ao banco: docker exec -it app psql -U user -d cozinha_compartilha_rede"
    echo "• Ver tabelas: \\dt"
    echo "• Ver dados: SELECT * FROM kitchens LIMIT 5;"
    echo "• Sair: \\q"
else
    echo "❌ Erro no teste de conexão!"
    exit 1
fi
