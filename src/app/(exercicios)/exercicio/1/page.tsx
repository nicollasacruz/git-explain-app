'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommitBadge } from '@/components/ui/badge'
import { QUIZ_CLASSIFICACAO, TIPOS_COMMIT, TipoCommit } from '@/types'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useProgresso } from '@/hooks/useProgresso'

export default function Exercicio1Page() {
  const [questaoAtual, setQuestaoAtual] = useState(0)
  const [respostas, setRespostas] = useState<(TipoCommit | null)[]>(
    new Array(QUIZ_CLASSIFICACAO.length).fill(null)
  )
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)
  const { salvarPontuacao, getPontuacaoExercicio } = useProgresso()

  const questao = QUIZ_CLASSIFICACAO[questaoAtual]
  const respostaUsuario = respostas[questaoAtual]

  const handleResposta = (tipo: TipoCommit) => {
    const novasRespostas = [...respostas]
    novasRespostas[questaoAtual] = tipo
    setRespostas(novasRespostas)
  }

  const proximaQuestao = () => {
    if (questaoAtual < QUIZ_CLASSIFICACAO.length - 1) {
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

  const calcularPontuacao = async () => {
    let acertos = 0
    QUIZ_CLASSIFICACAO.forEach((q, index) => {
      if (respostas[index] === q.respostaCorreta) {
        acertos++
      }
    })
    const pontos = Math.round((acertos / QUIZ_CLASSIFICACAO.length) * 100)
    setPontuacao(pontos)
    setMostrarResultado(true)

    // Salvar pontuação na base de dados
    await salvarPontuacao(1, pontos)
  }

  const reiniciar = () => {
    setQuestaoAtual(0)
    setRespostas(new Array(QUIZ_CLASSIFICACAO.length).fill(null))
    setMostrarResultado(false)
    setPontuacao(0)
  }

  if (mostrarResultado) {
    const acertos = respostas.filter(
      (r, i) => r === QUIZ_CLASSIFICACAO[i].respostaCorreta
    ).length
    const melhorPontuacao = getPontuacaoExercicio(1)
    const isNovoRecorde = pontuacao > melhorPontuacao

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
                  {isNovoRecorde && (
                    <span className="ml-4 text-2xl text-[#38a169]">🆕 Novo Recorde!</span>
                  )}
                </div>
                <p className="text-xl text-[#cbd5e0] mb-2">
                  {acertos} de {QUIZ_CLASSIFICACAO.length} questões corretas
                </p>
                {melhorPontuacao > 0 && !isNovoRecorde && (
                  <p className="text-sm text-[#718096]">
                    Melhor pontuação anterior: {melhorPontuacao}%
                  </p>
                )}
                <p className="text-[#718096] mt-2">
                  {pontuacao >= 80
                    ? '🏆 Excelente! Dominas os tipos de commit!'
                    : pontuacao >= 60
                    ? '👍 Bom trabalho! Continua a praticar.'
                    : '💪 Revê os conceitos e tenta novamente!'}
                </p>
              </div>

              <div className="space-y-4">
                {QUIZ_CLASSIFICACAO.map((q, index) => {
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
                            Questão {index + 1}: {q.cenario}
                          </p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-[#cbd5e0]">Resposta correta:</span>
                            <CommitBadge tipo={q.respostaCorreta} />
                          </div>
                          {!correto && respostaUser && (
                            <div className="flex items-center gap-3 text-sm mt-1">
                              <span className="text-[#cbd5e0]">Tua resposta:</span>
                              <CommitBadge tipo={respostaUser} />
                            </div>
                          )}
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
                <Link href="/exercicio/2">
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
            Exercício 1: Classifica o Commit
          </h1>
          <p className="text-[#cbd5e0]">
            Identifica o tipo correto de commit para cada cenário
          </p>
        </div>

        {/* Progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#cbd5e0] mb-2">
            <span>
              Questão {questaoAtual + 1} de {QUIZ_CLASSIFICACAO.length}
            </span>
            <span>
              {respostas.filter((r) => r !== null).length}/{QUIZ_CLASSIFICACAO.length}{' '}
              respondidas
            </span>
          </div>
          <div className="w-full bg-[#2a4365] rounded-full h-2">
            <div
              className="bg-[#d69e2e] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((questaoAtual + 1) / QUIZ_CLASSIFICACAO.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Questão */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cenário</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-[#cbd5e0]">{questao.cenario}</p>
          </CardContent>
        </Card>

        {/* Opções */}
        <div className="space-y-3 mb-8">
          <p className="text-sm text-[#718096] mb-4">
            Seleciona o tipo de commit mais apropriado:
          </p>
          {TIPOS_COMMIT.map((tipo) => (
            <button
              key={tipo.tipo}
              onClick={() => handleResposta(tipo.tipo as TipoCommit)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                respostaUsuario === tipo.tipo
                  ? 'border-[#d69e2e] bg-[#2c5282]'
                  : 'border-[#2c5282] bg-[#2a4365] hover:border-[#2b6cb0]'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tipo.emoji}</span>
                <CommitBadge tipo={tipo.tipo as any} />
              </div>
              <p className="text-sm text-[#cbd5e0]">{tipo.descricao}</p>
            </button>
          ))}
        </div>

        {/* Navegação */}
        <div className="flex justify-between">
          <Button
            onClick={questaoAnterior}
            disabled={questaoAtual === 0}
            variant="secondary"
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={proximaQuestao}
            disabled={respostaUsuario === null}
            variant="primary"
            size="lg"
          >
            {questaoAtual === QUIZ_CLASSIFICACAO.length - 1 ? 'Finalizar' : 'Próxima'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Legenda rápida */}
        <Card className="mt-8 bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">💡 Dica rápida:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div>
                <CommitBadge tipo="feat" className="mb-1" />
                <p className="text-[#718096]">Nova funcionalidade</p>
              </div>
              <div>
                <CommitBadge tipo="fix" className="mb-1" />
                <p className="text-[#718096]">Correção de bug</p>
              </div>
              <div>
                <CommitBadge tipo="docs" className="mb-1" />
                <p className="text-[#718096]">Documentação</p>
              </div>
              <div>
                <CommitBadge tipo="style" className="mb-1" />
                <p className="text-[#718096]">Formatação</p>
              </div>
              <div>
                <CommitBadge tipo="refactor" className="mb-1" />
                <p className="text-[#718096]">Refatoração</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
