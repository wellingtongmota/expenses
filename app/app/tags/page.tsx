import { getUserTags } from "@/actions/tags"
import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"
import { columns } from "./_components/tags/columns"
import { DataTable } from "./_components/tags/data-table"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Início", url: "/app" }],
  page: { title: "Minhas tags" }
}

export default async function TagsPage() {
  const tags = await getUserTags()

  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DataTable data={tags} columns={columns} />
      </div>
    </SidebarInset>
  )
}
