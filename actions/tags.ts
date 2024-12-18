"use server"

import { auth } from "@/auth"
import { Tag } from "@/schemas/database-tables"
import { prisma } from "@/services/database"
import { z } from "zod"

export async function getUserTags() {
  const session = await auth()

  const tags = await prisma.tag.findMany({
    where: {
      userId: session?.user?.id
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return tags
}

const JustTagId = Tag.pick({ id: true })
type JustTagId = z.infer<typeof JustTagId>

export async function deleteTag(input: JustTagId) {
  const tag = await prisma.tag.findUnique({
    where: {
      id: input.id
    },
    select: {
      id: true
    }
  })

  if (!tag) {
    return {
      error: "Not found",
      data: null
    }
  }

  await prisma.tag.delete({
    where: {
      id: input.id
    }
  })

  return {
    error: null,
    data: "Tag deleted successfully"
  }
}

const JustTagIdColor = Tag.pick({ id: true, color: true })
type JustTagIdColor = z.infer<typeof JustTagIdColor>

export async function changeTagColor(input: JustTagIdColor) {
  const contact = await prisma.tag.update({
    where: {
      id: input.id
    },
    data: {
      color: input.color
    }
  })

  return {
    error: null,
    data: contact
  }
}
