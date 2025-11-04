import axios, { type AxiosInstance } from "axios"
import type { SuccessStoryRequestDto } from "../types/success-story.type"

class SuccessStoryService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getSuccessStories(): Promise<SuccessStoryRequestDto[]> {
    const response = await this.api.get<SuccessStoryRequestDto[]>("/successStories")
    return response.data
  }

  async getSuccessStoryById(id: number): Promise<SuccessStoryRequestDto> {
    const response = await this.api.get<SuccessStoryRequestDto>(`/successStories/${id}`)
    return response.data
  }

  async createSuccessStory(data: SuccessStoryRequestDto): Promise<SuccessStoryRequestDto> {
    const response = await this.api.post<SuccessStoryRequestDto>("/successStories", data)
    return response.data
  }

  async updateSuccessStory(id: number, data: SuccessStoryRequestDto): Promise<SuccessStoryRequestDto> {
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
