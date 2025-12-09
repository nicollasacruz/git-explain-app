# 🌿 Git Flow Explain - Aplicação Web Interativa

Palestra interativa sobre **Git Flow, Conventional Commits e Semantic Versioning** com correção de exercícios via Claude AI.

---

## 📋 Stack Tecnológica

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Base de Dados:** PostgreSQL + Prisma ORM
- **Autenticação:** NextAuth.js
- **IA:** Claude API (Anthropic)
- **Animações:** Framer Motion
- **Idioma:** Português de Portugal 🇵🇹

---

## 🚀 Setup Inicial

### 1. Pré-requisitos

```bash
Node.js 18+
PostgreSQL (local ou cloud)
npm ou yarn
```

### 2. Instalação

```bash
# Clone o repositório
cd /Users/nicollascruz/projects/git-flow-explain

# Instalar dependências (já feito)
npm install

# Copiar ficheiro de ambiente
cp .env.example .env
```

### 3. Configurar Variáveis de Ambiente

Editar `.env` com as tuas credenciais:

```bash
# Base de Dados PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/gitflow_explain"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="" # Gerar com: openssl rand -base64 32

# Claude API
ANTHROPIC_API_KEY="sk-ant-..." # Obter em https://console.anthropic.com
```

### 4. Criar Base de Dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migração (cria as tabelas)
npx prisma migrate dev --name init

# (Opcional) Abrir interface visual do BD
npx prisma studio
```

### 5. Executar em Desenvolvimento

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Estrutura do Projeto

```
git-flow-explain/
├── prisma/
│   └── schema.prisma          # 6 modelos (User, Progress, Submission, etc)
├── public/
│   └── images/                # Imagens DALL-E (a gerar)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/         # Página de login
│   │   │   └── register/      # Página de registo
│   │   ├── (palestra)/        # 4 atos (a criar)
│   │   ├── (exercicios)/      # 8 exercícios (a criar)
│   │   ├── api/
│   │   │   └── auth/          # NextAuth + Register
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/                # 5 componentes base
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── claude.ts          # Cliente Claude API
│   │   ├── prisma.ts          # Cliente Prisma
│   │   └── utils.ts           # Utilidades
│   └── types/
│       └── index.ts           # Tipos TypeScript
├── .env                       # Credenciais (não commitar!)
├── PROGRESSO.md               # Acompanhamento detalhado
└── RESUMO_SESSAO.md           # Resumo desta sessão
```

---

## 🎨 Paleta de Cores

### Cores Principais
- **Azul Escuro:** `#1a365d` (fundo)
- **Dourado:** `#d69e2e` (CTAs e destaques)
- **Verde Sucesso:** `#38a169`
- **Vermelho Erro:** `#e53e3e`

### Tipos de Commit
- `feat`: Verde `#38a169`
- `fix`: Vermelho `#e53e3e`
- `docs`: Azul `#3182ce`
- `style`: Roxo `#9f7aea`
- `refactor`: Laranja `#ed8936`
- `test`: Teal `#38b2ac`
- `chore`: Cinza `#718096`
- `perf`: Amarelo `#d69e2e`
- `ci`: Azul Escuro `#667eea`
- `build`: Rosa `#ed64a6`

---

## 🧩 Funcionalidades Implementadas

### ✅ Fase 1: Fundação (CONCLUÍDA)

- [x] Sistema de autenticação completo (login/registo)
- [x] Landing page com hero e CTAs
- [x] 5 componentes UI reutilizáveis
- [x] Schema Prisma com 6 modelos
- [x] Cliente Claude API com 4 funções
- [x] Tipos TypeScript completos
- [x] Paleta de cores implementada

### ⏳ Em Desenvolvimento

- [ ] Layout da palestra com sidebar
- [ ] 4 atos narrativos
- [ ] 8 exercícios interativos
- [ ] Endpoints de IA para correção
- [ ] Sistema de progresso do utilizador
- [ ] Modo apresentador

---

## 🤖 Integração com Claude API

### Modelos Utilizados

