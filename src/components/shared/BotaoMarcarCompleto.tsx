'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useProgresso } from '@/hooks/useProgresso'
import { useState } from 'react'

interface BotaoMarcarCompletoProps {
  atoNumero: number
}

export function BotaoMarcarCompleto({ atoNumero }: BotaoMarcarCompletoProps) {
  const { progress, refresh } = useProgresso()
  const [loading, setLoading] = useState(false)

  const isCompleto = progress?.atoAtual && progress.atoAtual >= atoNumero

  const marcarCompleto = async () => {
    setLoading(true)
    try {
      await fetch('/api/progresso', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ atoAtual: atoNumero }),
      })
      await refresh()
      
      // Disparar evento para atualizar o sidebar
      window.dispatchEvent(new Event('progressUpdated'))
    } catch (error) {
      console.error('Erro ao marcar ato como completo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={marcarCompleto}
      disabled={loading || isCompleto}
      variant={isCompleto ? 'outline' : 'default'}
      size="lg"
      className="gap-2"
    >
      <CheckCircle2 className="w-5 h-5" />
      {loading ? 'A guardar...' : isCompleto ? 'Completo ✓' : 'Marcar como Completo'}
    </Button>
  )
}
