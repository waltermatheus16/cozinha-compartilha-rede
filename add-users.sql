-- Adicionar tabela de usuários para login das cozinhas
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

-- Inserir usuários para todas as cozinhas
INSERT INTO users (kitchen_id, email, password, role) VALUES
(1, 'apae@comsea.com', '123456', 'kitchen'),
(2, 'associacaode moradores caixa d wilson@comsea.com', '123456', 'kitchen'),
(3, 'centro beneficente maria abgahair@comsea.com', '123456', 'kitchen'),
(4, 'cidade de meninos@comsea.com', '123456', 'kitchen'),
(5, 'cozinha prato cheio becao@comsea.com', '123456', 'kitchen'),
(6, 'cozinha vila nova@comsea.com', '123456', 'kitchen'),
(7, 'cozinha da ironda simon bolivar@comsea.com', '123456', 'kitchen'),
(8, 'cozinha pai marcos@comsea.com', '123456', 'kitchen'),
(9, 'conferencia sao vicente de paula@comsea.com', '123456', 'kitchen'),
(10, 'clube de maes nossa senhora@comsea.com', '123456', 'kitchen'),
(11, 'creche santa elvira@comsea.com', '123456', 'kitchen'),
(12, 'creche pai sete@comsea.com', '123456', 'kitchen'),
(13, 'cura centro umbandista de rituais afros@comsea.com', '123456', 'kitchen'),
(14, 'movimento de meninos@comsea.com', '123456', 'kitchen'),
(15, 'lar de meninas@comsea.com', '123456', 'kitchen'),
(16, 'projetorosasdeouro@comsea.com', '123456', 'kitchen'),
(17, 'projetotche@comsea.com', '123456', 'kitchen'),
(18, 'projeto alegria e cancao@comsea.com', '123456', 'kitchen'),
(19, 'sian sistema de informacao e atencao a nutricao@comsea.com', '123456', 'kitchen'),
(20, 'cozinha comunitaria centro@comsea.com', '123456', 'kitchen'),
(21, 'cozinha solidaria norte@comsea.com', '123456', 'kitchen'),
(22, 'cozinha esperanca sul@comsea.com', '123456', 'kitchen');

-- Verificar se inseriu corretamente
SELECT u.id, u.email, k.name as kitchen_name 
FROM users u 
JOIN kitchens k ON u.kitchen_id = k.id 
ORDER BY u.id;
