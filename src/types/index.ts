import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: string
    } & DefaultSession['user']
  }
}

// Tipos de Commit
export type TipoCommit = 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore' | 'perf' | 'ci' | 'build'

export interface TipoCommitInfo {
  tipo: TipoCommit
  nome: string
  descricao: string
  analogia: string
  exemplo: string
  cor: string
  emoji: string
}

export const TIPOS_COMMIT: TipoCommitInfo[] = [
  {
    tipo: 'feat',
    nome: 'Feature',
    descricao: 'Nova funcionalidade',
    analogia: 'Construir um quarto novo na casa',
    exemplo: 'feat(cart): adicionar cupão de desconto',
    cor: '#38a169',
    emoji: '✨'
  },
  {
    tipo: 'fix',
    nome: 'Fix',
    descricao: 'Correção de bug',
    analogia: 'Consertar o cano que vazava',
    exemplo: 'fix(auth): corrigir validação de token expirado',
    cor: '#e53e3e',
    emoji: '🐛'
  },
  {
    tipo: 'docs',
    nome: 'Docs',
    descricao: 'Documentação',
    analogia: 'Atualizar a planta da casa',
    exemplo: 'docs(api): atualizar documentação de endpoints',
    cor: '#3182ce',
    emoji: '📚'
  },
  {
    tipo: 'style',
    nome: 'Style',
    descricao: 'Formatação, sem mudança de código',
    analogia: 'Pintar as paredes (sem mudar estrutura)',
    exemplo: 'style(button): alterar cor primária para azul',
    cor: '#9f7aea',
    emoji: '🎨'
  },
  {
    tipo: 'refactor',
    nome: 'Refactor',
    descricao: 'Refatoração de código',
    analogia: 'Reorganizar os móveis (mesma funcionalidade)',
    exemplo: 'refactor(api): extrair lógica de parsing para service',
    cor: '#ed8936',
    emoji: '♻️'
  },
  {
    tipo: 'test',
    nome: 'Test',
    descricao: 'Adicionar ou corrigir testes',
    analogia: 'Instalar alarme de segurança',
    exemplo: 'test(cart): adicionar testes de cupão',
    cor: '#38b2ac',
    emoji: '✅'
  },
  {
    tipo: 'chore',
    nome: 'Chore',
    descricao: 'Tarefas de manutenção',
    analogia: 'Limpar a garagem',
    exemplo: 'chore(deps): atualizar dependências',
    cor: '#718096',
    emoji: '🔧'
  },
  {
    tipo: 'perf',
    nome: 'Performance',
    descricao: 'Melhorias de performance',
    analogia: 'Trocar a escada por elevador',
    exemplo: 'perf(search): otimizar busca com índice',
    cor: '#d69e2e',
    emoji: '⚡'
  },
  {
    tipo: 'ci',
    nome: 'CI',
    descricao: 'Integração contínua',
    analogia: 'Automatizar a rega do jardim',
    exemplo: 'ci(github): adicionar workflow de deploy',
    cor: '#667eea',
    emoji: '🔄'
  },
  {
    tipo: 'build',
    nome: 'Build',
    descricao: 'Sistema de build',
    analogia: 'Trocar o material de construção',
    exemplo: 'build(webpack): atualizar configuração',
    cor: '#ed64a6',
    emoji: '📦'
  }
]

// Tipos de Branch
export type TipoBranch = 'master' | 'develop' | 'feature' | 'release' | 'hotfix'

export interface BranchInfo {
  tipo: TipoBranch
  nome: string
  descricao: string
  origem: string
  destino: string
  cor: string
}

export const TIPOS_BRANCH: BranchInfo[] = [
  {
    tipo: 'master',
    nome: 'master',
    descricao: 'Código em produção',
    origem: '-',
    destino: '-',
    cor: '#e53e3e'
  },
  {
    tipo: 'develop',
    nome: 'develop',
    descricao: 'Integração contínua',
    origem: 'master',
    destino: 'release',
    cor: '#ed8936'
  },
  {
    tipo: 'feature',
    nome: 'feature/*',
    descricao: 'Novas funcionalidades',
    origem: 'develop',
    destino: 'develop',
    cor: '#38a169'
  },
  {
    tipo: 'release',
    nome: 'release/*',
    descricao: 'Preparação de versão',
    origem: 'develop',
    destino: 'master + develop',
    cor: '#d69e2e'
  },
  {
    tipo: 'hotfix',
    nome: 'hotfix/*',
    descricao: 'Correções urgentes',
    origem: 'master',
    destino: 'master + develop',
    cor: '#e53e3e'
  }
]

