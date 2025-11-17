'use client'

import { useEffect, useState } from 'react'
import categoryService from '../services/category.service'
import type { CategoryRequestDto } from '../types/category.type'

interface UseCategoriesReturn {
  categories: CategoryRequestDto[]
  loading: boolean
  error: Error | null
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<CategoryRequestDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await categoryService.getCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'))
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export function useCreateCategory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createCategory = async (data: CategoryRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const newCategory = await categoryService.createCategory(data)
      return newCategory
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create category')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createCategory, loading, error }
}

export function useUpdateCategory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateCategory = async (id: number, data: CategoryRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const updatedCategory = await categoryService.updateCategory(id, data)
      return updatedCategory
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update category')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { updateCategory, loading, error }
}

export function useDeleteCategory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteCategory = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const result = await categoryService.deleteCategory(id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete category')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { deleteCategory, loading, error }
}
