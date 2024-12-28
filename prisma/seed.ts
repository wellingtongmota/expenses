const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Categorias principais
  const categories = [
    {
      name: "Alimentação",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-red-500"
    },
    {
      name: "Moradia",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-yellow-400"
    },
    {
      name: "Transporte",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-cyan-300"
    },
    {
      name: "Saúde",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-pink-300"
    },
    {
      name: "Educação",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-fuchsia-500"
    },
    {
      name: "Lazer",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-teal-400"
    },
    {
      name: "Financeiro",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-red-400"
    },
    {
      name: "Roupas e Acessórios",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-indigo-600"
    },
    {
      name: "Tecnologia",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-indigo-800"
    },
    {
      name: "Presentes e Doações",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-teal-600"
    },
    {
      name: "Outros",
      userId: "cm58f31m500009jz8hf5fzb9j",
      color: "bg-orange-400"
    }
  ]

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        userId: category.userId,
        color: category.color
      }
    })
  }

  console.log("Categorias inseridas com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