// Exercícios
export interface Exercicio {
  id: number
  titulo: string
  descricao: string
  tipo: 'quiz' | 'escrita' | 'simulacao' | 'upload' | 'analise'
  duracao: string
  pontuacaoMaxima: number
}

export const EXERCICIOS: Exercicio[] = [
  {
    id: 1,
    titulo: 'Classifica o Commit',
    descricao: 'Identifica o tipo correto de Conventional Commit para cada cenário',
    tipo: 'quiz',
    duracao: '5 min',
    pontuacaoMaxima: 100
  },
  {
    id: 2,
    titulo: 'Reescreve o Commit',
    descricao: 'Transforma commits maus em bons seguindo Conventional Commits',
    tipo: 'escrita',
    duracao: '5 min',
    pontuacaoMaxima: 100
  },
  {
    id: 3,
    titulo: 'Simulação Git Flow',
    descricao: 'Pratica o workflow completo do Git Flow com cenários reais',
    tipo: 'simulacao',
    duracao: '15 min',
    pontuacaoMaxima: 100
  },
  {
    id: 4,
    titulo: 'Code Review de Commits',
    descricao: 'Analisa históricos de commits e identifica problemas',
    tipo: 'analise',
    duracao: '10 min',
    pontuacaoMaxima: 100
  },
  {
    id: 5,
    titulo: 'Qual a Próxima Versão?',
    descricao: 'Calcula a próxima versão SemVer com base nos commits',
    tipo: 'quiz',
    duracao: '5 min',
    pontuacaoMaxima: 100
  },
  {
    id: 6,
    titulo: 'Cria Tag e Release',
    descricao: 'Faz o hands-on de criar tags e releases no teu terminal',
    tipo: 'upload',
    duracao: '10 min',
    pontuacaoMaxima: 100
  },
  {
    id: 7,
    titulo: 'Simulação de Release',
    descricao: 'Vivencia o ciclo completo de uma release',
    tipo: 'simulacao',
    duracao: '15 min',
    pontuacaoMaxima: 100
  },
  {
    id: 8,
    titulo: 'Changelog Reverso',
    descricao: 'Gera um changelog a partir de um histórico de commits',
    tipo: 'escrita',
    duracao: '5 min',
    pontuacaoMaxima: 100
  }
]

// Atos da palestra
export interface Ato {
  numero: number
  titulo: string
  subtitulo: string
  descricao: string
  duracao: string
  exercicios: number[]
  emoji: string
}

export const ATOS: Ato[] = [
  {
    numero: 1,
    titulo: 'O Caos',
    subtitulo: 'Era uma vez um time de devs...',
    descricao: 'A história do caos nos commits e a frustração de não saber o que está em produção',
    duracao: '5-10 min',
    exercicios: [],
    emoji: '😰'
  },
  {
    numero: 2,
    titulo: 'A Descoberta',
    subtitulo: 'Existe um jeito melhor...',
    descricao: 'Conventional Commits, Git Flow e Semantic Versioning',
    duracao: '15-20 min',
    exercicios: [1, 2, 3, 4, 5, 6],
    emoji: '💡'
  },
  {
    numero: 3,
    titulo: 'A Transformação',
    subtitulo: 'Vê a diferença...',
    descricao: 'O mesmo projeto, agora organizado com as práticas aprendidas',
    duracao: '10-15 min',
    exercicios: [7, 8],
    emoji: '✨'
  },
  {
    numero: 4,
    titulo: 'O Novo Mundo',
    subtitulo: 'A equipa que adotou isto...',
    descricao: 'Os resultados e o caminho a seguir',
    duracao: '5 min',
    exercicios: [],
    emoji: '🚀'
  }
]

// Dados de exemplo para exercícios
export interface QuizQuestion {
  id: number
  cenario: string
  respostaCorreta: TipoCommit
}

export const QUIZ_CLASSIFICACAO: QuizQuestion[] = [
  { id: 1, cenario: 'Adicionei botão de exportar PDF', respostaCorreta: 'feat' },
  { id: 2, cenario: 'Corrigi bug que duplicava itens no carrinho', respostaCorreta: 'fix' },
  { id: 3, cenario: 'Atualizei README com exemplos', respostaCorreta: 'docs' },
  { id: 4, cenario: 'Mudei tabs para spaces em todo projeto', respostaCorreta: 'style' },
  { id: 5, cenario: 'Extraí função de 200 linhas em 5 menores', respostaCorreta: 'refactor' },
  { id: 6, cenario: 'Adicionei teste para endpoint de login', respostaCorreta: 'test' },
  { id: 7, cenario: 'Atualizei versão do React', respostaCorreta: 'chore' },
  { id: 8, cenario: 'Otimizei query que demorava 10s', respostaCorreta: 'perf' }
]

