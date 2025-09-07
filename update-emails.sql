-- Atualizar emails das cozinhas para versões mais simples
UPDATE users SET email = 'apae@comsea.com' WHERE kitchen_id = 1;
UPDATE users SET email = 'caixadwilson@comsea.com' WHERE kitchen_id = 2;
UPDATE users SET email = 'mariabgahair@comsea.com' WHERE kitchen_id = 3;
UPDATE users SET email = 'cidademeninos@comsea.com' WHERE kitchen_id = 4;
UPDATE users SET email = 'pratocheio@comsea.com' WHERE kitchen_id = 5;
UPDATE users SET email = 'vilanova@comsea.com' WHERE kitchen_id = 6;
UPDATE users SET email = 'simonbolivar@comsea.com' WHERE kitchen_id = 7;
UPDATE users SET email = 'paimarcos@comsea.com' WHERE kitchen_id = 8;
UPDATE users SET email = 'vicentedepaula@comsea.com' WHERE kitchen_id = 9;
UPDATE users SET email = 'nossasenhora@comsea.com' WHERE kitchen_id = 10;
UPDATE users SET email = 'santaelvira@comsea.com' WHERE kitchen_id = 11;
UPDATE users SET email = 'paisete@comsea.com' WHERE kitchen_id = 12;
UPDATE users SET email = 'cura@comsea.com' WHERE kitchen_id = 13;
UPDATE users SET email = 'movimentomeninos@comsea.com' WHERE kitchen_id = 14;
UPDATE users SET email = 'larmeninas@comsea.com' WHERE kitchen_id = 15;
UPDATE users SET email = 'rosasouro@comsea.com' WHERE kitchen_id = 16;
UPDATE users SET email = 'projetotche@comsea.com' WHERE kitchen_id = 17;
UPDATE users SET email = 'alegriacancao@comsea.com' WHERE kitchen_id = 18;
UPDATE users SET email = 'sian@comsea.com' WHERE kitchen_id = 19;
UPDATE users SET email = 'centro@comsea.com' WHERE kitchen_id = 20;
UPDATE users SET email = 'norte@comsea.com' WHERE kitchen_id = 21;
UPDATE users SET email = 'sul@comsea.com' WHERE kitchen_id = 22;

-- Verificar se as atualizações foram feitas corretamente
SELECT u.id, u.email, k.name as kitchen_name 
FROM users u 
JOIN kitchens k ON u.kitchen_id = k.id 
ORDER BY u.kitchen_id;
