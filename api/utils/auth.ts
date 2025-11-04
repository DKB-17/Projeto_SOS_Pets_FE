import { jwtDecode } from "jwt-decode"

interface TokenPayload {
  iss: string
  sub: string
  exp: number
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "auth_token") {
        return decodeURIComponent(value)
      }
    }
  }
  return null
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax"
  }
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(token)
    return decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}

export function getUserEmailFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<TokenPayload>(token)
    return decoded.sub || null
  } catch {
    return null
  }
}
