import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { avaliarChangelog } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { commits, changelogUtilizador } = await req.json()

    if (!commits || !Array.isArray(commits) || !changelogUtilizador) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const resultado = await avaliarChangelog(commits, changelogUtilizador)

    return NextResponse.json(resultado)
  } catch (error) {
    console.error('Erro ao avaliar changelog:', error)
    return NextResponse.json(
      { error: 'Erro ao processar changelog' },
      { status: 500 }
    )
  }
}
