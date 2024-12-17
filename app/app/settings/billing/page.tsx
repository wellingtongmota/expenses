import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Configurações", url: "/app/settings" }],
  page: { title: "Plano" }
}

export default function BillingPage() {
  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">Escolha seu plano!</div>
    </SidebarInset>
  )
}
