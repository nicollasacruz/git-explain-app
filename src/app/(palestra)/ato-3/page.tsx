'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommitBadge } from '@/components/ui/badge'
import { ArrowRight, ArrowLeft, Sparkles, GitCompare, Clock, Target, ListChecks, MessageSquare } from 'lucide-react'
import presenterAto3 from '@/data/presenter-ato3.json'
import { AtoWrapper } from '@/components/shared/AtoWrapper'
import { BotaoMarcarCompleto } from '@/components/shared/BotaoMarcarCompleto'

type PresenterContent = {
  atoNumero: number
  title: string
  tldr: string
  keyPoints: string[]
  storyBeats: string[]
  demo: string[]
  poll: {
    question: string
    options: string[]
  }
  quiz: {
    question: string
    options: string[]
    answerIndex: number
  }
  timer: {
    label: string
    durationSeconds: number
  }
  callouts: string[]
}

export default function Ato3Page() {
  const { data: session } = useSession()
  const isPresenter = session?.user?.role?.toString().toUpperCase() === 'PRESENTER'
  const presenterContent = presenterAto3 as PresenterContent

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('[PresenterCheck] Ato3', { isPresenter, role: session?.user?.role, email: session?.user?.email })
  }, [isPresenter, session?.user?.role, session?.user?.email])

  return (
    <AtoWrapper atoNumero={3}>
    <div className={`container mx-auto px-8 py-12 max-w-6xl ${isPresenter ? 'pt-16' : ''}`}>
      {/* Presenter Toolbar */}
      {isPresenter && (
        <div className="fixed top-0 left-0 w-full bg-[#2a4365] text-white py-2 px-4 shadow-lg z-50">
          <p className="text-sm font-semibold">Modo Apresentador Ativo</p>
        </div>
      )}

      {/* Painel do Apresentador */}
      {isPresenter && (
        <div className="mb-10 grid gap-4 rounded-xl border border-[#2c5282] bg-[#0f172a] p-6 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#cbd5e0]">
              <Target className="w-5 h-5 text-[#d69e2e]" />
              <p className="text-sm font-semibold">Objetivo do ato</p>
            </div>
            <p className="text-base text-white">{presenterContent.tldr}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-[#1a365d] border-[#2c5282]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white text-base">
                  <Clock className="w-5 h-5 text-[#d69e2e]" />
                  Ritmo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#cbd5e0] text-sm space-y-2">
                <p>{presenterContent.timer.label}: ~{Math.round(presenterContent.timer.durationSeconds / 60)} min</p>
                <p className="text-xs text-[#a0aec0]">Mantenha comparativo antes/depois e peça exemplos do time.</p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a365d] border-[#2c5282]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white text-base">
                  <ListChecks className="w-5 h-5 text-[#d69e2e]" />
                  Pontos-chave
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#cbd5e0] text-sm space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  {presenterContent.keyPoints.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a365d] border-[#2c5282]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white text-base">
                  <MessageSquare className="w-5 h-5 text-[#d69e2e]" />
                  Pergunta rápida
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#cbd5e0] text-sm space-y-2">
                <p className="font-semibold">{presenterContent.poll.question}</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#a0aec0]">
                  {presenterContent.poll.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-[#1a365d] border-[#2c5282]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Roteiro</CardTitle>
              </CardHeader>
              <CardContent className="text-[#cbd5e0] text-sm space-y-2">
                <ol className="list-decimal list-inside space-y-1">
                  {presenterContent.storyBeats.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-[#1a365d] border-[#2c5282]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Demo curta</CardTitle>
              </CardHeader>
              <CardContent className="text-[#cbd5e0] text-sm space-y-2">
                <ol className="list-decimal list-inside space-y-1">
                  {presenterContent.demo.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#1a365d] border-[#2c5282]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Quiz rápido</CardTitle>
            </CardHeader>
            <CardContent className="text-[#cbd5e0] text-sm space-y-2">
              <p className="font-semibold">{presenterContent.quiz.question}</p>
              <ul className="list-decimal list-inside space-y-1 text-xs text-[#a0aec0]">
                {presenterContent.quiz.options.map((option, index) => (
                  <li key={index} className={index === presenterContent.quiz.answerIndex ? 'text-[#d69e2e]' : ''}>
                    {option}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#718096]">Resposta sugerida destacada.</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a365d] border-[#2c5282]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Callouts</CardTitle>
            </CardHeader>
            <CardContent className="text-[#cbd5e0] text-sm space-y-2">
              <ul className="list-disc list-inside space-y-1">
                {presenterContent.callouts.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Header do Ato */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-[#2a4365] rounded-full border border-[#2c5282]">
          <span className="text-4xl">✨</span>
          <div className="text-left">
            <p className="text-xs text-[#718096] uppercase font-semibold">Ato 3</p>
            <h1 className="text-2xl font-bold text-white">A Transformação</h1>
          </div>
        </div>
        <p className="text-xl text-[#cbd5e0] max-w-2xl mx-auto">
          Vê a diferença no mesmo projeto!
        </p>
      </div>

      {/* Imagem da Transformação */}
      <div className="mb-12 relative w-full max-w-4xl mx-auto">
        <Image
          src="/images/ato-3-transformacao.png"
          alt="Transformação do projeto"
          width={1200}
          height={800}
          className="rounded-2xl shadow-2xl"
        />
      </div>

      {/* A Decisão */}
      <div className="space-y-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#d69e2e]" />
              A Decisão da Equipa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#cbd5e0]">
            <p>
              João, Maria e Pedro decidiram implementar as 3 práticas no projeto.
              Levou <strong className="text-white">apenas 1 dia</strong> para configurar tudo:
            </p>
            <div className="bg-[#2a4365] p-6 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-semibold text-white">Manhã: Configuração</p>
                  <p className="text-sm">Instalaram commitlint, configuraram Git Flow, criaram CHANGELOG.md</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="font-semibold text-white">Tarde: Documentação</p>
                  <p className="text-sm">Criaram guia interno e fizeram workshop de 30min para a equipa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold text-white">Dia seguinte: Em produção!</p>
                  <p className="text-sm">Todos já estavam a usar as novas práticas naturalmente</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparação Antes/Depois */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <GitCompare className="w-6 h-6 text-[#d69e2e]" />
              Antes vs Depois: O Histórico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* ANTES */}
              <div>
                <h4 className="font-bold text-[#e53e3e] mb-4 text-center">❌ ANTES (Caos)</h4>
                <div className="font-mono text-xs bg-[#0d1117] p-4 rounded-lg border border-[#e53e3e]">
                  <div className="space-y-1 text-[#e6edf3]">
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">a3f5b2c</span>
                      <span>fix stuff</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">9d8e1a7</span>
                      <span>FUNCIONOU!!!</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">7c2f5e3</span>
                      <span>fix anterior nao funcionou</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">5b9a4d1</span>
                      <span>corrige bug</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">3e7c8f2</span>
                      <span>mudanças</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">1a4b9e5</span>
                      <span>asdfasdf</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">8f2d6a9</span>
                      <span>final version</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#848d97]">2c5e7b3</span>
                      <span>final version 2</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-[#e53e3e]">
                  <p>❌ Impossível gerar changelog</p>
                  <p>❌ Ninguém sabe o que mudou</p>
                  <p>❌ Code review difícil</p>
                </div>
              </div>

              {/* DEPOIS */}
              <div>
                <h4 className="font-bold text-[#38a169] mb-4 text-center">✅ DEPOIS (Organizado)</h4>
                <div className="font-mono text-xs bg-[#0d1117] p-4 rounded-lg border border-[#38a169]">
                  <div className="space-y-2 text-[#e6edf3]">
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">a3f5b2c</span>
                      <CommitBadge tipo="feat" className="scale-75" />
                      <span className="text-xs">adicionar autenticação OAuth</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">9d8e1a7</span>
                      <CommitBadge tipo="fix" className="scale-75" />
                      <span className="text-xs">corrigir timeout em uploads</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">7c2f5e3</span>
                      <CommitBadge tipo="docs" className="scale-75" />
                      <span className="text-xs">atualizar guia de instalação</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">5b9a4d1</span>
                      <CommitBadge tipo="test" className="scale-75" />
                      <span className="text-xs">adicionar testes ao módulo auth</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">3e7c8f2</span>
                      <CommitBadge tipo="perf" className="scale-75" />
                      <span className="text-xs">otimizar queries do dashboard</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">1a4b9e5</span>
                      <CommitBadge tipo="refactor" className="scale-75" />
                      <span className="text-xs">reorganizar estrutura de pastas</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">8f2d6a9</span>
                      <CommitBadge tipo="chore" className="scale-75" />
                      <span className="text-xs">atualizar dependências</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[#848d97]">2c5e7b3</span>
                      <CommitBadge tipo="style" className="scale-75" />
                      <span className="text-xs">aplicar formatação Prettier</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-[#38a169]">
                  <p>✅ Changelog gerado automaticamente</p>
                  <p>✅ Contexto claro em cada commit</p>
                  <p>✅ Code review eficiente</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CHANGELOG Automático */}
        <Card>
          <CardHeader>
            <CardTitle>📋 CHANGELOG.md Gerado Automaticamente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#0d1117] p-6 rounded-lg border border-[#2c5282] font-mono text-sm">
              <div className="text-[#e6edf3] space-y-4">
                <div>
                  <h4 className="text-[#58a6ff] font-bold mb-2">## [1.2.0] - 2024-12-09</h4>
                  <div className="ml-4 space-y-2">
                    <div>
                      <p className="text-[#38a169] font-semibold">### ✨ Features</p>
                      <ul className="ml-4 mt-1 space-y-1 text-[#848d97]">
                        <li>• <strong className="text-white">auth:</strong> adicionar autenticação OAuth (a3f5b2c)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#e53e3e] font-semibold">### 🐛 Bug Fixes</p>
                      <ul className="ml-4 mt-1 space-y-1 text-[#848d97]">
                        <li>• <strong className="text-white">api:</strong> corrigir timeout em uploads (9d8e1a7)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#3182ce] font-semibold">### 📚 Documentation</p>
                      <ul className="ml-4 mt-1 space-y-1 text-[#848d97]">
                        <li>• <strong className="text-white">readme:</strong> atualizar guia de instalação (7c2f5e3)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#f0883e] font-semibold">### ⚡ Performance</p>
                      <ul className="ml-4 mt-1 space-y-1 text-[#848d97]">
                        <li>• <strong className="text-white">dashboard:</strong> otimizar queries (3e7c8f2)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados Imediatos */}
        <Card className="bg-gradient-to-r from-[#2a4365] to-[#2c5282] border-[#38a169] border-2">
          <CardHeader>
            <CardTitle className="text-white">🎯 Resultados na Primeira Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a365d] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#38a169] mb-2">-70%</div>
                <p className="text-sm text-[#cbd5e0]">Tempo em code review</p>
              </div>
              <div className="bg-[#1a365d] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#38a169] mb-2">100%</div>
                <p className="text-sm text-[#cbd5e0]">Commits com contexto claro</p>
              </div>
              <div className="bg-[#1a365d] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#38a169] mb-2">5min</div>
                <p className="text-sm text-[#cbd5e0]">Para gerar CHANGELOG completo</p>
              </div>
              <div className="bg-[#1a365d] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#38a169] mb-2">0</div>
                <p className="text-sm text-[#cbd5e0]">Hotfixes quebraram develop</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusão */}
        <Card className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] border-[#d69e2e] border-2">
          <CardContent className="p-8 text-center">
            <p className="text-2xl text-white mb-4">
              "E não parou por aí..."
            </p>
            <p className="text-lg text-[#cbd5e0]">
              No próximo ato, descobre como outras equipas também adotaram estas práticas!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <Link href="/ato-2">
          <Button variant="secondary" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Anterior: A Descoberta
          </Button>
        </Link>
        <BotaoMarcarCompleto atoNumero={3} />
        <Link href="/ato-4">
          <Button variant="primary" size="lg" className="gap-2">
            Próximo: O Novo Mundo
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
    </AtoWrapper>
  )
}
