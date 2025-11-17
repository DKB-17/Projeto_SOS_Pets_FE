"use client"

import { useEffect, useState } from "react"
import successStoryService from "../services/success-story.service"
import type { SuccessStoryRequestDto, SuccessStoryResponseDto } from "../types/success-story.type"

interface UseSuccessStoriesReturn {
  stories: SuccessStoryResponseDto[]
  loading: boolean
  error: Error | null
}

export function useSuccessStories(): UseSuccessStoriesReturn {
  const [stories, setStories] = useState<SuccessStoryResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true)
        const data = await successStoryService.getSuccessStories()
        setStories(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch stories"))
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  return { stories, loading, error }
}

export function useSuccessStoryById(id: number) {
  const [story, setStory] = useState<SuccessStoryResponseDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true)
        const data = await successStoryService.getSuccessStoryById(id)
        setStory(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch story"))
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchStory()
  }, [id])

  return { story, loading, error }
}

export function useCreateSuccessStory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createStory = async (data: SuccessStoryRequestDto, images?: File[]) => {
    try {
      setLoading(true)
      setError(null)
      const newStory = await successStoryService.createSuccessStory(data, images)
      return newStory
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create story")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createStory, loading, error }
}

export function useUpdateSuccessStory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateStory = async (id: number, data: SuccessStoryRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const updatedStory = await successStoryService.updateSuccessStory(id, data)
      return updatedStory
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update story")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { updateStory, loading, error }
}

export function useDeleteSuccessStory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteStory = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const result = await successStoryService.deleteSuccessStory(id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete story")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { deleteStory, loading, error }
}
