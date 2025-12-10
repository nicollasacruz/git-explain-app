'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useProgresso } from '@/hooks/useProgresso'

const ACOES_ESPERADAS = [
  {
    id: 'a1',
    descricao: 'Criar branch feature/nova-funcionalidade a partir de develop',
  },
  {
    id: 'a2',
    descricao: 'Fazer commit com mensagem "feat: adicionar nova funcionalidade"',
  },
  {
    id: 'a3',
    descricao: 'Fazer push da branch para origin',
  },
]

export default function Exercicio6Page() {
  const { salvarPontuacao } = useProgresso()
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null)
  const [nomeArquivo, setNomeArquivo] = useState<string>('')
  const [validando, setValidando] = useState(false)
  const [resultado, setResultado] = useState<{
    valido: boolean
    feedback: string
    acoesEncontradas: string[]
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImagemSelecionada = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNomeArquivo(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemSelecionada(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResultado(null)
    }
  }

  const validarScreenshot = async () => {
    if (!imagemSelecionada) return

    setValidando(true)
    setResultado(null)

    try {
      const response = await fetch('/api/ai/validar-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagemBase64: imagemSelecionada.split(',')[1],
          acoesEsperadas: ACOES_ESPERADAS,
        }),
      })

      const data = await response.json()
      setResultado(data)

      // Salvar pontuação no progresso se válido
      if (data.valido) {
        const pontos = Math.round((data.acoesEncontradas.length / ACOES_ESPERADAS.length) * 100)
        await salvarPontuacao(6, pontos)
      }
    } catch (error) {
      setResultado({
        valido: false,
        feedback: '❌ Erro ao validar screenshot. Tenta novamente.',
        acoesEncontradas: [],
      })
    } finally {
      setValidando(false)
    }
  }

  const removerImagem = () => {
    setImagemSelecionada(null)
    setNomeArquivo('')
    setResultado(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-[#1a365d] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/exercicio/5"
            className="inline-flex items-center gap-2 text-[#cbd5e0] hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercício Anterior
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Exercício 6: Screenshot do Terminal
          </h1>
          <p className="text-[#cbd5e0]">
            Executa os comandos no teu terminal e envia o screenshot
          </p>
        </div>

        {/* Instruções */}
        <Card className="mb-8 bg-[#2c5282] border-[#d69e2e]">
          <CardHeader>
            <CardTitle className="text-white">📋 Tarefa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#cbd5e0]">
              Executa os seguintes comandos no teu terminal Git:
            </p>
            <div className="bg-[#0d1117] p-4 rounded-lg font-mono text-sm space-y-2">
              <div className="text-[#e6edf3]">
                <span className="text-[#848d97]">$</span> git checkout develop
              </div>
              <div className="text-[#e6edf3]">
                <span className="text-[#848d97]">$</span> git checkout -b feature/nova-funcionalidade
              </div>
              <div className="text-[#e6edf3]">
                <span className="text-[#848d97]">$</span> git commit --allow-empty -m "feat: adicionar nova funcionalidade"
              </div>
              <div className="text-[#e6edf3]">
                <span className="text-[#848d97]">$</span> git log --oneline -1
              </div>
            </div>
            <p className="text-sm text-[#cbd5e0]">
              Depois, tira um screenshot do terminal mostrando os comandos executados e faz upload abaixo.
            </p>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload do Screenshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!imagemSelecionada ? (
              <div
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-[#2c5282] rounded-lg p-12 text-center cursor-pointer hover:border-[#d69e2e] transition-colors"
              >
                <ImageIcon className="w-12 h-12 text-[#718096] mx-auto mb-4" />
                <p className="text-[#cbd5e0] mb-2">
                  Clica para selecionar um screenshot
                </p>
                <p className="text-sm text-[#718096]">
                  PNG, JPG ou JPEG (máx 5MB)
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImagemSelecionada}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative border-2 border-[#2c5282] rounded-lg overflow-hidden">
                  <Image
                    src={imagemSelecionada}
                    alt="Screenshot selecionado"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#cbd5e0]">{nomeArquivo}</p>
                  <Button onClick={removerImagem} variant="secondary" size="sm">
                    Remover
                  </Button>
                </div>
                <Button
                  onClick={validarScreenshot}
                  disabled={validando}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {validando ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      A validar com Claude Vision...
                    </>
                  ) : (
                    <>
                      Validar Screenshot
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="mb-8">
          <Card className="bg-[#2c5282]/40 border-[#2c5282]">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
              <div>
                <p className="text-white font-semibold">Quer pular esta validação?</p>
                <p className="text-sm text-[#cbd5e0]">Avança diretamente para o próximo exercício sem enviar screenshot.</p>
              </div>
              <Link href="/exercicio/7" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Pular e ir para o Exercício 7
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
              resultado.valido
                ? 'bg-[#38a169]/20 border-[#38a169] border-2'
                : 'bg-[#e53e3e]/20 border-[#e53e3e] border-2'
            } animate-fade-in`}
          >
            <CardHeader>
              <CardTitle className={resultado.valido ? 'text-[#38a169]' : 'text-[#e53e3e]'}>
                {resultado.valido ? '✅ Screenshot Validado!' : '❌ Algo Falta'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#cbd5e0] whitespace-pre-line">{resultado.feedback}</p>

              {resultado.acoesEncontradas.length > 0 && (
                <div>
                  <p className="text-sm text-[#718096] mb-2">Ações identificadas:</p>
                  <ul className="space-y-1">
                    {resultado.acoesEncontradas.map((acao, index) => (
                      <li key={index} className="text-sm text-[#cbd5e0] flex items-center gap-2">
                        <span className="text-[#38a169]">✓</span>
                        {acao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resultado.valido && (
                <div className="pt-4 flex justify-center">
                  <Link href="/exercicio/7">
                    <Button variant="primary" size="lg">
                      Próximo Exercício
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Checklist */}
        <Card className="bg-[#2a4365]/50 border-[#2c5282]">
          <CardContent className="p-4">
            <p className="text-xs text-[#718096] mb-3">✅ O que a IA vai verificar:</p>
            <ul className="text-xs text-[#cbd5e0] space-y-1">
              {ACOES_ESPERADAS.map((acao) => (
                <li key={acao.id}>• {acao.descricao}</li>
              ))}
            </ul>
            <p className="text-xs text-[#718096] mt-4">
              💡 Certifica-te que o screenshot mostra claramente os comandos executados e as suas saídas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
