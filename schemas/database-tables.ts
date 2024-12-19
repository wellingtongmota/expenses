import { z } from "zod"

// User Model
export const User = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  password: z.string(),
  image: z.string().url().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

// Account Model
export const Account = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

// Session Model
export const Session = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

// VerificationToken Model
export const VerificationToken = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date()
})

// Authenticator Model
export const Authenticator = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().nullable()
})

// Tag Model
export const Tag = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(2, { message: "A descrição deve ter no mínimo 2 caracteres" }),
  userId: z.string(),
  color: z
    .string({ required_error: "Cor é obrigatória" })
    .min(1, "Cor é obrigatória"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

// Expense Model
export const Expense = z.object({
  id: z.string().cuid(),
  description: z.string(),
  amount: z.number().positive(),
  dueDate: z.date(),
  createdAt: z.date().default(() => new Date()),
  userId: z.string(),
  tagId: z.string().nullable()
})
