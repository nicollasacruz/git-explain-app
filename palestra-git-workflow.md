# Palestra: Git Flow, Conventional Commits & Semantic Versioning

*Usando GitHub*

---

## 🧠 MIND MAP

```
                              ┌──────────────────────────┐
                              │        GIT FLOW          │
                              │   (Vincent Driessen)     │
                              └────────────┬─────────────┘
                                           │
       ┌───────────────┬───────────────────┼───────────────────┬───────────────┐
       │               │                   │                   │               │
       ▼               ▼                   ▼                   ▼               ▼
┌────────────┐  ┌────────────┐     ┌────────────┐      ┌────────────┐  ┌────────────┐
│  BRANCHES  │  │  COMMITS   │     │    PULL    │      │   SEMVER   │  │  RELEASES  │
│  PRINCIPAIS│  │            │     │  REQUESTS  │      └─────┬──────┘  └─────┬──────┘
└─────┬──────┘  └─────┬──────┘     └─────┬──────┘            │               │
      │               │                  │                   │               │
      ▼               ▼                  ▼                   ▼               ▼
┌──────────┐    ┌──────────┐      ┌──────────┐        ┌──────────┐    ┌──────────┐
│master    │    │Conven-   │      │feature →│        │ MAJOR.   │    │GitHub    │
│develop   │    │tional    │      │ develop │        │ MINOR.   │    │Tags      │
│feature/* │    │Commits   │      │release →│        │ PATCH    │    │Releases  │
│release/* │    │          │      │ master  │        │          │    │Changelog │
│hotfix/*  │    │          │      │hotfix → │        │          │    │          │
└──────────┘    └──────────┘      │ master  │        └──────────┘    └──────────┘
                     │            └──────────┘             │
                     │                                     │
     ┌───────────────┼───────────────┐         ┌──────────┼──────────┐
     │               │               │         │          │          │
     ▼               ▼               ▼         ▼          ▼          ▼
┌─────────┐    ┌─────────┐    ┌─────────┐ ┌───────┐ ┌───────┐ ┌───────┐
│  TIPO   │    │ ESCOPO  │    │MENSAGEM │ │MAJOR  │ │MINOR  │ │PATCH  │
│feat/fix │    │[módulo] │    │Imperat. │ │Break. │ │feat   │ │fix    │
│docs/... │    │opcional │    │Claro    │ │Change │ │       │ │       │
└─────────┘    └─────────┘    └─────────┘ └───────┘ └───────┘ └───────┘
```

### Conexões do Mind Map Detalhadas

```
CONVENTIONAL COMMITS
├── Estrutura: <tipo>[escopo]: <descrição>
│   ├── tipo → feat, fix, docs, style, refactor, test, chore, perf, ci, build
│   ├── escopo → componente, módulo, área afetada
│   └── descrição → verbo imperativo, máx ~50 chars
│
├── Benefícios
│   ├── Changelog automático
│   ├── Comunicação clara no time
│   ├── Histórico navegável
│   └── Versionamento automático (SemVer)
│
└── Breaking Changes
    └── feat!: ou BREAKING CHANGE: no footer → dispara MAJOR


SEMANTIC VERSIONING (SemVer)
├── Formato: MAJOR.MINOR.PATCH (ex: 2.1.3)
│
├── Quando incrementar?
│   ├── MAJOR (2.0.0) → Breaking changes, incompatibilidade
│   │   └── Gatilho: feat!: ou BREAKING CHANGE no commit
│   │
│   ├── MINOR (1.1.0) → Nova funcionalidade, compatível
│   │   └── Gatilho: feat: no commit
│   │
│   └── PATCH (1.0.1) → Correção de bug, compatível
│       └── Gatilho: fix: no commit
│
├── Pre-releases
│   ├── Alpha: 1.0.0-alpha.1 (muito instável)
│   ├── Beta: 1.0.0-beta.1 (testando)
│   └── RC: 1.0.0-rc.1 (candidato a release)
│
└── Regras de Ouro
    ├── Começar em 0.1.0 (desenvolvimento inicial)
    ├── 1.0.0 = primeira versão estável/pública
    └── Nunca alterar versão já publicada


GIT FLOW (Vincent Driessen)
├── Branches Permanentes (nunca deletar)
│   ├── master → código em PRODUÇÃO (só recebe merges)
│   │   └── Cada merge = uma versão (tag)
│   └── develop → integração contínua (base para features)
│       └── Sempre atualizada com últimas features
│
├── Branches de Suporte (temporárias)
│   ├── feature/* → novas funcionalidades
│   │   ├── Origem: develop
│   │   ├── Destino: develop
│   │   └── Naming: feature/nome-da-feature
│   │
│   ├── release/* → preparação de versão
│   │   ├── Origem: develop
│   │   ├── Destino: master E develop
│   │   ├── Naming: release/v1.2.0
│   │   └── Só fix de bugs, sem features novas
│   │
│   └── hotfix/* → correções urgentes em produção
│       ├── Origem: master
│       ├── Destino: master E develop
│       ├── Naming: hotfix/descricao-bug
│       └── Gera PATCH na versão
│
├── Fluxo de Trabalho
│   │
│   │  feature/*        release/*         hotfix/*
│   │      │                │                 │
│   │      │                │                 │
│   │      ▼                ▼                 │
│   │  ┌───────┐        ┌───────┐            │
│   │  │develop│◀───────│       │            │
│   │  └───┬───┘        └───┬───┘            │
│   │      │                │                 │
│   │      │                ▼                 ▼
│   │      │            ┌───────┐        ┌───────┐
│   │      │            │master │◀───────│       │
│   │      │            └───┬───┘        └───────┘
│   │      │                │
│   │      │                ▼
│   │      │            [TAG v1.x.x]
│   │
│   └── Regra de Ouro: NUNCA commitar direto em master ou develop!
│
└── Comandos Git Flow (se usar extensão)
    ├── git flow init
    ├── git flow feature start nome
    ├── git flow feature finish nome
    ├── git flow release start v1.2.0
    ├── git flow release finish v1.2.0
    ├── git flow hotfix start fix-bug
    └── git flow hotfix finish fix-bug
```

