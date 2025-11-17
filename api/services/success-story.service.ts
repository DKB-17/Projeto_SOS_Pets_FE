import axios, { type AxiosInstance } from "axios"
import type { SuccessStoryRequestDto, SuccessStoryResponseDto } from "../types/success-story.type"

class SuccessStoryService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
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
      formData.append("text", data.text)
      formData.append("petName", data.petName)
      formData.append("ownerName", data.ownerName)
      formData.append("petBreed", data.petBreed)
      if (data.date) formData.append("date", data.date)
      
      images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await this.api.post<SuccessStoryRequestDto>("/successStories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    }

    const response = await this.api.post<SuccessStoryRequestDto>("/successStories", data)
    return response.data
  }

  async updateSuccessStory(id: number, data: SuccessStoryRequestDto, images?: File[]): Promise<SuccessStoryRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("text", data.text)
      formData.append("petName", data.petName)
      formData.append("ownerName", data.ownerName)
      formData.append("petBreed", data.petBreed)
      if (data.date) formData.append("date", data.date)
      
      images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await this.api.put<SuccessStoryRequestDto>(`/successStories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    }

    const response = await this.api.put<SuccessStoryRequestDto>(`/successStories/${id}`, data)
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
