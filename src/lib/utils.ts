import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function calcularProximaVersao(
  versaoAtual: string,
  commits: string[]
): { versao: string; tipo: 'MAJOR' | 'MINOR' | 'PATCH' } {
  const [major, minor, patch] = versaoAtual.split('.').map(Number)

  let hasMajor = false
  let hasMinor = false
  let hasPatch = false

  for (const commit of commits) {
    if (commit.includes('!:') || commit.includes('BREAKING CHANGE')) {
      hasMajor = true
    } else if (commit.startsWith('feat')) {
      hasMinor = true
    } else if (commit.startsWith('fix')) {
      hasPatch = true
    }
  }

  if (hasMajor) {
    return { versao: `${major + 1}.0.0`, tipo: 'MAJOR' }
  }
  if (hasMinor) {
    return { versao: `${major}.${minor + 1}.0`, tipo: 'MINOR' }
  }
  if (hasPatch) {
    return { versao: `${major}.${minor}.${patch + 1}`, tipo: 'PATCH' }
  }

  return { versao: versaoAtual, tipo: 'PATCH' }
}

export function gerarCodigoSessao(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let codigo = ''
  for (let i = 0; i < 6; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return codigo
}

export function validarConventionalCommit(mensagem: string): {
  valido: boolean
  tipo?: string
  escopo?: string
  descricao?: string
  erro?: string
} {
  const regex = /^(feat|fix|docs|style|refactor|test|chore|perf|ci|build)(\(.+\))?!?:\s.+$/

  if (!regex.test(mensagem)) {
    return {
      valido: false,
      erro: 'A mensagem não segue o formato Conventional Commits'
    }
  }

  const match = mensagem.match(/^(\w+)(\((.+)\))?!?:\s(.+)$/)
  if (match) {
    return {
      valido: true,
      tipo: match[1],
      escopo: match[3],
      descricao: match[4]
    }
  }

  return { valido: false, erro: 'Erro ao analisar mensagem' }
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
