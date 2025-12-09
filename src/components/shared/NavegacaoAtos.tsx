'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ATOS } from '@/types'
import { CheckCircle, Circle } from 'lucide-react'

interface NavegacaoAtosProps {
  atoAtual: number
  exerciciosCompletos: number[]
}

export function NavegacaoAtos({ atoAtual, exerciciosCompletos }: NavegacaoAtosProps) {
  const pathname = usePathname()

  const isAtoDisponivel = (atoNumero: number) => {
    return atoNumero <= atoAtual
  }

  const isAtoConcluido = (atoNumero: number) => {
    // Um ato é considerado concluído apenas se o utilizador já avançou para um ato posterior
    return atoNumero < atoAtual
  }

  return (
    <nav className="w-64 bg-[#2a4365] border-r border-[#2c5282] min-h-screen p-6">
      {/* Logo/Título */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white mb-1">Git Flow Explain</h1>
        <p className="text-sm text-[#cbd5e0]">Palestra Interativa</p>
      </div>

      {/* Navegação dos Atos */}
      <div className="space-y-2">
        <p className="text-xs uppercase text-[#718096] font-semibold mb-3">Os 4 Atos</p>
        {ATOS.map((ato) => {
          const isAtivo = pathname === `/ato-${ato.numero}`
          const isDisponivel = isAtoDisponivel(ato.numero)
          const isConcluido = isAtoConcluido(ato.numero)

          return (
            <Link
              key={ato.numero}
              href={`/ato-${ato.numero}`}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all
                ${isAtivo ? 'bg-[#2c5282] text-white' : ''}
                ${!isAtivo && isDisponivel ? 'text-[#cbd5e0] hover:bg-[#2c5282]/50' : ''}
                ${!isDisponivel ? 'text-[#718096] opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={(e) => {
                if (!isDisponivel) e.preventDefault()
              }}
            >
              <div className="flex-shrink-0">
                {isConcluido ? (
                  <CheckCircle className="w-5 h-5 text-[#38a169]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{ato.emoji}</span>
                  <span className="font-medium text-sm">{ato.titulo}</span>
                </div>
                <p className="text-xs opacity-75 mt-0.5">{ato.subtitulo}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Progresso dos Exercícios */}
      <div className="mt-8 pt-8 border-t border-[#2c5282]">
        <p className="text-xs uppercase text-[#718096] font-semibold mb-3">Progresso</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#cbd5e0]">Exercícios</span>
            <span className="font-semibold text-[#d69e2e]">
              {exerciciosCompletos.length}/8
            </span>
          </div>
          <div className="w-full bg-[#1a365d] rounded-full h-2">
            <div
              className="bg-[#d69e2e] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(exerciciosCompletos.length / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Ato Atual Badge */}
      <div className="mt-6 p-3 bg-[#1a365d] rounded-lg border border-[#2c5282]">
        <p className="text-xs text-[#718096] mb-1">Ato Atual</p>
        <p className="text-sm font-semibold text-[#d69e2e]">
          Ato {atoAtual} - {ATOS.find(a => a.numero === atoAtual)?.titulo}
        </p>
      </div>
    </nav>
  )
}
