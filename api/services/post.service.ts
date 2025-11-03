import axios, { type AxiosInstance } from "axios"
import type { PostRequestDto } from "../types/post.type"

class PostService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getPosts(): Promise<PostRequestDto[]> {
    const response = await this.api.get<PostRequestDto[]>("/posts")
    return response.data
  }

  async getPostById(id: number): Promise<PostRequestDto> {
    const response = await this.api.get<PostRequestDto>(`/posts/${id}`)
    return response.data
  }

  async createPost(data: PostRequestDto): Promise<PostRequestDto> {
    const response = await this.api.post<PostRequestDto>("/posts", data)
    return response.data
  }

  async updatePost(id: number, data: PostRequestDto): Promise<PostRequestDto> {
    const response = await this.api.put<PostRequestDto>(`/posts/${id}`, data)
    return response.data
  }

  async deletePost(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/posts/${id}`)
    return response.data
  }
}

export default new PostService()
