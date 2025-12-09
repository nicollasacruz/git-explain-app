-- Script para atualizar role de um user específico para PRESENTER
-- Execute este script no banco de dados para transformar um user em apresentador

-- Exemplo: atualizar por email
-- UPDATE "User" SET role = 'PRESENTER' WHERE email = 'apresentador@example.com';

-- Ou atualizar por ID
-- UPDATE "User" SET role = 'PRESENTER' WHERE id = 'USER_ID_AQUI';

-- Ver todos os users e suas roles
SELECT id, email, name, role FROM "User";
