'use client'

import { useState } from 'react'
import { X, Check, AlertTriangle, GitBranch, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GuiaAutomacaoModal() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-start gap-4 cursor-pointer hover:bg-[#2a4365] p-4 rounded-lg transition-colors"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d69e2e] flex items-center justify-center font-bold text-[#1a365d]">
          2
        </div>
        <div className="flex-1">
          <h5 className="font-semibold text-white mb-1">Instalar ferramentas</h5>
          <code className="text-xs bg-[#1a365d] px-3 py-1 rounded text-[#cbd5e0] block w-fit">
            npm install -D @commitlint/cli @commitlint/config-conventional husky
          </code>
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
                <Shield className="w-7 h-7 text-[#d69e2e]" />
                Automação de Commits com Husky
              </h2>
              <p className="text-sm text-[#cbd5e0] mt-1">Guia completo de implementação na equipa</p>
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
                O Problema
              </h3>
              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#e53e3e]">
                <p className="text-[#cbd5e0] mb-2"><strong className="text-white">Antes do padrão:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#cbd5e0]">
                  <li>Commits como: "ajustes", "fix", "final agora vai"</li>
                  <li>Histórico pouco confiável</li>
                  <li>Dificuldade em fazer rollback e gerar changelog</li>
                  <li>Alto risco de bugs não rastreáveis</li>
                </ul>
              </div>
            </section>

            {/* A Solução */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#38a169]" />
                A Solução: 3 Ferramentas
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-[#2a4365] p-4 rounded-lg border border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">Husky</h4>
                  <p className="text-xs text-[#cbd5e0]">Bloqueia commits inválidos</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">Commitlint</h4>
                  <p className="text-xs text-[#cbd5e0]">Valida a mensagem</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">Config Conventional</h4>
                  <p className="text-xs text-[#cbd5e0]">Define as regras</p>
                </div>
              </div>
              <div className="bg-[#2a4365] p-3 rounded-lg border-l-4 border-[#38a169]">
                <p className="text-sm text-[#cbd5e0]">
                  💡 <strong className="text-white">Resultado:</strong> Só entra no Git quem escrever commits corretamente.
                </p>
              </div>
            </section>

            {/* O Fluxo */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#d69e2e]" />
                Como Funciona
              </h3>
              <div className="bg-[#0d1117] p-6 rounded-lg border border-[#2c5282] font-mono text-sm">
                <div className="space-y-2 text-[#e6edf3]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#79c0ff]">git commit</span>
                  </div>
                  <div className="pl-4 text-[#848d97]">↓</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#79c0ff]">husky</span>
                    <span className="text-[#848d97]">(intercepta)</span>
                  </div>
                  <div className="pl-4 text-[#848d97]">↓</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#79c0ff]">commitlint</span>
                    <span className="text-[#848d97]">(valida)</span>
                  </div>
                  <div className="pl-4 text-[#848d97]">↓</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#38a169]">✅ Passa</span>
                    <span className="text-[#848d97]">→ commit entra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e53e3e]">❌ Falha</span>
                    <span className="text-[#848d97]">→ commit bloqueado</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Instalação */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Passo 1: Instalação</h3>
              <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                <code className="text-[#79c0ff] text-sm">
                  npm install -D @commitlint/cli @commitlint/config-conventional husky
                </code>
              </div>
              <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                <code className="text-[#79c0ff] text-sm">npx husky init</code>
              </div>
              <p className="text-xs text-[#848d97]">Isto cria a pasta <code className="bg-[#1a365d] px-2 py-0.5 rounded">.husky/</code> e adiciona o script prepare ao package.json</p>
            </section>

            {/* Configuração */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Passo 2: Configuração</h3>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Criar ficheiro <code className="bg-[#1a365d] px-2 py-0.5 rounded">.commitlintrc.json</code>:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <pre className="text-[#79c0ff] text-xs">
{`{
  "extends": ["@commitlint/config-conventional"]
}`}
                  </pre>
                </div>
              </div>
              <div>
                <p className="text-sm text-[#cbd5e0] mb-2">Criar ficheiro <code className="bg-[#1a365d] px-2 py-0.5 rounded">.husky/commit-msg</code>:</p>
                <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282]">
                  <pre className="text-[#79c0ff] text-xs">
{`npx --no -- commitlint --edit "$1"`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Formato do Commit */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Formato Obrigatório</h3>
              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#d69e2e]">
                <code className="text-[#d69e2e] font-bold">tipo(escopo): descrição clara</code>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-[#2a4365] p-3 rounded-lg">
                  <p className="text-xs text-[#718096] mb-2">✅ Exemplos corretos:</p>
                  <div className="space-y-1 text-xs font-mono text-[#cbd5e0]">
                    <div>feat(cart): adicionar cupão de desconto</div>
                    <div>fix(auth): corrigir token expirado</div>
                    <div>docs(api): atualizar endpoints</div>
                  </div>
                </div>
                <div className="bg-[#2a4365] p-3 rounded-lg">
                  <p className="text-xs text-[#718096] mb-2">❌ Exemplos errados:</p>
                  <div className="space-y-1 text-xs font-mono text-[#cbd5e0]">
                    <div>ajustes</div>
                    <div>fix</div>
                    <div>final agora vai</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tipos */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Tipos Principais</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div className="bg-[#2a4365] p-2 rounded border-l-2 border-[#38a169]">
                  <strong className="text-white">feat</strong>
                  <p className="text-[#cbd5e0]">Nova funcionalidade</p>
                </div>
                <div className="bg-[#2a4365] p-2 rounded border-l-2 border-[#e53e3e]">
                  <strong className="text-white">fix</strong>
                  <p className="text-[#cbd5e0]">Correção de bug</p>
                </div>
                <div className="bg-[#2a4365] p-2 rounded border-l-2 border-[#3182ce]">
                  <strong className="text-white">docs</strong>
                  <p className="text-[#cbd5e0]">Documentação</p>
                </div>
                <div className="bg-[#2a4365] p-2 rounded border-l-2 border-[#ed8936]">
                  <strong className="text-white">refactor</strong>
                  <p className="text-[#cbd5e0]">Refatoração</p>
                </div>
                <div className="bg-[#2a4365] p-2 rounded border-l-2 border-[#38b2ac]">
                  <strong className="text-white">test</strong>
                  <p className="text-[#cbd5e0]">Testes</p>
                </div>
                <div className="bg-[#2a4365] p-2 rounded border-l-2 border-[#718096]">
                  <strong className="text-white">chore</strong>
                  <p className="text-[#cbd5e0]">Manutenção</p>
                </div>
              </div>
            </section>

            {/* Benefícios */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-[#38a169]" />
                Benefícios Diretos
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Histórico limpo e rastreável',
                  'Changelog automático',
                  'SemVer confiável',
                  'Menos bugs em produção',
                  'Rollback seguro',
                  'Onboarding mais rápido',
                  'Confiança entre Dev, QA e Produto',
                  'Padrão internacional'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#cbd5e0]">
                    <Check className="w-4 h-4 text-[#38a169] flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </section>

            {/* Mensagem Final */}
            <section className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] p-6 rounded-lg border-2 border-[#d69e2e] text-center">
              <p className="text-lg text-white font-semibold mb-2">
                Processo não é burocracia
              </p>
              <p className="text-[#cbd5e0]">
                Processo é o que permite escalar com segurança
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
