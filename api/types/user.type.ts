export interface Role {
  id: number
  name: string
}

export interface UserRequestDto {
  id?: number
  name: string
  age?: string
  gender?: string
  cpf: string
  email?: string
  password?: string
  phone?: string
  role?: Role
}

export interface UserResponseDto {
  id: number
  name: string
  email?: string
  age?: string
  gender?: string
  phone?: string
  cpf: string
  role?: Role
}
