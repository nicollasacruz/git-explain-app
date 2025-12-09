import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Palavra-passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e palavra-passe são obrigatórios')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('Utilizador não encontrado')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Palavra-passe incorreta')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.email = (user as any).email
        return token
      }

      // Refresca papel SEMPRE que houver email, garantindo role atualizado (mesmo se token antigo)
      if (token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: { id: true, role: true, email: true },
          })

          if (dbUser) {
            token.id = dbUser.id
            token.role = dbUser.role
            token.email = dbUser.email
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('[auth] Falha ao refrescar role do token', error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
        session.user.email = (token.email as string) || session.user.email

        // fallback: se ainda não houver role no token, tenta buscar do BD
        if (!(session.user as any).role && token.email) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: token.email as string },
              select: { role: true, id: true },
            })

            if (dbUser) {
              (session.user as any).role = dbUser.role
              session.user.id = dbUser.id
              session.user.email = session.user.email || (token.email as string)
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('[auth] Falha ao buscar role na sessão', error)
          }
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}
