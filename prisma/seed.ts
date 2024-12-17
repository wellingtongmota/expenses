import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Categorias principais
  const categories = [
    { name: "Alimentação", parentId: null },
    { name: "Supermercado", parentId: 1 },
    { name: "Restaurantes", parentId: 1 },
    { name: "Cafés e Lanches", parentId: 1 },

    { name: "Moradia", parentId: null },
    { name: "Aluguel/Financiamento", parentId: 5 },
    { name: "Condomínio", parentId: 5 },
    { name: "Contas de Água, Luz e Gás", parentId: 5 },
    { name: "Manutenção", parentId: 5 },

    { name: "Transporte", parentId: null },
    { name: "Combustível", parentId: 10 },
    { name: "Transporte Público", parentId: 10 },
    { name: "Manutenção do Veículo", parentId: 10 },
    { name: "Pedágios e Estacionamentos", parentId: 10 },

    { name: "Saúde", parentId: null },
    { name: "Plano de Saúde", parentId: 15 },
    { name: "Medicamentos", parentId: 15 },
    { name: "Consultas Médicas", parentId: 15 },
    { name: "Academia", parentId: 15 },

    { name: "Educação", parentId: null },
    { name: "Cursos", parentId: 20 },
    { name: "Mensalidade Escolar/Universitária", parentId: 20 },
    { name: "Material Didático", parentId: 20 },

    { name: "Lazer", parentId: null },
    { name: "Viagens", parentId: 25 },
    { name: "Cinema, Shows e Eventos", parentId: 25 },
    { name: "Assinaturas de Streaming", parentId: 25 },

    { name: "Financeiro", parentId: null },
    { name: "Empréstimos", parentId: 30 },
    { name: "Investimentos", parentId: 30 },
    { name: "Taxas Bancárias", parentId: 30 },

    { name: "Roupas e Acessórios", parentId: null },
    { name: "Vestuário", parentId: 35 },
    { name: "Sapatos", parentId: 35 },
    { name: "Acessórios", parentId: 35 },

    { name: "Tecnologia", parentId: null },
    { name: "Eletrônicos", parentId: 40 },
    { name: "Softwares e Aplicativos", parentId: 40 },
    { name: "Assinaturas de Serviços Digitais", parentId: 40 },

    { name: "Presentes e Doações", parentId: null },
    { name: "Presentes para Outras Pessoas", parentId: 45 },
    { name: "Doações para Instituições", parentId: 45 },

    { name: "Outros", parentId: null },
    { name: "Compras Diversas", parentId: 50 },
    { name: "Despesas Imprevistas", parentId: 50 }
  ]

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        parentId: category.parentId
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
