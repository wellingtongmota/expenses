"use client"

import { Category } from "@/schemas/database-tables"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableDelete } from "./data-table-delete"
import { DataTableRowActions } from "./data-table-row-actions"
import { DataTableRowColor } from "./data-table-row-color"

type TCategory = z.infer<typeof Category>

export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => <DataTableRowColor row={row} />
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // }
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => row.getValue("name")
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <DataTableRowActions row={row} />
  },
  {
    id: "delete",
    header: "Deletar",
    cell: ({ row }) => <DataTableDelete row={row} />
  }
]
