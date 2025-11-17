import axios, { type AxiosInstance } from "axios"
import type { CategoryRequestDto } from "../types/category.type"
import { getAuthToken } from "../utils/auth"

class CategoryService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  private getHeaders() {
        const token = getAuthToken()    
        return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async getCategories(): Promise<CategoryRequestDto[]> {
    const response = await this.api.get<CategoryRequestDto[]>("/categories", {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getCategoryById(id: number): Promise<CategoryRequestDto> {
    const response = await this.api.get<CategoryRequestDto>(`/categories/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async createCategory(data: CategoryRequestDto): Promise<CategoryRequestDto> {
    const response = await this.api.post<CategoryRequestDto>("/categories", data, {
        headers: this.getHeaders()
    })
    return response.data
  }

  async updateCategory(id: number, data: CategoryRequestDto): Promise<CategoryRequestDto> {
    const response = await this.api.put<CategoryRequestDto>(`/categories/${id}`, data, {
        headers: this.getHeaders()
    })
    return response.data
  }

  async deleteCategory(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/categories/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }
}

export default new CategoryService()
