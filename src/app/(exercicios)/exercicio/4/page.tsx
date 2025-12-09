'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Problema {
  id: string
  descricao: string
  correto: boolean
}

const HISTORICO = [
  'a3f5b2c - update stuff',
  '9d8e1a7 - feat: adicionar autenticação OAuth',
  '7c2f5e3 - mudanças',
  '5b9a4d1 - FUNCIONOU!!!',
  '3e7c8f2 - fix(api): corrigir timeout em uploads grandes',
  '1a4b9e5 - docs: atualizar README com instruções de deploy',
  '8f2d6a9 - refactor código',
  '2c5e7b3 - fix anterior não funcionou',
  '6d1a8f4 - style: aplicar formatação Prettier',
  '4e9b2c7 - asdfasdf',
]

const PROBLEMAS: Problema[] = [
  {
    id: 'p1',
    descricao: 'Commits sem tipo (ex: "update stuff", "mudanças")',
    correto: true,
  },
  {
    id: 'p2',
    descricao: 'Mensagens não descritivas (ex: "FUNCIONOU!!!", "asdfasdf")',
    correto: true,
  },
  {
    id: 'p3',
    descricao: 'Commits de correção de correção (ex: "fix anterior não funcionou")',
    correto: true,
  },
  {
    id: 'p4',
    descricao: 'Falta de consistência no formato',
    correto: true,
  },
  {
    id: 'p5',
    descricao: 'Todos os commits estão em inglês',
    correto: false,
  },
  {
    id: 'p6',
    descricao: 'Descrições muito longas nas mensagens',
    correto: false,
  },
  {
    id: 'p7',
    descricao: 'Falta de breaking changes indicados',
    correto: false,
  },
  {
    id: 'p8',
    descricao: 'Commits sem escopo definido',
    correto: false,
  },
]

