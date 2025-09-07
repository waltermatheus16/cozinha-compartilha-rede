-- Adicionar COMSEA como cozinha especial (ID 0)
INSERT INTO kitchens (id, name, description, location, contact_phone, contact_email, volunteers, daily_meals, total_meals) VALUES
(0, 'COMSEA - Conselho Municipal de Segurança Alimentar', 'Conselho Municipal de Segurança Alimentar e Nutricional de Santana do Livramento. Coordena e articula as políticas públicas de segurança alimentar e nutricional no município, promovendo o direito humano à alimentação adequada e saudável.', 'Santana do Livramento, RS', '(55) 3242-0000', 'comsea@admin.com', 50, 0, 0);

-- Atualizar usuário administrador para referenciar a cozinha COMSEA
UPDATE users SET kitchen_id = 0 WHERE email = 'comsea@admin.com';

-- Verificar se foi criado corretamente
SELECT u.id, u.email, u.role, k.name as kitchen_name, k.description
FROM users u 
LEFT JOIN kitchens k ON u.kitchen_id = k.id 
WHERE u.email = 'comsea@admin.com';
