"use server"

import { loginSchema } from "@/schemas/authentication"
import { prisma } from "@/services/database"
import { z } from "zod"

type TLogin = z.infer<typeof loginSchema>

export const getUserFromDb = async ({ email, password }: TLogin) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email as string
    }
  })
  if (user && user.password === password) {
    return user
  } else {
    return null
  }
}
