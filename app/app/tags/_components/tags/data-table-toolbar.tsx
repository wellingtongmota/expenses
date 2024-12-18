"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar tags..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />

        {/* Caso tenha filtro, exibir botão Resetar */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Resetar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
