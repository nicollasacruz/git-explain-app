'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CommitBadge } from '@/components/ui/badge'
import { QUESTOES_VERSAO } from '@/types'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Tag } from 'lucide-react'
import Link from 'next/link'

export default function Exercicio5Page() {
  const [questaoAtual, setQuestaoAtual] = useState(0)
  const [respostas, setRespostas] = useState<string[]>(
    new Array(QUESTOES_VERSAO.length).fill('')
  )
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)

  const questao = QUESTOES_VERSAO[questaoAtual]
  const respostaUsuario = respostas[questaoAtual]

  const handleResposta = (valor: string) => {
    const novasRespostas = [...respostas]
    novasRespostas[questaoAtual] = valor
    setRespostas(novasRespostas)
  }

  const proximaQuestao = () => {
    if (questaoAtual < QUESTOES_VERSAO.length - 1) {
      setQuestaoAtual(questaoAtual + 1)
    } else {
      calcularPontuacao()
    }
  }

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1)
    }
  }

  const calcularPontuacao = () => {
    let acertos = 0
    QUESTOES_VERSAO.forEach((q, index) => {
      if (respostas[index] === q.respostaCorreta) {
        acertos++
      }
    })
    const pontos = Math.round((acertos / QUESTOES_VERSAO.length) * 100)
    setPontuacao(pontos)
    setMostrarResultado(true)
  }

  const reiniciar = () => {
    setQuestaoAtual(0)
    setRespostas(new Array(QUESTOES_VERSAO.length).fill(''))
    setMostrarResultado(false)
    setPontuacao(0)
  }

  if (mostrarResultado) {
    const acertos = respostas.filter(
      (r, i) => r === QUESTOES_VERSAO[i].respostaCorreta
    ).length

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
                  {acertos} de {QUESTOES_VERSAO.length} questões corretas
                </p>
                <p className="text-[#718096]">
                  {pontuacao >= 80
                    ? '🏆 Excelente! Dominas Semantic Versioning!'
                    : pontuacao >= 60
                    ? '👍 Bom trabalho! Continua a praticar.'
                    : '💪 Revê os conceitos de SemVer!'}
                </p>
              </div>

              <div className="space-y-4">
                {QUESTOES_VERSAO.map((q, index) => {
                  const respostaUser = respostas[index]
                  const correto = respostaUser === q.respostaCorreta

                  return (
                    <div
                      key={index}
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
                            {q.versaoAtual} + {q.commits.length} commits
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {q.commits.map((commit, i) => (
                              <CommitBadge key={i} tipo={commit.tipo as any} />
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-sm mt-3">
                            <span className="text-[#cbd5e0]">Resposta correta:</span>
                            <code className="bg-[#1a365d] px-3 py-1 rounded text-[#38a169] font-bold">
                              {q.respostaCorreta}
                            </code>
                          </div>
                          {!correto && respostaUser && (
                            <div className="flex items-center gap-3 text-sm mt-1">
                              <span className="text-[#cbd5e0]">Tua resposta:</span>
                              <code className="bg-[#1a365d] px-3 py-1 rounded text-[#e53e3e]">
                                {respostaUser}
                              </code>
                            </div>
                          )}
                          <p className="text-xs text-[#718096] mt-2">
                            Razão: {q.explicacao}
                          </p>
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
                <Link href="/exercicio/6">
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
            href="/ato-2"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Atos
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Exercício 5: Qual a Próxima Versão?
          </h1>
          <p className="text-[#cbd5e0]">
            Calcula a versão correta com base nos commits
          </p>
        </div>

        {/* Progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#cbd5e0] mb-2">
            <span>
              Questão {questaoAtual + 1} de {QUESTOES_VERSAO.length}
            </span>
          </div>
          <div className="w-full bg-[#2a4365] rounded-full h-2">
            <div
              className="bg-[#d69e2e] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((questaoAtual + 1) / QUESTOES_VERSAO.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Versão Atual */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#d69e2e]" />
              Versão Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-3xl font-bold text-[#d69e2e]">
              {questao.versaoAtual}
            </code>
          </CardContent>
        </Card>

        {/* Commits */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Novos Commits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {questao.commits.map((commit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-[#2a4365] rounded-lg"
                >
                  <CommitBadge tipo={commit.tipo as any} />
                  <span className="text-[#cbd5e0] text-sm">{commit.mensagem}</span>
                  {commit.breaking && (
                    <span className="ml-auto px-2 py-1 bg-[#e53e3e] text-white text-xs rounded font-bold">
                      BREAKING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de Resposta */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Qual será a próxima versão?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-[#cbd5e0] font-semibold">v</label>
              <Input
                type="text"
                value={respostaUsuario}
                onChange={(e) => handleResposta(e.target.value)}
                placeholder="Ex: 2.1.0"
                className="text-xl font-mono font-bold"
              />
            </div>
            <p className="text-xs text-[#718096]">
              Formato: MAJOR.MINOR.PATCH (ex: 1.2.3)
            </p>
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="flex justify-between">
          <Button onClick={questaoAnterior} disabled={questaoAtual === 0} variant="secondary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={proximaQuestao}
            disabled={!respostaUsuario.trim()}
            variant="primary"
          >
            {questaoAtual === QUESTOES_VERSAO.length - 1 ? 'Finalizar' : 'Próxima'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Regras SemVer */}
        <Card className="mt-8 bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">📖 Regras do SemVer:</p>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-[#1a365d] rounded">
                <div className="font-bold text-[#e53e3e] mb-1">MAJOR (X.0.0)</div>
                <p className="text-[#cbd5e0]">
                  BREAKING CHANGE ou feat! / fix!
                </p>
              </div>
              <div className="p-3 bg-[#1a365d] rounded">
                <div className="font-bold text-[#38a169] mb-1">MINOR (x.Y.0)</div>
                <p className="text-[#cbd5e0]">
                  feat (nova funcionalidade)
                </p>
              </div>
              <div className="p-3 bg-[#1a365d] rounded">
                <div className="font-bold text-[#3182ce] mb-1">PATCH (x.y.Z)</div>
                <p className="text-[#cbd5e0]">
                  fix (correção de bug)
                </p>
              </div>
            </div>
            <p className="text-xs text-[#718096] mt-3">
              💡 Outros tipos (docs, style, refactor, test, chore) não alteram a versão!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
