import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Preencha os campos abaixo para criar uma nova conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" placeholder="Seu nome" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Faça login
        </Link>
      </div>
    </form>
  )
}
