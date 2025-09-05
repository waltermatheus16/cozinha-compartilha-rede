-- Limpar cozinhas duplicadas
-- Manter apenas as cozinhas com ID de 1 a 22 (as originais)

-- Deletar cozinhas duplicadas (IDs 23 em diante)
DELETE FROM kitchens WHERE id > 22;

-- Verificar resultado
SELECT COUNT(*) as total_kitchens FROM kitchens;
SELECT id, name FROM kitchens ORDER BY id;
