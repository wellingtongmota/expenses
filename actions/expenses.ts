"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { Expense } from "@/schemas/database-tables"
import { ExpenseSchema, TotalExpensesByMonthSchema } from "@/schemas/expenses"
import { z } from "zod"

export async function getAllUserExpenses(): Promise<
  z.infer<typeof ExpenseSchema>[]
> {
  const session = await auth()

  const expenses = await prisma.expense.findMany({
    where: {
      userId: session?.user?.id
    },
    select: {
      id: true,
      description: true,
      amount: true,
      dueDate: true,
      type: true,
      installments: true,
      frequency: true,
      createdAt: true,
      category: {
        select: {
          color: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return expenses
}

export async function getMonthUserExpenses(): Promise<
  z.infer<typeof ExpenseSchema>[]
> {
  const session = await auth()

  // Pega o primeiro e último dia do mês atual
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const expenses = await prisma.expense.findMany({
    where: {
      userId: session?.user?.id,
      dueDate: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth
      }
    },
    select: {
      id: true,
      description: true,
      amount: true,
      dueDate: true,
      type: true,
      installments: true,
      frequency: true,
      createdAt: true,
      category: {
        select: {
          color: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return expenses
}

export async function getTotalExpensesByMonth(): Promise<
  z.infer<typeof TotalExpensesByMonthSchema>[]
> {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado.")
  }

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)

  // Obter todas as despesas do usuário dos últimos seis meses
  const expenses = await prisma.expense.findMany({
    where: {
      userId: session.user.id,
      dueDate: {
        gte: sixMonthsAgo // Maior ou igual a seis meses atrás
      }
    },
    orderBy: {
      dueDate: "asc" // Ordenar por data de vencimento
    }
  })

  // Inicializar um mapa para armazenar os totais mensais
  const totalsByMonth: Record<string, number> = {}

  const monthNames = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez"
  ]

  // Iterar sobre as despesas e calcular os totais mensais
  expenses.forEach((expense) => {
    const month = monthNames[expense.dueDate.getMonth()]
    const baseMonth = `${month}-${expense.dueDate.getFullYear()}`

    if (!totalsByMonth[baseMonth]) {
      totalsByMonth[baseMonth] = 0
    }

    if (expense.type === "INSTALLMENTS" && expense.installments) {
      // Parcelado: dividir o valor pelo número de parcelas
      const installmentAmount = expense.amount / expense.installments

      for (let i = 0; i < expense.installments; i++) {
        const installmentDate = new Date(expense.dueDate)
        installmentDate.setMonth(installmentDate.getMonth() + i)

        const installmentMonth = `${monthNames[installmentDate.getMonth()]}-${installmentDate.getFullYear()}`

        if (!totalsByMonth[installmentMonth]) {
          totalsByMonth[installmentMonth] = 0
        }

        totalsByMonth[installmentMonth] += installmentAmount
      }
    } else if (
      expense.type === "RECURRING" &&
      expense.frequency === "MONTHLY"
    ) {
      // Mensalidade: somar o valor para cada mês aplicável
      let recurringDate = new Date(expense.dueDate)

      while (recurringDate <= new Date()) {
        const recurringMonth = `${monthNames[recurringDate.getMonth()]}-${recurringDate.getFullYear()}`

        if (!totalsByMonth[recurringMonth]) {
          totalsByMonth[recurringMonth] = 0
        }

        totalsByMonth[recurringMonth] += expense.amount
        recurringDate.setMonth(recurringDate.getMonth() + 1)
      }
    } else {
      // À vista: somar o valor no mês correspondente
      totalsByMonth[baseMonth] += expense.amount
    }
  })

  // Retornar os últimos seis meses, garantindo a ordem correta
  const result = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    const monthKey = `${monthNames[date.getMonth()]}-${date.getFullYear()}`
    return { month: monthKey, total: totalsByMonth[monthKey] || 0 }
  })

  console.log(result)

  return result
}

const JustExpenseId = Expense.pick({ id: true })
type JustExpenseId = z.infer<typeof JustExpenseId>

export async function deleteExpense(input: JustExpenseId) {
  const expense = await prisma.expense.findUnique({
    where: {
      id: input.id
    },
    select: {
      id: true
    }
  })

  if (!expense) {
    return {
      error: "Not found",
      data: null
    }
  }

  await prisma.expense.delete({
    where: {
      id: input.id
    }
  })

  return {
    error: null,
    data: "Expense deleted successfully"
  }
}
