"use client"

import { useToast } from "@/hooks/use-toast"
import { Tag } from "@/schemas/database-tables"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
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

  // const handleStatusContact = async (contact: TTag) => {
  //   try {
  //     await changeStatusContact({ id: contact.id, status: contact.status })
  //     router.refresh()
  //   } catch (error) {
  //     toast({
  //       title: "Erro",
  //       description: "Falha ao atualizar o status do contato."
  //     })
  //   }
  // }

  return <div className={`size-4 rounded-full bg-[${tag.color}]`} />
}
