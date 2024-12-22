const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Categorias principais
  const tags = [
    {
      name: "Alimentação",
      userId: "user-id-here",
      color: "bg-red-500"
    },
    {
      name: "Moradia",
      userId: "user-id-here",
      color: "bg-yellow-400"
    },
    {
      name: "Transporte",
      userId: "user-id-here",
      color: "bg-cyan-300"
    },
    {
      name: "Saúde",
      userId: "user-id-here",
      color: "bg-pink-300"
    },
    {
      name: "Educação",
      userId: "user-id-here",
      color: "bg-fuchsia-500"
    },
    {
      name: "Lazer",
      userId: "user-id-here",
      color: "bg-teal-400"
    },
    {
      name: "Financeiro",
      userId: "user-id-here",
      color: "bg-red-400"
    },
    {
      name: "Roupas e Acessórios",
      userId: "user-id-here",
      color: "bg-indigo-600"
    },
    {
      name: "Tecnologia",
      userId: "user-id-here",
      color: "bg-indigo-800"
    },
    {
      name: "Presentes e Doações",
      userId: "user-id-here",
      color: "bg-teal-600"
    },
    {
      name: "Outros",
      userId: "user-id-here",
      color: "bg-orange-400"
    }
  ]

  for (const tag of tags) {
    await prisma.tag.create({
      data: {
        name: tag.name,
        userId: tag.userId,
        color: tag.color
      }
    })
  }

  console.log("Tags inseridas com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
