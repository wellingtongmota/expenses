import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Início", url: "/app" }],
  page: { title: "Cadastrar despesa" }
}

export default function RegisterExpensePage() {
  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">Cadastrar despesa</div>
    </SidebarInset>
  )
}
