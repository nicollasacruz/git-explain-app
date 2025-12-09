'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validações
    if (password !== confirmPassword) {
      setError('As palavras-passe não coincidem')
      return
    }

    if (password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Ocorreu um erro ao criar a conta')
        return
      }

      // Redirecionar para login
      router.push('/login?registered=true')
    } catch {
      setError('Ocorreu um erro. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#d69e2e] mb-2">
            Git Flow Explain
          </h1>
          <p className="text-[#cbd5e0]">
            Cria a tua conta e começa a aprender
          </p>
        </div>

        {/* Card de Registo */}
        <div className="bg-[#2a4365] rounded-xl p-8 border border-[#2c5282]">
          <h2 className="text-2xl font-bold text-white mb-6">Registar</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O teu nome"
              required
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teu@email.com"
              required
            />

            <Input
              label="Palavra-passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Input
              label="Confirmar palavra-passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && (
              <div className="bg-[#e53e3e]/10 border border-[#e53e3e] rounded-lg p-3 text-[#e53e3e] text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#cbd5e0] text-sm">
              Já tens conta?{' '}
              <Link
                href="/login"
                className="text-[#d69e2e] hover:text-[#ecc94b] font-medium"
              >
                Entra aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Informação adicional */}
        <div className="mt-6 text-center text-[#718096] text-sm">
          <p>Ao registares-te, concordas com os termos de utilização</p>
        </div>
      </div>
    </div>
  )
}
