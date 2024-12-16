import type { Metadata } from "next"
import "./globals.css"
import { geistSans } from "@/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Expenses",
  description: "Controle de gastos pessoais"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-Br">
      <body className={cn("min-h-[100dvh] antialiased", geistSans.className)}>
        {children}
      </body>
    </html>
  )
}
