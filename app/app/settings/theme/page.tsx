import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"

const breadcrumbLinks: TBreadcrumb = {
  links: [{ title: "Configurações", url: "/app/settings" }],
  page: { title: "Tema" }
}

export default function ThemePage() {
  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        Escolha o tema da aplicação
      </div>
    </SidebarInset>
  )
}
