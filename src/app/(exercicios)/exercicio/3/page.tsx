'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BranchBadge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, GitBranch } from 'lucide-react'
import Link from 'next/link'

interface Tarefa {
  id: number
  dev: string
  descricao: string
  tipo: 'feature' | 'hotfix' | 'release'
  branchOrigem: string
  branchDestino: string
}

const TAREFAS: Tarefa[] = [
  {
    id: 1,
    dev: 'João',
    descricao: 'Implementar login com OAuth',
    tipo: 'feature',
    branchOrigem: 'develop',
    branchDestino: 'develop',
  },
  {
    id: 2,
    dev: 'Maria',
    descricao: 'Bug crítico: utilizadores não conseguem fazer checkout',
    tipo: 'hotfix',
    branchOrigem: 'master',
    branchDestino: 'master e develop',
  },
  {
    id: 3,
    dev: 'Pedro',
    descricao: 'Adicionar dark mode',
    tipo: 'feature',
    branchOrigem: 'develop',
    branchDestino: 'develop',
  },
  {
    id: 4,
    dev: 'João',
    descricao: 'Preparar versão 2.0.0 para produção',
    tipo: 'release',
    branchOrigem: 'develop',
    branchDestino: 'master e develop',
  },
]

interface Resposta {
  branchOrigem: string
  branchDestino: string
}

