import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { validarScreenshot } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { imagemBase64, acoesEsperadas } = await req.json()

    if (!imagemBase64 || !acoesEsperadas || !Array.isArray(acoesEsperadas)) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const resultado = await validarScreenshot(imagemBase64, acoesEsperadas)

    return NextResponse.json(resultado)
  } catch (error) {
    console.error('Erro ao validar screenshot:', error)
    return NextResponse.json(
      { error: 'Erro ao processar screenshot' },
      { status: 500 }
    )
  }
}
