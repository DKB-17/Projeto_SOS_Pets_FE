import axios, { type AxiosInstance } from "axios"
import type { PostRequestDto } from "../types/post.type"
import { getAuthToken } from "../utils/auth"

class PostService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  private getHeaders() {
    const token = getAuthToken()    
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async getPosts(): Promise<PostRequestDto[]> {
    const response = await this.api.get<PostRequestDto[]>("/posts", {
      headers: this.getHeaders()
    })
    console.log("Fetched posts:", response.data);
    return response.data
  }

  async getPostById(id: number): Promise<PostRequestDto> {
    const response = await this.api.get<PostRequestDto>(`/posts/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async createPost(data: PostRequestDto, images?: File[]): Promise<PostRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("post", new Blob([JSON.stringify(data)], { type: "application/json" }))
  
      images.forEach((image) => {
        formData.append("files", image)
      })

      const response = await this.api.post<PostRequestDto>("/posts", formData, {
        headers: this.getHeaders(),
      })
      return response.data
    }

    const response = await this.api.post<PostRequestDto>("/posts", data, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async updatePost(id: number, data: PostRequestDto, images?: File[]): Promise<PostRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("post", new Blob([JSON.stringify(data)], { type: "application/json" }))
      
      images.forEach((image) => {
        formData.append("files", image)
      })

      const response = await this.api.put<PostRequestDto>(`/posts/${id}`, formData, {
        headers: this.getHeaders(),
      })
      return response.data
    }

    const response = await this.api.put<PostRequestDto>(`/posts/${id}`, data, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async deletePost(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/posts/${id}`, {
      headers: this.getHeaders()
    })
    return response.data
  }
}

const postService = new PostService()
export { postService }
export default postService
