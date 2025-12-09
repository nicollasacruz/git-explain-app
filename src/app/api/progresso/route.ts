import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    let progress = await prisma.progress.findUnique({
      where: { userId: session.user.id },
    })

    // Se não existir progresso, criar um novo
    if (!progress) {
      progress = await prisma.progress.create({
        data: {
          userId: session.user.id,
          atoAtual: 1,
          exerciciosCompletos: [],
          pontuacaoTotal: 0,
        },
      })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Erro ao obter progresso:', error)
    return NextResponse.json({ error: 'Erro ao obter progresso' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const {
      atoAtual,
      exerciciosCompletos,
      pontuacaoTotal,
      exercicioId,
      pontuacao
    } = body

    // Se está a atualizar pontuação de um exercício específico
    const updateData: any = {
      ...(atoAtual !== undefined && { atoAtual }),
      ...(exerciciosCompletos !== undefined && { exerciciosCompletos }),
      ...(pontuacaoTotal !== undefined && { pontuacaoTotal }),
    }

    // Atualizar pontuação individual do exercício
    if (exercicioId !== undefined && pontuacao !== undefined) {
      updateData[`pontuacaoEx${exercicioId}`] = pontuacao

      // Adicionar exercício aos completos se não estiver
      const currentProgress = await prisma.progress.findUnique({
        where: { userId: session.user.id },
      })

      if (currentProgress) {
        const completos = currentProgress.exerciciosCompletos || []
        if (!completos.includes(exercicioId)) {
          updateData.exerciciosCompletos = [...completos, exercicioId]
        }

        // Recalcular pontuação total
        const pontuacoes = [
          exercicioId === 1 ? pontuacao : currentProgress.pontuacaoEx1,
          exercicioId === 2 ? pontuacao : currentProgress.pontuacaoEx2,
          exercicioId === 3 ? pontuacao : currentProgress.pontuacaoEx3,
          exercicioId === 4 ? pontuacao : currentProgress.pontuacaoEx4,
          exercicioId === 5 ? pontuacao : currentProgress.pontuacaoEx5,
          exercicioId === 6 ? pontuacao : currentProgress.pontuacaoEx6,
          exercicioId === 7 ? pontuacao : currentProgress.pontuacaoEx7,
          exercicioId === 8 ? pontuacao : currentProgress.pontuacaoEx8,
        ]
        updateData.pontuacaoTotal = Math.round(
          pontuacoes.reduce((a, b) => a + b, 0) / 8
        )
      }
    }

    const progress = await prisma.progress.upsert({
      where: { userId: session.user.id },
      update: updateData,
      create: {
        userId: session.user.id,
        atoAtual: atoAtual || 1,
        exerciciosCompletos: exerciciosCompletos || [],
        pontuacaoTotal: pontuacaoTotal || 0,
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error)
    return NextResponse.json({ error: 'Erro ao atualizar progresso' }, { status: 500 })
  }
}