| Funcionalidade | Modelo | Custo Estimado |
|----------------|--------|----------------|
| Quiz (explicações) | Claude 3.5 Haiku | ~$0.005/utilizador |
| Análise de commits | Claude 3.5 Sonnet | ~$0.045/utilizador |
| OCR Screenshots | Claude 3.5 Sonnet (Vision) | ~$0.08/utilizador |
| **Total por sessão** | | **~$0.13** |

### Funções Disponíveis

```typescript
// 1. Explicar erro em quiz
explicarTipoCommit(cenario, respostaUtilizador, respostaCorreta)

// 2. Analisar mensagem escrita
analisarMensagemCommit(commitOriginal, reescrita, contexto)

// 3. Validar screenshot do terminal
validarScreenshot(imagemBase64, acoesEsperadas)

// 4. Avaliar changelog gerado
avaliarChangelog(commits, changelogUtilizador)
```

---

## 📊 Modelos da Base de Dados

### User
- `id`, `email`, `name`, `password`
- Relações: Progress (1:1), Submissions (1:N)

### Progress
- `userId`, `atoAtual`, `exerciciosCompletos[]`, `pontuacaoTotal`
- Tracking do progresso individual

### Submission
- `userId`, `exercicioId`, `resposta`, `pontuacao`, `feedback`
- Histórico de submissões

### PalestraSession
- `codigo`, `atoAtual`, `ativo`
- Para modo apresentador (sync em grupo)

---

## 🎯 Exercícios Planeados

1. **Classifica o Commit** - Quiz de 8 questões
2. **Reescreve o Commit** - Input livre com análise IA
3. **Simulação Git Flow** - Cenários interativos
4. **Code Review** - Identificar problemas em histórico
5. **Próxima Versão** - Calcular SemVer
6. **Tag & Release** - Upload de screenshot + OCR
7. **Simulação Release** - Gerar changelog e versão
8. **Changelog Reverso** - Criar changelog a partir de commits

---

## 🖼️ Imagens a Gerar (DALL-E)

### Prompts Prontos

Ver ficheiro [PROGRESSO.md](PROGRESSO.md:1) secção "Prompts DALL-E para Imagens" para os 10 prompts completos.

### Salvar em:
```
/public/images/
├── hero.png              # Landing page
├── ato-1-caos.png
├── ato-2-descoberta.png
├── ato-2-gitflow.png
├── ato-2-semver.png
├── ato-3-transformacao.png
├── ato-4-novo-mundo.png
├── exercicios-quiz.png
├── exercicios-terminal.png
└── mascote.png
```

---

## 📝 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev em localhost:3000

# Prisma
npx prisma studio        # Interface visual do BD
npx prisma generate      # Re-gerar cliente após mudanças no schema
npx prisma migrate dev   # Criar nova migração
npx prisma migrate reset # Reset completo do BD (cuidado!)

# Build para Produção
npm run build
npm run start

# Linting
npm run lint
```

---

## 🔐 Segurança

- Passwords hash com `bcrypt` (10 rounds)
- Sessions geridas pelo NextAuth.js
- CSRF protection automático
- Validação de inputs em todas as rotas
- Rate limiting recomendado para produção

---

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Claude API](https://docs.anthropic.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow Original](https://nvie.com/posts/a-successful-git-branching-model/)

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Erro: "Invalid `prisma.user.create()` invocation"
```bash
# Verificar se a migração foi executada
npx prisma migrate status
npx prisma migrate deploy
```

### Erro: "NEXTAUTH_SECRET not set"
```bash
# Gerar secret
openssl rand -base64 32
# Adicionar ao .env
```

### Port 3000 já em uso
```bash
# Matar processo
lsof -ti:3000 | xargs kill -9
# Ou usar porta diferente
npm run dev -- -p 3001
```

---

## 📞 Contacto

Para questões ou sugestões sobre o projeto, consulta o ficheiro [PROGRESSO.md](PROGRESSO.md:1).

---

**Status:** Em Desenvolvimento (Fase 1 ✅ | Fase 2 ⏳)
**Última Atualização:** 9 de Dezembro de 2024
