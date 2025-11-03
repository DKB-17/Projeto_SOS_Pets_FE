import type { Image } from "./image.type"

export interface SuccessStoryRequestDto {
  id?: number
  title: string
  text: string
  date?: string
  petName: string
  petBreed: string
  images?: Image[]
}

export interface SuccessStoryResponseDto {
  id: number
  title: string
  text: string
  date?: string
  petName: string
  petBreed: string
  images?: Image[]
}
