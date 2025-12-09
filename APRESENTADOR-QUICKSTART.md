# 🎤 Modo Apresentador - Guia Rápido

## Ativar Modo Apresentador

### Opção 1: Via Script (Recomendado)

```bash
# Listar todos os utilizadores
npm run presenter:list

# Definir um utilizador como apresentador
npm run presenter:set seu-email@example.com

# Remover privilégios de apresentador
npm run presenter:remove seu-email@example.com
```

### Opção 2: Via SQL Direto

```bash
# Conectar à base de dados
psql -h 192.168.20.21 -U mecwide -d git-explain

# Executar SQL
UPDATE "User" SET role = 'PRESENTER' WHERE email = 'seu-email@example.com';
```

### Opção 3: Via Prisma Studio

```bash
npx prisma studio
```

Edite o campo `role` do utilizador para `PRESENTER`.

## ⚠️ Importante

**Após alterar a role, o utilizador DEVE fazer logout e login novamente** para a mudança ter efeito (o JWT precisa ser regenerado).

## O que Muda no Modo Apresentador

### Sidebar Expandida
- Tópicos detalhados de cada ato
- Tempo estimado para cada seção
- Objetivos de aprendizagem
- Dicas de apresentação

### Header Diferente
- Ícone de apresentação 🎤
- Sem tracking de pontuação
- Foco na apresentação

### Informações por Ato

**Ato 1: O Caos** (5-10 min)
- História do caos
- Problemas de commits ruins
- Impacto no time

**Ato 2: A Descoberta** (15-20 min)
- Conventional Commits
- Git Flow
- Semantic Versioning
- Tags e Releases

**Ato 3: A Transformação** (10-15 min)
- Antes vs Depois
- Resultados práticos
- Automação

**Ato 4: O Novo Mundo** (5 min)
- Expansão para outros times
- Métricas de melhoria
- Call to action

**Duração Total: 35-50 minutos** + Q&A

## Testar

1. Execute `npm run presenter:list` para ver seus utilizadores
2. Execute `npm run presenter:set seu-email@example.com`
3. Faça logout da aplicação
4. Faça login novamente
5. A sidebar agora deve estar no modo apresentador! 🎉
