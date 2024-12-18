"use client"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"
import { CircleDollarSign, House, Settings2 } from "lucide-react"
import { Session } from "next-auth"
import Link from "next/link"

const data = {
  user: {
    name: "Wellington G.",
    email: "wellington@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Início",
      url: "#",
      icon: House,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/app"
        },
        {
          title: "Cadastrar despesa",
          url: "/app/register-expense"
        },
        {
          title: "Minhas tags",
          url: "/app/tags"
        }
      ]
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Geral",
          url: "/app/settings"
        },
        {
          title: "Tema",
          url: "/app/settings/theme"
        },
        {
          title: "Plano",
          url: "/app/settings/billing"
        }
      ]
    }
  ]
}

type AppSidebarProps = {
  user: Session["user"]
}

export function AppSidebar({
  user,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/app">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <CircleDollarSign className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-semibold">Expenses</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
