import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'

if (!process.env.ANTHROPIC_API_KEY) {
  // Evita falhas silenciosas se a env não carregar; falha rápido com mensagem clara.
  throw new Error('ANTHROPIC_API_KEY não carregada. Verifique o .env e reinicie o servidor.')
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'

const parseClaudeJson = (texto: string) => {
  const trimmed = (texto || '').trim()
  const fenced = trimmed.match(/```(?:json)?\n?([\s\S]*?)\n?```/)
  const candidate = fenced ? fenced[1].trim() : trimmed
  const jsonMatch = candidate.match(/\{[\s\S]*\}/)
  const jsonText = jsonMatch ? jsonMatch[0] : candidate
  return JSON.parse(jsonText)
}

export type TipoCommit = 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore' | 'perf' | 'ci' | 'build'

export interface AnaliseCommitResult {
  pontuacao: number
  breakdown: {
    formato: number
    tipo: number
    clareza: number
    escopo: number
  }
  feedback: string
  sugestao?: string
}

export interface ValidacaoScreenshotResult {
  comandosDetectados: string[]
  acoesCompletadas: {
    [key: string]: {
      feito: boolean
      detalhes: string
    }
  }
  sucessoGeral: boolean
  feedback: string
}

export interface AvaliacaoReleaseResult {
  versaoCorreta: boolean
  tituloOk: boolean
  changelogOk: boolean
  breakingOk: boolean
  notas: string[]
}

// Explicar por que um tipo de commit está errado
export async function explicarTipoCommit(
  cenario: string,
  respostaUtilizador: TipoCommit,
  respostaCorreta: TipoCommit
): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: `És um especialista em Conventional Commits. O utilizador classificou incorretamente o seguinte cenário:

Cenário: "${cenario}"
Resposta do utilizador: ${respostaUtilizador}
Resposta correta: ${respostaCorreta}

Explica em 2-3 frases, em português de Portugal, por que a resposta correta é "${respostaCorreta}" e não "${respostaUtilizador}". Usa analogias simples se possível. Sê encorajador.`
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  return textBlock ? textBlock.text : 'Não foi possível gerar explicação.'
}

// Analisar uma mensagem de commit escrita pelo utilizador
export async function analisarMensagemCommit(
  commitOriginal: string,
  reescritaUtilizador: string,
  contexto: string
): Promise<AnaliseCommitResult> {
  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `És um code reviewer especializado em Conventional Commits.

Commit original (mau exemplo): "${commitOriginal}"
Contexto: ${contexto}
Reescrita do utilizador: "${reescritaUtilizador}"

Avalia a reescrita nos seguintes critérios (0-25 pontos cada):
1. Formato correto (<tipo>[escopo]: <descrição>)
2. Tipo apropriado (feat, fix, docs, etc.)
3. Mensagem clara e no imperativo
4. Escopo relevante (se aplicável)

Responde APENAS com JSON válido, sem markdown:
{
  "pontuacao": <total 0-100>,
  "breakdown": { "formato": X, "tipo": X, "clareza": X, "escopo": X },
  "feedback": "<feedback construtivo em 2-3 frases, em português de Portugal>",
  "sugestao": "<sugestão de melhoria, apenas se pontuacao < 80>"
}`
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  if (!textBlock) {
    return {
      pontuacao: 0,
      breakdown: { formato: 0, tipo: 0, clareza: 0, escopo: 0 },
      feedback: 'Não foi possível analisar a mensagem.',
    }
  }

  try {
    return parseClaudeJson(textBlock.text)
  } catch {
    return {
      pontuacao: 0,
      breakdown: { formato: 0, tipo: 0, clareza: 0, escopo: 0 },
      feedback: 'Erro ao processar resposta.',
    }
  }
}

