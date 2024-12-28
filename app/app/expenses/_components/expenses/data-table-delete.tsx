"use client"

import { deleteExpense } from "@/actions/expenses"
import { useToast } from "@/hooks/use-toast"
import { ExpenseSchema } from "@/schemas/expenses"
import { Row } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { z } from "zod"

type TExpense = z.infer<typeof ExpenseSchema>

interface DataTableDeleteProps<TData> {
  row: Row<TExpense>
}

export function DataTableDelete<TData>({ row }: DataTableDeleteProps<TData>) {
  const expense = ExpenseSchema.parse(row.original)
  const router = useRouter()
  const { toast } = useToast()

  const handleDeleteExpense = async (tag: TExpense) => {
    try {
      await deleteExpense({ id: tag.id })
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao deletar a tag."
      })
    }
  }

  return (
    <Trash2
      onClick={() => handleDeleteExpense(expense)}
      className="h-4 w-4 cursor-pointer text-destructive hover:!text-destructive"
    />
  )
}
