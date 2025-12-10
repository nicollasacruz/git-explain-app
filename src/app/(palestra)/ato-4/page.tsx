'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Rocket, TrendingUp, Users, Zap, Book, Trophy, Clock, Target, ListChecks, MessageSquare } from 'lucide-react'
import presenterAto4 from '@/data/presenter-ato4.json'
import { AtoWrapper } from '@/components/shared/AtoWrapper'
import { BotaoMarcarCompleto } from '@/components/shared/BotaoMarcarCompleto'
import { GuiaAutomacaoModal } from '@/components/shared/GuiaAutomacaoModal'
import { GitFlowInitModal } from '@/components/shared/GitFlowInitModal'

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

export default function Ato4Page() {
  const { data: session } = useSession()
  const isPresenter = session?.user?.role?.toString().toUpperCase() === 'PRESENTER'
  const presenterContent = presenterAto4 as PresenterContent

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('[PresenterCheck] Ato4', { isPresenter, role: session?.user?.role, email: session?.user?.email })
  }, [isPresenter, session?.user?.role, session?.user?.email])

  return (
    <AtoWrapper atoNumero={4}>
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
                <p className="text-xs text-[#a0aec0]">Mantenha o foco em escala e métricas reais do time.</p>
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
          <span className="text-4xl">🚀</span>
          <div className="text-left">
            <p className="text-xs text-[#718096] uppercase font-semibold">Ato 4</p>
            <h1 className="text-2xl font-bold text-white">O Novo Mundo</h1>
          </div>
        </div>
        <p className="text-xl text-[#cbd5e0] max-w-2xl mx-auto">
          O time que adotou manteve o padrão e colheu ganhos internos
        </p>
      </div>

      {/* Imagem do Novo Mundo */}
      <div className="mb-12 relative w-full max-w-4xl mx-auto">
        <Image
          src="/images/ato-4-novo-mundo.png"
          alt="Equipa celebrando sucesso"
          width={1200}
          height={800}
          className="rounded-2xl shadow-2xl"
        />
      </div>

      {/* A Expansão */}
      <div className="space-y-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Rocket className="w-6 h-6 text-[#d69e2e]" />
              6 Meses Depois...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#cbd5e0]">
            <p>
              A história da equipa do João espalhou-se pela empresa.
              Outros times começaram a perguntar: <strong className="text-white">"Como é que vocês conseguem entregar tão rápido internamente?"</strong>
            </p>
            <div className="bg-[#2a4365] p-6 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📈</span>
                <div>
                  <p className="font-semibold text-white">+8 equipas adotaram</p>
                  <p className="text-sm">Conventional Commits + Git Flow + SemVer viraram padrão da empresa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <p className="font-semibold text-white">40% mais releases</p>
                  <p className="text-sm">De 1 release/mês para 1.5 releases/semana em média</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <p className="font-semibold text-white">CI/CD automatizado</p>
                  <p className="text-sm">Versionamento, testes e deploy acontecem sem intervenção manual</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Impressionantes */}
        <Card className="bg-gradient-to-br from-[#2a4365] to-[#1a365d] border-[#d69e2e] border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <TrendingUp className="w-6 h-6 text-[#d69e2e]" />
              Métricas de Impacto (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#1a365d] rounded-lg border border-[#2c5282]">
                <div className="text-5xl font-bold text-[#38a169] mb-2">-85%</div>
                <p className="text-sm text-[#cbd5e0]">Tempo de onboarding de novos devs</p>
                <p className="text-xs text-[#718096] mt-2">De 3 semanas para 3 dias</p>
              </div>

              <div className="text-center p-6 bg-[#1a365d] rounded-lg border border-[#2c5282]">
                <div className="text-5xl font-bold text-[#38a169] mb-2">-60%</div>
                <p className="text-sm text-[#cbd5e0]">Bugs em produção</p>
                <p className="text-xs text-[#718096] mt-2">Code review mais eficiente</p>
              </div>

              <div className="text-center p-6 bg-[#1a365d] rounded-lg border border-[#2c5282]">
                <div className="text-5xl font-bold text-[#38a169] mb-2">+200%</div>
                <p className="text-sm text-[#cbd5e0]">Velocidade de rollback</p>
                <p className="text-xs text-[#718096] mt-2">Tags facilitam voltar versões</p>
              </div>

              <div className="text-center p-6 bg-[#1a365d] rounded-lg border border-[#2c5282]">
                <div className="text-5xl font-bold text-[#3182ce] mb-2">100%</div>
                <p className="text-sm text-[#cbd5e0]">Releases documentadas</p>
                <p className="text-xs text-[#718096] mt-2">CHANGELOG automático</p>
              </div>

              <div className="text-center p-6 bg-[#1a365d] rounded-lg border border-[#2c5282]">
                <div className="text-5xl font-bold text-[#3182ce] mb-2">0</div>
                <p className="text-sm text-[#cbd5e0]">Hotfixes falhados</p>
                <p className="text-xs text-[#718096] mt-2">Processo claro e seguro</p>
              </div>

              <div className="text-center p-6 bg-[#1a365d] rounded-lg border border-[#2c5282]">
                <div className="text-5xl font-bold text-[#d69e2e] mb-2">9.2/10</div>
                <p className="text-sm text-[#cbd5e0]">Satisfação da equipa</p>
                <p className="text-xs text-[#718096] mt-2">Survey interno</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Casos de Uso Reais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#d69e2e]" />
              Casos de Uso que Salvaram o Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-[#2a4365] p-5 rounded-lg border-l-4 border-[#38a169]">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span>🔥</span> Bug Crítico em Produção
                </h4>
                <p className="text-sm text-[#cbd5e0] mb-3">
                  Usuário interno reportou bug grave em produção às 23h. Com Git Flow:
                </p>
                <ol className="text-sm text-[#cbd5e0] space-y-1 ml-5 list-decimal">
                  <li>Criaram hotfix/corrigir-bug-pagamento da master</li>
                  <li>Corrigiram em 15 minutos</li>
                  <li>Merge automático para master + develop</li>
                  <li>Deploy em produção às 23:20h</li>
                  <li>CHANGELOG atualizado automaticamente</li>
                </ol>
                <p className="text-xs text-[#38a169] mt-3 font-semibold">
                  ✅ Tempo total: 20 minutos (antes levava horas!)
                </p>
              </div>

              <div className="bg-[#2a4365] p-5 rounded-lg border-l-4 border-[#3182ce]">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span>📦</span> Release Grande com 15 Features
                </h4>
                <p className="text-sm text-[#cbd5e0] mb-3">
                  Precisavam lançar versão 2.0.0 com muitas mudanças:
                </p>
                <ol className="text-sm text-[#cbd5e0] space-y-1 ml-5 list-decimal">
                  <li>Todas as features estavam em branches separadas</li>
                  <li>Merge gradual para develop ao longo de 2 semanas</li>
                  <li>Criaram release/v2.0.0 para testes finais</li>
                  <li>CHANGELOG gerado mostrou 3 BREAKING CHANGES</li>
                  <li>Documentaram migrações antes do release</li>
                </ol>
                <p className="text-xs text-[#3182ce] mt-3 font-semibold">
                  ✅ Lançamento sem surpresas, stakeholders internos informados!
                </p>
              </div>

              <div className="bg-[#2a4365] p-5 rounded-lg border-l-4 border-[#9f7aea]">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span>🔍</span> Auditoria de Segurança
                </h4>
                <p className="text-sm text-[#cbd5e0] mb-3">
                  Empresa pediu auditoria de todas as mudanças em autenticação:
                </p>
                <ol className="text-sm text-[#cbd5e0] space-y-1 ml-5 list-decimal">
                  <li>Filtraram commits: <code className="bg-[#1a365d] px-2 py-1 rounded text-xs">git log --grep="auth"</code></li>
                  <li>Encontraram todos os 27 commits relacionados</li>
                  <li>Cada commit tinha contexto claro do que foi alterado</li>
                  <li>Geraram relatório em 30 minutos</li>
                </ol>
                <p className="text-xs text-[#9f7aea] mt-3 font-semibold">
                  ✅ Antes levaria dias vasculhando código!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Passos */}
        <Card className="bg-gradient-to-br from-[#2c5282] to-[#2a4365] border-[#d69e2e] border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Book className="w-6 h-6 text-[#d69e2e]" />
              Como Começar?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/exercicio/1" className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#2a4365] transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d69e2e] flex items-center justify-center font-bold text-[#1a365d]">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Praticar nos exercícios interativos</h5>
                  <p className="text-sm text-[#cbd5e0]">Completa os 8 exercícios desta aplicação!</p>
                </div>
              </Link>
              <GuiaAutomacaoModal />
              <GitFlowInitModal />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#38a169] flex items-center justify-center font-bold text-white">
                  ✓
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Resultados em 1 semana!</h5>
                  <p className="text-sm text-[#cbd5e0]">Vai notar a diferença imediatamente</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recursos */}
        <Card>
          <CardHeader>
            <CardTitle>📚 Recursos para Aprender Mais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="https://www.conventionalcommits.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282] hover:border-[#d69e2e] transition-colors"
              >
                <h5 className="font-semibold text-white mb-2">Conventional Commits</h5>
                <p className="text-xs text-[#cbd5e0]">Especificação oficial</p>
              </a>

              <a
                href="https://nvie.com/posts/a-successful-git-branching-model/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282] hover:border-[#d69e2e] transition-colors"
              >
                <h5 className="font-semibold text-white mb-2">Git Flow</h5>
                <p className="text-xs text-[#cbd5e0]">Artigo original de Vincent Driessen</p>
              </a>

              <a
                href="https://semver.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282] hover:border-[#d69e2e] transition-colors"
              >
                <h5 className="font-semibold text-white mb-2">Semantic Versioning</h5>
                <p className="text-xs text-[#cbd5e0]">Especificação SemVer 2.0.0</p>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Mensagem Final */}
        <Card className="bg-gradient-to-br from-[#d69e2e] to-[#ed8936] border-none">
          <CardContent className="p-12 text-center">
            <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Parabéns por Chegares Até Aqui!
            </h3>
            <p className="text-xl text-[#1a365d] mb-6 max-w-2xl mx-auto">
              Agora é hora de praticar! Completa os 8 exercícios interativos e domina estas práticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/exercicio/1">
                <Button size="lg" className="bg-white text-[#d69e2e] hover:bg-gray-100 font-bold">
                  Começar Exercícios
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="secondary" className="bg-[#1a365d] text-white hover:bg-[#2a4365] border-white">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <Link href="/ato-3">
          <Button variant="secondary" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Anterior: A Transformação
          </Button>
        </Link>
        <BotaoMarcarCompleto atoNumero={4} />
      </div>
    </div>
    </AtoWrapper>
  )
}
