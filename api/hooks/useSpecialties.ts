'use client'

import { useEffect, useState } from 'react'
import specialtyService from '../services/specialty.service'
import type { Specialty } from '../types/specialty.type'

interface UseSpecialtiesReturn {
  specialties: Specialty[]
  loading: boolean
  error: Error | null
}

export function useSpecialties(): UseSpecialtiesReturn {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true)
        const data = await specialtyService.getSpecialties()
        setSpecialties(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch specialties'))
      } finally {
        setLoading(false)
      }
    }

    fetchSpecialties()
  }, [])

  return { specialties, loading, error }
}

export function useCreateSpecialty() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createSpecialty = async (data: Specialty) => {
    try {
      setLoading(true)
      setError(null)
      const newSpecialty = await specialtyService.createSpecialty(data)
      return newSpecialty
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create specialty')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createSpecialty, loading, error }
}

export function useUpdateSpecialty() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateSpecialty = async (id: number, data: Specialty) => {
    try {
      setLoading(true)
      setError(null)
      const updatedSpecialty = await specialtyService.updateSpecialty(id, data)
      return updatedSpecialty
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update specialty')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { updateSpecialty, loading, error }
}

export function useDeleteSpecialty() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteSpecialty = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const result = await specialtyService.deleteSpecialty(id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete specialty')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { deleteSpecialty, loading, error }
}
