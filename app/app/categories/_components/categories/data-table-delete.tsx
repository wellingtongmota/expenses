"use client"

import { deleteCategory } from "@/actions/categories"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/schemas/database-tables"
import { Row } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { z } from "zod"

type TCategory = z.infer<typeof Category>

interface DataTableDeleteProps<TData> {
  row: Row<TCategory>
}

export function DataTableDelete<TData>({ row }: DataTableDeleteProps<TData>) {
  const category = Category.parse(row.original)
  const router = useRouter()
  const { toast } = useToast()

  const handleDeleteCategory = async (category: TCategory) => {
    try {
      await deleteCategory({ id: category.id })
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao deletar a category."
      })
    }
  }

  return (
    <Trash2
      onClick={() => handleDeleteCategory(category)}
      className="h-4 w-4 cursor-pointer text-destructive hover:!text-destructive"
    />
  )
}
