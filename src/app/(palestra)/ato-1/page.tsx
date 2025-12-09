'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowRight, GitBranch, MessageSquare, AlertTriangle, Clock, Target, ListChecks } from 'lucide-react'
import { useSession } from 'next-auth/react'
import presenterAto1 from '@/data/presenter-ato1.json'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

const presenterContent = presenterAto1 as PresenterContent

export default function Ato1Page() {
  const { data: session } = useSession()
  const isPresenter = session?.user?.role?.toString().toUpperCase() === 'PRESENTER'

  useEffect(() => {
    // Debug rápido para confirmar papel na renderização do ato
    // eslint-disable-next-line no-console
    console.debug('[PresenterCheck] Ato1', { isPresenter, role: session?.user?.role, email: session?.user?.email })
  }, [isPresenter, session?.user?.email])

  return (
    <AtoWrapper atoNumero={1}>
      <div className={`container mx-auto px-8 py-12 max-w-6xl ${isPresenter ? 'pt-16' : ''}`}>
        {/* Presenter Toolbar */}
        {isPresenter && (
          <div className="fixed top-0 left-0 w-full bg-[#2a4365] text-white py-2 px-4 shadow-lg z-50">
            <p className="text-sm font-semibold">Modo Apresentador Ativo</p>
          </div>
        )}

        {/* Painel do Apresentador (somente visível para apresentador) */}
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
                  <p className="text-xs text-[#a0aec0]">Mantenha a história ágil e foque na dor.</p>
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
                    Pergunta rápido
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
                <p className="text-xs text-[#718096]">Resposta sugerida destacada em amarelo.</p>
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
            <span className="text-4xl">😰</span>
            <div className="text-left">
              <p className="text-xs text-[#718096] uppercase font-semibold">Ato 1</p>
              <h1 className="text-2xl font-bold text-white">O Caos</h1>
            </div>
          </div>
          <p className="text-xl text-[#cbd5e0] max-w-2xl mx-auto">
            Era uma vez um time de devs...
          </p>
        </div>

        {/* Imagem do Caos */}
        <div className="mb-12 relative w-full max-w-4xl mx-auto">
          <Image
            src="/images/ato-1-caos.png"
            alt="Developers em caos total"
            width={1200}
            height={800}
            className="rounded-2xl shadow-2xl"
            priority
          />
        </div>

        {/* História Narrativa */}
        <div className="space-y-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-[#d69e2e]" />
                A História do Caos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#cbd5e0]">
              <p>
                <strong className="text-white">João, Maria e Pedro</strong> trabalham juntos há 3 meses.
                São developers talentosos, mas têm um problema: <strong className="text-[#e53e3e]">ninguém sabe o que está em produção</strong>.
              </p>
              <p>
                Todos os dias é a mesma conversa:
              </p>
              <div className="bg-[#1a365d] p-4 rounded-lg border-l-4 border-[#e53e3e] my-4">
                <p className="italic text-[#cbd5e0]">
                  "Maria, aquele bug do login já foi corrigido?"<br />
                  "Acho que sim... ou foi só na branch do Pedro?"<br />
                  "Não sei, deixa eu ver o git log..."
                </p>
              </div>
              <p>
                E quando abrem o <code className="bg-[#2a4365] px-2 py-1 rounded text-[#d69e2e]">git log</code>,
                veem isto:
              </p>
            </CardContent>
          </Card>

          {/* Histórico Caótico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-[#e53e3e]" />
                O Histórico do Terror
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm bg-[#0d1117] p-6 rounded-lg overflow-x-auto border border-[#2c5282]">
                <div className="space-y-2 text-[#e6edf3]">
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">a3f5b2c</span>
                    <span className="text-[#58a6ff]">(HEAD -&gt; main)</span>
                    <span>fix stuff</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">9d8e1a7</span>
                    <span></span>
                    <span>FUNCIONOU!!!</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">7c2f5e3</span>
                    <span></span>
                    <span>fix anterior nao funcionou</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">5b9a4d1</span>
                    <span></span>
                    <span>corrige bug</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">3e7c8f2</span>
                    <span></span>
                    <span>mudanças</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">1a4b9e5</span>
                    <span></span>
                    <span>asdfasdf</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">8f2d6a9</span>
                    <span></span>
                    <span>final version</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">2c5e7b3</span>
                    <span></span>
                    <span>final version 2</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">6d1a8f4</span>
                    <span></span>
                    <span>agora vai</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#848d97]">4e9b2c7</span>
                    <span></span>
                    <span>update</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Os Problemas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-[#ecc94b]" />
                Os Problemas Reais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282]">
                  <h4 className="font-semibold text-white mb-2">❌ Mensagens inúteis</h4>
                  <p className="text-sm text-[#cbd5e0]">
                    "fix stuff", "mudanças", "asdfasdf" - ninguém sabe o que foi alterado
                  </p>
                </div>
                <div className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282]">
                  <h4 className="font-semibold text-white mb-2">❌ Impossível gerar changelog</h4>
                  <p className="text-sm text-[#cbd5e0]">
                    Como documentar o que mudou entre versões?
                  </p>
                </div>
                <div className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282]">
                  <h4 className="font-semibold text-white mb-2">❌ Code review difícil</h4>
                  <p className="text-sm text-[#cbd5e0]">
                    Revisar código sem contexto é perder tempo
                  </p>
                </div>
                <div className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282]">
                  <h4 className="font-semibold text-white mb-2">❌ Bugs em produção</h4>
                  <p className="text-sm text-[#cbd5e0]">
                    Ninguém sabe qual commit introduziu o problema
                  </p>
                </div>
                <div className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282]">
                  <h4 className="font-semibold text-white mb-2">❌ Rollback impossível</h4>
                  <p className="text-sm text-[#cbd5e0]">
                    Voltar para versão anterior? Boa sorte!
                  </p>
                </div>
                <div className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282]">
                  <h4 className="font-semibold text-white mb-2">❌ Onboarding lento</h4>
                  <p className="text-sm text-[#cbd5e0]">
                    Novos developers levam semanas a perceber o histórico
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* A Frustração */}
          <Card className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] border-[#2c5282]">
            <CardContent className="p-8 text-center">
              <p className="text-2xl text-white mb-4">
                "Tem de haver um jeito melhor..."
              </p>
              <p className="text-lg text-[#cbd5e0]">
                E há! No próximo ato, vais descobrir como 3 práticas simples podem transformar este caos.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navegação */}
        <div className="flex justify-between items-center">
          <BotaoMarcarCompleto atoNumero={1} />
          <Link href="/ato-2">
            <Button variant="primary" size="lg" className="gap-2">
              Próximo: A Descoberta
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </AtoWrapper>
  );
}
