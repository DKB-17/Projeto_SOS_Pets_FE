import axios, { type AxiosInstance } from "axios"
import type { UserRequestDto, UserResponseDto } from "../types/user.type"

class UserService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const response = await this.api.get<UserResponseDto[]>("/users")
    return response.data
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const response = await this.api.get<UserResponseDto>(`/users/${id}`)
    return response.data
  }

  async createUser(data: UserRequestDto): Promise<UserResponseDto> {
    const response = await this.api.post<UserResponseDto>("/users", data)
    return response.data
  }

  async updateUser(id: number, data: UserRequestDto): Promise<UserResponseDto> {
    const response = await this.api.put<UserResponseDto>(`/users/${id}`, data)
    return response.data
  }

  async deleteUser(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/users/${id}`)
    return response.data
  }
}

export default new UserService()
