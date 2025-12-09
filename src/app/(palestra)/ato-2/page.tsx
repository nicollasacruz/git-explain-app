'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommitBadge, BranchBadge } from '@/components/ui/badge'
import { ArrowRight, ArrowLeft, Lightbulb, GitBranch, Tag, Clock, Target, ListChecks, MessageSquare } from 'lucide-react'
import presenterAto2 from '@/data/presenter-ato2.json'
import { TIPOS_COMMIT } from '@/types'
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

export default function Ato2Page() {
  const { data: session } = useSession()
  const isPresenter = session?.user?.role?.toString().toUpperCase() === 'PRESENTER'
  const presenterContent = presenterAto2 as PresenterContent

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('[PresenterCheck] Ato2', { isPresenter, role: session?.user?.role, email: session?.user?.email })
  }, [isPresenter, session?.user?.role, session?.user?.email])

  return (
    <AtoWrapper atoNumero={2}>
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
                <p className="text-xs text-[#a0aec0]">Mantenha hands-on: peça exemplos do próprio repo/time.</p>
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
          <span className="text-4xl">💡</span>
          <div className="text-left">
            <p className="text-xs text-[#718096] uppercase font-semibold">Ato 2</p>
            <h1 className="text-2xl font-bold text-white">A Descoberta</h1>
          </div>
        </div>
        <p className="text-xl text-[#cbd5e0] max-w-2xl mx-auto">
          Existe um jeito melhor... e não é complicado!
        </p>
      </div>

      {/* Imagem da Descoberta */}
      <div className="mb-12 relative w-full max-w-4xl mx-auto">
        <Image
          src="/images/ato-2-descoberta.png"
          alt="Developer tendo momento eureka"
          width={1200}
          height={800}
          className="rounded-2xl shadow-2xl"
        />
      </div>

      {/* Introdução */}
      <div className="space-y-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-[#d69e2e]" />
              A Solução: 3 Práticas Simples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#cbd5e0]">
            <p>
              Depois de muito pesquisar, a equipa descobriu que <strong className="text-white">milhares de projetos open-source</strong> usam
              3 práticas que resolvem todos os problemas do caos:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-[#2a4365] rounded-lg border-2 border-[#38a169]">
                <h4 className="font-bold text-white mb-2">1️⃣ Conventional Commits</h4>
                <p className="text-sm">Mensagens de commit padronizadas e significativas</p>
              </div>
              <div className="p-4 bg-[#2a4365] rounded-lg border-2 border-[#3182ce]">
                <h4 className="font-bold text-white mb-2">2️⃣ Git Flow</h4>
                <p className="text-sm">Fluxo de trabalho organizado com branches</p>
              </div>
              <div className="p-4 bg-[#2a4365] rounded-lg border-2 border-[#9f7aea]">
                <h4 className="font-bold text-white mb-2">3️⃣ Semantic Versioning</h4>
                <p className="text-sm">Versionamento automático e previsível</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parte 1: Conventional Commits */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mt-12">
            <span className="text-4xl">📝</span>
            Parte 1: Conventional Commits
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>O Que É?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#cbd5e0]">
              <p>
                Uma convenção simples para escrever mensagens de commit. Formato:
              </p>
              <div className="font-mono text-sm bg-[#0d1117] p-6 rounded-lg border border-[#2c5282]">
                <div className="text-[#e6edf3]">
                  <span className="text-[#58a6ff]">tipo</span>
                  <span className="text-[#848d97]">(</span>
                  <span className="text-[#f0883e]">escopo</span>
                  <span className="text-[#848d97]">): </span>
                  <span>descrição curta</span>
                  <br /><br />
                  <span className="text-[#848d97]">[corpo opcional]</span>
                  <br /><br />
                  <span className="text-[#848d97]">[rodapé opcional]</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Os 10 Tipos de Commit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {TIPOS_COMMIT.map((tipo) => (
                  <div
                    key={tipo.tipo}
                    className="p-4 bg-[#2a4365] rounded-lg border border-[#2c5282] hover:border-[#2b6cb0] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{tipo.emoji}</span>
                      <CommitBadge tipo={tipo.tipo as any} />
                    </div>
                    <p className="text-sm text-white font-semibold mb-1">{tipo.nome}</p>
                    <p className="text-xs text-[#cbd5e0] mb-2">{tipo.descricao}</p>
                    <p className="text-xs text-[#718096] italic">💭 {tipo.analogia}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exemplos Práticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <div className="flex items-center gap-2 mb-2">
                    <CommitBadge tipo="feat" />
                  </div>
                  <code className="text-[#e6edf3] text-sm">
                    feat(auth): adicionar login com Google OAuth
                    <br /><br />
                    Implementa autenticação via Google OAuth 2.0 permitindo
                    <br />
                    que utilizadores façam login com suas contas Google.
                  </code>
                </div>

                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <div className="flex items-center gap-2 mb-2">
                    <CommitBadge tipo="fix" />
                  </div>
                  <code className="text-[#e6edf3] text-sm">
                    fix(api): corrigir timeout em requisições longas
                    <br /><br />
                    Aumenta timeout de 30s para 60s para evitar erros em
                    <br />
                    uploads de ficheiros grandes.
                  </code>
                </div>

                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <div className="flex items-center gap-2 mb-2">
                    <CommitBadge tipo="docs" />
                  </div>
                  <code className="text-[#e6edf3] text-sm">
                    docs(readme): adicionar secção de troubleshooting
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parte 2: Git Flow */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mt-12">
            <span className="text-4xl">🌿</span>
            Parte 2: Git Flow
          </h2>

          <div className="relative w-full max-w-4xl mx-auto">
            <Image
              src="/images/ato-2-gitflow.png"
              alt="Diagrama Git Flow"
              width={1200}
              height={800}
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-[#d69e2e]" />
                As 5 Branches do Git Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[#2a4365] rounded-lg border-l-4 border-[#38a169]">
                  <div className="flex items-center gap-3 mb-2">
                    <BranchBadge tipo="master" />
                    <span className="font-semibold text-white">Produção</span>
                  </div>
                  <p className="text-sm text-[#cbd5e0]">
                    <strong>O que tem aqui?</strong> Apenas código em produção<br />
                    <strong>Quando atualizar?</strong> Ao fazer release ou hotfix<br />
                    <strong>Protegida?</strong> ✅ Sim, sempre!
                  </p>
                </div>

                <div className="p-4 bg-[#2a4365] rounded-lg border-l-4 border-[#3182ce]">
                  <div className="flex items-center gap-3 mb-2">
                    <BranchBadge tipo="develop" />
                    <span className="font-semibold text-white">Desenvolvimento</span>
                  </div>
                  <p className="text-sm text-[#cbd5e0]">
                    <strong>O que tem aqui?</strong> Próxima release em desenvolvimento<br />
                    <strong>Quando atualizar?</strong> Ao fazer merge de features<br />
                    <strong>Protegida?</strong> ✅ Sim, PR obrigatório
                  </p>
                </div>

                <div className="p-4 bg-[#2a4365] rounded-lg border-l-4 border-[#9f7aea]">
                  <div className="flex items-center gap-3 mb-2">
                    <BranchBadge tipo="feature" />
                    <span className="font-semibold text-white">Nova Funcionalidade</span>
                  </div>
                  <p className="text-sm text-[#cbd5e0]">
                    <strong>Origem:</strong> develop<br />
                    <strong>Destino:</strong> develop<br />
                    <strong>Exemplo:</strong> feature/login-oauth, feature/dark-mode
                  </p>
                </div>

                <div className="p-4 bg-[#2a4365] rounded-lg border-l-4 border-[#ed8936]">
                  <div className="flex items-center gap-3 mb-2">
                    <BranchBadge tipo="release" />
                    <span className="font-semibold text-white">Preparar Release</span>
                  </div>
                  <p className="text-sm text-[#cbd5e0]">
                    <strong>Origem:</strong> develop<br />
                    <strong>Destino:</strong> master + develop<br />
                    <strong>Exemplo:</strong> release/v1.2.0
                  </p>
                </div>

                <div className="p-4 bg-[#2a4365] rounded-lg border-l-4 border-[#e53e3e]">
                  <div className="flex items-center gap-3 mb-2">
                    <BranchBadge tipo="hotfix" />
                    <span className="font-semibold text-white">Correção Urgente</span>
                  </div>
                  <p className="text-sm text-[#cbd5e0]">
                    <strong>Origem:</strong> master<br />
                    <strong>Destino:</strong> master + develop<br />
                    <strong>Exemplo:</strong> hotfix/corrigir-login-quebrado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a4365]/30 border-[#2b6cb0]">
            <CardContent className="p-6">
              <h4 className="font-bold text-white mb-3">🎯 Fluxo Completo de uma Feature</h4>
              <div className="space-y-2 text-sm text-[#cbd5e0] font-mono">
                <div>1. <span className="text-[#58a6ff]">git checkout develop</span></div>
                <div>2. <span className="text-[#58a6ff]">git checkout -b feature/nova-funcionalidade</span></div>
                <div>3. <span className="text-[#848d97]">// desenvolver...</span></div>
                <div>4. <span className="text-[#58a6ff]">git commit -m "feat: adicionar funcionalidade X"</span></div>
                <div>5. <span className="text-[#58a6ff]">git push origin feature/nova-funcionalidade</span></div>
                <div>6. <span className="text-[#848d97]">// criar Pull Request para develop</span></div>
                <div>7. <span className="text-[#848d97]">// code review</span></div>
                <div>8. <span className="text-[#38a169]">// merge aprovado! ✅</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parte 3: Semantic Versioning */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mt-12">
            <span className="text-4xl">🔢</span>
            Parte 3: Semantic Versioning (SemVer)
          </h2>

          <div className="relative w-full max-w-3xl mx-auto">
            <Image
              src="/images/ato-2-semver.png"
              alt="Semantic Versioning explicado"
              width={1000}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-[#d69e2e]" />
                MAJOR.MINOR.PATCH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-[#2a4365] rounded-lg border-2 border-[#e53e3e]">
                    <div className="text-5xl font-bold text-[#e53e3e] mb-2">X</div>
                    <h4 className="font-bold text-white mb-2">MAJOR</h4>
                    <p className="text-sm text-[#cbd5e0]">
                      Mudanças <strong>incompatíveis</strong> com versões anteriores
                    </p>
                    <div className="mt-3 text-xs">
                      <CommitBadge tipo="feat" className="inline-block" />
                      <span className="text-[#718096]"> com BREAKING CHANGE</span>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-[#2a4365] rounded-lg border-2 border-[#38a169]">
                    <div className="text-5xl font-bold text-[#38a169] mb-2">Y</div>
                    <h4 className="font-bold text-white mb-2">MINOR</h4>
                    <p className="text-sm text-[#cbd5e0]">
                      Novas funcionalidades <strong>compatíveis</strong>
                    </p>
                    <div className="mt-3 text-xs">
                      <CommitBadge tipo="feat" className="inline-block" />
                      <span className="text-[#718096]"> normal</span>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-[#2a4365] rounded-lg border-2 border-[#3182ce]">
                    <div className="text-5xl font-bold text-[#3182ce] mb-2">Z</div>
                    <h4 className="font-bold text-white mb-2">PATCH</h4>
                    <p className="text-sm text-[#cbd5e0]">
                      Correções de bugs
                    </p>
                    <div className="mt-3 text-xs">
                      <CommitBadge tipo="fix" className="inline-block" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d1117] p-6 rounded-lg border border-[#2c5282]">
                  <h4 className="text-white font-semibold mb-4">Exemplos:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[#848d97]">v1.0.0 → v1.0.1</span>
                      <span className="text-[#cbd5e0] ml-3">fix: corrigir bug no login</span>
                    </div>
                    <div>
                      <span className="text-[#848d97]">v1.0.1 → v1.1.0</span>
                      <span className="text-[#cbd5e0] ml-3">feat: adicionar dark mode</span>
                    </div>
                    <div>
                      <span className="text-[#848d97]">v1.1.0 → v2.0.0</span>
                      <span className="text-[#cbd5e0] ml-3">feat!: mudar API de autenticação</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-[#2c5282] to-[#2a4365] border-[#2b6cb0]">
            <CardContent className="p-8">
              <h4 className="text-2xl font-bold text-white mb-4">🎁 Bónus: Geração Automática!</h4>
              <p className="text-lg text-[#cbd5e0] mb-4">
                Com Conventional Commits + SemVer, podes usar ferramentas como:
              </p>
              <ul className="space-y-2 text-[#cbd5e0]">
                <li>✅ <strong className="text-white">standard-version</strong> - Gera versão e changelog automaticamente</li>
                <li>✅ <strong className="text-white">semantic-release</strong> - CI/CD com versionamento automático</li>
                <li>✅ <strong className="text-white">commitlint</strong> - Valida mensagens de commit</li>
                <li>✅ <strong className="text-white">conventional-changelog</strong> - Gera CHANGELOG.md</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Conclusão do Ato */}
        <Card className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] border-[#38a169] border-2">
          <CardContent className="p-8 text-center">
            <p className="text-2xl text-white mb-4">
              "Mas será que isto funciona mesmo?"
            </p>
            <p className="text-lg text-[#cbd5e0]">
              No próximo ato, vais ver a transformação acontecer no mesmo projeto!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <Link href="/ato-1">
          <Button variant="secondary" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Anterior: O Caos
          </Button>
        </Link>
        <BotaoMarcarCompleto atoNumero={2} />
        <Link href="/ato-3">
          <Button variant="primary" size="lg" className="gap-2">
            Próximo: A Transformação
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
    </AtoWrapper>
  )
}
