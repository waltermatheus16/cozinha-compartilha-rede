// Teste do perfil COMSEA
const testComseaProfile = async () => {
  try {
    console.log('🧪 Testando perfil COMSEA...');
    
    // Testar API
    const response = await fetch('http://localhost:3001/api/kitchens/0');
    const data = await response.json();
    
    console.log('📊 Dados da API:');
    console.log(`ID: ${data.id}`);
    console.log(`Nome: ${data.name}`);
    console.log(`Descrição: ${data.description.substring(0, 100)}...`);
    console.log(`Voluntários: ${data.volunteers}`);
    console.log(`Refeições/dia: ${data.daily_meals}`);
    
    if (data.id === 0 && data.name.includes('COMSEA')) {
      console.log('✅ Perfil COMSEA está correto na API');
    } else {
      console.log('❌ Perfil COMSEA incorreto na API');
    }
    
    // Testar login do admin
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'comsea@admin.com', password: '123456' })
    });
    
    const loginData = await loginResponse.json();
    console.log('\n🔐 Login do admin:');
    console.log(`Kitchen ID: ${loginData.user.kitchen_id}`);
    console.log(`Role: ${loginData.user.role}`);
    
    if (loginData.user.kitchen_id === 0) {
      console.log('✅ Login do admin está correto');
    } else {
      console.log('❌ Login do admin incorreto');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
};

testComseaProfile();
