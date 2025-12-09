import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { avaliarRelease } from '@/lib/claude'

const COMMITS_RELEASE = [
  { tipo: 'feat', mensagem: 'adicionar sistema de notificações push' },
  { tipo: 'feat', mensagem: 'implementar modo offline' },
  { tipo: 'fix', mensagem: 'corrigir crash ao abrir perfil' },
  { tipo: 'fix', mensagem: 'resolver problema de cache em imagens' },
  { tipo: 'perf', mensagem: 'otimizar carregamento inicial da app' },
  { tipo: 'docs', mensagem: 'atualizar guia de contribuição' },
  { tipo: 'test', mensagem: 'adicionar testes e2e ao fluxo de checkout' },
]

const validarLocal = (respostas: {
  versao: string
  titulo: string
  changelog: string
  breakingChanges: string
}) => {
  const notas: string[] = []

  const versaoCorreta = respostas.versao === '2.1.0'
  if (!versaoCorreta) {
    if (respostas.versao.startsWith('3.')) {
      notas.push('❌ Versão: Não há BREAKING CHANGES, então não deve ser 3.x.x')
    } else if (respostas.versao.startsWith('2.0.')) {
      notas.push('❌ Versão: Há features novas, então deve ser 2.1.0 (não 2.0.x)')
    } else {
      notas.push('❌ Versão: Com 2 features novas e sem breaking changes, deve ser 2.1.0')
    }
  } else {
    notas.push('✅ Versão correta! 2 features = MINOR bump')
  }

  const tituloOk =
    respostas.titulo.toLowerCase().includes('notificações') ||
    respostas.titulo.toLowerCase().includes('offline') ||
    respostas.titulo.toLowerCase().includes('2.1')
  if (!tituloOk) {
    notas.push('⚠️ Título: Deveria mencionar as features principais ou a versão')
  } else {
    notas.push('✅ Título descritivo!')
  }

  const changelogOk =
    respostas.changelog.toLowerCase().includes('notificações') &&
    respostas.changelog.toLowerCase().includes('offline')
  if (!changelogOk) {
    notas.push('⚠️ Changelog: Deveria listar as 2 features principais')
  } else {
    notas.push('✅ Changelog com features listadas!')
  }

  const breakingOk =
    respostas.breakingChanges.trim() === '' ||
    respostas.breakingChanges.toLowerCase().includes('nenhum') ||
    respostas.breakingChanges.toLowerCase().includes('não')
  if (!breakingOk) {
    notas.push('❌ Breaking Changes: Não há breaking changes nestes commits')
  } else {
    notas.push('✅ Correto: sem breaking changes')
  }

  return { versaoCorreta, tituloOk, changelogOk, breakingOk, notas }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { commits, respostas } = await req.json()

    if (!respostas) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    // Tenta IA com commits enviados ou usa padrão do exercício
    const commitsParaAvaliar = Array.isArray(commits) && commits.length > 0 ? commits : COMMITS_RELEASE

    try {
      const resultadoIA = await avaliarRelease(commitsParaAvaliar, respostas)
      return NextResponse.json({ ...resultadoIA, _fallback: false })
    } catch (err) {
      console.error('[Claude] Falha ao avaliar release', err)
      const local = validarLocal(respostas)
      return NextResponse.json({ ...local, _fallback: true, _error: process.env.NODE_ENV !== 'production' ? String(err) : undefined })
    }
  } catch (error) {
    console.error('Erro ao avaliar release:', error)
    return NextResponse.json({ error: 'Erro ao processar avaliação' }, { status: 500 })
  }
}