---

## 📖 STORYTELLING - Roteiro da Palestra

### Ato 1: O Caos (5-10 min)
**"Era uma vez um time de devs..."**

Comece com uma história real ou fictícia:

> "João chegou na segunda-feira e fez `git pull`. O código quebrou. Maria tinha commitado 'ajustes finais' na sexta. Pedro tinha feito 'correções' no sábado. Ninguém sabia o que cada um tinha mudado. O deploy de segunda foi adiado. Familiar?"

**Perguntas provocativas:**
- Quem já passou horas tentando entender um commit chamado "fix"?
- Quem já teve medo de fazer merge na main?
- Quem já perdeu código por conflito mal resolvido?

**Mostre o problema visualmente:**
```
# O histórico do caos
* a1b2c3d - fix (3 hours ago)
* e4f5g6h - ajustes (5 hours ago)  
* i7j8k9l - WIP (1 day ago)
* m0n1o2p - correções finais v2 (1 day ago)
* q3r4s5t - correções finais (2 days ago)
* u6v7w8x - funciona agora (2 days ago)
```

---

### Ato 2: A Descoberta (15-20 min)
**"Existe um jeito melhor..."**

#### Parte 1: Conventional Commits - A Linguagem Comum

Apresente como uma "gramática" que todos falam:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[footer opcional]
```

**Os Tipos - Use analogias:**
- `feat` → Construir um quarto novo na casa
- `fix` → Consertar o cano que vazava
- `docs` → Atualizar a planta da casa
- `style` → Pintar as paredes (sem mudar estrutura)
- `refactor` → Reorganizar os móveis (mesma funcionalidade)
- `test` → Instalar alarme de segurança
- `chore` → Limpar a garagem
- `perf` → Trocar a escada por elevador
- `ci` → Automatizar a rega do jardim
- `build` → Trocar o material de construção

**Exemplos práticos do dia-a-dia:**
```bash
# ❌ Ruim
git commit -m "fix"
git commit -m "ajustes no login"
git commit -m "Pedro pediu pra mudar"

