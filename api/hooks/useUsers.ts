"use client"

import { useEffect, useState } from "react"
import userService from "../services/user.service"
import type { UserResponseDto, UserRequestDto } from "../types/user.type"

interface UseUsersReturn {
  users: UserResponseDto[]
  loading: boolean
  error: Error | null
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<UserResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await userService.getUsers()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch users"))
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}

export function useUserById(id: number) {
  const [user, setUser] = useState<UserResponseDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await userService.getUserById(id)
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch user"))
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchUser()
  }, [id])

  return { user, loading, error }
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createUser = async (data: UserRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const newUser = await userService.createUser(data)
      return newUser
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create user")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createUser, loading, error }
}

export function useDeleteUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteUser = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const result = await userService.deleteUser(id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete user")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { deleteUser, loading, error }
}
