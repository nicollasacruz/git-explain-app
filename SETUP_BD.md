# Setup da Base de Dados PostgreSQL

Tens 3 opções para configurar o PostgreSQL:

---

## ✅ Opção 1: Neon (Recomendado - Cloud Grátis)

**Vantagens:**
- ✅ Grátis para sempre (até 3 projetos)
- ✅ Sem instalação local
- ✅ Setup em 2 minutos
- ✅ Branching de BD (útil para testes)

**Passos:**

1. **Criar conta:** https://neon.tech
2. **Criar projeto:**
   - Nome: `gitflow-explain`
   - Região: Europe (Frankfurt)
3. **Copiar connection string:**
   ```
   postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

4. **Adicionar ao `.env`:**
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require"
   ```

5. **Executar migração:**
   ```bash
   cd /Users/nicollascruz/projects/git-flow-explain
   npx prisma generate
   npx prisma migrate dev --name init
   ```

---

## Opção 2: Supabase (Cloud Grátis + Auth)

**Vantagens:**
- ✅ Grátis (até 500MB)
- ✅ Inclui Auth e Storage
- ✅ Interface visual (Supabase Studio)

**Passos:**

1. **Criar conta:** https://supabase.com
2. **Criar projeto:**
   - Nome: `gitflow-explain`
   - Password da BD: (guarda bem!)
   - Região: Europe (Frankfurt)
3. **Obter connection string:**
   - Ir em Settings → Database
   - Connection String (URI)
   - Session mode: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`

4. **Adicionar ao `.env`:**
   ```bash
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres"
   ```

5. **Executar migração:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

---

## Opção 3: PostgreSQL Local (macOS)

**Vantagens:**
- ✅ Controlo total
- ✅ Funciona offline
- ✅ Sem limites

**Desvantagens:**
- ❌ Requer instalação
- ❌ Configuração manual

**Passos:**

### 1. Instalar PostgreSQL

```bash
# Com Homebrew
brew install postgresql@16

# Iniciar serviço
brew services start postgresql@16

# Adicionar ao PATH (adicionar ao ~/.zshrc)
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verificar
psql --version
```

### 2. Criar Base de Dados

```bash
# Criar utilizador
createuser gitflow_user -P
# Introduzir password: gitflow_pass

# Criar BD
createdb gitflow_explain -O gitflow_user

# Testar conexão
psql -U gitflow_user -d gitflow_explain -h localhost
```

### 3. Configurar `.env`

```bash
DATABASE_URL="postgresql://gitflow_user:gitflow_pass@localhost:5432/gitflow_explain"
```

### 4. Executar Migração

```bash
cd /Users/nicollascruz/projects/git-flow-explain
npx prisma generate
npx prisma migrate dev --name init
```

---

## 🔧 Após Configurar (Qualquer Opção)

### 1. Gerar NextAuth Secret

```bash
openssl rand -base64 32
```

Copiar output e adicionar ao `.env`:
```bash
NEXTAUTH_SECRET="o-secret-gerado-aqui"
```

### 2. Testar Conexão

```bash
npx prisma studio
```

Abre interface visual em `http://localhost:5555`

### 3. Seed da BD (Opcional)

Criar utilizador de teste:

```bash
# Criar ficheiro seed
cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar utilizador de teste
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'teste@gitflow.app' },
    update: {},
    create: {
      email: 'teste@gitflow.app',
      name: 'Utilizador Teste',
      password: hashedPassword,
    },
  })

  // Criar progresso inicial
  await prisma.progress.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      atoAtual: 1,
      exerciciosCompletos: [],
      pontuacaoTotal: 0,
    },
  })

  console.log('✅ Seed completo!')
  console.log('Email: teste@gitflow.app')
  console.log('Password: password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF

# Adicionar ao package.json
npm pkg set prisma.seed="tsx prisma/seed.ts"

# Instalar tsx
npm install -D tsx

# Executar seed
npx prisma db seed
```

---

## ✅ Checklist Final

- [ ] BD PostgreSQL configurada (Neon/Supabase/Local)
- [ ] `.env` com `DATABASE_URL`
- [ ] `NEXTAUTH_SECRET` gerado
- [ ] `npx prisma generate` executado
- [ ] `npx prisma migrate dev --name init` executado
- [ ] `npx prisma studio` funciona
- [ ] (Opcional) Seed executado

---

## 🐛 Troubleshooting

### Erro: "Can't reach database server"
- Verificar se PostgreSQL está a correr (local)
- Verificar connection string (cloud)
- Verificar firewall/SSL

### Erro: "P1001: Can't reach database"
- Connection string errada no `.env`
- BD não existe ainda

### Erro: "SSL connection required"
- Adicionar `?sslmode=require` ao final da connection string

### Erro: "Authentication failed"
- Password errada na connection string
- Utilizador não existe

---

## 📚 Recursos

- [Neon Docs](https://neon.tech/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
