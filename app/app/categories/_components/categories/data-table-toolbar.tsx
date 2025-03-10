"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { CirclePlus, X } from "lucide-react"
import { DialogCreateCategory } from "@/components/dialog-create-category"

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
          placeholder="Filtrar categorias..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />

        {/* If there is a filter, display Reset button */}
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

      {/* Buttons on top right */}
      <div className="flex gap-2">
        <DialogCreateCategory>
          <Button variant="outline" size="sm">
            <CirclePlus className="mr-2 size-4" />
            Adicionar categoria
          </Button>
        </DialogCreateCategory>
      </div>
    </div>
  )
}
