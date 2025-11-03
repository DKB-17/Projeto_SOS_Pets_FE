import axios, { type AxiosInstance } from "axios"
import type { RoleRequestDto } from "../types/role.type"

class RoleService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getRoles(): Promise<RoleRequestDto[]> {
    const response = await this.api.get<RoleRequestDto[]>("/roles")
    return response.data
  }

  async getRoleById(id: number): Promise<RoleRequestDto> {
    const response = await this.api.get<RoleRequestDto>(`/roles/${id}`)
    return response.data
  }

  async createRole(data: RoleRequestDto): Promise<RoleRequestDto> {
    const response = await this.api.post<RoleRequestDto>("/roles", data)
    return response.data
  }

  async updateRole(id: number, data: RoleRequestDto): Promise<RoleRequestDto> {
    const response = await this.api.put<RoleRequestDto>(`/roles/${id}`, data)
    return response.data
  }

  async deleteRole(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/roles/${id}`)
    return response.data
  }
}

export default new RoleService()