export default function Exercicio3Page() {
  const [respostas, setRespostas] = useState<Resposta[]>(
    TAREFAS.map(() => ({ branchOrigem: '', branchDestino: '' }))
  )
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)

  const handleResposta = (index: number, campo: 'branchOrigem' | 'branchDestino', valor: string) => {
    const novasRespostas = [...respostas]
    novasRespostas[index] = { ...novasRespostas[index], [campo]: valor }
    setRespostas(novasRespostas)
  }

  const validarRespostas = () => {
    let acertos = 0
    TAREFAS.forEach((tarefa, index) => {
      const resposta = respostas[index]
      const origemCorreta = resposta.branchOrigem === tarefa.branchOrigem
      const destinoCorreto = resposta.branchDestino === tarefa.branchDestino
      if (origemCorreta && destinoCorreto) {
        acertos++
      }
    })
    const pontos = Math.round((acertos / TAREFAS.length) * 100)
    setPontuacao(pontos)
    setMostrarResultado(true)
  }

  const reiniciar = () => {
    setRespostas(TAREFAS.map(() => ({ branchOrigem: '', branchDestino: '' })))
    setMostrarResultado(false)
    setPontuacao(0)
  }

  const opcoesBranch = ['master', 'develop', 'master e develop']

  if (mostrarResultado) {
    let acertos = 0
    TAREFAS.forEach((tarefa, index) => {
      const resposta = respostas[index]
      if (
        resposta.branchOrigem === tarefa.branchOrigem &&
        resposta.branchDestino === tarefa.branchDestino
      ) {
        acertos++
      }
    })

    return (
      <div className="min-h-screen bg-[#1a365d] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-gradient-to-br from-[#2a4365] to-[#1a365d] border-[#2c5282]">
            <CardHeader>
              <CardTitle className="text-center text-3xl text-white">
                Exercício Concluído! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#d69e2e] mb-4">
                  {pontuacao}%
                </div>
                <p className="text-xl text-[#cbd5e0] mb-2">
                  {acertos} de {TAREFAS.length} tarefas corretas
                </p>
                <p className="text-[#718096]">
                  {pontuacao >= 75
                    ? '🏆 Excelente! Dominas Git Flow!'
                    : pontuacao >= 50
                    ? '👍 Bom trabalho! Continua a praticar.'
                    : '💪 Revê o Ato 2 sobre Git Flow!'}
                </p>
              </div>

              <div className="space-y-4">
                {TAREFAS.map((tarefa, index) => {
                  const resposta = respostas[index]
                  const origemCorreta = resposta.branchOrigem === tarefa.branchOrigem
                  const destinoCorreto = resposta.branchDestino === tarefa.branchDestino
                  const correto = origemCorreta && destinoCorreto

                  return (
                    <div
                      key={tarefa.id}
                      className={`p-4 rounded-lg border-2 ${
                        correto
                          ? 'bg-[#38a169]/20 border-[#38a169]'
                          : 'bg-[#e53e3e]/20 border-[#e53e3e]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {correto ? (
                          <CheckCircle className="w-6 h-6 text-[#38a169] flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-[#e53e3e] flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-white font-medium mb-2">
                            {tarefa.dev}: {tarefa.descricao}
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                              <span className="text-[#cbd5e0] w-24">Origem:</span>
                              <BranchBadge tipo={tarefa.branchOrigem as 'master' | 'develop'} />
                              {!origemCorreta && (
                                <span className="text-[#e53e3e] text-xs">
                                  (escolheste: {resposta.branchOrigem || 'nenhuma'})
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[#cbd5e0] w-24">Destino:</span>
                              <span className="text-white">{tarefa.branchDestino}</span>
                              {!destinoCorreto && (
                                <span className="text-[#e53e3e] text-xs">
                                  (escolheste: {resposta.branchDestino || 'nenhum'})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <Button onClick={reiniciar} variant="secondary" size="lg">
                  Tentar Novamente
                </Button>
                <Link href="/exercicio/4">
                  <Button variant="primary" size="lg">
                    Próximo Exercício
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a365d] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/exercicio/2"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercício Anterior
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Exercício 3: Simulação Git Flow
          </h1>
          <p className="text-[#cbd5e0]">
            Identifica a branch de origem e destino para cada tarefa
          </p>
        </div>

        {/* Diagrama Git Flow */}
        <Card className="mb-8 bg-[#2a4365]/50 border-[#2c5282]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <GitBranch className="w-5 h-5" />
              Fluxo Git Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#1a365d] rounded border-l-4 border-[#9f7aea]">
                <BranchBadge tipo="feature" className="mb-2" />
                <p className="text-[#cbd5e0]">
                  <strong>Origem:</strong> develop<br />
                  <strong>Destino:</strong> develop
                </p>
              </div>
              <div className="p-3 bg-[#1a365d] rounded border-l-4 border-[#ed8936]">
                <BranchBadge tipo="release" className="mb-2" />
                <p className="text-[#cbd5e0]">
                  <strong>Origem:</strong> develop<br />
                  <strong>Destino:</strong> master + develop
                </p>
              </div>
              <div className="p-3 bg-[#1a365d] rounded border-l-4 border-[#e53e3e]">
                <BranchBadge tipo="hotfix" className="mb-2" />
                <p className="text-[#cbd5e0]">
                  <strong>Origem:</strong> master<br />
                  <strong>Destino:</strong> master + develop
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarefas */}
        <div className="space-y-6 mb-8">
          {TAREFAS.map((tarefa, index) => {
            const resposta = respostas[index]
            const tipoColors = {
              feature: 'border-[#9f7aea]',
              hotfix: 'border-[#e53e3e]',
              release: 'border-[#ed8936]',
            }

            return (
              <Card key={tarefa.id} className={`border-2 ${tipoColors[tarefa.tipo]}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">
                      {tarefa.tipo === 'feature' ? '✨' : tarefa.tipo === 'hotfix' ? '🔥' : '📦'}
                    </span>
                    {tarefa.dev}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#cbd5e0]">{tarefa.descricao}</p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[#718096] mb-2 block">
                        De onde deve criar a branch?
                      </label>
                      <div className="flex gap-2">
                        {(['master', 'develop'] as const).map((branch) => (
                          <button
                            key={branch}
                            onClick={() => handleResposta(index, 'branchOrigem', branch)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                              resposta.branchOrigem === branch
                                ? 'border-[#d69e2e] bg-[#2c5282]'
                                : 'border-[#2c5282] bg-[#2a4365] hover:border-[#2b6cb0]'
                            }`}
                          >
                            <BranchBadge tipo={branch} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#718096] mb-2 block">
                        Para onde deve fazer merge?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {opcoesBranch.map((opcao) => (
                          <button
                            key={opcao}
                            onClick={() => handleResposta(index, 'branchDestino', opcao)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                              resposta.branchDestino === opcao
                                ? 'border-[#d69e2e] bg-[#2c5282] text-white'
                                : 'border-[#2c5282] bg-[#2a4365] hover:border-[#2b6cb0] text-[#cbd5e0]'
                            }`}
                          >
                            {opcao}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Validar */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={validarRespostas}
            disabled={respostas.some((r) => !r.branchOrigem || !r.branchDestino)}
            variant="primary"
            size="lg"
          >
            Validar Respostas
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Dica */}
        <Card className="bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">💡 Regra de ouro:</p>
            <ul className="text-xs text-[#cbd5e0] space-y-1">
              <li>🌿 <strong>Features:</strong> sempre de develop para develop</li>
              <li>🔥 <strong>Hotfixes:</strong> de master, volta para master E develop</li>
              <li>📦 <strong>Releases:</strong> de develop, vai para master E develop</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
