const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Categorias principais
  const tags = [
    {
      name: "Alimentação",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-red-500"
    },
    {
      name: "Moradia",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-yellow-400"
    },
    {
      name: "Transporte",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-cyan-300"
    },
    {
      name: "Saúde",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-pink-300"
    },
    {
      name: "Educação",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-fuchsia-500"
    },
    {
      name: "Lazer",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-teal-400"
    },
    {
      name: "Financeiro",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-red-400"
    },
    {
      name: "Roupas e Acessórios",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-indigo-600"
    },
    {
      name: "Tecnologia",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-indigo-800"
    },
    {
      name: "Presentes e Doações",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "bg-teal-600"
    },
    {
      name: "Outros",
      userId: "cm4t4i9rz0000rf44ggn90afh",
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
