"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { z } from "zod"

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme."
  })
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {
  theme: "light"
}

export function AppearanceForm() {
  const { toast } = useToast()
  const { setTheme } = useTheme()

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues
  })

  function handleSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)

    toast({
      title: "Sucesso",
      description: "Tema atualizado com sucesso"
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full justify-center"
      >
        <Card className="flex w-full max-w-2xl flex-col">
          <CardHeader>
            <CardTitle>Tema</CardTitle>
            <CardDescription>
              Selecione o tema para a aplicação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-md grid-cols-2 gap-8 pt-2"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Claro
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                          <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
                            <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-neutral-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-neutral-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Escuro
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end border-t bg-accent px-6 py-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              variant="default"
            >
              Salvar mudanças
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
