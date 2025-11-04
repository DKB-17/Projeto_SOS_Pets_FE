import axios from "axios"
import { setAuthToken, getAuthToken } from "../utils/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, credentials)
      if (response.data.token) {
        setAuthToken(response.data.token)
      }
      return response.data
    } catch (error) {
      throw error instanceof Error ? error : new Error("Login failed")
    }
  }

  logout(): void {
    const token = getAuthToken()
    if (token) {
      document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax"
    }
  }

  getAuthHeader() {
    const token = getAuthToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

const authService = new AuthService()
export { authService }
export default authService
