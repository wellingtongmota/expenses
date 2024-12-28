"use client"

import { ExpenseSchema } from "@/schemas/expenses"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableDelete } from "./data-table-delete"
import { Badge } from "@/components/ui/badge"

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
      const type = row.getValue("type") as string
      const installments = row.original.installments as number

      // Formatar valor como Real
      const formatted = new Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL"
      }).format(amount)

      if (type === "INSTALLMENTS" && installments) {
        const installmentValue = amount / installments
        const formattedInstallment = new Intl.NumberFormat("pt-Br", {
          style: "currency",
          currency: "BRL"
        }).format(installmentValue)

        return (
          <div className="text-right">
            {formatted}
            <div className="text-xs text-muted-foreground">
              {installments}x de {formattedInstallment}
            </div>
          </div>
        )
      }

      return <div className="text-right">{formatted}</div>
    }
  },
  {
    accessorKey: "dueDate",
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
        ONE_TIME: "À vista",
        INSTALLMENTS: "Parcelado",
        RECURRING: "Recorrente"
      }
      return translations[type]
    }
  },
  // {
  //   accessorKey: "installments",
  //   header: "Parcelas",
  //   cell: ({ row }) => row.getValue("installments")
  // },
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
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.getValue("category") as {
        name: string
        color: string
      } | null
      if (!category) return "-"
      return (
        <Badge className="gap-2" variant="outline">
          <div className={`size-2 rounded-full ${category.color}`} />
          <span>{category.name}</span>
        </Badge>
      )
    }
  },
  {
    id: "delete",
    header: "Deletar",
    cell: ({ row }) => <DataTableDelete row={row} />
  }
]
