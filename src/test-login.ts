import { 
  authenticateUser, 
  getAllUsers, 
  getKitchens 
} from './lib/database';

async function testKitchenLogins() {
  try {
    console.log('🍽️ Testando logins das cozinhas...\n');
    
    // 1. Verificar se as cozinhas existem
    console.log('1️⃣ Verificando cozinhas cadastradas...');
    const kitchens = await getKitchens();
    console.log(`✅ Encontradas ${kitchens.length} cozinhas\n`);
    
    // 2. Verificar se os usuários foram criados
    console.log('2️⃣ Verificando usuários criados...');
    const users = await getAllUsers();
    console.log(`✅ Encontrados ${users.length} usuários\n`);
    
    // 3. Mostrar alguns usuários de exemplo
    console.log('3️⃣ Usuários de exemplo:');
    users.slice(0, 5).forEach(user => {
      console.log(`   📧 ${user.email} → 🏠 ${user.kitchen_name}`);
    });
    console.log('');
    
    // 4. Testar alguns logins específicos
    console.log('4️⃣ Testando logins específicos...\n');
    
    const testLogins = [
      { email: 'apae@comsea.com', password: '123456' },
      { email: 'cidade de meninos@comsea.com', password: '123456' },
      { email: 'cozinha prato cheio becao@comsea.com', password: '123456' },
      { email: 'movimento de meninos@comsea.com', password: '123456' },
      { email: 'cozinha esperanca sul@comsea.com', password: '123456' }
    ];
    
    for (const login of testLogins) {
      try {
        const user = await authenticateUser(login.email, login.password);
        if (user) {
          console.log(`✅ Login OK: ${login.email} → ${user.kitchen_name}`);
        } else {
          console.log(`❌ Login FALHOU: ${login.email}`);
        }
      } catch (error) {
        console.log(`❌ Erro no login: ${login.email} - ${error}`);
      }
    }
    
    console.log('\n5️⃣ Testando login com credenciais inválidas...');
    
    // Testar com senha errada
    const invalidLogin = await authenticateUser('apae@comsea.com', 'senhaerrada');
    if (!invalidLogin) {
      console.log('✅ Segurança OK: Senha incorreta rejeitada');
    } else {
      console.log('❌ PROBLEMA: Senha incorreta foi aceita!');
    }
    
    // Testar com email inexistente
    const invalidEmail = await authenticateUser('emailinexistente@comsea.com', '123456');
    if (!invalidEmail) {
      console.log('✅ Segurança OK: Email inexistente rejeitado');
    } else {
      console.log('❌ PROBLEMA: Email inexistente foi aceito!');
    }
    
    console.log('\n🎉 Teste de logins concluído!');
    console.log('\n📋 Resumo:');
    console.log(`   • ${kitchens.length} cozinhas cadastradas`);
    console.log(`   • ${users.length} usuários criados`);
    console.log(`   • Todos os usuários têm senha: 123456`);
    console.log(`   • Formato de email: nomedacozinha@comsea.com`);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    console.log('\n🔧 Verifique se:');
    console.log('1. O banco de dados está rodando');
    console.log('2. A tabela users foi criada');
    console.log('3. Os usuários foram inseridos');
  }
}

// Executar teste
testKitchenLogins();
