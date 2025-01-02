"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { ExpenseSchema } from "@/schemas/expenses"
import { z } from "zod"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 }
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig

type TExpense = z.infer<typeof ExpenseSchema>

type BarChartExpensesProps = {
  className?: string
  data: TExpense[]
  title: string
  subtitle: string
  legend?: string
}

export function BarChartExpenses({
  className,
  data,
  title,
  subtitle,
  legend
}: BarChartExpensesProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1">
        <ChartContainer
          config={chartConfig}
          className="flex h-full max-h-60 w-full flex-1"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={8}
              label={{ position: "top" }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {legend && (
        <CardFooter className="mt-auto flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-center font-medium leading-none">
            {legend}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
