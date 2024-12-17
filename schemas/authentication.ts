import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Insira o e-mail" }),
  password: z.string().min(1, { message: "Insira a senha" })
})
