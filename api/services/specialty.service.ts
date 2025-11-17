import axios, { type AxiosInstance } from "axios"
import type { Specialty } from "../types/specialty.type"
import { getAuthToken } from "../utils/auth"

class SpecialtyService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  private getHeaders() {
          const token = getAuthToken()    
          return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async getSpecialties(): Promise<Specialty[]> {
    const response = await this.api.get<Specialty[]>("/specialties", {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getSpecialtyById(id: number): Promise<Specialty> {
    const response = await this.api.get<Specialty>(`/specialties/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async createSpecialty(data: Specialty): Promise<Specialty> {
    const response = await this.api.post<Specialty>("/specialties", data, {
        headers: this.getHeaders()
    })
    return response.data
  }

  async updateSpecialty(id: number, data: Specialty): Promise<Specialty> {
    const response = await this.api.put<Specialty>(`/specialties/${id}`, data, {
        headers: this.getHeaders()
    })
    return response.data
  }

  async deleteSpecialty(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/specialties/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }
}

export default new SpecialtyService()
