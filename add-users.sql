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
(2, 'caixadwilson@comsea.com', '123456', 'kitchen'),
(3, 'mariabgahair@comsea.com', '123456', 'kitchen'),
(4, 'cidademeninos@comsea.com', '123456', 'kitchen'),
(5, 'pratocheio@comsea.com', '123456', 'kitchen'),
(6, 'vilanova@comsea.com', '123456', 'kitchen'),
(7, 'simonbolivar@comsea.com', '123456', 'kitchen'),
(8, 'paimarcos@comsea.com', '123456', 'kitchen'),
(9, 'vicentedepaula@comsea.com', '123456', 'kitchen'),
(10, 'nossasenhora@comsea.com', '123456', 'kitchen'),
(11, 'santaelvira@comsea.com', '123456', 'kitchen'),
(12, 'paisete@comsea.com', '123456', 'kitchen'),
(13, 'cura@comsea.com', '123456', 'kitchen'),
(14, 'movimentomeninos@comsea.com', '123456', 'kitchen'),
(15, 'larmeninas@comsea.com', '123456', 'kitchen'),
(16, 'rosasouro@comsea.com', '123456', 'kitchen'),
(17, 'projetotche@comsea.com', '123456', 'kitchen'),
(18, 'alegriacancao@comsea.com', '123456', 'kitchen'),
(19, 'sian@comsea.com', '123456', 'kitchen'),
(20, 'centro@comsea.com', '123456', 'kitchen'),
(21, 'norte@comsea.com', '123456', 'kitchen'),
(22, 'sul@comsea.com', '123456', 'kitchen');

-- Verificar se inseriu corretamente
SELECT u.id, u.email, k.name as kitchen_name 
FROM users u 
JOIN kitchens k ON u.kitchen_id = k.id 
ORDER BY u.id;