export interface CommitRewrite {
  id: number
  original: string
  contexto: string
  sugestao: string
}

export const COMMITS_REESCREVER: CommitRewrite[] = [
  {
    id: 1,
    original: 'fix bug',
    contexto: 'Corrigido um bug no cálculo do total do carrinho quando havia desconto',
    sugestao: 'fix(cart): corrigir cálculo de total com desconto'
  },
  {
    id: 2,
    original: 'atualizações',
    contexto: 'Adicionada funcionalidade de upload de avatar no perfil do utilizador',
    sugestao: 'feat(profile): adicionar upload de avatar'
  },
  {
    id: 3,
    original: 'João pediu pra mudar a cor do botão',
    contexto: 'Alterada a cor do botão principal de verde para azul',
    sugestao: 'style(button): alterar cor primária para azul'
  },
  {
    id: 4,
    original: 'WIP',
    contexto: 'Implementado filtro de busca por data na lista de produtos',
    sugestao: 'feat(search): implementar filtro por data'
  },
  {
    id: 5,
    original: 'v2',
    contexto: 'Migração de todos os endpoints para nova estrutura REST',
    sugestao: 'refactor(api): migrar endpoints para nova estrutura REST'
  }
]

// Exemplos usados no Exercício 2 (reescrita de commits com IA)
export const EXEMPLOS_REESCRITA = [
  {
    commitRuim: 'fix bug',
    contexto: 'Corrigido um bug no cálculo do total do carrinho quando havia desconto',
    commitBom: 'fix(cart): corrigir cálculo de total com desconto'
  },
  {
    commitRuim: 'atualizações',
    contexto: 'Adicionada funcionalidade de upload de avatar no perfil do utilizador',
    commitBom: 'feat(profile): adicionar upload de avatar'
  },
  {
    commitRuim: 'João pediu pra mudar a cor do botão',
    contexto: 'Alterada a cor do botão principal de verde para azul',
    commitBom: 'style(button): alterar cor primária para azul'
  },
  {
    commitRuim: 'WIP',
    contexto: 'Implementado filtro de busca por data na lista de produtos',
    commitBom: 'feat(search): implementar filtro por data'
  },
  {
    commitRuim: 'v2',
    contexto: 'Migração de todos os endpoints para nova estrutura REST',
    commitBom: 'refactor(api): migrar endpoints para nova estrutura REST'
  }
]

export interface VersaoQuestion {
  id: number
  versaoAtual: string
  commits: string[]
  respostaCorreta: string
  explicacao: string
}

export const QUIZ_VERSAO: VersaoQuestion[] = [
  {
    id: 1,
    versaoAtual: '1.4.2',
    commits: ['fix(api): corrigir timeout'],
    respostaCorreta: '1.4.3',
    explicacao: 'fix = PATCH'
  },
  {
    id: 2,
    versaoAtual: '1.4.2',
    commits: ['feat(user): adicionar 2FA'],
    respostaCorreta: '1.5.0',
    explicacao: 'feat = MINOR, zera PATCH'
  },
  {
    id: 3,
    versaoAtual: '1.4.2',
    commits: ['fix(ui): ajustar botão', 'fix(api): corrigir auth'],
    respostaCorreta: '1.4.3',
    explicacao: 'múltiplos fix = ainda é PATCH'
  },
  {
    id: 4,
    versaoAtual: '1.4.2',
    commits: ['feat(cart): novo checkout', 'feat(user): perfil público'],
    respostaCorreta: '1.5.0',
    explicacao: 'múltiplos feat = ainda é MINOR'
  },
  {
    id: 5,
    versaoAtual: '1.4.2',
    commits: ['feat!: migrar para GraphQL'],
    respostaCorreta: '2.0.0',
    explicacao: 'feat! = MAJOR, zera tudo'
  },
  {
    id: 6,
    versaoAtual: '1.4.2',
    commits: ['feat(api): novo endpoint', 'fix(db): corrigir índice', 'docs: atualizar README'],
    respostaCorreta: '1.5.0',
    explicacao: 'maior tipo é feat = MINOR'
  }
]

// Alias usado nos exercícios (mantém compatibilidade)
export const QUESTOES_VERSAO = QUIZ_VERSAO