# ✅ Bom  
git commit -m "fix(auth): corrigir validação de token expirado"
git commit -m "feat(dashboard): adicionar gráfico de vendas mensais"
git commit -m "refactor(api): extrair lógica de parsing para service"
```

#### Parte 2: Git Flow - O Sistema de Branches

**Analogia da Fábrica:**
- `master` → Loja (produto final, só o que está pronto para vender)
- `develop` → Linha de montagem (integração de todas as peças)
- `feature/*` → Bancadas de trabalho (cada dev trabalha numa peça)
- `release/*` → Controle de qualidade (últimos ajustes antes de ir pra loja)
- `hotfix/*` → Recall de emergência (corrigir produto já vendido)

**Fluxo visual do Git Flow:**
```
                                                    Tags
                                                     │
master   ────●───────────────────●───────────────────●────────●──→
              \                 /                   / \      /
               \    (release) /                   /   \    /
                \            /                   /     \  /
develop  ────────●───●───●──●───●───●───●───●──●───●───●──●───●──→
                  \     /       \       /           \     /
                   \   /         \     /             \   /
feature/A           ●─●           \   /               \ /
                                   \ /                 ●
feature/B                           ●─●               /
                                                     /
hotfix/critical                                     ●────●
                                                         │
                                            (merge em master E develop)
```

**Ciclo de vida de uma Feature:**
```bash
# 1. Criar feature a partir de develop
git checkout develop
git pull origin develop
git checkout -b feature/adicionar-cupom

# 2. Desenvolver e commitar
git commit -m "feat(cart): adicionar input de cupom"
git commit -m "feat(cart): validar cupom via API"
git commit -m "test(cart): adicionar testes de cupom"

# 3. Push e Pull Request para develop
git push origin feature/adicionar-cupom
# No GitHub: PR feature/adicionar-cupom → develop

# 4. Após aprovação: Merge e deletar branch
git checkout develop
git merge feature/adicionar-cupom
git branch -d feature/adicionar-cupom
```

**Ciclo de vida de uma Release:**
```bash
# 1. Criar release a partir de develop
git checkout develop
git checkout -b release/v1.2.0

# 2. Apenas bug fixes e preparação (bump de versão, changelog)
git commit -m "chore(release): bump version to 1.2.0"
git commit -m "fix(cart): corrigir validação de cupom vazio"

# 3. Merge em master E develop
git checkout master
git merge release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"

git checkout develop
git merge release/v1.2.0

# 4. Push tudo
git push origin master develop --tags
git branch -d release/v1.2.0
```

**Ciclo de vida de um Hotfix:**
```bash
# 1. Criar hotfix a partir de master (URGENTE!)
git checkout master
git checkout -b hotfix/corrigir-pagamento

# 2. Corrigir e commitar
git commit -m "fix(payment): corrigir timeout em PIX"

# 3. Merge em master E develop (para não perder o fix)
git checkout master
git merge hotfix/corrigir-pagamento
git tag -a v1.2.1 -m "Hotfix v1.2.1"

git checkout develop
git merge hotfix/corrigir-pagamento

# 4. Push tudo
git push origin master develop --tags
git branch -d hotfix/corrigir-pagamento
```

**Regras de Ouro do Git Flow:**
1. **NUNCA** commitar direto em `master` ou `develop`
2. `master` = espelho da produção (cada commit é uma versão)
3. `develop` = sempre funcional (CI passa)
4. Features saem de `develop`, voltam para `develop`
5. Releases saem de `develop`, vão para `master` E `develop`
6. Hotfixes saem de `master`, vão para `master` E `develop`

---

#### Parte 3: Semantic Versioning - O Contrato com o Usuário

**A analogia do contrato:**
> "Imagine que sua API é um contrato. Cada versão é uma promessa. Se você quebrar a promessa, o cliente (usuário) precisa saber."

**O formato: MAJOR.MINOR.PATCH**

```
    v 2  .  1  .  3
      │     │     │
      │     │     └── PATCH: Consertei algo (bug fix)
      │     │         → Pode atualizar sem medo
      │     │
      │     └──────── MINOR: Adicionei algo novo
      │               → Pode atualizar, nada quebra
      │
      └────────────── MAJOR: Mudei algo que quebra
                      → CUIDADO! Leia o changelog
```

**Conectando com Conventional Commits:**

| Commit | Versão Atual | Nova Versão | Por quê? |
|--------|--------------|-------------|----------|
| `fix(api): corrigir timeout` | 1.2.3 | 1.2.**4** | Bug fix = PATCH |
| `feat(user): adicionar avatar` | 1.2.4 | 1.**3**.0 | Feature = MINOR (zera PATCH) |
| `feat!: mudar formato da API` | 1.3.0 | **2**.0.0 | Breaking = MAJOR (zera tudo) |

**Exemplos reais que a plateia conhece:**
- React 17 → 18 (MAJOR): Mudou concurrent rendering
- Node 18.1.0 → 18.2.0 (MINOR): Adicionou fetch nativo
- npm 9.0.0 → 9.0.1 (PATCH): Corrigiu bug de instalação

---

#### Parte 4: Tags e Releases no GitHub

**O que é uma Tag?**
> "É um marcador permanente num commit. Como colocar um post-it dizendo: 'Este é o v1.0.0'"

**Criando tags via linha de comando:**
```bash
# Tag anotada (recomendada) - guarda autor, data, mensagem
git tag -a v1.2.0 -m "Release v1.2.0 - Cupom de desconto"

# Enviar tag para o GitHub
git push origin v1.2.0

# Enviar todas as tags
git push origin --tags

# Listar tags
git tag -l "v1.*"

# Ver detalhes de uma tag
git show v1.2.0
```

**Criando Release no GitHub (UI):**
1. Vá em **Releases** → **Draft a new release**
2. Escolha a tag (ou crie uma nova)
3. Título: `v1.2.0 - Nome da Release`
4. Descrição: Changelog automático ou manual
5. **Generate release notes** → GitHub gera automaticamente!
6. Publish release

**Anatomia de uma boa Release:**
```markdown
## v1.2.0 - Cupom de Desconto (2024-01-15)

### ✨ Novidades
- Adicionado sistema de cupom de desconto no carrinho (#123)
- Novo endpoint para validação de cupom (#124)

### 🐛 Correções
- Corrigido cálculo de frete para região Sul (#120)
- Corrigido timeout em pagamentos PIX (#121)

### ⚠️ Breaking Changes
- Nenhum

### 📦 Dependências
- Atualizado React de 18.1 para 18.2

**Full Changelog**: https://github.com/user/repo/compare/v1.1.0...v1.2.0
```

---

### Ato 3: A Transformação (10-15 min)
**"Veja a diferença..."**

**O mesmo histórico, agora organizado com Git Flow:**
```
* a1b2c3d (HEAD -> master, tag: v1.2.0) Merge branch 'release/v1.2.0'
|\
| * e4f5g6h (release/v1.2.0) chore(release): bump version to 1.2.0
| * i7j8k9l fix(cart): corrigir validação de cupom vazio
|/
* m0n1o2p (tag: v1.1.1) Merge branch 'hotfix/corrigir-frete'
|\
| * q3r4s5t fix(checkout): corrigir cálculo de frete para SP
|/
* u6v7w8x (tag: v1.1.0) Merge branch 'release/v1.1.0'

--- develop ---
* a1b2c3d Merge branch 'release/v1.2.0' into develop
* f1g2h3i Merge branch 'feature/cupom-desconto' into develop
|\
| * j4k5l6m feat(cart): adicionar cupom de desconto (#123)
| * n7o8p9q feat(cart): validar cupom via API
| * r1s2t3u test(cart): adicionar testes de cupom
|/
* v4w5x6y Merge branch 'hotfix/corrigir-frete' into develop
```

**O ciclo completo no Git Flow + GitHub:**
```
1. Issue #123: "Adicionar cupom de desconto"
        ↓
2. Branch: feature/cupom-desconto (a partir de develop)
        ↓
3. Commits:
   - feat(cart): adicionar input de cupom
   - feat(cart): validar cupom via API
   - test(cart): testes para cupom
        ↓
4. Pull Request: feature/cupom-desconto → develop
        ↓
5. Code Review → Aprovado → Merge
        ↓
6. Quando pronto para release:
   Branch: release/v1.2.0 (a partir de develop)
        ↓
7. Testes finais, bump de versão, changelog
        ↓
8. PR: release/v1.2.0 → master (E merge em develop também)
        ↓
9. Tag: v1.2.0 em master
        ↓
10. GitHub Release com changelog automático
        ↓
11. Deploy automático (GitHub Actions)
```

**Benefícios tangíveis do Git Flow:**
1. `master` sempre estável e deployável
2. `develop` é a "verdade" do próximo release
3. Features isoladas não afetam outros devs
4. Releases preparadas com calma (QA, changelog)
5. Hotfixes rápidos sem atrapalhar desenvolvimento
6. Histórico claro: cada merge em master = versão

---

### Ato 4: O Novo Mundo (5 min)
**"A equipe que adotou isso..."**

Conte o final da história:

> "Três meses depois, João faz `git log --oneline` e sorri. Ele sabe exatamente o que aconteceu na última semana. Maria pode gerar o changelog do sprint em 30 segundos clicando em 'Generate release notes' no GitHub. Pedro, o novo dev, olha as tags e entende toda a evolução do projeto. O deploy de segunda virou rotina: merge na main, tag automática, release publicada, produção atualizada."

**Mostre os números:**
```
Antes:
- Tempo para entender histórico: 2 horas
- Bugs introduzidos por merge: 5/mês
- Rollbacks manuais: "reza e reverte"

Depois:
- Tempo para entender histórico: 5 minutos
- Bugs introduzidos por merge: 1/mês
- Rollback: git checkout v1.1.0 ✓
```

---

## 📋 ESBOÇO ESTRUTURADO DA PALESTRA

### Slide 1: Título
**"Git Flow, Conventional Commits & Semantic Versioning"**

### Slide 2-4: O Problema
- Screenshot de histórico caótico real
- "Qual versão está em produção?" → Ninguém sabe
- "Quem se identifica?"

### Slide 5-7: Conventional Commits
- A estrutura básica
- Tabela de tipos com exemplos
- Comparação antes/depois

### Slide 8-12: Git Flow
- Diagrama completo: master, develop, feature, release, hotfix
- Ciclo de vida de uma feature
- Ciclo de vida de uma release
- Ciclo de vida de um hotfix
- Regras de ouro

### Slide 13-15: Semantic Versioning
- MAJOR.MINOR.PATCH explicado
- Conexão: tipo de commit → bump de versão
- Onde a tag é criada (sempre em master)

### Slide 16-18: Tags & Releases no GitHub
- Criar tag via CLI
- GitHub Release UI
- Generate release notes (demo)

### Slide 19-20: Automação com GitHub Actions
- Workflow exemplo para Git Flow
- Validação de branches e commits

### Slide 21: Exercício Interativo
- Desafio para a plateia

### Slide 22: Recursos
- Links úteis, cheatsheet

### Slide 23: Q&A
- Perguntas e discussão

---

## 🎯 EXERCÍCIOS PROPOSTOS

### Exercício 1: Classifique o Commit (Individual - 5 min)
**Objetivo:** Identificar o tipo correto de conventional commit

Dado o cenário, qual o tipo correto?

| # | Mudança | Tipo |
|---|---------|------|
| 1 | Adicionei botão de exportar PDF | ? |
| 2 | Corrigi bug que duplicava itens no carrinho | ? |
| 3 | Atualizei README com exemplos | ? |
| 4 | Mudei tabs para spaces em todo projeto | ? |
| 5 | Extraí função de 200 linhas em 5 menores | ? |
| 6 | Adicionei teste para endpoint de login | ? |
| 7 | Atualizei versão do React | ? |
| 8 | Otimizei query que demorava 10s | ? |

**Respostas:**
1. feat, 2. fix, 3. docs, 4. style, 5. refactor, 6. test, 7. chore (ou build), 8. perf

---

### Exercício 2: Reescreva o Commit (Individual - 5 min)
**Objetivo:** Transformar commits ruins em bons

Reescreva seguindo Conventional Commits:

```
Ruim → Bom

1. "fix bug" 
   → ?

2. "atualizações"
   → ?

3. "João pediu pra mudar a cor do botão"
   → ?

4. "WIP"
   → ?

5. "v2"
   → ?
```

**Possíveis respostas:**
1. `fix(cart): corrigir cálculo de total com desconto`
2. `feat(profile): adicionar upload de avatar`
3. `style(button): alterar cor primária para azul (#1234)`
4. `feat(search): implementar filtro por data` (não commitar WIP!)
5. `refactor(api): migrar endpoints para nova estrutura REST`

---

### Exercício 3: Simulação Git Flow (Grupo - 15 min)
**Objetivo:** Praticar o workflow completo do Git Flow

**Cenário:** Vocês são um time de 4 pessoas desenvolvendo um e-commerce.
- Versão atual em produção (master): **v1.3.0**
- develop está à frente com algumas features já integradas

**Tarefas paralelas:**
- Dev A: Adicionar filtro de preço na busca (feature)
- Dev B: Corrigir bug crítico em produção - pagamento falhando (hotfix)
- Dev C: Preparar release v1.4.0 com as features prontas
- Dev D: Adicionar wishlist (feature)

**Perguntas:**
1. De qual branch cada um parte?
2. Para qual branch cada um faz merge?
3. Qual a ordem dos merges?
4. Quais tags serão criadas?
5. Quem precisa mergear em dois lugares?

**Template de resposta:**
```
Dev A (Feature - Filtro de preço):
- Origem: develop
- Branch: feature/filtro-preco
- Commits:
  1. feat(search): adicionar slider de faixa de preço
  2. feat(search): integrar filtro com API de produtos
  3. test(search): adicionar testes para filtro de preço
- Destino: develop (via PR)
- Tag: Nenhuma (só quando virar release)

Dev B (Hotfix - Pagamento):
- Origem: master
- Branch: hotfix/pagamento-falhando
- Commits:
  1. fix(payment): corrigir timeout em gateway
- Destino: master E develop (dois merges!)
- Tag: v1.3.1 (PATCH, pois é fix)
- PRIORIDADE: Faz primeiro, é urgente!

Dev C (Release):
- Origem: develop (após features prontas)
- Branch: release/v1.4.0
- Commits:
  1. chore(release): bump version to 1.4.0
  2. docs(changelog): atualizar changelog
  3. fix(ui): ajuste menor encontrado em QA
- Destino: master E develop
- Tag: v1.4.0 (MINOR, pois tem features novas)

Dev D (Feature - Wishlist):
- Origem: develop
- Branch: feature/wishlist
- Commits:
  1. feat(user): adicionar botão de wishlist
  2. feat(user): página de wishlist
- Destino: develop (via PR)
- Tag: Nenhuma (vai para próxima release)
```

**Ordem correta:**
1. 🚨 Dev B (hotfix) → merge em master E develop → tag v1.3.1
2. Dev A e Dev D trabalham em paralelo nas features
3. Dev A termina → merge em develop
4. Dev D pode continuar (não precisa esperar release)
5. Dev C cria release/v1.4.0 → testa → merge em master E develop → tag v1.4.0

---

### Exercício 4: Code Review de Commits (Grupo - 10 min)
**Objetivo:** Desenvolver olhar crítico

Analise este histórico e identifique problemas:

```
* 7f8g9h0 - feat: login
* 6e5d4c3 - fix
* 5d4c3b2 - Merge branch 'develop' into feature/login
* 4c3b2a1 - wip
* 3b2a1z9 - fix typo
* 2a1z9y8 - feat: login funcionando
* 1z9y8x7 - initial
```

**Problemas a identificar:**
1. Commits muito vagos ("fix", "wip")
2. Commits duplicados/redundantes
3. Falta de escopo
4. Histórico sujo (deveria ter feito squash/rebase)
5. "initial" não segue padrão

**Como deveria ser:**
```
* 7f8g9h0 - feat(auth): implementar login com JWT
* 6e5d4c3 - test(auth): adicionar testes unitários para login
* 5d4c3b2 - docs(auth): documentar endpoints de autenticação
```

---

### Exercício 5: Qual a Próxima Versão? (Individual - 5 min)
**Objetivo:** Conectar commits com versionamento semântico

Versão atual: **v1.4.2**

Para cada sequência de commits, qual será a próxima versão?

| # | Commits desde v1.4.2 | Próxima Versão |
|---|---------------------|----------------|
| 1 | `fix(api): corrigir timeout` | ? |
| 2 | `feat(user): adicionar 2FA` | ? |
| 3 | `fix(ui): ajustar botão`, `fix(api): corrigir auth` | ? |
| 4 | `feat(cart): novo checkout`, `feat(user): perfil público` | ? |
| 5 | `feat!: migrar para GraphQL` | ? |
| 6 | `feat(api): novo endpoint`, `fix(db): corrigir índice`, `docs: atualizar README` | ? |

**Respostas:**
1. v1.4.**3** (fix = PATCH)
2. v1.**5**.0 (feat = MINOR, zera PATCH)
3. v1.4.**3** (múltiplos fix = ainda é PATCH)
4. v1.**5**.0 (múltiplos feat = ainda é MINOR)
5. v**2**.0.0 (feat! = MAJOR, zera tudo)
6. v1.**5**.0 (maior tipo é feat = MINOR)

**Regra de ouro:** O maior tipo "ganha"
- Tem `feat!` ou `BREAKING CHANGE`? → MAJOR
- Tem `feat`? → MINOR
- Só `fix`? → PATCH

---

### Exercício 6: Criar Tag e Release (Hands-on - 10 min)
**Objetivo:** Praticar o fluxo completo no GitHub

**Pré-requisito:** Ter um repositório de teste no GitHub

**Passos:**

```bash
# 1. Clone o repo (ou use um existente)
git clone https://github.com/seu-user/repo-teste.git
cd repo-teste

# 2. Faça uma alteração e commit
echo "# Nova feature" >> README.md
git add .
git commit -m "feat(docs): adicionar seção de features"

# 3. Crie a tag
git tag -a v1.0.0 -m "Primeira release estável"

# 4. Envie para o GitHub
git push origin main
git push origin v1.0.0

# 5. Vá ao GitHub → Releases → Draft new release
# 6. Selecione a tag v1.0.0
# 7. Clique em "Generate release notes"
# 8. Publish release!
```

**Verificação:**
- [ ] Tag aparece em `git tag -l`?
- [ ] Tag aparece no GitHub em "Tags"?
- [ ] Release aparece em "Releases"?
- [ ] Changelog foi gerado?

---

### Exercício 7: Simulação de Release Completa (Grupo - 15 min)
**Objetivo:** Vivenciar o ciclo completo

**Cenário:** Vocês estão na v2.3.1 e vão lançar uma nova versão.

**Commits no PR que será mergeado:**
```
feat(payment): adicionar PIX como forma de pagamento
feat(payment): adicionar boleto parcelado  
fix(cart): corrigir desconto duplicado
docs(api): documentar endpoints de pagamento
test(payment): adicionar testes de integração
chore(deps): atualizar stripe-sdk
```

**Perguntas para o grupo:**
1. Qual será a próxima versão? Por quê?
2. Escreva o título da Release
3. Gere o changelog categorizado
4. Há breaking changes? Como saberiam?

**Respostas esperadas:**

1. **v2.4.0** - Tem `feat` (MINOR), não tem breaking change

2. **Título:** `v2.4.0 - Pagamento PIX e Boleto`

3. **Changelog:**
```markdown
## v2.4.0 (2024-01-20)

### ✨ Features
- **payment:** adicionar PIX como forma de pagamento
- **payment:** adicionar boleto parcelado

### 🐛 Bug Fixes
- **cart:** corrigir desconto duplicado

### 📚 Documentation
- **api:** documentar endpoints de pagamento

### ✅ Tests
- **payment:** adicionar testes de integração

### 🔧 Chores
- **deps:** atualizar stripe-sdk
```

4. **Não há breaking changes** - Nenhum commit tem `!` ou `BREAKING CHANGE` no footer

---

### Exercício 8: Changelog Reverso (Individual - 5 min)
**Objetivo:** Ver o valor prático

Dado este histórico, gere o changelog:

```
* feat(cart): adicionar cupom de desconto
* fix(cart): corrigir remoção de item
* feat(user): implementar recuperação de senha  
* docs(api): atualizar documentação de endpoints
* fix(checkout): corrigir cálculo de frete
* perf(search): otimizar busca com índice
* chore(deps): atualizar dependências
```

**Changelog esperado:**

```markdown
## [Próxima Versão]

### ✨ Novidades (Features)
- **cart:** adicionar cupom de desconto
- **user:** implementar recuperação de senha

### 🐛 Correções (Bug Fixes)  
- **cart:** corrigir remoção de item
- **checkout:** corrigir cálculo de frete

### ⚡ Performance
- **search:** otimizar busca com índice

### 📚 Documentação
- **api:** atualizar documentação de endpoints

### 🔧 Manutenção
- **deps:** atualizar dependências
```

---

## 🛠️ FERRAMENTAS E AUTOMAÇÃO NO GITHUB

### Ferramentas Locais (npm)

```bash
# Commitlint - valida mensagens de commit
npm install -D @commitlint/cli @commitlint/config-conventional

# Husky - hooks de git (roda commitlint antes do commit)
npm install -D husky

# Commitizen - CLI interativo para commits
npm install -D commitizen cz-conventional-changelog

# Standard Version - gera changelog e bump de versão
npm install -D standard-version
```

**Configurações básicas:**

```json
// .commitlintrc.json
{
  "extends": ["@commitlint/config-conventional"]
}
```

```json
// package.json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}
```

---

### GitHub Actions para Git Flow

**1. Validar Commits em PRs (.github/workflows/commitlint.yml):**

```yaml
name: Lint Commits

on:
  pull_request:
    branches: [master, develop]

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install commitlint
        run: npm install @commitlint/cli @commitlint/config-conventional
      
      - name: Validate commits
        run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }}
```

**2. Validar Nome da Branch (.github/workflows/branch-naming.yml):**

```yaml
name: Branch Naming

on:
  pull_request:
    branches: [master, develop]

jobs:
  check-branch-name:
    runs-on: ubuntu-latest
    steps:
      - name: Check branch name
        run: |
          BRANCH_NAME="${{ github.head_ref }}"
          VALID_PATTERN="^(feature|hotfix|release|bugfix)\/[a-z0-9._-]+$"
          
          if [[ ! $BRANCH_NAME =~ $VALID_PATTERN ]]; then
            echo "❌ Branch name '$BRANCH_NAME' não segue o padrão Git Flow!"
            echo "Use: feature/*, hotfix/*, release/*, bugfix/*"
            exit 1
          fi
          
          echo "✅ Branch name válido: $BRANCH_NAME"
```

**3. CI para develop e master (.github/workflows/ci.yml):**

```yaml
name: CI

on:
  push:
    branches: [master, develop]
  pull_request:
    branches: [master, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run build
        run: npm run build
```

**4. Release Automática ao Mergear em master (.github/workflows/release.yml):**

```yaml
name: Release

on:
  push:
    branches: [master]

permissions:
  contents: write

jobs:
  release:
    # Só roda se vier de branch release/* ou hotfix/*
    if: |
      contains(github.event.head_commit.message, 'Merge pull request') &&
      (contains(github.event.head_commit.message, 'release/') || 
       contains(github.event.head_commit.message, 'hotfix/'))
    
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Get version from package.json
        id: version
        run: echo "VERSION=$(node -p "require('./package.json').version")" >> $GITHUB_OUTPUT
      
      - name: Create Git Tag
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git tag -a "v${{ steps.version.outputs.VERSION }}" -m "Release v${{ steps.version.outputs.VERSION }}"
          git push origin "v${{ steps.version.outputs.VERSION }}"
      
      - name: Create GitHub Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh release create "v${{ steps.version.outputs.VERSION }}" \
            --generate-notes \
            --title "Release v${{ steps.version.outputs.VERSION }}"
```

**5. Deploy para Produção (apenas master):**

```yaml
name: Deploy Production

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Production
        run: |
          echo "🚀 Deploying ${{ github.event.release.tag_name }} to production..."
          # Seu script de deploy aqui
```

---

### Branch Protection Rules (Configurar no GitHub)

**Para `master`:**
```
Settings → Branches → Add rule
Branch name pattern: master

☑️ Require a pull request before merging
   ☑️ Require approvals: 2
   ☑️ Dismiss stale pull request approvals when new commits are pushed
   ☑️ Require review from Code Owners

☑️ Require status checks to pass before merging
   ☑️ Require branches to be up to date before merging
   Status checks: commitlint, test, build, branch-naming

☑️ Require conversation resolution before merging

☑️ Do not allow bypassing the above settings

☑️ Restrict who can push to matching branches
   → Apenas via PR (release/* e hotfix/*)
```

**Para `develop`:**
```
Branch name pattern: develop

☑️ Require a pull request before merging
   ☑️ Require approvals: 1

☑️ Require status checks to pass before merging
   Status checks: commitlint, test, build

☑️ Do not allow bypassing the above settings
```

---

### Pull Request Template (.github/pull_request_template.md)

```markdown
## Descrição
<!-- Descreva as mudanças -->

## Tipo de Branch
- [ ] 🚀 feature/* → develop
- [ ] 🐛 hotfix/* → master E develop  
- [ ] 📦 release/* → master E develop
- [ ] 🔧 bugfix/* → develop

## Tipo de Mudança
- [ ] ✨ Nova feature (feat)
- [ ] 🐛 Bug fix (fix)
- [ ] 💥 Breaking change (feat! ou fix!)
- [ ] 📚 Documentação (docs)
- [ ] 🔧 Manutenção (chore)

## Issue Relacionada
Closes #

## Checklist
- [ ] Meu código segue o padrão do projeto
- [ ] Commits seguem Conventional Commits
- [ ] Branch segue naming do Git Flow
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada (se necessário)

## Para Releases e Hotfixes
- [ ] Versão atualizada no package.json
- [ ] CHANGELOG.md atualizado
- [ ] Merge será feito em master E develop

## Screenshots (se aplicável)
```

---

## 📚 RECURSOS ADICIONAIS

### Especificações
- [Conventional Commits Spec](https://www.conventionalcommits.org/)
- [Semantic Versioning Spec](https://semver.org/)
- [Git Flow Original (Vincent Driessen)](https://nvie.com/posts/a-successful-git-branching-model/)

### GitHub
- [Managing Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Automatically Generated Release Notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

### Ferramentas
- [Git Flow Extension](https://github.com/nvie/gitflow)
- [Commitlint](https://commitlint.js.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Standard Version](https://github.com/conventional-changelog/standard-version)

### Cheatsheet Git Flow

```
BRANCHES
────────────────────────────────────
master      → produção (tags aqui)
develop     → integração (base p/ features)
feature/*   → novas funcionalidades
release/*   → preparação de versão
hotfix/*    → correção urgente produção

FLUXO DE BRANCHES
────────────────────────────────────
feature/*   origem: develop    destino: develop
release/*   origem: develop    destino: master + develop
hotfix/*    origem: master     destino: master + develop

COMMITS
────────────────────────────────────
feat(escopo): descrição     → MINOR
fix(escopo): descrição      → PATCH
feat!: descrição            → MAJOR
docs/style/refactor/test    → sem bump
chore/ci/build/perf         → sem bump

COMANDOS GIT FLOW (extensão)
────────────────────────────────────
git flow init                    → inicializa
git flow feature start nome      → criar feature
git flow feature finish nome     → merge em develop
git flow release start v1.0.0    → criar release
git flow release finish v1.0.0   → merge em master+develop, tag
git flow hotfix start fix        → criar hotfix
git flow hotfix finish fix       → merge em master+develop, tag

COMANDOS GIT PURO
────────────────────────────────────
# Feature
git checkout develop && git checkout -b feature/nome
git checkout develop && git merge feature/nome

# Release  
git checkout develop && git checkout -b release/v1.0.0
git checkout master && git merge release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"
git checkout develop && git merge release/v1.0.0

# Hotfix
git checkout master && git checkout -b hotfix/fix
git checkout master && git merge hotfix/fix
git tag -a v1.0.1 -m "Hotfix v1.0.1"
git checkout develop && git merge hotfix/fix

TAGS
────────────────────────────────────
git tag -a v1.0.0 -m "msg"  → criar
git push origin v1.0.0      → enviar
git tag -l                  → listar
git push origin --tags      → enviar todas

VERSÃO
────────────────────────────────────
v1.0.0          → primeira estável
v0.x.x          → desenvolvimento
v1.0.0-alpha.1  → pré-release
v1.0.0-rc.1     → release candidate
```

---

## 🎤 DICAS PARA A APRESENTAÇÃO

1. **Comece com dor** - Todo mundo tem histórias de horror com Git e "qual versão está em produção?"
2. **Use exemplos reais** - Mostre React, Node, npm como exemplos de SemVer
3. **Demo ao vivo no GitHub** - Crie uma tag e release ao vivo, impressiona
4. **Desenhe o fluxo** - Git Flow é visual, use o quadro/slide
5. **Não seja dogmático** - Git Flow é uma sugestão, adaptem ao contexto
6. **Termine com ação** - Dê um primeiro passo concreto para implementar

**Frase de fechamento sugerida:**
> "Vocês não precisam implementar tudo amanhã. Comecem com três regras: develop é sagrado, master é produção, toda feature numa branch. Só isso já vai transformar a vida de vocês."

**Sequência de adoção recomendada:**
```
Semana 1: Separar master e develop, features em branches
Semana 2: Adotar Conventional Commits
Semana 3: Adicionar commitlint + husky
Semana 4: Criar primeira release formal com tag
Semana 5: Automatizar com GitHub Actions
```

---

## 📊 RESUMO VISUAL PARA SLIDE FINAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         GIT FLOW COMPLETO                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Issue #123        feature/*           develop            master        │
│  ┌─────────┐      ┌─────────┐        ┌─────────┐       ┌─────────┐     │
│  │ Feature │─────▶│ feature/│───PR──▶│         │       │         │     │
│  │ Request │      │ cupom   │        │         │       │         │     │
│  └─────────┘      └─────────┘        │         │       │         │     │
│                                      │         │       │         │     │
│                    release/*         │         │       │         │     │
│                   ┌─────────┐        │         │       │         │     │
│                   │release/ │◀───────│         │       │         │     │
│                   │v1.2.0   │────────│────PR───│──────▶│         │     │
│                   └─────────┘        │    ▲    │       │    │    │     │
│                        │             │    │    │       │    │    │     │
│                        └─────────────┼────┘    │       │    ▼    │     │
│                                      │         │       │ TAG     │     │
│                    hotfix/*          │         │       │ v1.2.0  │     │
│                   ┌─────────┐        │         │       │    │    │     │
│   🚨 Bug em      │hotfix/  │────────┼────PR───┼──────▶│    │    │     │
│   Produção ─────▶│fix-pix  │────────┼────┘    │       │    ▼    │     │
│                   └─────────┘        │         │       │ TAG     │     │
│                                      └─────────┘       │ v1.2.1  │     │
│                                                        └─────────┘     │
│                                                             │          │
│                                                             ▼          │
│                                                     ┌───────────────┐  │
│                                                     │   DEPLOY 🚀   │  │
│                                                     │   Produção    │  │
│                                                     └───────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

REGRAS DE OURO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. NUNCA commitar direto em master ou develop
2. feature/* → develop (PR)
3. release/* → master + develop (PR) + TAG
4. hotfix/*  → master + develop (PR) + TAG
5. Cada merge em master = nova versão em produção
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

*Boa palestra! 🚀*
