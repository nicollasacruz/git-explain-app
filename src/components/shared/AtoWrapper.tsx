'use client'

import { useEffect } from 'react'
import { useProgresso } from '@/hooks/useProgresso'

interface AtoWrapperProps {
  atoNumero: number
  children: React.ReactNode
}

export function AtoWrapper({ atoNumero, children }: AtoWrapperProps) {
  const { progress, salvarPontuacao } = useProgresso()

  useEffect(() => {
    // Marcar ato como visitado se for maior que o atual
    if (progress && atoNumero > progress.atoAtual) {
      // Atualizar atoAtual na base de dados
      fetch('/api/progresso', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ atoAtual: atoNumero }),
      }).then(() => {
        // Disparar evento para atualizar o sidebar
        window.dispatchEvent(new Event('progressUpdated'))
      })
    }
  }, [atoNumero, progress])

  return <>{children}</>
}
