'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { EXEMPLOS_REESCRITA } from '@/types'
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useProgresso } from '@/hooks/useProgresso'

export default function Exercicio2Page() {
  const { salvarPontuacao } = useProgresso()
  const [exemploAtual, setExemploAtual] = useState(0)
  const [respostas, setRespostas] = useState<string[]>(
    new Array(EXEMPLOS_REESCRITA.length).fill('')
  )
  const [avaliando, setAvaliando] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [pontuacao, setPontuacao] = useState<number | null>(null)
  const [resultadoCorreto, setResultadoCorreto] = useState<boolean | null>(null)

  const exemplo = EXEMPLOS_REESCRITA[exemploAtual]
  const respostaAtual = respostas[exemploAtual]

  const handleResposta = (valor: string) => {
    const novasRespostas = [...respostas]
    novasRespostas[exemploAtual] = valor
    setRespostas(novasRespostas)
    setFeedback(null)
    setPontuacao(null)
    setResultadoCorreto(null)
  }

  const avaliarResposta = async () => {
    setAvaliando(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/ai/analisar-mensagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commitOriginal: exemplo.commitRuim,
          reescritaUtilizador: respostaAtual,
          contexto: exemplo.contexto,
          expectedResponseSchema: {
            feedback: 'string // mensagem de feedback a exibir ao utilizador',
            acertou: 'boolean // true se a reescrita está correta/conforme'
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Correção ainda não disponível')
      }

      const data = await response.json()
      setFeedback(data.feedback)
      setPontuacao(typeof data.pontuacao === 'number' ? data.pontuacao : null)
      setResultadoCorreto(typeof data.acertou === 'boolean' ? data.acertou : null)

      // Salvar pontuação no progresso
      if (typeof data.pontuacao === 'number') {
        await salvarPontuacao(2, data.pontuacao)
      }
    } catch (error) {
      // Fallback para manter o fluxo usável mesmo sem backend de correção
      setFeedback(
        '⚠️ Correção automática ainda não está ativa. Compare com o exemplo ideal abaixo e siga para o próximo.'
      )
      setPontuacao(null)
      setResultadoCorreto(null)
    } finally {
      setAvaliando(false)
    }
  }

  const proximoExemplo = () => {
    if (exemploAtual < EXEMPLOS_REESCRITA.length - 1) {
      setExemploAtual(exemploAtual + 1)
      setFeedback(null)
    }
  }

  const exemploAnterior = () => {
    if (exemploAtual > 0) {
      setExemploAtual(exemploAtual - 1)
      setFeedback(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a365d] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/exercicio/1"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercício Anterior
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Exercício 2: Reescreve o Commit
          </h1>
          <p className="text-[#cbd5e0]">
            Transforma commits ruins em mensagens profissionais
          </p>
        </div>

        {/* Progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#cbd5e0] mb-2">
            <span>
              Exemplo {exemploAtual + 1} de {EXEMPLOS_REESCRITA.length}
            </span>
          </div>
          <div className="w-full bg-[#2a4365] rounded-full h-2">
            <div
              className="bg-[#d69e2e] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((exemploAtual + 1) / EXEMPLOS_REESCRITA.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Commit Ruim */}
        <Card className="mb-6 border-[#e53e3e] border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#e53e3e]">
              ❌ Commit Ruim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#0d1117] p-4 rounded-lg font-mono text-sm">
              <span className="text-[#e53e3e]">{exemplo.commitRuim}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contexto */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">📝 Contexto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#cbd5e0] text-sm">{exemplo.contexto}</p>
          </CardContent>
        </Card>

        {/* Área de Resposta */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d69e2e]" />
              Reescreve este Commit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={respostaAtual}
              onChange={(e) => handleResposta(e.target.value)}
              placeholder="tipo(escopo): descrição concisa&#10;&#10;[corpo opcional explicando o porquê]"
              rows={6}
              className="font-mono text-sm"
            />
            <div className="flex gap-3">
              <Button
                onClick={avaliarResposta}
                disabled={!respostaAtual.trim() || avaliando}
                variant="primary"
                className="gap-2"
              >
                {avaliando ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    A avaliar com Claude AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Avaliar com IA
                  </>
                )}
              </Button>
              {feedback && (
                <Button
                  onClick={proximoExemplo}
                  disabled={exemploAtual === EXEMPLOS_REESCRITA.length - 1}
                  variant="secondary"
                >
                  Próximo Exemplo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback da IA */}
        {feedback && (
          <Card className="mb-6 bg-[#2c5282] border-[#d69e2e] border-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#d69e2e]">
                🤖 Feedback do Claude AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#cbd5e0] whitespace-pre-line">{feedback}</p>
              </div>
              {pontuacao !== null && (
                <p className="text-sm text-[#cbd5e0] mt-3">Pontuação: {pontuacao}</p>
              )}
              {resultadoCorreto !== null && (
                <p className="text-sm text-[#cbd5e0] mt-1">
                  Resultado: {resultadoCorreto ? 'Correto' : 'Incorreto'}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Exemplo Ideal (mostrar após avaliar) */}
        {feedback && (
          <Card className="mb-6 border-[#38a169] border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#38a169]">
                ✅ Exemplo Ideal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[#0d1117] p-4 rounded-lg font-mono text-sm">
                <span className="text-[#38a169]">{exemplo.commitBom}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navegação */}
        <div className="flex justify-between">
          <Button onClick={exemploAnterior} disabled={exemploAtual === 0} variant="secondary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </Button>
          {exemploAtual === EXEMPLOS_REESCRITA.length - 1 ? (
            <Link href="/exercicio/3">
              <Button variant="primary">
                Próximo Exercício
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={proximoExemplo}
              disabled={!feedback}
              variant="primary"
            >
              Próximo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>

        {/* Dicas */}
        <Card className="mt-8 bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">💡 Checklist de uma boa mensagem:</p>
            <ul className="text-xs text-[#cbd5e0] space-y-1">
              <li>✅ Tipo correto (feat, fix, docs, etc.)</li>
              <li>✅ Escopo entre parênteses (opcional mas recomendado)</li>
              <li>✅ Descrição em minúsculas, sem ponto final</li>
              <li>✅ Foca no "o quê" e "porquê", não no "como"</li>
              <li>✅ Máximo 72 caracteres na primeira linha</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