export default function Exercicio4Page() {
  const [selecionados, setSelecionados] = useState<string[]>([])
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)

  const toggleProblema = (id: string) => {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((p) => p !== id))
    } else {
      setSelecionados([...selecionados, id])
    }
  }

  const validarRespostas = () => {
    let acertos = 0
    PROBLEMAS.forEach((problema) => {
      const selecionado = selecionados.includes(problema.id)
      if (
        (problema.correto && selecionado) ||
        (!problema.correto && !selecionado)
      ) {
        acertos++
      }
    })
    const pontos = Math.round((acertos / PROBLEMAS.length) * 100)
    setPontuacao(pontos)
    setMostrarResultado(true)
  }

  const reiniciar = () => {
    setSelecionados([])
    setMostrarResultado(false)
    setPontuacao(0)
  }

  if (mostrarResultado) {
    let acertos = 0
    PROBLEMAS.forEach((problema) => {
      const selecionado = selecionados.includes(problema.id)
      if (
        (problema.correto && selecionado) ||
        (!problema.correto && !selecionado)
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
                Code Review Concluído! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#d69e2e] mb-4">
                  {pontuacao}%
                </div>
                <p className="text-xl text-[#cbd5e0] mb-2">
                  {acertos} de {PROBLEMAS.length} identificações corretas
                </p>
                <p className="text-[#718096]">
                  {pontuacao >= 75
                    ? '🏆 Excelente olho de revisor!'
                    : pontuacao >= 50
                    ? '👍 Bom trabalho!'
                    : '💪 Pratica mais identificação de problemas!'}
                </p>
              </div>

              <div className="space-y-3">
                {PROBLEMAS.map((problema) => {
                  const selecionado = selecionados.includes(problema.id)
                  const correto =
                    (problema.correto && selecionado) ||
                    (!problema.correto && !selecionado)

                  return (
                    <div
                      key={problema.id}
                      className={`p-4 rounded-lg border-2 ${
                        correto
                          ? 'bg-[#38a169]/20 border-[#38a169]'
                          : 'bg-[#e53e3e]/20 border-[#e53e3e]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {correto ? (
                          <CheckCircle className="w-5 h-5 text-[#38a169] flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-[#e53e3e] flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-white text-sm mb-1">
                            {problema.descricao}
                          </p>
                          <p className="text-xs text-[#718096]">
                            {problema.correto ? (
                              <span className="text-[#38a169]">✓ Este É um problema real</span>
                            ) : (
                              <span className="text-[#3182ce]">
                                ✓ Este NÃO é um problema (escopo é opcional, nem tudo precisa BREAKING)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-[#2a4365] p-6 rounded-lg border border-[#2c5282]">
                <h4 className="font-bold text-white mb-3">🎯 Principais Problemas:</h4>
                <ul className="text-sm text-[#cbd5e0] space-y-2">
                  <li>❌ <strong>Commits sem tipo:</strong> "update stuff", "mudanças"</li>
                  <li>❌ <strong>Mensagens inúteis:</strong> "FUNCIONOU!!!", "asdfasdf"</li>
                  <li>❌ <strong>Correção de correção:</strong> indica falta de testes</li>
                  <li>❌ <strong>Inconsistência:</strong> alguns seguem Conventional, outros não</li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <Button onClick={reiniciar} variant="secondary" size="lg">
                  Tentar Novamente
                </Button>
                <Link href="/exercicio/5">
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
            href="/exercicio/3"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercício Anterior
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Exercício 4: Code Review
          </h1>
          <p className="text-[#cbd5e0]">
            Analisa este histórico e identifica os problemas
          </p>
        </div>

        {/* Histórico Git */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📜 Histórico Git para Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-[#0d1117] p-6 rounded-lg border border-[#2c5282]">
              <div className="space-y-2 text-[#e6edf3]">
                {HISTORICO.map((commit, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      commit.includes('feat') ||
                      commit.includes('fix') ||
                      commit.includes('docs') ||
                      commit.includes('style')
                        ? 'text-[#38a169]'
                        : 'text-[#e53e3e]'
                    }`}
                  >
                    <span className="text-[#848d97]">{commit.split(' - ')[0]}</span>
                    <span>{commit.split(' - ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instruções */}
        <Card className="mb-8 bg-[#2c5282] border-[#d69e2e]">
          <CardContent className="p-6">
            <p className="text-white mb-3">
              <strong>Tarefa:</strong> Seleciona APENAS os problemas reais que encontras neste histórico.
            </p>
            <p className="text-sm text-[#cbd5e0]">
              💡 Cuidado! Nem tudo é problema. Algumas práticas são opcionais.
            </p>
          </CardContent>
        </Card>

        {/* Lista de Problemas */}
        <div className="space-y-3 mb-8">
          {PROBLEMAS.map((problema) => {
            const selecionado = selecionados.includes(problema.id)

            return (
              <button
                key={problema.id}
                onClick={() => toggleProblema(problema.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selecionado
                    ? 'border-[#d69e2e] bg-[#2c5282]'
                    : 'border-[#2c5282] bg-[#2a4365] hover:border-[#2b6cb0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selecionado
                          ? 'border-[#d69e2e] bg-[#d69e2e]'
                          : 'border-[#718096]'
                      }`}
                    >
                      {selecionado && (
                        <CheckCircle className="w-4 h-4 text-[#1a365d]" />
                      )}
                    </div>
                  </div>
                  <p className="text-[#cbd5e0] flex-1">{problema.descricao}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Validar */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={validarRespostas}
            disabled={selecionados.length === 0}
            variant="primary"
            size="lg"
          >
            Submeter Review
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Dica */}
        <Card className="bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">💡 Dicas de Code Review:</p>
            <ul className="text-xs text-[#cbd5e0] space-y-1">
              <li>✅ Tipo de commit é obrigatório (feat, fix, docs, etc.)</li>
              <li>✅ Mensagem deve ser descritiva e profissional</li>
              <li>✅ Evitar commits de "correção de correção"</li>
              <li>⚠️ Escopo é opcional, mas recomendado</li>
              <li>⚠️ Breaking changes só quando há incompatibilidade</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
