"use server"

import { prisma } from "@/prisma"
import { LoginSchema } from "@/schemas/authentication"
import { z } from "zod"

type TLogin = z.infer<typeof LoginSchema>

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
