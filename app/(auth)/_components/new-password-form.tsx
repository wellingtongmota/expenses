"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { RegisterNewPasswordSchema } from "@/schemas/authentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function NewPasswordForm() {
  const [visiblePass, isVisiblePass] = useState<boolean>(false)
  const [visibleConfirmPass, isVisibleConfirmPass] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof RegisterNewPasswordSchema>>({
    resolver: zodResolver(RegisterNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof RegisterNewPasswordSchema>) => {
    toast({
      title: "Sucesso",
      description: "Nova senha cadastrada com sucesso!",
      variant: "default"
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Criar nova senha</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Cadastre uma nova senha para acessar sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type={visiblePass ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex text-xs text-muted-foreground">
                    <p
                      className="ml-auto cursor-pointer"
                      onClick={() => isVisiblePass(!visiblePass)}
                    >
                      {visiblePass ? "Esconder senha" : "Visualizar senha"}
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type={visibleConfirmPass ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex text-xs text-muted-foreground">
                    <p
                      className="ml-auto cursor-pointer"
                      onClick={() => isVisibleConfirmPass(!visibleConfirmPass)}
                    >
                      {visibleConfirmPass
                        ? "Esconder senha"
                        : "Visualizar senha"}
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
