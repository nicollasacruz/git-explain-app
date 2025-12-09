'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/ato-1')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#d69e2e] text-lg">A carregar...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Imagem Hero */}
          <div className="mb-8 relative w-full max-w-4xl mx-auto">
            <Image
              src="/images/hero.png"
              alt="Developers collaborating on Git Flow"
              width={1200}
              height={675}
              priority
              className="rounded-2xl shadow-2xl"
            />
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Git Flow, Conventional Commits<br />
            <span className="text-[#d69e2e]">& Semantic Versioning</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#cbd5e0] mb-8 max-w-3xl mx-auto">
            Formação interna sobre práticas de versionamento com exercícios corrigidos por IA, focada na nossa equipa
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                Entrar na formação
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                Já tenho conta
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#d69e2e]">4</div>
              <div className="text-sm text-[#cbd5e0] mt-1">Atos Narrativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#d69e2e]">8</div>
              <div className="text-sm text-[#cbd5e0] mt-1">Exercícios Interativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#d69e2e]">100%</div>
              <div className="text-sm text-[#cbd5e0] mt-1">Correção com IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Os 4 Atos */}
      <section className="container mx-auto px-4 py-20 bg-[#2a4365]/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Trilha da formação
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ato 1 */}
            <Card interactive>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">😰</span>
                  <div>
                    <CardTitle>Ato 1: O Caos</CardTitle>
                    <CardDescription>Era uma vez um time de devs...</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0]">
                  A história do caos nos commits e a frustração de não saber o que está em produção
                </p>
              </CardContent>
            </Card>

            {/* Ato 2 */}
            <Card interactive>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">💡</span>
                  <div>
                    <CardTitle>Ato 2: A Descoberta</CardTitle>
                    <CardDescription>Existe um jeito melhor...</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0]">
                  Conventional Commits, Git Flow e Semantic Versioning explicados de forma prática
                </p>
              </CardContent>
            </Card>

            {/* Ato 3 */}
            <Card interactive>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">✨</span>
                  <div>
                    <CardTitle>Ato 3: A Transformação</CardTitle>
                    <CardDescription>Vê a diferença...</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0]">
                  O mesmo projeto, agora organizado com as práticas aprendidas
                </p>
              </CardContent>
            </Card>

            {/* Ato 4 */}
            <Card interactive>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">🚀</span>
                  <div>
                    <CardTitle>Ato 4: O Novo Mundo</CardTitle>
                    <CardDescription>A equipa que adotou isto...</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0]">
                  Os resultados tangíveis e o caminho a seguir
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            O que vamos praticar
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Conventional Commits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0] text-sm">
                  Escreve mensagens de commit claras e consistentes que facilitam a geração automática de changelogs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌿</span>
                  Git Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0] text-sm">
                  Domina o fluxo de trabalho com branches: master, develop, feature, release e hotfix
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔢</span>
                  Semantic Versioning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#cbd5e0] text-sm">
                  Entende MAJOR.MINOR.PATCH e como versionar o teu software de forma profissional
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Exercícios */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              8 exercícios interativos
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: 1, nome: 'Classifica o Commit', icon: '✅' },
                { num: 2, nome: 'Reescreve o Commit', icon: '✏️' },
                { num: 3, nome: 'Simulação Git Flow', icon: '🔄' },
                { num: 4, nome: 'Code Review', icon: '👀' },
                { num: 5, nome: 'Próxima Versão', icon: '🔢' },
                { num: 6, nome: 'Tag & Release', icon: '🏷️' },
                { num: 7, nome: 'Simulação Release', icon: '📦' },
                { num: 8, nome: 'Gera Changelog', icon: '📋' }
              ].map(ex => (
                <div
                  key={ex.num}
                  className="bg-[#2a4365] rounded-lg p-4 border border-[#2c5282] text-center"
                >
                  <div className="text-3xl mb-2">{ex.icon}</div>
                  <div className="text-sm font-medium text-white">{ex.nome}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2c5282] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#718096]">
            <div className="flex items-center gap-3">
              <Image
                src="/images/mascote.png"
                alt="Git Flow Octopus Mascot"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <p>© 2025 Mecwide - Git Flow Explain. Formação interna — uso restrito à equipa.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener" className="hover:text-[#d69e2e]">
                Conventional Commits
              </a>
              <a href="https://semver.org/" target="_blank" rel="noopener" className="hover:text-[#d69e2e]">
                SemVer
              </a>
              <a href="https://nvie.com/posts/a-successful-git-branching-model/" target="_blank" rel="noopener" className="hover:text-[#d69e2e]">
                Git Flow
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
