"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { Category } from "@/schemas/database-tables"
import { z } from "zod"

export async function getUserCategories() {
  const session = await auth()

  const categories = await prisma.category.findMany({
    where: {
      userId: session?.user?.id
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return categories
}

const JustCategoryNameColor = Category.pick({ name: true, color: true })
type JustCategoryNameColor = z.infer<typeof JustCategoryNameColor>

export async function createCategory(input: JustCategoryNameColor) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null
    }
  }

  const newCategory = await prisma.category.create({
    data: {
      name: input.name,
      color: input.color,
      userId: session?.user?.id
    }
  })

  return newCategory
}

const JustCategoryId = Category.pick({ id: true })
type JustCategoryId = z.infer<typeof JustCategoryId>

export async function deleteCategory(input: JustCategoryId) {
  const category = await prisma.category.findUnique({
    where: {
      id: input.id
    },
    select: {
      id: true
    }
  })

  if (!category) {
    return {
      error: "Not found",
      data: null
    }
  }

  await prisma.category.delete({
    where: {
      id: input.id
    }
  })

  return {
    error: null,
    data: "Category deleted successfully"
  }
}

const JustCategoryIdColor = Category.pick({ id: true, color: true })
type JustCategoryIdColor = z.infer<typeof JustCategoryIdColor>

export async function changeCategoryColor(input: JustCategoryIdColor) {
  const category = await prisma.category.update({
    where: {
      id: input.id
    },
    data: {
      color: input.color
    }
  })

  return {
    error: null,
    data: category
  }
}
