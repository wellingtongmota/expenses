import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end">
      <div className="mr-auto text-sm text-muted-foreground">
        Total: {table.getFilteredRowModel().rows.length}
      </div>

      <div className="flex items-center gap-2">
        <p className="hidden text-sm text-muted-foreground sm:block">
          Linhas por página
        </p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex space-x-2">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <div>Página</div>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount().toLocaleString()}
          </span>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para a primeira página</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para a página anterior</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir para a próxima página</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir para a última página</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
