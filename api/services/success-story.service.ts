import axios, { type AxiosInstance } from "axios"
import type { SuccessStoryRequestDto, SuccessStoryResponseDto } from "../types/success-story.type"
import { getAuthToken } from "../utils/auth"

class SuccessStoryService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  private getHeaders() {
      const token = getAuthToken()    
      return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async getSuccessStories(): Promise<SuccessStoryResponseDto[]> {
    const response = await this.api.get<SuccessStoryResponseDto[]>("/successStories")
    return response.data
  }

  async getSuccessStoryById(id: number): Promise<SuccessStoryResponseDto> {
    const response = await this.api.get<SuccessStoryResponseDto>(`/successStories/${id}`)
    return response.data
  }

  async createSuccessStory(data: SuccessStoryRequestDto, images?:File[]): Promise<SuccessStoryRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("story", new Blob([JSON.stringify(data)], { type: "application/json" }))
      
      images.forEach((image) => {
        formData.append("files", image)
      })

      const response = await this.api.post<SuccessStoryRequestDto>("/successStories", formData, {
        headers: this.getHeaders(),
      })
      return response.data
    }

    const response = await this.api.post<SuccessStoryRequestDto>("/successStories", data, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async updateSuccessStory(id: number, data: SuccessStoryRequestDto, images?: File[]): Promise<SuccessStoryRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("story", new Blob([JSON.stringify(data)], { type: "application/json" }))
      
      images.forEach((image) => {
        formData.append("files", image)
      })

      const response = await this.api.put<SuccessStoryRequestDto>(`/successStories/${id}`, formData, {
        headers: this.getHeaders(),
      })
      return response.data
    }

    const response = await this.api.put<SuccessStoryRequestDto>(`/successStories/${id}`, data, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async deleteSuccessStory(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/successStories/${id}`)
    return response.data
  }
}

const successStoryService = new SuccessStoryService()
export { successStoryService }
export default successStoryService
