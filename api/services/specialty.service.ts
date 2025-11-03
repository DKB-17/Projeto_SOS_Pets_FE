import axios, { type AxiosInstance } from "axios"
import type { SpecialtyRequestDto } from "../types/specialty.type"

class SpecialtyService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getSpecialties(): Promise<SpecialtyRequestDto[]> {
    const response = await this.api.get<SpecialtyRequestDto[]>("/specialties")
    return response.data
  }

  async getSpecialtyById(id: number): Promise<SpecialtyRequestDto> {
    const response = await this.api.get<SpecialtyRequestDto>(`/specialties/${id}`)
    return response.data
  }

  async createSpecialty(data: SpecialtyRequestDto): Promise<SpecialtyRequestDto> {
    const response = await this.api.post<SpecialtyRequestDto>("/specialties", data)
    return response.data
  }

  async updateSpecialty(id: number, data: SpecialtyRequestDto): Promise<SpecialtyRequestDto> {
    const response = await this.api.put<SpecialtyRequestDto>(`/specialties/${id}`, data)
    return response.data
  }

  async deleteSpecialty(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/specialties/${id}`)
    return response.data
  }
}

export default new SpecialtyService()
