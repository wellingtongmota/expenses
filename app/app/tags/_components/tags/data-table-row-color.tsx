"use client"

import { changeTagColor } from "@/actions/tags"
import { TailwindColorPopover } from "@/components/tailwind-color-popover"
import { useToast } from "@/hooks/use-toast"
import { Tag } from "@/schemas/database-tables"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"

type TTag = z.infer<typeof Tag>

interface DataTableRowBadgeProps<TData> {
  row: Row<TTag>
}

export function DataTableRowColor<TData>({
  row
}: DataTableRowBadgeProps<TData>) {
  const tag = Tag.parse(row.original)
  const router = useRouter()
  const { toast } = useToast()

  const handleSelectColor = async (color: string) => {
    try {
      await changeTagColor({ id: tag.id, color: color })

      toast({
        title: "Sucesso",
        description: `Cor da tag atualizada.`
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar o status do contato."
      })
    }
  }

  return (
    <TailwindColorPopover onSelectColor={handleSelectColor}>
      <div className={`size-4 rounded-full ${tag.color}`} />
    </TailwindColorPopover>
  )
}
