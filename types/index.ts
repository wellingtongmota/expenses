import { getUserTags } from "@/actions/tags"
import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise"

export type TTag = ReturnTypeWithoutPromise<typeof getUserTags>[0]

export type TBreadcrumb = {
  links?: {
    title: string
    url: string
  }[]
  page: {
    title: string
  }
}
