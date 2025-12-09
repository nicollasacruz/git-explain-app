# Modo Apresentador

## Visão Geral

O modo apresentador foi criado para facilitar a apresentação da palestra Git Flow, oferecendo uma navegação detalhada com informações extras para o apresentador.

## Diferenças entre Modo Aluno e Modo Apresentador

### Modo Aluno (USER)
- Navegação simplificada com 4 atos
- Progresso individual rastreado
- Exercícios disponíveis
- Pontuação exibida
- Checks nos atos concluídos

### Modo Apresentador (PRESENTER)
- Sidebar expandida com informações detalhadas
- Tópicos principais de cada ato
- Tempo estimado para cada seção
- Objetivos de aprendizagem
- Dicas de apresentação
- Sem tracking de progresso (foco na apresentação)

## Como Ativar o Modo Apresentador

### Opção 1: Atualizar User Existente via SQL

```sql
-- Conecte ao banco de dados PostgreSQL
psql -h 192.168.20.21 -U mecwide -d git-explain

-- Atualizar por email
UPDATE "User" SET role = 'PRESENTER' WHERE email = 'seu-email@example.com';

-- Verificar
SELECT email, name, role FROM "User";
```

### Opção 2: Via Prisma Studio

```bash
npx prisma studio
```

1. Abra a tabela `User`
2. Encontre seu usuário
3. Edite o campo `role` para `PRESENTER`
4. Salve

### Opção 3: Criar Script Node.js

Crie um arquivo `scripts/set-presenter.ts`:

```typescript
import { prisma } from '../src/lib/prisma'

async function setPresenter(email: string) {
  const user = await prisma.user.update({
    where: { email },
    data: { role: 'PRESENTER' }
  })
  
  console.log(`✅ User ${user.email} é agora PRESENTER`)
}

// Uso: tsx scripts/set-presenter.ts
setPresenter('seu-email@example.com')
  .then(() => process.exit(0))
  .catch(console.error)
```

Execute:
```bash
npm install -g tsx
tsx scripts/set-presenter.ts
```

## Recursos do Modo Apresentador

### Sidebar Detalhada

Para cada ato, o apresentador vê:

- **Emoji e Título**: Identificação visual rápida
- **Subtítulo**: Tema principal
- **Tempo Estimado**: Quanto tempo alocar
- **Objetivos**: O que a plateia deve aprender
- **Tópicos Principais**: Lista dos pontos-chave a cobrir

### Ato 1: O Caos (5-10 min)
- História do João, Maria e Pedro
- Problemas com git log caótico
- Commits ruins: "fix", "FUNCIONOU!!!", "WIP"
- Dificuldade em encontrar bugs
- Onboarding lento de novos devs

**Objetivo**: Mostrar os problemas reais de um time sem padronização

### Ato 2: A Descoberta (15-20 min)
- Conventional Commits - a gramática comum
- Tipos: feat, fix, docs, style, refactor, etc.
- Git Flow - sistema de branches
- Branches: master, develop, feature/*, release/*, hotfix/*
- Semantic Versioning - MAJOR.MINOR.PATCH
- Tags e Releases no GitHub

**Objetivo**: Apresentar as três práticas que resolvem o caos

### Ato 3: A Transformação (10-15 min)
- Histórico organizado com Git Flow
- Commits claros com Conventional Commits
- Versionamento automático
- Changelog gerado automaticamente
- Deploy mais confiável
- Comparação antes/depois

**Objetivo**: Mostrar a transformação prática no mesmo projeto

### Ato 4: O Novo Mundo (5 min)
- Resultados após 6 meses
- Expansão para outros times
- Métricas de melhoria
- Automação com GitHub Actions
- Roadmap de adoção gradual
- Call to action - começar amanhã

**Objetivo**: Inspirar e dar primeiros passos concretos

## Dicas de Apresentação

A sidebar do apresentador inclui dicas práticas:

- ✅ Comece cada ato com a história/contexto
- ✅ Use exemplos reais do dia-a-dia
- ✅ Faça perguntas à plateia
- ✅ Demo ao vivo impressiona mais

## Duração Total

**35-50 minutos** + tempo para Q&A

## Interface

### Header do Apresentador

O header mostra:
- Ícone de apresentação 📊
- Nome do apresentador
- Botão de logout

(Não mostra pontuação, pois o foco é apresentar, não aprender)

## Voltando ao Modo Aluno

Para voltar ao modo aluno:

```sql
UPDATE "User" SET role = 'USER' WHERE email = 'seu-email@example.com';
```

## Desenvolvimento

### Componentes Criados

- `NavegacaoApresentador.tsx` - Sidebar detalhada para apresentadores
- Layout atualizado para detectar role e renderizar navegação apropriada
- Tipos NextAuth atualizados para incluir role

### Schema Prisma

```prisma
model User {
  // ...
  role String @default("USER") // USER, PRESENTER
  // ...
}
```

### Migration

```bash
npx prisma migrate dev --name add_user_role
```

## Troubleshooting

### Role não está sendo reconhecido

1. Certifique-se que a migration foi executada:
   ```bash
   npx prisma migrate deploy
   ```

2. Regenere o Prisma Client:
   ```bash
   npx prisma generate
   ```

3. Faça logout e login novamente (JWT precisa ser regenerado com a nova role)

### Sidebar não muda após atualizar role

O JWT do NextAuth precisa ser regenerado. Faça logout e login novamente.

## Segurança

Por padrão, todos os novos usuários têm role `USER`. Para se tornar apresentador, é necessário atualização manual no banco de dados, garantindo que apenas usuários autorizados tenham este privilégio.
