-- Adicionar usuário administrador
INSERT INTO users (kitchen_id, email, password, role) VALUES
(NULL, 'comsea@admin.com', '123456', 'admin');

-- Verificar se o usuário administrador foi criado
SELECT u.id, u.email, u.role, u.is_active, k.name as kitchen_name
FROM users u 
LEFT JOIN kitchens k ON u.kitchen_id = k.id 
WHERE u.email = 'comsea@admin.com';
