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
          <h5 className="font-semibold text-white mb-1">Configurar Git Hooks Nativos</h5>
          <code className="text-xs bg-[#1a365d] px-3 py-1 rounded text-[#cbd5e0] block w-fit">
            commit-msg e pre-commit sem dependências externas
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
                Automação de Commits com Git Hooks Nativos
              </h2>
              <p className="text-sm text-[#cbd5e0] mt-1">
                Guia completo sem dependências externas
              </p>
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

            {/* Problema */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#e53e3e]" />
                O Problema
              </h3>
              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#e53e3e]">
                <ul className="list-disc list-inside space-y-1 text-sm text-[#cbd5e0]">
                  <li>Commits inconsistentes: "ajustes", "fix", "agora vai"</li>
                  <li>Dificuldade em navegar no histórico</li>
                  <li>Problemas ao gerar changelog ou revert</li>
                  <li>Risco alto de regressões não rastreáveis</li>
                </ul>
              </div>
            </section>

            {/* Solução: Git Hooks */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#38a169]" />
                A Solução: Git Hooks Nativos
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-[#2a4365] p-4 rounded-lg border border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">commit-msg</h4>
                  <p className="text-xs text-[#cbd5e0]">Valida a mensagem de commit</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">pre-commit</h4>
                  <p className="text-xs text-[#cbd5e0]">Corre verificações antes do commit</p>
                </div>
                <div className="bg-[#2a4365] p-4 rounded-lg border border-[#38a169]">
                  <h4 className="font-bold text-white mb-2">pre-receive (servidor)</h4>
                  <p className="text-xs text-[#cbd5e0]">Validação centralizada</p>
                </div>
              </div>
            </section>

            {/* Fluxo */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#d69e2e]" />
                Como Funciona
              </h3>
              <div className="bg-[#0d1117] p-6 rounded-lg border border-[#2c5282] font-mono text-sm">
                <div className="space-y-2 text-[#e6edf3]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#79c0ff]">git commit -m "mensagem"</span>
                  </div>
                  <div className="pl-4 text-[#848d97]">↓</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#79c0ff]">pre-commit</span>
                    <span className="text-[#848d97]">(executa antes - opcional)</span>
                  </div>
                  <div className="pl-4 text-[#848d97]">↓</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#79c0ff]">commit-msg</span>
                    <span className="text-[#848d97]">(valida o padrão)</span>
                  </div>
                  <div className="pl-4 text-[#848d97]">↓</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#38a169]">✅ Válido</span>
                    <span className="text-[#848d97]">→ commit criado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e53e3e]">❌ Inválido</span>
                    <span className="text-[#848d97]">→ commit bloqueado</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Instalação */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Passo 1: Criar o Hook commit-msg</h3>
              
              <p className="text-sm text-[#cbd5e0]">Criar o ficheiro:</p>
              <code className="bg-[#1a365d] px-2 py-1 rounded text-[#cbd5e0] text-sm block w-fit">
                .git/hooks/commit-msg
              </code>

              <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282] mt-2">
                <pre className="text-[#79c0ff] text-xs">
                  {`#!/bin/sh
                  commit_msg=$(cat "$1")
                  pattern="^(feat|fix|docs|refactor|test|chore|style|perf|ci|build)(\\(.+\\))?: .+"

                  if ! echo "$commit_msg" | grep -qE "$pattern"; then
                    echo "❌ Commit inválido!"
                    echo "Formato correto: tipo(escopo): descrição"
                    exit 1
                  fi`}
                </pre>
              </div>

              <p className="text-xs text-[#718096] mt-2">Dar permissão:</p>
              <div className="bg-[#0d1117] p-3 rounded-lg border border-[#2c5282]">
                <code className="text-[#79c0ff] text-sm">chmod +x .git/hooks/commit-msg</code>
              </div>
            </section>

            {/* Teste */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Passo 2: Testar</h3>

              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#d69e2e]">
                <p className="text-sm text-[#cbd5e0] mb-2">Teste com mensagem inválida:</p>
                <code className="bg-[#0d1117] px-3 py-1 rounded text-[#79c0ff] block w-fit">
                  git commit -m "ajustes"
                </code>
                <p className="text-xs text-[#e53e3e] mt-2">❌ Deve falhar</p>
              </div>

              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#38a169]">
                <p className="text-sm text-[#cbd5e0] mb-2">Teste com mensagem válida:</p>
                <code className="bg-[#0d1117] px-3 py-1 rounded text-[#79c0ff] block w-fit">
                  git commit -m "feat(api): criar endpoint de utilizadores"
                </code>
                <p className="text-xs text-[#38a169] mt-2">✅ Deve passar</p>
              </div>
            </section>

            {/* Tipos */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">Tipos Permitidos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {[
                  ["feat", "Nova funcionalidade", "#38a169"],
                  ["fix", "Correção de bug", "#e53e3e"],
                  ["docs", "Documentação", "#3182ce"],
                  ["refactor", "Refatoração", "#ed8936"],
                  ["test", "Testes", "#38b2ac"],
                  ["chore", "Manutenção", "#718096"],
                ].map(([type, desc, color]) => (
                  <div key={type} className={`bg-[#2a4365] p-2 rounded border-l-2`} style={{ borderColor: color }}>
                    <strong className="text-white">{type}</strong>
                    <p className="text-[#cbd5e0]">{desc}</p>
                  </div>
                ))}
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
                  'Histórico limpo e estruturado',
                  'Rollback mais seguro',
                  'Padronização entre devs',
                  'Sem dependências externas',
                  'Funciona em qualquer linguagem',
                  'Setup rápido e simples',
                  'Menos probabilidade de erros',
                  'Commit sempre legível'
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#cbd5e0]">
                    <Check className="w-4 h-4 text-[#38a169]" /> {b}
                  </div>
                ))}
              </div>
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
