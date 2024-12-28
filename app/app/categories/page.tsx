import { getUserCategories } from "@/actions/categories"
import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"
import { columns } from "./_components/categories/columns"
import { DataTable } from "./_components/categories/data-table"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Início", url: "/app" }],
  page: { title: "Minhas categorias" }
}

export default async function CategoriesPage() {
  const categories = await getUserCategories()

  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable data={categories} columns={columns} />
      </div>
    </SidebarInset>
  )
}
