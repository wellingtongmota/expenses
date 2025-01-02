import { z } from "zod"

const CategorySchema = z.object({
  name: z.string(), // Nome da tag
  color: z.string() // Cor da tag
})

export const ExpenseSchema = z.object({
  id: z.string().cuid(), // ID do gasto
  description: z.string(), // Descrição do gasto
  amount: z.number().positive(), // Valor positivo
  dueDate: z.date(), // Data de vencimento
  type: z.enum(["ONE_TIME", "INSTALLMENTS", "RECURRING"]), // Tipo do gasto: à vista, parcelado ou recorrente
  installments: z.number().positive().nullable().optional(), // Apenas para gastos parcelados
  frequency: z.enum(["MONTHLY", "YEARLY", "WEEKLY"]).nullable().optional(), // Frequência para gastos recorrentes
  createdAt: z.date(), // Data de criação
  category: CategorySchema.nullable() // Tag é opcional e pode ser nula
})

export const TotalExpensesByMonthSchema = z
  .object({
    month: z.string(),
    total: z.number()
  })
  .nullable()
