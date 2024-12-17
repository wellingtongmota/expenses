import { auth } from "@/auth"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { PropsWithChildren } from "react"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      {children}
    </SidebarProvider>
  )
}
