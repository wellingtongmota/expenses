"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { Expense } from "@/schemas/database-tables"
import { ExpenseSchema } from "@/schemas/expenses"
import { z } from "zod"

export async function getUserExpenses(): Promise<
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