// Validar screenshot do terminal
export async function validarScreenshot(
  imagemBase64: string,
  acoesEsperadas: { id: string; descricao: string }[]
): Promise<ValidacaoScreenshotResult> {
  const acoesTexto = acoesEsperadas
    .map((a, i) => `${i + 1}. ${a.descricao}`)
    .join('\n')

  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/png',
              data: imagemBase64,
            },
          },
          {
            type: 'text',
            text: `Analisa esta screenshot de um terminal onde o utilizador deveria ter executado os seguintes comandos Git:

Ações esperadas:
${acoesTexto}

Extrai os comandos visíveis no terminal e verifica se as ações foram completadas corretamente.

Responde APENAS com JSON válido, sem markdown:
{
  "comandosDetectados": ["comando1", "comando2", ...],
  "acoesCompletadas": {
    "${acoesEsperadas[0]?.id || 'acao1'}": { "feito": boolean, "detalhes": "string" },
    ...
  },
  "sucessoGeral": boolean,
  "feedback": "<feedback sobre o que foi bem/faltou, em português de Portugal>"
}`
          }
        ]
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  if (!textBlock) {
    return {
      comandosDetectados: [],
      acoesCompletadas: {},
      sucessoGeral: false,
      feedback: 'Não foi possível analisar a imagem.',
    }
  }

  try {
    return JSON.parse(textBlock.text)
  } catch {
    return {
      comandosDetectados: [],
      acoesCompletadas: {},
      sucessoGeral: false,
      feedback: 'Erro ao processar resposta.',
    }
  }
}

// Gerar feedback para changelog
export async function avaliarChangelog(
  commits: string[],
  changelogUtilizador: string
): Promise<{ pontuacao: number; feedback: string; changelogIdeal: string }> {
  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: `És um especialista em Changelogs e Conventional Commits.

Dado este histórico de commits:
${commits.map(c => `- ${c}`).join('\n')}

O utilizador gerou este changelog:
${changelogUtilizador}

Avalia o changelog do utilizador (0-100 pontos) considerando:
- Categorização correta (Features, Bug Fixes, etc.)
- Formatação adequada
- Clareza e organização

Responde APENAS com JSON válido, sem markdown:
{
  "pontuacao": <0-100>,
  "feedback": "<feedback construtivo em português de Portugal>",
  "changelogIdeal": "<como deveria ser o changelog ideal>"
}`
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  if (!textBlock) {
    return {
      pontuacao: 0,
      feedback: 'Não foi possível avaliar.',
      changelogIdeal: ''
    }
  }

  try {
    return parseClaudeJson(textBlock.text)
  } catch {
    return {
      pontuacao: 0,
      feedback: 'Erro ao processar resposta.',
      changelogIdeal: ''
    }
  }
}

// Avaliar release (versão, título, changelog, breaking changes)
export async function avaliarRelease(
  commits: { tipo: string; mensagem: string }[],
  respostas: { versao: string; titulo: string; changelog: string; breakingChanges: string }
): Promise<AvaliacaoReleaseResult> {
  const commitsTexto = commits
    .map(c => `- ${c.tipo}: ${c.mensagem}`)
    .join('\n')

  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 600,
    messages: [
      {
        role: 'user',
        content: `Atua como um release manager.

Versão atual em produção: v2.0.5
Commits para a release:
${commitsTexto}

Respostas do utilizador:
- Próxima versão: ${respostas.versao}
- Título: ${respostas.titulo}
- Changelog:
${respostas.changelog}
- Breaking Changes declarados: ${respostas.breakingChanges}

Avalia as respostas. Nota: há 2 novas features, alguns fixes, nenhum breaking change.
Próxima versão correta é v2.1.0.

Responde APENAS com JSON válido, sem markdown:
{
  "versaoCorreta": boolean,
  "tituloOk": boolean,
  "changelogOk": boolean,
  "breakingOk": boolean,
  "notas": ["string", "string", ...] // notas curtas de feedback
}`
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  if (!textBlock) {
    return {
      versaoCorreta: false,
      tituloOk: false,
      changelogOk: false,
      breakingOk: false,
      notas: ['Não foi possível avaliar a release.'],
    }
  }

  try {
    return parseClaudeJson(textBlock.text)
  } catch {
    return {
      versaoCorreta: false,
      tituloOk: false,
      changelogOk: false,
      breakingOk: false,
      notas: ['Erro ao processar resposta da IA.'],
    }
  }
}

export default anthropic
