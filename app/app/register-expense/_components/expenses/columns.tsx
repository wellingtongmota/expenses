"use client"

import { ExpenseSchema } from "@/schemas/expenses"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableDelete } from "./data-table-delete"

type TExpense = z.infer<typeof ExpenseSchema>

export const columns: ColumnDef<TExpense>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => row.getValue("description")
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL"
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "dueDate", // ou qualquer que seja sua chave
    header: "Vence em",
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as Date
      // Formatando a data para string
      return date.toLocaleDateString("pt-BR")
    }
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const translations: Record<string, string> = {
        ONE_TIME: "Único",
        INSTALLMENTS: "Parcelado",
        RECURRING: "Recorrente"
      }
      return translations[type]
    }
  },
  {
    accessorKey: "installments",
    header: "Parcelas",
    cell: ({ row }) => row.getValue("installments")
  },
  {
    accessorKey: "frequency",
    header: "Frequência",
    cell: ({ row }) => {
      const frequency = row.getValue("frequency") as string
      const translations: Record<string, string> = {
        MONTHLY: "Mensal",
        YEARLY: "Anual",
        WEEKLY: "Semanal"
      }
      return frequency ? translations[frequency] : "-"
    }
  },
  {
    accessorKey: "tag",
    header: "Categoria",
    cell: ({ row }) => {
      const tag = row.getValue("tag") as { name: string; color: string } | null
      if (!tag) return "-"
      return tag.name
    }
  },
  {
    id: "delete",
    header: "Deletar",
    cell: ({ row }) => <DataTableDelete row={row} />
  }
]
