import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"

const headerLinks: TBreadcrumb = {
  links: [{ title: "Início", url: "/app" }],
  page: { title: "Dashboard" }
}

export default function AppPage() {
  return (
    <SidebarInset>
      <AppNavbar breadcrumb={headerLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">Dashboard</div>
    </SidebarInset>
  )
}
