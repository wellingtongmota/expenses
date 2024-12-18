import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

type GenericProps<T = any> = {
  children?: React.ReactNode
  className?: string
} & T

export function LoadingCircle({ className }: GenericProps) {
  return (
    <div className={cn(["flex flex-col items-center gap-2", className])}>
      <LoaderCircle className="h-9 w-9 animate-spin" />
      <p className="text-muted-foreground">Carregando</p>
    </div>
  )
}
