import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"

const breadcrumbLinks: TBreadcrumb = {
  page: { title: "Configurações" }
}

export default function SettingsPage() {
  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">Configurações gerais</div>
    </SidebarInset>
  )
}
