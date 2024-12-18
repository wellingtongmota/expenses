"use client"

import { deleteTag } from "@/actions/tags"
import { useToast } from "@/hooks/use-toast"
import { Tag } from "@/schemas/database-tables"
import { Row } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { z } from "zod"

type TTag = z.infer<typeof Tag>

interface DataTableDeleteProps<TData> {
  row: Row<TTag>
}

export function DataTableDelete<TData>({ row }: DataTableDeleteProps<TData>) {
  const tag = Tag.parse(row.original)
  const router = useRouter()
  const { toast } = useToast()

  const handleDeleteTag = async (tag: TTag) => {
    try {
      await deleteTag({ id: tag.id })
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao deletar o contato."
      })
    }
  }

  return (
    <Trash2
      onClick={() => handleDeleteTag(tag)}
      className="h-4 w-4 cursor-pointer text-destructive hover:!text-destructive"
    />
  )
}
