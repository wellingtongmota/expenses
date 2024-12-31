import { AppNavbar } from "@/components/navbar/app-navbar"
import { SidebarInset } from "@/components/ui/sidebar"
import { TBreadcrumb } from "@/types"
import { PieChartExpenses } from "./_components/pie-chart-expenses"
import { getAllUserExpenses, getMonthUserExpenses } from "@/actions/expenses"

const breadcrumbLinks: TBreadcrumb = {
  page: { title: "Dashboard" }
}

export default async function AppPage() {
  const monthExpenses = await getMonthUserExpenses()
  const expenses = await getAllUserExpenses()

  // Aguardando a resolução das promessas
  const [month, all] = await Promise.all([monthExpenses, expenses])

  return (
    <SidebarInset>
      <AppNavbar breadcrumb={breadcrumbLinks} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PieChartExpenses
            data={month}
            title="Visão Mensal"
            subtitle="Despesas do mês corrente"
            legend="Distribuição das despesas do mês atual por categoria"
          />
          <PieChartExpenses
            data={all}
            title="Visão Geral"
            subtitle="Histórico completo"
            legend="Distribuição histórica total das despesas por categoria"
          />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
      </div>
    </SidebarInset>
  )
}
