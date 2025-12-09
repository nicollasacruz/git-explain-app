import { useState, useEffect } from 'react'

interface Progress {
  id: string
  userId: string
  atoAtual: number
  exerciciosCompletos: number[]
  pontuacaoTotal: number
  pontuacaoEx1: number
  pontuacaoEx2: number
  pontuacaoEx3: number
  pontuacaoEx4: number
  pontuacaoEx5: number
  pontuacaoEx6: number
  pontuacaoEx7: number
  pontuacaoEx8: number
  updatedAt: string
}

export function useProgresso() {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progresso')
      if (response.ok) {
        const data = await response.json()
        setProgress(data)
      } else {
        setError('Erro ao carregar progresso')
      }
    } catch (err) {
      setError('Erro ao carregar progresso')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProgress()
  }, [])

  const salvarPontuacao = async (exercicioId: number, pontuacao: number) => {
    try {
      const response = await fetch('/api/progresso', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercicioId, pontuacao }),
      })

      if (response.ok) {
        const data = await response.json()
        setProgress(data)
        return true
      } else {
        setError('Erro ao salvar pontuação')
        return false
      }
    } catch (err) {
      setError('Erro ao salvar pontuação')
      return false
    }
  }

  const getPontuacaoExercicio = (exercicioId: number): number => {
    if (!progress) return 0
    return (progress as any)[`pontuacaoEx${exercicioId}`] || 0
  }

  const isExercicioCompleto = (exercicioId: number): boolean => {
    if (!progress) return false
    return progress.exerciciosCompletos.includes(exercicioId)
  }

  return {
    progress,
    loading,
    error,
    salvarPontuacao,
    getPontuacaoExercicio,
    isExercicioCompleto,
    refresh: fetchProgress,
  }
}
