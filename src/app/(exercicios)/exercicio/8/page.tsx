'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CommitBadge } from '@/components/ui/badge'
import { TipoCommit } from '@/types'
import { ArrowLeft, Sparkles, Loader2, Trophy } from 'lucide-react'
import Link from 'next/link'

const COMMITS_HISTORICO = [
  'feat(auth): adicionar autenticação com Google OAuth',
  'feat(ui): implementar tema dark mode',
  'fix(api): corrigir timeout em uploads grandes',
  'fix(profile): resolver crash ao abrir perfil vazio',
  'perf(dashboard): otimizar queries de métricas',
  'docs(readme): atualizar instruções de instalação',
  'test(auth): adicionar testes e2e ao fluxo de login',
  'chore(deps): atualizar dependências de segurança',
]

export default function Exercicio8Page() {
  const [changelog, setChangelog] = useState('')
  const [avaliando, setAvaliando] = useState(false)
  const [resultado, setResultado] = useState<{
    pontuacao: number
    feedback: string
    changelogIdeal: string
  } | null>(null)

  const avaliarChangelog = async () => {
    setAvaliando(true)
    setResultado(null)

    try {
      const response = await fetch('/api/ai/avaliar-changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commits: COMMITS_HISTORICO,
          changelogUtilizador: changelog,
        }),
      })

      const data = await response.json()
      setResultado(data)
    } catch (error) {
      setResultado({
        pontuacao: 0,
        feedback: '❌ Erro ao avaliar. Tenta novamente.',
        changelogIdeal: '',
      })
    } finally {
      setAvaliando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a365d] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/exercicio/7"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercício Anterior
          </Link>
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-[#d69e2e]" />
            <h1 className="text-3xl font-bold text-white">
              Exercício 8: Gera o Changelog
            </h1>
          </div>
          <p className="text-[#cbd5e0]">
            Exercício final! Transforma commits em changelog profissional
          </p>
        </div>

        {/* Contexto */}
        <Card className="mb-8 bg-[#2c5282] border-[#d69e2e]">
          <CardHeader>
            <CardTitle className="text-white">📋 Tarefa</CardTitle>
          </CardHeader>
          <CardContent className="text-[#cbd5e0] space-y-3">
            <p>
              Dado o histórico de commits abaixo, gera um CHANGELOG.md formatado
              seguindo as melhores práticas.
            </p>
            <p className="text-sm">
              O changelog deve:
            </p>
            <ul className="text-sm space-y-1 ml-6">
              <li>• Agrupar por tipo (Features, Bug Fixes, Performance, etc.)</li>
              <li>• Usar emojis apropriados</li>
              <li>• Ter descrições claras</li>
              <li>• Incluir escopos quando disponíveis</li>
              <li>• Omitir tipos não relevantes para utilizadores (chore, test)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Histórico */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Histórico de Commits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {COMMITS_HISTORICO.map((commit, index) => {
                const tipo = commit.split('(')[0].split(':')[0] as TipoCommit
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[#2a4365] rounded-lg"
                  >
                    <CommitBadge tipo={tipo} />
                    <span className="text-[#cbd5e0] text-sm font-mono">{commit}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Área de Resposta */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d69e2e]" />
              Escreve o Changelog
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              placeholder="## [1.1.0] - 2024-12-09&#10;&#10;### ✨ Features&#10;- **auth**: Adicionar autenticação com Google OAuth&#10;- **ui**: Implementar tema dark mode&#10;&#10;### 🐛 Bug Fixes&#10;- **api**: Corrigir timeout em uploads grandes&#10;..."
              rows={16}
              className="font-mono text-sm"
            />
            <Button
              onClick={avaliarChangelog}
              disabled={!changelog.trim() || avaliando}
              variant="primary"
              className="gap-2 w-full"
              size="lg"
            >
              {avaliando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  A avaliar com Claude AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Avaliar Changelog
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="mb-8">
          <Card className="bg-[#2c5282]/40 border-[#2c5282]">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
              <div>
                <p className="text-white font-semibold">Quer pular esta avaliação?</p>
                <p className="text-sm text-[#cbd5e0]">Avança sem gerar/validar o changelog.</p>
              </div>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Pular e voltar ao início
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Resultado */}
        {resultado && (
          <Card
            className={`mb-8 ${
              resultado.pontuacao >= 80
                ? 'bg-[#38a169]/20 border-[#38a169] border-2'
                : resultado.pontuacao >= 60
                ? 'bg-[#ecc94b]/20 border-[#ecc94b] border-2'
                : 'bg-[#e53e3e]/20 border-[#e53e3e] border-2'
            } animate-fade-in`}
          >
            <CardHeader>
              <CardTitle
                className={
                  resultado.pontuacao >= 80
                    ? 'text-[#38a169]'
                    : resultado.pontuacao >= 60
                    ? 'text-[#ecc94b]'
                    : 'text-[#e53e3e]'
                }
              >
                {resultado.pontuacao >= 80
                  ? '🏆 Excelente Changelog!'
                  : resultado.pontuacao >= 60
                  ? '👍 Bom Trabalho!'
                  : '💪 Podes Melhorar!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#d69e2e] mb-2">
                  {resultado.pontuacao}%
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-[#cbd5e0] whitespace-pre-line">{resultado.feedback}</p>
              </div>

              {resultado.changelogIdeal && (
                <div>
                  <h4 className="font-semibold text-white mb-3">
                    ✅ Exemplo Ideal:
                  </h4>
                  <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                    <pre className="text-xs text-[#e6edf3] whitespace-pre-wrap font-mono">
                      {resultado.changelogIdeal}
                    </pre>
                  </div>
                </div>
              )}

              {resultado.pontuacao >= 70 && (
                <Card className="bg-gradient-to-br from-[#d69e2e] to-[#ed8936] border-none">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-3">
                      🎉 Parabéns! Completaste Todos os Exercícios!
                    </h3>
                    <p className="text-[#1a365d] mb-6">
                      Agora dominas Conventional Commits, Git Flow e Semantic Versioning!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/ato-1">
                        <Button
                          size="lg"
                          className="bg-white text-[#d69e2e] hover:bg-gray-100 font-bold"
                        >
                          Rever os Atos
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="bg-[#1a365d] text-white hover:bg-[#2a4365] border-white"
                        >
                          Voltar ao Início
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}

        {/* Exemplo */}
        <Card className="bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">💡 Estrutura sugerida:</p>
            <div className="bg-[#0d1117] p-3 rounded font-mono text-xs text-[#e6edf3]">
              <div className="space-y-2">
                <div>## [Versão] - Data</div>
                <div></div>
                <div>### ✨ Features</div>
                <div>- **escopo**: Descrição da feature</div>
                <div></div>
                <div>### 🐛 Bug Fixes</div>
                <div>- **escopo**: Descrição do fix</div>
                <div></div>
                <div>### ⚡ Performance</div>
                <div>- **escopo**: Descrição da otimização</div>
                <div></div>
                <div>### 📚 Documentation</div>
                <div>- Descrição das mudanças na docs</div>
              </div>
            </div>
            <p className="text-xs text-[#718096] mt-3">
              Nota: Omite chore e test do changelog (não são relevantes para utilizadores)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
