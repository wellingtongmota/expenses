const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Categorias principais
  const tags = [
    {
      name: "Alimentação",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#FF0000"
    },
    { name: "Moradia", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#f6b93b" },
    {
      name: "Transporte",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#48dbfb"
    },
    { name: "Saúde", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#ff9ff3" },
    { name: "Educação", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#FF00FF" },
    { name: "Lazer", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#1dd1a1" },
    {
      name: "Financeiro",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#ff6b6b"
    },
    {
      name: "Roupas e Acessórios",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#5f27cd"
    },
    {
      name: "Tecnologia",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#474787"
    },
    {
      name: "Presentes e Doações",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#008080"
    },
    { name: "Outros", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#ff9f43" }
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
