import axios, { type AxiosInstance } from "axios"
import type { PostRequestDto } from "../types/post.type"

class PostService {
  private api: AxiosInstance

  constructor(baseURL = "http://localhost:8080") {
    this.api = axios.create({ baseURL })
  }

  async getPosts(): Promise<PostRequestDto[]> {
    const response = await this.api.get<PostRequestDto[]>("/posts")
    console.log("Fetched posts:", response.data);
    return response.data
  }

  async getPostById(id: number): Promise<PostRequestDto> {
    const response = await this.api.get<PostRequestDto>(`/posts/${id}`)
    return response.data
  }

  async createPost(data: PostRequestDto, images?: File[]): Promise<PostRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("text", data.text)
      formData.append("category", JSON.stringify(data.category))
      if (data.date) formData.append("date", data.date)
      
      images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await this.api.post<PostRequestDto>("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    }

    const response = await this.api.post<PostRequestDto>("/posts", data)
    return response.data
  }

  async updatePost(id: number, data: PostRequestDto, images?: File[]): Promise<PostRequestDto> {

    if (images && images.length > 0) {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("text", data.text)
      formData.append("category", JSON.stringify(data.category))
      if (data.date) formData.append("date", data.date)
      
      images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await this.api.put<PostRequestDto>(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    }

    const response = await this.api.put<PostRequestDto>(`/posts/${id}`, data)
    return response.data
  }

  async deletePost(id: number): Promise<string> {
    const response = await this.api.delete<string>(`/posts/${id}`)
    return response.data
  }
}

const postService = new PostService()
export { postService }
export default postService
