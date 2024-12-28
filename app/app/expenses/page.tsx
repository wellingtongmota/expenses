import { getUserExpenses } from "@/actions/expenses"
import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"
import { columns } from "./_components/expenses/columns"
import { DataTable } from "./_components/expenses/data-table"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Início", url: "/app" }],
  page: { title: "Minhas despesas" }
}

export default async function ExpensePage() {
  const expenses = await getUserExpenses()

  return (
    <SidebarInset className="overflow-x-auto">
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable data={expenses} columns={columns} />
      </div>
    </SidebarInset>
  )
}
