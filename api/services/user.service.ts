import axios, { type AxiosInstance } from "axios"
import { getAuthToken } from "../utils/auth"
import type { UserRequestDto, UserResponseDto } from "../types/user.type"
import { headers } from "next/headers"

class UserService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  private getHeaders() {
    const token = getAuthToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const response = await this.api.get<UserResponseDto[]>("/users", {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const response = await this.api.get<UserResponseDto>(`/users/${id}`,{
      headers: this.getHeaders()
    })
    return response.data
  }

  async createUser(data: UserRequestDto): Promise<UserResponseDto> {
    const response = await this.api.post<UserResponseDto>("/users", data, {
        headers: this.getHeaders()
      }
    )
    return response.data
  }


  async deleteUser(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/users/${id}`)
    return response.data
  }
}

export default new UserService()
