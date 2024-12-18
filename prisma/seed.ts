const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // Categorias principais
  const tags = [
    {
      name: "Alimentação",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#FF5733"
    },
    { name: "Moradia", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#33FF57" },
    {
      name: "Transporte",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#3357FF"
    },
    { name: "Saúde", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#FF33A1" },
    { name: "Educação", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#A133FF" },
    { name: "Lazer", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#33FFA1" },
    {
      name: "Financeiro",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#FF8C33"
    },
    {
      name: "Roupas e Acessórios",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#33A1FF"
    },
    {
      name: "Tecnologia",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#FF3333"
    },
    {
      name: "Presentes e Doações",
      userId: "cm4t4i9rz0000rf44ggn90afh",
      color: "#33FF8C"
    },
    { name: "Outros", userId: "cm4t4i9rz0000rf44ggn90afh", color: "#8C33FF" }
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
