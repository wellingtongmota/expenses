"use client"

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
import { Tag } from "@/schemas/database-tables"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { PropsWithChildren } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const JustTagNameColor = Tag.pick({ name: true, color: true })
type JustTagNameColor = z.infer<typeof JustTagNameColor>

export function DialogCreateTag({ children }: PropsWithChildren) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<JustTagNameColor>({
    resolver: zodResolver(JustTagNameColor),
    defaultValues: {
      name: "",
      color: ""
    }
  })

  const handleCreate = async (data: JustTagNameColor) => {
    try {
      // await createTag(data)
      toast({
        title: "Tag criada",
        description: (
          <div className="flex items-center gap-2">
            Nome: {data.name}
            <Separator orientation="vertical" className="h-4" />
            Cor: <div className={`size-4 rounded-full ${data.color}`} />{" "}
          </div>
        )
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar tag."
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
              <DialogTitle>Criar tag</DialogTitle>
              <DialogDescription>
                Insira um nome e uma cor para a tag que deseja criar.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full space-y-2 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input id="name" placeholder="Nome da tag" {...field} />
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
                disabled={form.formState.isSubmitting}
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
