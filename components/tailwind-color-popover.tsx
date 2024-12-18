"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Check } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "./ui/button"

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

type TailwindColorPopoverProps = {
  children: React.ReactNode
  onSelectColor: (color: string) => void
}

export function TailwindColorPopover({
  children,
  onSelectColor
}: TailwindColorPopoverProps) {
  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const ref = useRef<HTMLDivElement>(null)

  const handleSelectColor = () => {
    onSelectColor(selectedColor)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div ref={ref}>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-96 p-0">
        <div className="h-full max-h-64 overflow-y-auto p-4">
          {colors.map((colorName) => (
            <div key={colorName} className="mb-4">
              <h3 className="mb-2 font-semibold capitalize">{colorName}</h3>
              <div className="grid grid-cols-11 gap-1">
                {shades.map((shade) => {
                  const colorClass = `bg-${colorName}-${shade}`
                  return (
                    <button
                      key={shade}
                      className={`h-6 w-6 rounded ${colorClass} flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-offset-1`}
                      onClick={() => setSelectedColor(colorClass)}
                      title={`${colorName}-${shade}`}
                    >
                      {selectedColor === colorClass && (
                        <Check className="h-4 w-4 text-white mix-blend-difference" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="grid p-4">
          <Button
            size="sm"
            onClick={handleSelectColor}
            disabled={selectedColor == "" ? true : false}
          >
            Salvar cor
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
