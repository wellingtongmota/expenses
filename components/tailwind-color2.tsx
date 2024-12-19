"use client"

import { FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const colors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose"
]

const shades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950"
]

type TailwindColorProps = {
  value: string | undefined
  onChange: (value: string) => void
}

export function TailwindColor({ value, onChange }: TailwindColorProps) {
  return (
    <div className="h-full max-h-64 overflow-y-auto p-4">
      <FormItem>
        <FormControl>
          <RadioGroup onValueChange={onChange} className="flex flex-col">
            {colors.map((colorName) => (
              <div key={colorName} className="mb-2">
                <h3 className="mb-2 font-semibold capitalize">{colorName}</h3>
                <div className="grid grid-cols-11 gap-1">
                  {shades.map((shade) => {
                    const colorClass = `bg-${colorName}-${shade}`
                    return (
                      <FormItem key={shade}>
                        <FormControl>
                          <RadioGroupItem
                            value={colorClass}
                            className={`${colorClass}`}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  })}
                </div>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </div>
  )
}
