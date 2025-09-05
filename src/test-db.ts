import { 
  getKitchens, 
  getKitchenById, 
  getKitchenStats,
  getAllPosts,
  getVolunteersByKitchen,
  getDonationsByKitchen
} from './lib/database';

async function testConnection() {
  try {
    console.log('🔌 Testando conexão com o banco PostgreSQL...\n');
    
    // Testar conexão básica
    console.log('1️⃣ Buscando todas as cozinhas...');
    const kitchens = await getKitchens();
    console.log(`✅ Conectado! Encontradas ${kitchens.length} cozinhas\n`);
    
    // Testar busca por ID
    console.log('2️⃣ Buscando cozinha por ID...');
    const kitchen = await getKitchenById(1);
    console.log(`✅ Primeira cozinha: ${kitchen?.name}\n`);
    
    // Testar estatísticas
    console.log('3️⃣ Buscando estatísticas gerais...');
    const stats = await getKitchenStats();
    console.log(`✅ Estatísticas:`, {
      totalCozinhas: stats.total_kitchens,
      totalVoluntarios: stats.total_volunteers,
      refeicoesPorDia: stats.total_daily_meals,
      totalRefeicoes: stats.total_meals_served
    });
    console.log('');
    
    // Testar posts
    console.log('4️⃣ Buscando posts...');
    const posts = await getAllPosts(5);
    console.log(`✅ Encontrados ${posts.length} posts\n`);
    
    // Testar voluntários
    console.log('5️⃣ Buscando voluntários da primeira cozinha...');
    const volunteers = await getVolunteersByKitchen(1);
    console.log(`✅ Encontrados ${volunteers.length} voluntários\n`);
    
    // Testar doações
    console.log('6️⃣ Buscando doações da primeira cozinha...');
    const donations = await getDonationsByKitchen(1);
    console.log(`✅ Encontradas ${donations.length} doações\n`);
    
    console.log('🎉 Todos os testes passaram! O banco está funcionando perfeitamente!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
    console.log('\n🔧 Verifique se:');
    console.log('1. O container PostgreSQL está rodando: docker ps');
    console.log('2. O banco foi criado: docker exec -it app psql -U user -c "\\l"');
    console.log('3. As tabelas foram criadas: docker exec -it app psql -U user -d cozinha_compartilha_rede -c "\\dt"');
  }
}

testConnection();
