'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CommitBadge } from '@/components/ui/badge'
import { TipoCommit } from '@/types'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Rocket } from 'lucide-react'
import Link from 'next/link'
import { useProgresso } from '@/hooks/useProgresso'

const COMMITS_RELEASE: Array<{ tipo: TipoCommit; mensagem: string }> = [
  { tipo: 'feat', mensagem: 'adicionar sistema de notificações push' },
  { tipo: 'feat', mensagem: 'implementar modo offline' },
  { tipo: 'fix', mensagem: 'corrigir crash ao abrir perfil' },
  { tipo: 'fix', mensagem: 'resolver problema de cache em imagens' },
  { tipo: 'perf', mensagem: 'otimizar carregamento inicial da app' },
  { tipo: 'docs', mensagem: 'atualizar guia de contribuição' },
  { tipo: 'test', mensagem: 'adicionar testes e2e ao fluxo de checkout' },
]

interface Respostas {
  versao: string
  titulo: string
  changelog: string
  breakingChanges: string
}

export default function Exercicio7Page() {
  const { salvarPontuacao } = useProgresso()
  const [respostas, setRespostas] = useState<Respostas>({
    versao: '',
    titulo: '',
    changelog: '',
    breakingChanges: '',
  })
  const [validado, setValidado] = useState(false)
  const [feedback, setFeedback] = useState<{
    versaoCorreta: boolean
    tituloOk: boolean
    changelogOk: boolean
    breakingOk: boolean
    notas: string[]
  } | null>(null)

  const handleChange = (campo: keyof Respostas, valor: string) => {
    setRespostas({ ...respostas, [campo]: valor })
    setValidado(false)
    setFeedback(null)
  }

  const validarRelease = async () => {
    const notas: string[] = []

    // Validação local (fallback)
    const versaoCorretaLocal = respostas.versao === '2.1.0'
    if (!versaoCorretaLocal) {
      if (respostas.versao.startsWith('3.')) {
        notas.push('❌ Versão: Não há BREAKING CHANGES, então não deve ser 3.x.x')
      } else if (respostas.versao.startsWith('2.0.')) {
        notas.push('❌ Versão: Há features novas, então deve ser 2.1.0 (não 2.0.x)')
      } else {
        notas.push('❌ Versão: Com 2 features novas e sem breaking changes, deve ser 2.1.0')
      }
    } else {
      notas.push('✅ Versão correta! 2 features = MINOR bump')
    }

    const tituloOkLocal =
      respostas.titulo.toLowerCase().includes('notificações') ||
      respostas.titulo.toLowerCase().includes('offline') ||
      respostas.titulo.toLowerCase().includes('2.1')
    if (!tituloOkLocal) {
      notas.push('⚠️ Título: Deveria mencionar as features principais ou a versão')
    } else {
      notas.push('✅ Título descritivo!')
    }

    const changelogOkLocal =
      respostas.changelog.toLowerCase().includes('notificações') &&
      respostas.changelog.toLowerCase().includes('offline')
    if (!changelogOkLocal) {
      notas.push('⚠️ Changelog: Deveria listar as 2 features principais')
    } else {
      notas.push('✅ Changelog com features listadas!')
    }

    const breakingOkLocal =
      respostas.breakingChanges.trim() === '' ||
      respostas.breakingChanges.toLowerCase().includes('nenhum') ||
      respostas.breakingChanges.toLowerCase().includes('não')
    if (!breakingOkLocal) {
      notas.push('❌ Breaking Changes: Não há breaking changes nestes commits')
    } else {
      notas.push('✅ Correto: sem breaking changes')
    }

    // Tenta validação por IA (opcional). Se falhar, usa o resultado local.
    try {
      const response = await fetch('/api/ai/avaliar-release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commits: COMMITS_RELEASE,
          respostas,
          expectedResponseSchema: {
            versaoCorreta: 'boolean',
            tituloOk: 'boolean',
            changelogOk: 'boolean',
            breakingOk: 'boolean',
            notas: 'string[] // lista de notas em ordem de feedback'
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Correção ainda não disponível')
      }

      const data = await response.json()

      // Espera-se que a IA devolva o mesmo shape; se não devolver, lança para cair no fallback
      if (
        typeof data?.versaoCorreta !== 'boolean' ||
        typeof data?.tituloOk !== 'boolean' ||
        typeof data?.changelogOk !== 'boolean' ||
        typeof data?.breakingOk !== 'boolean' ||
        !Array.isArray(data?.notas)
      ) {
        throw new Error('Payload de IA inesperado')
      }

      setFeedback({
        versaoCorreta: data.versaoCorreta,
        tituloOk: data.tituloOk,
        changelogOk: data.changelogOk,
        breakingOk: data.breakingOk,
        notas: data.notas,
      })
      setValidado(true)

      // Calcular e salvar pontuação
      const acertos = [data.versaoCorreta, data.tituloOk, data.changelogOk, data.breakingOk].filter(Boolean).length
      const pontos = Math.round((acertos / 4) * 100)
      await salvarPontuacao(7, pontos)
      return
    } catch (error) {
      notas.unshift('⚠️ Correção automática ainda não está ativa. Usando validação local.')
      setFeedback({
        versaoCorreta: versaoCorretaLocal,
        tituloOk: tituloOkLocal,
        changelogOk: changelogOkLocal,
        breakingOk: breakingOkLocal,
        notas,
      })
      setValidado(true)

      // Calcular e salvar pontuação (fallback local)
      const acertos = [versaoCorretaLocal, tituloOkLocal, changelogOkLocal, breakingOkLocal].filter(Boolean).length
      const pontos = Math.round((acertos / 4) * 100)
      await salvarPontuacao(7, pontos)
    }
  }

  const todosCorretos = feedback?.versaoCorreta && feedback?.breakingOk

  return (
    <div className="min-h-screen bg-[#1a365d] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/exercicio/6"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercício Anterior
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Exercício 7: Simulação de Release
          </h1>
          <p className="text-[#cbd5e0]">
            Prepara uma release baseada nos commits
          </p>
        </div>

        {/* Contexto */}
        <Card className="mb-8 bg-[#2c5282] border-[#d69e2e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Rocket className="w-5 h-5" />
              Cenário
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#cbd5e0]">
            <p className="mb-3">
              A tua equipa terminou o desenvolvimento da próxima release.
              A versão atual em produção é <strong className="text-white">v2.0.5</strong>.
            </p>
            <p>
              Analisa os commits abaixo e prepara a release:
            </p>
          </CardContent>
        </Card>

        {/* Commits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Commits para Release</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {COMMITS_RELEASE.map((commit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-[#2a4365] rounded-lg"
                >
                  <CommitBadge tipo={commit.tipo} />
                  <span className="text-[#cbd5e0] text-sm">{commit.mensagem}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formulário */}
        <div className="space-y-6 mb-8">
          {/* Versão */}
          <Card>

          {/* Skip Option */}
          <div className="mb-8">
            <Card className="bg-[#2c5282]/40 border-[#2c5282]">
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-white font-semibold">Quer pular esta validação?</p>
                  <p className="text-sm text-[#cbd5e0]">Avança diretamente para o próximo exercício sem preencher a release.</p>
                </div>
                <Link href="/exercicio/8" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Pular e ir para o Exercício 8
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
            <CardHeader>
              <CardTitle className="text-lg">1. Qual será a próxima versão?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <label className="text-[#cbd5e0] font-semibold">v</label>
                <Input
                  type="text"
                  value={respostas.versao}
                  onChange={(e) => handleChange('versao', e.target.value)}
                  placeholder="Ex: 2.1.0"
                  className="text-xl font-mono font-bold"
                />
              </div>
              <p className="text-xs text-[#718096] mt-2">
                Versão atual: v2.0.5
              </p>
            </CardContent>
          </Card>

          {/* Título */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Título da Release</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                value={respostas.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
                placeholder="Ex: Notificações Push e Modo Offline"
              />
              <p className="text-xs text-[#718096] mt-2">
                Um título descritivo das principais mudanças
              </p>
            </CardContent>
          </Card>

          {/* Changelog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Changelog</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={respostas.changelog}
                onChange={(e) => handleChange('changelog', e.target.value)}
                placeholder="### Features&#10;- Sistema de notificações push&#10;- Modo offline&#10;&#10;### Bug Fixes&#10;- Corrigir crash ao abrir perfil&#10;..."
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-[#718096] mt-2">
                Lista organizada das mudanças (Features, Bug Fixes, Performance, etc.)
              </p>
            </CardContent>
          </Card>

          {/* Breaking Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. Breaking Changes?</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={respostas.breakingChanges}
                onChange={(e) => handleChange('breakingChanges', e.target.value)}
                placeholder="Lista os breaking changes ou escreve 'Nenhum'"
                rows={3}
              />
              <p className="text-xs text-[#718096] mt-2">
                Mudanças que quebram compatibilidade com versões anteriores
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Validar */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={validarRelease}
            disabled={!respostas.versao || !respostas.titulo || !respostas.changelog}
            variant="primary"
            size="lg"
          >
            Validar Release
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Feedback */}
        {validado && feedback && (
          <Card
            className={`mb-8 ${
              todosCorretos
                ? 'bg-[#38a169]/20 border-[#38a169] border-2'
                : 'bg-[#ecc94b]/20 border-[#ecc94b] border-2'
            } animate-fade-in`}
          >
            <CardHeader>
              <CardTitle className={todosCorretos ? 'text-[#38a169]' : 'text-[#ecc94b]'}>
                {todosCorretos ? '✅ Release Pronta!' : '⚠️ Revê Alguns Pontos'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedback.notas.map((nota, index) => (
                <p key={index} className="text-[#cbd5e0]">
                  {nota}
                </p>
              ))}

              {todosCorretos && (
                <div className="pt-4 border-t border-[#2c5282] mt-6">
                  <p className="text-white font-semibold mb-3">
                    🎉 Perfeito! Aqui está como ficaria a release:
                  </p>
                  <div className="bg-[#0d1117] p-4 rounded-lg font-mono text-xs text-[#e6edf3]">
                    <div className="text-[#58a6ff] font-bold mb-2">
                      Release v2.1.0 - {respostas.titulo}
                    </div>
                    <div className="whitespace-pre-line">{respostas.changelog}</div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <Link href="/exercicio/8">
                      <Button variant="primary" size="lg">
                        Último Exercício
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dica */}
        <Card className="bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">💡 Regras de versionamento:</p>
            <ul className="text-xs text-[#cbd5e0] space-y-1">
              <li>• <strong>MAJOR:</strong> breaking changes (feat! ou fix!)</li>
              <li>• <strong>MINOR:</strong> novas features compatíveis (feat)</li>
              <li>• <strong>PATCH:</strong> bug fixes (fix)</li>
              <li>• docs, style, refactor, perf, test, chore → não alteram versão</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
