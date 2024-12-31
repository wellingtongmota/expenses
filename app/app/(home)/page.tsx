import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"
import { PieChartExpenses } from "./_components/pie-chart-expenses"
import { getMonthUserExpenses } from "@/actions/expenses"

const breadcrumbLinks: TBreadcrumb = {
  page: { title: "Dashboard" }
}

export default async function AppPage() {
  const monthExpenses = await getMonthUserExpenses()

  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PieChartExpenses data={monthExpenses} />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
      </div>
    </SidebarInset>
  )
}
