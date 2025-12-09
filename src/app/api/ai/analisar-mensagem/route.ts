import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { analisarMensagemCommit } from '@/lib/claude'

const TIPOS = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore']

const isMensagemValida = (mensagem: string) => {
  const regex = new RegExp(`^(${TIPOS.join('|')})(\\([a-z0-9-]+\\))?: .+`)
  return regex.test((mensagem || '').trim())
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { commitOriginal, reescritaUtilizador, contexto } = await req.json()

    if (!commitOriginal || !reescritaUtilizador) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Tenta usar o Claude; se falhar, aplica fallback local
    try {
      const resultado = await analisarMensagemCommit(
        commitOriginal,
        reescritaUtilizador,
        contexto || ''
      )

      return NextResponse.json(resultado)
    } catch (err) {
      console.error('[Claude] Falha ao analisar mensagem', err)
      const acertou = isMensagemValida(reescritaUtilizador)
      const feedbackBase = acertou
        ? 'Boa! A mensagem segue o formato Conventional Commits.'
        : 'A mensagem não segue o formato Conventional Commits: use tipo(escopo): descrição.'

      const feedbackDetalhe = contexto
        ? `Contexto: ${contexto}`
        : commitOriginal
        ? `Commit original: ${commitOriginal}`
        : ''

      return NextResponse.json({
        feedback: [feedbackBase, feedbackDetalhe].filter(Boolean).join('\n'),
        acertou,
        _fallback: true,
        _error: process.env.NODE_ENV !== 'production' ? String(err) : undefined,
      })
    }
  } catch (error) {
    console.error('Erro ao analisar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao processar análise' },
      { status: 500 }
    )
  }
}
