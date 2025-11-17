import axios, { type AxiosInstance } from "axios"
import type { PartnerRequestDto, PartnerResponseDto } from "../types/partner.type"
import { getAuthToken } from "../utils/auth"

class PartnerService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  private getHeaders() {
        const token = getAuthToken()    
        return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async getPartners(): Promise<PartnerResponseDto[]> {
    const response = await this.api.get<PartnerResponseDto[]>("/partners", {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getPartnerById(id: number): Promise<PartnerResponseDto> {
    const response = await this.api.get<PartnerResponseDto>(`/partners/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async createPartner(data: PartnerRequestDto): Promise<PartnerResponseDto> {
    const response = await this.api.post<PartnerResponseDto>("/partners", data, {
        headers: this.getHeaders()
    })
    return response.data
  }

  async updatePartner(id: number, data: PartnerRequestDto): Promise<PartnerResponseDto> {
    const response = await this.api.put<PartnerResponseDto>(`/partners/${id}`, data, {
        headers: this.getHeaders()
    })
    return response.data
  }

  async deletePartner(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/partners/${id}`, {
      headers: this.getHeaders()
    }
    )
    return response.data
  }
}

export default new PartnerService()
