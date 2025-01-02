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
import { TotalExpensesByMonthSchema } from "@/schemas/expenses"
import { z } from "zod"

type TTotalExpensesByMonth = z.infer<typeof TotalExpensesByMonthSchema>

type BarChartExpensesProps = {
  className?: string
  data: TTotalExpensesByMonth[]
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
  const chartData = data.map((item) => ({
    month: item?.month || "Indefinido",
    total: Number((item?.total || 0).toFixed(2))
  }))

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))"
    }
  } satisfies ChartConfig

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
              dataKey="total"
              fill="var(--color-total)"
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
