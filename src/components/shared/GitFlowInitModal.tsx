"use client"

import { useState } from 'react'
import { X, GitBranch, Settings2, Rocket, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GitFlowInitModal() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-start gap-4 cursor-pointer hover:bg-[#2a4365] p-4 rounded-lg transition-colors"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d69e2e] flex items-center justify-center font-bold text-[#1a365d]">
          3
        </div>
        <div className="flex-1">
          <h5 className="font-semibold text-white mb-1">Configurar Git Flow</h5>
          <code className="text-xs bg-[#1a365d] px-3 py-1 rounded text-[#cbd5e0] block w-fit">
            git flow init
          </code>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-50 animate-fade-in" onClick={() => setIsOpen(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-[#0f172a] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] pointer-events-auto animate-scale-in border-2 border-[#2c5282] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-[#2a4365] to-[#1a365d] px-6 py-4 border-b border-[#2c5282] flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-[#d69e2e]" />
                Configurar Git Flow na Equipa
              </h2>
              <p className="text-sm text-[#cbd5e0] mt-1">Modelo previsivel para features, releases e hotfixes.</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#cbd5e0] hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#e53e3e]" />
                O Problema sem fluxo
              </h3>
              <div className="bg-[#2a4365] p-4 rounded-lg border-l-4 border-[#e53e3e] text-sm text-[#cbd5e0] space-y-2">
                <p>Branches sem convenção: nomes aleatórios, difícil saber o que vai para produção.</p>
                <p>Hotfix urgente quebra o resto. Merges caóticos.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-[#d69e2e]" />
                Passo a passo: git flow init
              </h3>
              <div className="bg-[#0d1117] p-4 rounded-lg border border-[#2c5282] text-sm text-[#e6edf3] font-mono space-y-2">
                <div>git flow init</div>
                <div className="text-[#9ca3af]">Responde:</div>
                <ul className="list-disc list-inside space-y-1 text-[#9ca3af]">
                  <li>Produção: master (ou main)</li>
                  <li>Develop: develop</li>
                  <li>Prefixos: feature/, release/, hotfix/</li>
                  <li>Support: deixar vazio</li>
                </ul>
              </div>
              <p className="text-xs text-[#718096]">Aceitar defaults já cria develop e configura os prefixos.</p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#38a169]" />
                Ciclo recomendado
              </h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm text-[#cbd5e0]">
                <div className="bg-[#2a4365] p-3 rounded-lg border border-[#2c5282] space-y-1">
                  <p className="font-semibold text-white">Feature</p>
                  <code className="block bg-[#0d1117] px-2 py-1 rounded text-xs">git flow feature start nome</code>
                  <code className="block bg-[#0d1117] px-2 py-1 rounded text-xs">git flow feature finish nome</code>
                </div>
                <div className="bg-[#2a4365] p-3 rounded-lg border border-[#2c5282] space-y-1">
                  <p className="font-semibold text-white">Release</p>
                  <code className="block bg-[#0d1117] px-2 py-1 rounded text-xs">git flow release start v1.2.0</code>
                  <code className="block bg-[#0d1117] px-2 py-1 rounded text-xs">git flow release finish v1.2.0</code>
                </div>
                <div className="bg-[#2a4365] p-3 rounded-lg border border-[#2c5282] space-y-1">
                  <p className="font-semibold text-white">Hotfix</p>
                  <code className="block bg-[#0d1117] px-2 py-1 rounded text-xs">git flow hotfix start bug-critico</code>
                  <code className="block bg-[#0d1117] px-2 py-1 rounded text-xs">git flow hotfix finish bug-critico</code>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-white">Regras de ouro</h3>
              <ul className="list-disc list-inside text-sm text-[#cbd5e0] space-y-1">
                <li>Nunca commitar direto em master ou develop.</li>
                <li>Só cria branches via comandos do Git Flow.</li>
                <li>Merge em master = versão pronta e tagueada.</li>
              </ul>
            </section>
          </div>

          <div className="px-6 py-4 border-t border-[#2c5282] flex justify-end">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Fechar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
