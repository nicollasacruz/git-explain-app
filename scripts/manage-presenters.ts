import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setPresenter(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'PRESENTER' }
    })
    
    console.log(`✅ Sucesso! ${user.email} (${user.name}) é agora APRESENTADOR`)
    console.log('\n📝 Nota: O utilizador precisa fazer logout e login novamente para a mudança ter efeito.\n')
  } catch (error) {
    console.error('❌ Erro ao atualizar utilizador:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })
    
    console.log('\n📋 Utilizadores na base de dados:\n')
    users.forEach((user: { id: string; email: string | null; name: string | null; role: string | null; createdAt: Date }) => {
      const roleEmoji = user.role === 'PRESENTER' ? '🎤' : '👤'
      console.log(`${roleEmoji} ${user.email} (${user.name || 'Sem nome'}) - ${user.role}`)
    })
    console.log('')
  } catch (error) {
    console.error('❌ Erro ao listar utilizadores:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function removePresenter(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'USER' }
    })
    
    console.log(`✅ ${user.email} voltou a ser utilizador normal (USER)`)
  } catch (error) {
    console.error('❌ Erro ao atualizar utilizador:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Argumentos da linha de comando
const command = process.argv[2]
const email = process.argv[3]

if (!command) {
  console.log(`
🎤 Gestor de Apresentadores - Git Flow Explain

Uso:
  npm run presenter:set <email>       - Define utilizador como apresentador
  npm run presenter:remove <email>    - Remove privilégios de apresentador
  npm run presenter:list              - Lista todos os utilizadores
  
Exemplos:
  npm run presenter:set joao@example.com
  npm run presenter:remove joao@example.com
  npm run presenter:list
  `)
  process.exit(0)
}

switch (command) {
  case 'set':
  case 'add':
    if (!email) {
      console.error('❌ Email é obrigatório')
      process.exit(1)
    }
    setPresenter(email)
    break
    
  case 'remove':
  case 'revoke':
    if (!email) {
      console.error('❌ Email é obrigatório')
      process.exit(1)
    }
    removePresenter(email)
    break
    
  case 'list':
  case 'ls':
    listUsers()
    break
    
  default:
    console.error(`❌ Comando desconhecido: ${command}`)
    process.exit(1)
}
