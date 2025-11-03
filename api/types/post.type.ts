import type { Image } from "./image.type"
import type { CategoryRequestDto } from "./category.type"

export interface PostRequestDto {
  id?: number
  title: string
  text: string
  category: CategoryRequestDto
  date?: string
  images?: Image[]
}

export interface PostResponseDto {
  id: number
  title: string
  text: string
  category: CategoryRequestDto
  date?: string
  images?: Image[]
}
