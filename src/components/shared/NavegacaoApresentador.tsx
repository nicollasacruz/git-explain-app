'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ATOS } from '@/types'
import { CheckCircle, Circle, ChevronRight, Presentation } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface NavegacaoApresentadorProps {
  atoAtual: number
}

export function NavegacaoApresentador({ atoAtual }: NavegacaoApresentadorProps) {
  const pathname = usePathname()

  const getAtoDetalhes = (atoNumero: number) => {
    const detalhes = {
      1: {
        topicos: [
          'História do João, Maria e Pedro',
          'Problemas com git log caótico',
          'Commits como "fix", "FUNCIONOU!!!", "WIP"',
          'Dificuldade em encontrar bugs',
          'Onboarding lento de novos devs',
        ],
        tempoEstimado: '5-10 min',
        objetivos: 'Mostrar os problemas reais de um time sem padronização',
      },
      2: {
        topicos: [
          'Conventional Commits - a gramática comum',
          'Tipos: feat, fix, docs, style, refactor, etc.',
          'Git Flow - sistema de branches',
          'Branches: master, develop, feature/*, release/*, hotfix/*',
          'Semantic Versioning - MAJOR.MINOR.PATCH',
          'Tags e Releases no GitHub',
        ],
        tempoEstimado: '15-20 min',
        objetivos: 'Apresentar as três práticas que resolvem o caos',
      },
      3: {
        topicos: [
          'Histórico organizado com Git Flow',
          'Commits claros com Conventional Commits',
          'Versionamento automático',
          'Changelog gerado automaticamente',
          'Deploy mais confiável',
          'Comparação antes/depois',
        ],
        tempoEstimado: '10-15 min',
        objetivos: 'Mostrar a transformação prática no mesmo projeto',
      },
      4: {
        topicos: [
          'Resultados após 6 meses',
          'Expansão para outros times',
          'Métricas de melhoria',
          'Automação com GitHub Actions',
          'Roadmap de adoção gradual',
          'Call to action - começar amanhã',
        ],
        tempoEstimado: '5 min',
        objetivos: 'Inspirar e dar primeiros passos concretos',
      },
    }
    return detalhes[atoNumero as keyof typeof detalhes]
  }

  return (
    <nav className="w-96 bg-[#2a4365] border-r border-[#2c5282] min-h-screen p-6 overflow-y-auto">
      {/* Logo/Título */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Presentation className="w-6 h-6 text-[#d69e2e]" />
          <h1 className="text-xl font-bold text-white">Modo Apresentador</h1>
        </div>
        <p className="text-sm text-[#cbd5e0]">Guia detalhado para palestra</p>
      </div>

      {/* Navegação dos Atos */}
      <div className="space-y-4">
        <p className="text-xs uppercase text-[#718096] font-semibold mb-3">Os 4 Atos</p>
        {ATOS.map((ato) => {
          const isAtivo = pathname === `/ato-${ato.numero}`
          const detalhes = getAtoDetalhes(ato.numero)

          return (
            <Card
              key={ato.numero}
              className={`
                transition-all border-2
                ${isAtivo ? 'border-[#d69e2e] bg-[#2c5282]' : 'border-[#2c5282] bg-[#1a365d]'}
              `}
            >
              <CardContent className="p-4">
                <Link
                  href={`/ato-${ato.numero}`}
                  className="block"
                >
                  {/* Header do Ato */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{ato.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white text-lg">
                          Ato {ato.numero}: {ato.titulo}
                        </h3>
                        {isAtivo && <ChevronRight className="w-5 h-5 text-[#d69e2e]" />}
                      </div>
                      <p className="text-sm text-[#cbd5e0] mb-2">{ato.subtitulo}</p>
                      <div className="flex items-center gap-4 text-xs text-[#718096]">
                        <span>⏱️ {detalhes.tempoEstimado}</span>
                      </div>
                    </div>
                  </div>

                  {/* Objetivos */}
                  <div className="mb-3 p-3 bg-[#1a365d]/50 rounded-lg">
                    <p className="text-xs uppercase text-[#718096] font-semibold mb-1">Objetivo</p>
                    <p className="text-sm text-[#cbd5e0]">{detalhes.objetivos}</p>
                  </div>

                  {/* Tópicos principais */}
                  <div>
                    <p className="text-xs uppercase text-[#718096] font-semibold mb-2">Tópicos</p>
                    <ul className="space-y-1.5">
                      {detalhes.topicos.map((topico, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-[#cbd5e0]"
                        >
                          <span className="text-[#d69e2e] mt-1">•</span>
                          <span>{topico}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Dicas para Apresentação */}
      <div className="mt-8 p-4 bg-[#1a365d] rounded-lg border border-[#2c5282]">
        <p className="text-xs uppercase text-[#718096] font-semibold mb-2">💡 Dicas</p>
        <ul className="space-y-2 text-sm text-[#cbd5e0]">
          <li className="flex items-start gap-2">
            <span className="text-[#d69e2e]">•</span>
            <span>Comece cada ato com a história/contexto</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#d69e2e]">•</span>
            <span>Use exemplos reais do dia-a-dia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#d69e2e]">•</span>
            <span>Faça perguntas à plateia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#d69e2e]">•</span>
            <span>Demo ao vivo impressiona mais</span>
          </li>
        </ul>
      </div>

      {/* Tempo Total */}
      <div className="mt-6 p-3 bg-gradient-to-r from-[#d69e2e]/20 to-[#d69e2e]/10 rounded-lg border border-[#d69e2e]/30">
        <p className="text-xs text-[#cbd5e0] mb-1">Duração Total Estimada</p>
        <p className="text-2xl font-bold text-[#d69e2e]">35-50 min</p>
        <p className="text-xs text-[#718096] mt-1">+ tempo para Q&A</p>
      </div>
    </nav>
  )
}
