export interface Specialty {
  id: number
  name: string
}

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
