import axios, { type AxiosInstance } from "axios"
import type { PartnerRequestDto, PartnerResponseDto } from "../types/partner.type"

class PartnerService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getPartners(): Promise<PartnerResponseDto[]> {
    const response = await this.api.get<PartnerResponseDto[]>("/partners")
    return response.data
  }

  async getPartnerById(id: number): Promise<PartnerResponseDto> {
    const response = await this.api.get<PartnerResponseDto>(`/partners/${id}`)
    return response.data
  }

  async createPartner(data: PartnerRequestDto): Promise<PartnerResponseDto> {
    const response = await this.api.post<PartnerResponseDto>("/partners", data)
    return response.data
  }

  async updatePartner(id: number, data: PartnerRequestDto): Promise<PartnerResponseDto> {
    const response = await this.api.put<PartnerResponseDto>(`/partners/${id}`, data)
    return response.data
  }

  async deletePartner(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/partners/${id}`)
    return response.data
  }
}

export default new PartnerService()
