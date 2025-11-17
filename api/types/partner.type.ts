import { Specialty } from "./specialty.type"

export interface PartnerRequestDto {
  id?: number
  name: string
  address: string
  phone: string
  email?: string
  siteUrl?: string
  specialties?: Specialty[]
}

export interface PartnerResponseDto {
  id: number
  name: string
  address: string
  phone: string
  email?: string
  siteUrl?: string
  specialties?: Specialty[]
}
