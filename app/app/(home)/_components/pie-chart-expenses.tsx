"use client"

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
import { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"
import { twHex } from "tailwind-color-util"
import { z } from "zod"

type TExpense = z.infer<typeof ExpenseSchema>

type PieChartExpensesProps = {
  className?: string
  data: TExpense[]
  title: string
  subtitle: string
  legend?: string
}

export function PieChartExpenses({
  className,
  data,
  title,
  subtitle,
  legend
}: PieChartExpensesProps) {
  const totalExpenses = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0)
  }, [data])

  const chartData = useMemo(() => {
    const expensesByCategory = data.reduce(
      (acc, expense) => {
        const categoryName = expense?.category?.name || "Indefinido"
        const categoryColor = expense?.category?.color || "slate-500"

        if (categoryName) {
          acc[categoryName] = {
            name: categoryName,
            value: 0,
            fill: twHex(categoryColor as Parameters<typeof twHex>[0])
          }
        }

        if (categoryName) {
          acc[categoryName].value += expense.amount
        }
        return acc
      },
      {} as Record<string, { name: string; value: number; fill: string }>
    )

    return Object.values(expensesByCategory)
  }, [data])

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      value: {
        label: "Valor"
      }
    }

    chartData.forEach((item) => {
      config[item.name] = {
        label: item.name,
        color: item.fill
      }
    })

    return config
  }, [chartData])

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      {totalExpenses !== 0 && (
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {/* label com o valor do centro */}
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className={`fill-foreground font-bold ${totalExpenses >= 1000 ? "text-base" : "text-xl"}`}
                          >
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL"
                            }).format(totalExpenses)}
                          </tspan>

                          {/* label com a legenda do valor do centro */}
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}

      {totalExpenses === 0 && (
        <CardContent className="flex flex-1 items-center justify-center p-4 text-center">
          Nenhum dado registrado
        </CardContent>
      )}
      {legend && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-center font-medium leading-none">
            {legend}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
