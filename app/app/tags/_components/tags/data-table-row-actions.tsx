"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Tag } from "@/schemas/database-tables"
import { Row } from "@tanstack/react-table"
import { Copy, MoreHorizontal } from "lucide-react"
import { z } from "zod"

type TTag = z.infer<typeof Tag>

interface DataTableRowActionsProps<TData> {
  row: Row<TTag>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const tag = Tag.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(tag.name)}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar descrição
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
