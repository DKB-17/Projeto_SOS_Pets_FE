"use client"

import { useEffect, useState } from "react"
import postService from "../services/post.service"
import type { PostRequestDto } from "../types/post.type"

interface UsePostsReturn {
  posts: PostRequestDto[]
  loading: boolean
  error: Error | null
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<PostRequestDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await postService.getPosts()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch posts"))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}

export function usePostById(id: number) {
  const [post, setPost] = useState<PostRequestDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await postService.getPostById(id)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch post"))
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  return { post, loading, error }
}

export function useCreatePost() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createPost = async (data: PostRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const newPost = await postService.createPost(data)
      return newPost
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create post")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createPost, loading, error }
}

export function useUpdatePost() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updatePost = async (id: number, data: PostRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const updatedPost = await postService.updatePost(id, data)
      return updatedPost
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update post")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { updatePost, loading, error }
}

export function useDeletePost() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deletePost = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const result = await postService.deletePost(id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete post")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { deletePost, loading, error }
}
