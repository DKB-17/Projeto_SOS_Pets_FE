import type { Image } from "./image.type"

export interface SuccessStoryRequestDto {
  id?: number
  text: string
  date?: string
  petName: string
  ownerName: string
  petBreed: string
  images?: Image[]
}

export interface SuccessStoryResponseDto {
  id: number
  text: string
  date?: string
  petName: string
  ownerName: string
  petBreed: string
  images?: Image[]
}
