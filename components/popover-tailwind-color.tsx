"use client"

import { TailwindColor } from "@/components/tailwind-color"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Category } from "@/schemas/database-tables"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type PopoverTailwindColorProps = {
  children: React.ReactNode
  onSelectColor: (color: string) => void
}

const JustCategoryColor = Category.pick({ color: true })
type JustCategoryColor = z.infer<typeof JustCategoryColor>

export function PopoverTailwindColor({
  children,
  onSelectColor
}: PopoverTailwindColorProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<JustCategoryColor>({
    resolver: zodResolver(JustCategoryColor),
    defaultValues: {
      color: ""
    }
  })

  const handleSelectColor = () => {
    onSelectColor(form.getValues("color"))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-96 p-0" side="right">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSelectColor)}>
            <div className="w-full py-4">
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
            <div className="grid p-4">
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                type="submit"
                variant="default"
              >
                {form.formState.isSubmitting && "Salvando"}
                {!form.formState.isSubmitting && "Salvar cor"}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
