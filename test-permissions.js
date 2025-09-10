// Script para testar permissões de edição
const fetch = require('node-fetch');

async function testPermissions() {
  console.log('🧪 Testando permissões...');
  
  // Testar login como admin
  try {
    const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'comsea@admin.com',
        password: '123456'
      })
    });
    
    const loginResult = await loginResponse.json();
    console.log('✅ Login admin:', loginResult.user.role);
    
    // Testar se admin pode acessar usuários
    const usersResponse = await fetch('http://localhost:8080/api/users');
    const users = await usersResponse.json();
    console.log('✅ Usuários encontrados:', users.length);
    
    // Encontrar usuário da cozinha 1 (APAE)
    const kitchenUser = users.find(u => u.kitchen_id === 1);
    console.log('✅ Usuário da cozinha 1:', kitchenUser ? 'Encontrado' : 'Não encontrado');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

// Executar teste
testPermissions();
