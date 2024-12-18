import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Início", url: "/app" }],
  page: { title: "Minhas tags" }
}

export default function TagsPage() {
  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        Gerênciar minhas tags
      </div>
    </SidebarInset>
  )
}
