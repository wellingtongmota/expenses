import { ExpenseSchema } from "@/schemas/expenses"
import { faker } from "@faker-js/faker"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod"

type SubscriptionTier = "free" | "premium"

interface User {
  id: string
  avatar: string
  birthday: Date
  email: string
  fullName: string
  subscriptionTier: SubscriptionTier
}

export const createRandomUsers: User[] = Array.from({ length: 200 }).map(() => {
  return {
    id: createId(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    subscriptionTier: faker.helpers.arrayElement(["free", "premium"])
  }
})

// expenses
type Expense = z.infer<typeof ExpenseSchema>

export const createRandomExpenses: Expense[] = Array.from({ length: 200 }).map(
  () => {
    const type = faker.helpers.arrayElement([
      "ONE_TIME",
      "INSTALLMENTS",
      "RECURRING"
    ]) as "ONE_TIME" | "INSTALLMENTS" | "RECURRING"

    return {
      id: createId(),
      description: faker.commerce.product(),
      amount: Number(faker.commerce.price()),
      dueDate: faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: "2026-01-01T00:00:00.000Z"
      }),
      type,
      installments:
        type === "ONE_TIME" ? null : faker.number.int({ min: 2, max: 12 }),
      frequency:
        type === "RECURRING" || type === "INSTALLMENTS"
          ? faker.helpers.arrayElement(["MONTHLY", "YEARLY", "WEEKLY"])
          : null,
      createdAt: faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z"
      }),
      category: {
        name: faker.commerce.department(),
        color: faker.helpers.arrayElement([
          "red-500",
          "blue-500",
          "green-500",
          "yellow-500",
          "purple-500"
        ])
      }
    }
  }
)
