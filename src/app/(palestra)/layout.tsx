'use client'

import { NavegacaoAtos } from '@/components/shared/NavegacaoAtos'
import { NavegacaoApresentador } from '@/components/shared/NavegacaoApresentador'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, Presentation, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface Progress {
  atoAtual: number
  exerciciosCompletos: number[]
  pontuacaoTotal: number
}

export default function PalestraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [progress, setProgress] = useState<Progress>({
    atoAtual: 1,
    exerciciosCompletos: [],
    pontuacaoTotal: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchProgress = async () => {
    if (status === 'authenticated') {
      try {
        const response = await fetch('/api/progresso')
        if (response.ok) {
          const data = await response.json()
          setProgress(data)
        }
      } catch (error) {
        console.error('Erro ao carregar progresso:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchProgress()
  }, [status])

  // Adicionar listener para recarregar progresso quando necessário
  useEffect(() => {
    const handleProgressUpdate = () => {
      fetchProgress()
    }

    window.addEventListener('progressUpdated', handleProgressUpdate)
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate)
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a365d]">
        <div className="animate-pulse text-[#d69e2e] text-lg">A carregar...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const isPresenter = (session?.user as any)?.role === 'PRESENTER'

  return (
    <div className="flex min-h-screen bg-[#1a365d]">
      {/* Sidebar com Navegação - modo apresentador ou modo aluno */}
      {isPresenter ? (
        <NavegacaoApresentador atoAtual={progress.atoAtual} />
      ) : (
        <NavegacaoAtos
          atoAtual={progress.atoAtual}
          exerciciosCompletos={progress.exerciciosCompletos}
        />
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#2a4365] border-b border-[#2c5282] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isPresenter && (
                <div className="p-2 bg-[#d69e2e] rounded-lg">
                  <Presentation className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <p className="text-sm text-[#cbd5e0]">
                  {isPresenter ? 'Apresentador' : 'Bem-vindo'},
                </p>
                <p className="text-lg font-semibold text-white">{session?.user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isPresenter && (
                <div className="text-right">
                  <p className="text-xs text-[#718096]">Pontuação Total</p>
                  <p className="text-xl font-bold text-[#d69e2e]">{progress.pontuacaoTotal}</p>
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="p-2 text-[#cbd5e0] hover:text-white hover:bg-[#2c5282] rounded-lg transition-colors"
                title="Terminar sessão"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Área de Conteúdo */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
