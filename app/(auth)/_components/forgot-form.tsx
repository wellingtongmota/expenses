"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { LoginSchema } from "@/schemas/authentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Schema = LoginSchema.pick({ email: true })
type Schema = z.infer<typeof Schema>

export function ForgotForm() {
  const { toast } = useToast()

  const form = useForm<Schema>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (data: Schema) => {
    toast({
      description: `E-mail de recuperação enviado para ${data.email}`,
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
          <h1 className="text-2xl font-bold">Recupere sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Insira seu e-mail abaixo para recuperar sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input id="email" {...field} placeholder="m@examplo.com" />
                  </FormControl>
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
                Enviando
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Lembrou sua senha?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Faça login
          </Link>
        </div>
      </form>
    </Form>
  )
}
