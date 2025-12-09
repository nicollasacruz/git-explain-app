'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou palavra-passe incorretos')
      } else {
        router.push('/ato-1')
        router.refresh()
      }
    } catch {
      setError('Ocorreu um erro. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#d69e2e] mb-2">
            Git Flow Explain
          </h1>
          <p className="text-[#cbd5e0]">
            Aprende Git Flow de forma interativa
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#2a4365] rounded-xl p-8 border border-[#2c5282]">
          <h2 className="text-2xl font-bold text-white mb-6">Entrar</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#cbd5e0] text-sm">
              Não tens conta?{' '}
              <Link
                href="/register"
                className="text-[#d69e2e] hover:text-[#ecc94b] font-medium"
              >
                Regista-te
              </Link>
            </p>
          </div>
        </div>

        {/* Informação adicional */}
        <div className="mt-6 text-center text-[#718096] text-sm">
          <p>Ao entrares, concordas com os termos de utilização</p>
        </div>
      </div>
    </div>
  )
}
