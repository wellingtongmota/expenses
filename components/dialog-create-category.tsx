"use client"

import { createCategory } from "@/actions/categories"
import { TailwindColor } from "@/components/tailwind-color"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/schemas/database-tables"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { PropsWithChildren } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const JustCategoryNameColor = Category.pick({ name: true, color: true })
type JustCategoryNameColor = z.infer<typeof JustCategoryNameColor>

export function DialogCreateCategory({ children }: PropsWithChildren) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<JustCategoryNameColor>({
    resolver: zodResolver(JustCategoryNameColor),
    defaultValues: {
      name: "",
      color: ""
    }
  })

  const handleCreate = async (data: JustCategoryNameColor) => {
    try {
      await createCategory(data)
      toast({
        title: "Categoria criada",
        description: (
          <div className="flex items-center gap-2">
            Nome: {data.name}
            <Separator orientation="vertical" className="h-4" />
            Cor: <div className={`size-4 rounded-full ${data.color}`} />{" "}
          </div>
        )
      })
      // reseta o campo name
      form.resetField("name")

      // atualizada a página para exibir a nova categoria
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar categoria."
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <DialogHeader>
              <DialogTitle>Criar categoria</DialogTitle>
              <DialogDescription>
                Insira um nome e uma cor para a categoria que deseja criar.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Nome da categoria"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <TailwindColor
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                type="submit"
                variant="default"
              >
                {form.formState.isSubmitting && "Salvando"}
                {!form.formState.isSubmitting && "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
