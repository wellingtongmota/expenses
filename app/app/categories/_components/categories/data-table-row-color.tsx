"use client"

import { changeCategoryColor } from "@/actions/categories"
import { PopoverTailwindColor } from "@/components/popover-tailwind-color"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/schemas/database-tables"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { z } from "zod"

type TCategory = z.infer<typeof Category>

interface DataTableRowBadgeProps<TData> {
  row: Row<TCategory>
}

export function DataTableRowColor<TData>({
  row
}: DataTableRowBadgeProps<TData>) {
  const category = Category.parse(row.original)
  const router = useRouter()
  const { toast } = useToast()

  const handleSelectColor = async (color: string) => {
    try {
      await changeCategoryColor({ id: category.id, color: color })

      toast({
        title: "Sucesso",
        description: `Cor da categoria atualizada.`
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar a cor da categoria."
      })
    }
  }

  return (
    <PopoverTailwindColor onSelectColor={handleSelectColor}>
      <div className={`size-4 rounded-full bg-${category.color}`} />
    </PopoverTailwindColor>
  )
}
