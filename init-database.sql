-- =============================================
-- DDL para Cozinha Compartilha Rede
-- =============================================

-- Criar banco de dados
CREATE DATABASE cozinha_compartilha_rede;

-- Conectar ao banco
\c cozinha_compartilha_rede;

-- =============================================
-- TABELAS
-- =============================================

-- Tabela de cozinhas
CREATE TABLE kitchens (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    volunteers INTEGER DEFAULT 0,
    daily_meals INTEGER DEFAULT 0,
    total_meals INTEGER DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    kitchen_id INTEGER REFERENCES kitchens(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('info', 'need', 'location')) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de comentários
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de voluntários
CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    kitchen_id INTEGER REFERENCES kitchens(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'voluntario',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Tabela de doações
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    kitchen_id INTEGER REFERENCES kitchens(id) ON DELETE CASCADE,
    amount DECIMAL(10,2),
    description TEXT,
    donor_name VARCHAR(255),
    donor_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES
-- =============================================

CREATE INDEX idx_posts_kitchen_id ON posts(kitchen_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_volunteers_kitchen_id ON volunteers(kitchen_id);
CREATE INDEX idx_volunteers_is_active ON volunteers(is_active);
CREATE INDEX idx_donations_kitchen_id ON donations(kitchen_id);
CREATE INDEX idx_kitchens_location ON kitchens(location);

-- =============================================
-- DADOS INICIAIS
-- =============================================

-- Inserir cozinhas
INSERT INTO kitchens (name, description, location, contact_phone, volunteers, daily_meals, total_meals) VALUES
('APAE', 'Associação de Pais e Amigos dos Excepcionais, promovendo inclusão e alimentação digna para pessoas com deficiência e suas famílias.', 'Santana do Livramento, RS', '(55) 3242-1234', 12, 45, 32850),
('Associação de Moradores Caixa D'' do Wilson', 'Organização comunitária que fortalece vínculos através da alimentação solidária, promovendo o desenvolvimento local.', 'Santana do Livramento, RS', '(55) 3242-2345', 8, 35, 25550),
('Centro Beneficente Maria Abgahair', 'Centro de assistência social dedicado ao cuidado com famílias em situação de vulnerabilidade social.', 'Santana do Livramento, RS', '(55) 3242-3456', 15, 60, 43800),
('Cidade de Meninos', 'Projeto social focado no desenvolvimento integral de crianças e adolescentes em situação de risco social.', 'Santana do Livramento, RS', '(55) 3242-4567', 20, 80, 58400),
('Cozinha Prato Cheio (Becão)', 'Cozinha comunitária que oferece refeições nutritivas e acolhimento para famílias da comunidade local.', 'Santana do Livramento, RS', '(55) 3242-5678', 10, 50, 36500),
('Cozinha Vila Nova', 'Iniciativa local que fortalece a comunidade através da solidariedade alimentar e do trabalho voluntário.', 'Santana do Livramento, RS', '(55) 3242-6789', 14, 55, 40150),
('Cozinha da Ironda Simon Bolivar', 'Cozinha comunitária que atende famílias do bairro Simon Bolivar com refeições nutritivas e acolhimento.', 'Santana do Livramento, RS', '(55) 3242-7890', 9, 40, 29200),
('Cozinha Pai Marcos', 'Iniciativa religiosa que combina espiritualidade e solidariedade através da alimentação comunitária.', 'Santana do Livramento, RS', '(55) 3242-8901', 11, 48, 35040),
('Conferência São Vicente de Paula', 'Organização católica dedicada ao atendimento de famílias em situação de vulnerabilidade social.', 'Santana do Livramento, RS', '(55) 3242-9012', 13, 52, 37960),
('Clube de Mães Nossa Senhora', 'Grupo de mães que se unem para oferecer apoio alimentar e fortalecimento comunitário.', 'Santana do Livramento, RS', '(55) 3242-0123', 7, 30, 21900),
('Creche Santa Elvira', 'Creche comunitária que oferece educação infantil e alimentação adequada para crianças carentes.', 'Santana do Livramento, RS', '(55) 3242-1234', 16, 65, 47425),
('Creche Pai Sete', 'Centro de educação infantil que promove desenvolvimento integral através de educação e alimentação.', 'Santana do Livramento, RS', '(55) 3242-2345', 18, 70, 51100),
('CURA (Centro Umbandista de Rituais Afros)', 'Centro religioso que combina tradições afro-brasileiras com ações sociais de alimentação comunitária.', 'Santana do Livramento, RS', '(55) 3242-3456', 6, 25, 18250),
('Movimento de Meninos', 'Organização que trabalha com crianças e adolescentes em situação de rua, oferecendo acolhimento e alimentação.', 'Santana do Livramento, RS', '(55) 3242-4567', 22, 85, 62025),
('Lar de Meninas', 'Instituição que acolhe meninas em situação de vulnerabilidade, oferecendo proteção e alimentação adequada.', 'Santana do Livramento, RS', '(55) 3242-5678', 19, 75, 54750),
('Projeto Rosas de Ouro', 'Projeto social que trabalha com idosos, oferecendo atividades recreativas e alimentação balanceada.', 'Santana do Livramento, RS', '(55) 3242-6789', 5, 20, 14600),
('Projeto Tche', 'Iniciativa cultural e social que promove tradições gaúchas através de atividades comunitárias e alimentação.', 'Santana do Livramento, RS', '(55) 3242-7890', 8, 35, 25550),
('Projeto Alegria e Canção', 'Projeto que une música e solidariedade, oferecendo atividades artísticas e alimentação para a comunidade.', 'Santana do Livramento, RS', '(55) 3242-8901', 12, 45, 32850),
('SIAN', 'Sistema de Informação e Atenção à Nutrição que promove segurança alimentar e nutricional na comunidade.', 'Santana do Livramento, RS', '(55) 3242-9012', 10, 42, 30660),
('Cozinha Comunitária Centro', 'Cozinha central que atende a região central da cidade com refeições nutritivas e acolhimento.', 'Santana do Livramento, RS', '(55) 3242-0123', 14, 58, 42340),
('Cozinha Solidária Norte', 'Iniciativa que atende a zona norte da cidade, promovendo segurança alimentar e fortalecimento comunitário.', 'Santana do Livramento, RS', '(55) 3242-1234', 9, 38, 27740),
('Cozinha Esperança Sul', 'Cozinha comunitária da zona sul que oferece esperança e alimentação digna para famílias carentes.', 'Santana do Livramento, RS', '(55) 3242-2345', 17, 68, 49640);

-- Inserir posts de exemplo
INSERT INTO posts (kitchen_id, type, content, likes, comments_count) VALUES
(1, 'location', '🍽️ Distribuição hoje às 18h na Praça da Sé! Vamos servir 100 marmitas com arroz, feijão, frango e salada. Quem puder aparecer para ajudar, será muito bem-vindo!', 24, 5),
(1, 'need', '🙏 Estamos precisando de doações de: • Arroz (10kg) • Feijão (5kg) • Óleo de cozinha • Temperos • Legumes frescos. Qualquer ajuda é muito importante!', 45, 12),
(1, 'info', '❤️ Que alegria! Hoje completamos 3 anos de atividade. Já foram mais de 87 mil refeições servidas com muito amor. Obrigado a todos os voluntários e apoiadores que tornaram isso possível!', 78, 23),
(2, 'location', '📍 Nova distribuição na Rua das Flores, 123. Amanhã às 17h! Venham participar!', 15, 3),
(2, 'need', '🆘 Precisamos urgentemente de: • Leite em pó • Açúcar • Sal • Cebola • Alho', 32, 8),
(3, 'info', '🎉 Inauguração da nossa nova cozinha! Agora podemos atender ainda mais famílias da comunidade.', 67, 15);

-- Inserir comentários de exemplo
INSERT INTO comments (post_id, content, author_name, author_email) VALUES
(1, 'Que iniciativa linda! Vou tentar aparecer para ajudar.', 'Maria Silva', 'maria@email.com'),
(1, 'Parabéns pelo trabalho! Vocês são incríveis!', 'João Santos', 'joao@email.com'),
(2, 'Posso doar 5kg de arroz. Como faço para entregar?', 'Ana Costa', 'ana@email.com'),
(3, 'Muito orgulho de fazer parte desta família!', 'Pedro Lima', 'pedro@email.com');

-- Inserir voluntários de exemplo
INSERT INTO volunteers (kitchen_id, name, email, phone, role) VALUES
(1, 'Maria Silva', 'maria@email.com', '(55) 99999-1111', 'cozinheira'),
(1, 'João Santos', 'joao@email.com', '(55) 99999-2222', 'organizador'),
(1, 'Ana Costa', 'ana@email.com', '(55) 99999-3333', 'voluntaria'),
(2, 'Pedro Lima', 'pedro@email.com', '(55) 99999-4444', 'cozinheiro'),
(2, 'Carla Oliveira', 'carla@email.com', '(55) 99999-5555', 'voluntaria'),
(3, 'Roberto Silva', 'roberto@email.com', '(55) 99999-6666', 'organizador');

-- Inserir doações de exemplo
INSERT INTO donations (kitchen_id, amount, description, donor_name, donor_email) VALUES
(1, 150.00, 'Doação de arroz e feijão', 'Empresa ABC', 'contato@empresa.com'),
(1, 75.50, 'Doação de óleo e temperos', 'Maria Silva', 'maria@email.com'),
(2, 200.00, 'Doação em dinheiro', 'João Santos', 'joao@email.com'),
(3, 100.00, 'Doação de legumes e verduras', 'Mercado Central', 'contato@mercado.com');

-- =============================================
-- VERIFICAÇÕES
-- =============================================

-- Verificar se os dados foram inseridos
SELECT 'Cozinhas inseridas:' as info, COUNT(*) as total FROM kitchens;
SELECT 'Posts inseridos:' as info, COUNT(*) as total FROM posts;
SELECT 'Comentários inseridos:' as info, COUNT(*) as total FROM comments;
SELECT 'Voluntários inseridos:' as info, COUNT(*) as total FROM volunteers;
SELECT 'Doações inseridas:' as info, COUNT(*) as total FROM donations;

-- Mostrar algumas cozinhas
SELECT id, name, volunteers, daily_meals FROM kitchens LIMIT 5;

-- Mostrar posts recentes
SELECT p.id, p.type, p.content, k.name as kitchen_name, p.created_at 
FROM posts p 
JOIN kitchens k ON p.kitchen_id = k.id 
ORDER BY p.created_at DESC 
LIMIT 5;
