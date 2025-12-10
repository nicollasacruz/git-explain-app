'use client'

import { useState } from 'react'
import { X, Check, AlertTriangle, GitBranch, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GuiaGitFlowModal() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-start gap-4 cursor-pointer hover:bg-[#2a4365] p-4 rounded-lg transition-colors"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#38a169] flex items-center justify-center font-bold text-white">
          2
        </div>
        <div className="flex-1">
          <h5 className="font-semibold text-white mb-1">Configurar Git Flow</h5>
          <code className="text-xs bg-[#1a365d] px-3 py-1 rounded text-[#cbd5e0] block w-fit">
            git flow init
          </code>
          <p className="text-xs text-[#718096] mt-2">👉 Clica para ver guia completo de Git Flow</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-[#1a365d] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] pointer-events-auto animate-scale-in border-2 border-[#2c5282] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] px-6 py-4 border-b border-[#2c5282] flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-[#38a169]" />
                Configuração de Git Flow na Equipa
              </h2>
              <p className="text-sm text-[#cbd5e0] mt-1">git flow init e fluxo de branches</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#cbd5e0] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">

            {/* O Problema */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#e53e3e]" />
                O Problema (Sem Fluxo)
              </h3>
              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#e53e3e]">
                <p className="text-[#cbd5e0] mb-2"><strong className="text-white">Branches sem convenção:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#cbd5e0]">
                  <li>Cada dev inventa um nome: "novafeature2", "bug-fix-final", "teste-joao"</li>
                  <li>Dificuldade em saber o que está pronto para produção</li>
                  <li>Dificuldade em saber de onde fazer release</li>
                  <li>Tratar hotfix urgente sem partir tudo</li>
                  <li>Conflitos e merges caóticos</li>
                </ul>
              </div>
            </section>

            {/* O Conceito */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#38a169]" />
                O Conceito: Git Flow
              </h3>
              <p className="text-[#cbd5e0]">Um modelo de branching com papéis bem definidos:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#e53e3e]">
                  <h4 className="font-bold text-white mb-2">master/main</h4>
                  <p className="text-xs text-[#cbd5e0]">Produção (código que está live)</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#ed8936]">
                  <h4 className="font-bold text-white mb-2">develop</h4>
                  <p className="text-xs text-[#cbd5e0]">Integração (próxima release)</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">feature/*</h4>
                  <p className="text-xs text-[#cbd5e0]">Novas funcionalidades</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#d69e2e]">
                  <h4 className="font-bold text-white mb-2">release/*</h4>
                  <p className="text-xs text-[#cbd5e0]">Estabilização antes de produção</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#e53e3e] md:col-span-2">
                  <h4 className="font-bold text-white mb-2">hotfix/*</h4>
                  <p className="text-xs text-[#cbd5e0]">Correções urgentes em produção</p>
                </div>
              </div>
              <div className="bg-[#2a4365] p-3 rounded-lg border-l-4 border-[#38a169]">
                <p className="text-sm text-[#cbd5e0]">
                  💡 <strong className="text-white">Ideia central:</strong> Cada tipo de trabalho tem uma "estrada" própria.
                </p>
              </div>
            </section>

            {/* Instalação */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Passo 1: Instalar Git Flow</h3>
              <div className="space-y-2">
                <p className="text-sm text-[#cbd5e0]">macOS (Homebrew):</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">brew install git-flow-avh</code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#cbd5e0]">Linux (Debian/Ubuntu):</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">sudo apt-get install git-flow</code>
                </div>
              </div>
              <p className="text-xs text-[#848d97]">⚠️ No Windows (Git for Windows) pode vir incluído ou ser instalado via choco</p>
            </section>

            {/* Inicialização */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Passo 2: Inicializar no Repositório</h3>
              <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                <code className="text-[#79c0ff] text-sm">git flow init</code>
              </div>
              <div className="bg-[#2a4365] p-4 rounded-lg space-y-2">
                <p className="text-sm text-[#cbd5e0]">O comando vai fazer perguntas como:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#cbd5e0]">
                  <li>Nome da branch de produção? → <code className="bg-[#1a365d] px-2 py-0.5 rounded">master</code> ou <code className="bg-[#1a365d] px-2 py-0.5 rounded">main</code></li>
                  <li>Nome da branch de desenvolvimento? → <code className="bg-[#1a365d] px-2 py-0.5 rounded">develop</code></li>
                  <li>Prefixo de features? → <code className="bg-[#1a365d] px-2 py-0.5 rounded">feature/</code></li>
                  <li>Prefixo de releases? → <code className="bg-[#1a365d] px-2 py-0.5 rounded">release/</code></li>
                  <li>Prefixo de hotfixes? → <code className="bg-[#1a365d] px-2 py-0.5 rounded">hotfix/</code></li>
                </ul>
                <p className="text-xs text-[#848d97] mt-2">💡 Normalmente aceitamos o default em quase tudo</p>
              </div>
            </section>

            {/* Ciclo de Feature */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#38a169]" />
                Ciclo de uma Feature
              </h3>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Criar uma feature:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">git flow feature start nome-da-feature</code>
                </div>
                <p className="text-xs text-[#848d97] mt-2">✓ Cria branch <code className="bg-[#1a365d] px-2 py-0.5 rounded">feature/nome-da-feature</code> a partir de <code className="bg-[#1a365d] px-2 py-0.5 rounded">develop</code></p>
              </div>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Finalizar a feature:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">git flow feature finish nome-da-feature</code>
                </div>
                <p className="text-xs text-[#848d97] mt-2">✓ Faz merge em <code className="bg-[#1a365d] px-2 py-0.5 rounded">develop</code> e apaga a branch</p>
              </div>
              <div className="bg-[#2a4365] p-3 rounded-lg border-l-4 border-[#38a169]">
                <p className="text-sm text-[#cbd5e0]">
                  💡 <strong className="text-white">Resultado:</strong> Features nunca tocam diretamente em master.
                </p>
              </div>
            </section>

            {/* Ciclo de Release */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#d69e2e]" />
                Ciclo de uma Release
              </h3>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Criar release:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">git flow release start v1.2.0</code>
                </div>
                <p className="text-xs text-[#848d97] mt-2">✓ Cria <code className="bg-[#1a365d] px-2 py-0.5 rounded">release/v1.2.0</code> a partir de <code className="bg-[#1a365d] px-2 py-0.5 rounded">develop</code></p>
              </div>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Finalizar release:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">git flow release finish v1.2.0</code>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#848d97] mt-2">
                  <li>Faz merge em <code className="bg-[#1a365d] px-2 py-0.5 rounded">master</code></li>
                  <li>Faz merge em <code className="bg-[#1a365d] px-2 py-0.5 rounded">develop</code></li>
                  <li>Cria tag: <code className="bg-[#1a365d] px-2 py-0.5 rounded">v1.2.0</code></li>
                </ul>
              </div>
            </section>

            {/* Ciclo de Hotfix */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#e53e3e]" />
                Ciclo de um Hotfix
              </h3>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Quando produção está partida:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">git flow hotfix start corrigir-bug-critico</code>
                </div>
                <p className="text-xs text-[#848d97] mt-2">✓ Cria <code className="bg-[#1a365d] px-2 py-0.5 rounded">hotfix/corrigir-bug-critico</code> a partir de <code className="bg-[#1a365d] px-2 py-0.5 rounded">master</code></p>
              </div>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Após corrigir:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <code className="text-[#79c0ff] text-sm">git flow hotfix finish corrigir-bug-critico</code>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#848d97] mt-2">
                  <li>Faz merge em <code className="bg-[#1a365d] px-2 py-0.5 rounded">master</code></li>
                  <li>Faz merge em <code className="bg-[#1a365d] px-2 py-0.5 rounded">develop</code></li>
                  <li>Cria nova tag (ex.: <code className="bg-[#1a365d] px-2 py-0.5 rounded">v1.2.1</code>)</li>
                </ul>
              </div>
              <div className="bg-[#2a4365] p-3 rounded-lg border-l-4 border-[#e53e3e]">
                <p className="text-sm text-[#cbd5e0]">
                  💡 <strong className="text-white">Importante:</strong> Hotfix entra em produção sem bloquear desenvolvimento em develop.
                </p>
              </div>
            </section>

            {/* Regras de Ouro */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#d69e2e]" />
                Regras de Ouro do Git Flow
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Nunca commitar diretamente em master',
                  'Nunca commitar diretamente em develop',
                  'Features → sempre em feature/*',
                  'Releases → sempre em release/*',
                  'Hotfixes → sempre em hotfix/*',
                  'Cada merge em master = versão que pode ir para produção'
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#cbd5e0] bg-[#2a4365] p-3 rounded-lg">
                    <Check className="w-4 h-4 text-[#38a169] flex-shrink-0 mt-0.5" />
                    {rule}
                  </div>
                ))}
              </div>
            </section>

            {/* Benefícios */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-[#38a169]" />
                Benefícios para a Equipa
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Branches com significado claro',
                  'Trabalho paralelo organizado',
                  'Releases mais seguras',
                  'Hotfixes sem arrebentar o resto',
                  'Histórico de versões (tags) bem definido',
                  'Base perfeita para CI/CD',
                  'Compatível com Conventional Commits',
                  'Facilita Semantic Versioning'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#cbd5e0]">
                    <Check className="w-4 h-4 text-[#38a169] flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </section>

            {/* Mensagem Final */}
            <section className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] p-6 rounded-lg border-2 border-[#38a169] text-center">
              <p className="text-lg text-white font-semibold mb-2">
                Git Flow não é burocracia
              </p>
              <p className="text-[#cbd5e0]">
                É um mapa para o código da equipa não se perder
              </p>
            </section>

          </div>

          {/* Footer */}
          <div className="bg-[#2a4365] px-6 py-4 border-t border-[#2c5282] flex justify-end flex-shrink-0">
            <Button onClick={() => setIsOpen(false)} variant="primary" size="lg">
              Entendi!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
