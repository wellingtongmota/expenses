"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { Expense } from "@/schemas/database-tables"
import { ExpenseSchema, TotalExpensesByMonthSchema } from "@/schemas/expenses"
import { z } from "zod"

// Auxiliar para autenticação
async function getAuthenticatedUserId(): Promise<string> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado.")
  }
  return session.user.id
}

// Auxiliar para seleção de campos
const expenseSelect = {
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
}

// Auxiliar para gerar chaves de mês
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
function getMonthKey(date: Date): string {
  return `${monthNames[date.getMonth()]}-${date.getFullYear()}`
}

// Auxiliar para adicionar parcelas
function addInstallments(
  expense: z.infer<typeof ExpenseSchema>,
  totals: Record<string, number>
) {
  const installmentAmount = expense.amount / expense.installments!
  for (let i = 0; i < expense.installments!; i++) {
    const installmentDate = new Date(expense.dueDate)
    installmentDate.setMonth(installmentDate.getMonth() + i)
    const key = getMonthKey(installmentDate)
    totals[key] = (totals[key] || 0) + installmentAmount
  }
}

// Auxiliar para adicionar mensalidades
function addRecurring(
  expense: z.infer<typeof ExpenseSchema>,
  totals: Record<string, number>
) {
  let recurringDate = new Date(expense.dueDate)
  while (recurringDate <= new Date()) {
    const key = getMonthKey(recurringDate)
    totals[key] = (totals[key] || 0) + expense.amount
    recurringDate.setMonth(recurringDate.getMonth() + 1)
  }
}

// Função genérica para obter despesas
async function getUserExpenses(
  filterByMonth = false
): Promise<z.infer<typeof ExpenseSchema>[]> {
  const userId = await getAuthenticatedUserId()
  const now = new Date()

  const where = filterByMonth
    ? {
        userId,
        dueDate: {
          gte: new Date(now.getFullYear(), now.getMonth(), 1),
          lte: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        }
      }
    : { userId }

  return prisma.expense.findMany({
    where,
    select: expenseSelect,
    orderBy: { createdAt: "desc" }
  })
}

// Obter todas as despesas do usuário
export async function getAllUserExpenses() {
  return getUserExpenses()
}

// Obter despesas do mês atual
export async function getMonthUserExpenses() {
  return getUserExpenses(true)
}

// Obter totais de despesas por mês
export async function getTotalExpensesByMonth(): Promise<
  z.infer<typeof TotalExpensesByMonthSchema>[]
> {
  const userId = await getAuthenticatedUserId()

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      dueDate: { gte: sixMonthsAgo }
    },
    orderBy: { dueDate: "asc" }
  })

  const totalsByMonth: Record<string, number> = {}

  expenses.forEach((expense) => {
    const baseMonth = getMonthKey(expense.dueDate)
    if (expense.type === "INSTALLMENTS") {
      addInstallments({ ...expense, category: null }, totalsByMonth)
    } else if (
      expense.type === "RECURRING" &&
      expense.frequency === "MONTHLY"
    ) {
      addRecurring({ ...expense, category: null }, totalsByMonth)
    } else {
      totalsByMonth[baseMonth] =
        (totalsByMonth[baseMonth] || 0) + expense.amount
    }
  })

  const result = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    const monthKey = getMonthKey(date)
    return { month: monthKey, total: totalsByMonth[monthKey] || 0 }
  })

  return result
}

// Deletar uma despesa pelo ID
const JustExpenseId = Expense.pick({ id: true })
type JustExpenseId = z.infer<typeof JustExpenseId>

export async function deleteExpense(input: JustExpenseId) {
  const expense = await prisma.expense.findUnique({
    where: { id: input.id },
    select: { id: true }
  })

  if (!expense) {
    return { error: "Not found", data: null }
  }

  await prisma.expense.delete({
    where: { id: input.id }
  })

  return { error: null, data: "Expense deleted successfully" }
}
