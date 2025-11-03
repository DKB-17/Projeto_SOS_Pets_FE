"use client"

import { useEffect, useState } from "react"
import partnerService from "../services/partner.service"
import type { PartnerResponseDto, PartnerRequestDto } from "../types/partner.type"

interface UsePartnersReturn {
  partners: PartnerResponseDto[]
  loading: boolean
  error: Error | null
}

export function usePartners(): UsePartnersReturn {
  const [partners, setPartners] = useState<PartnerResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true)
        const data = await partnerService.getPartners()
        setPartners(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch partners"))
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  return { partners, loading, error }
}

export function usePartnerById(id: number) {
  const [partner, setPartner] = useState<PartnerResponseDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        setLoading(true)
        const data = await partnerService.getPartnerById(id)
        setPartner(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch partner"))
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPartner()
  }, [id])

  return { partner, loading, error }
}

export function useCreatePartner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createPartner = async (data: PartnerRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const newPartner = await partnerService.createPartner(data)
      return newPartner
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create partner")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createPartner, loading, error }
}

export function useUpdatePartner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updatePartner = async (id: number, data: PartnerRequestDto) => {
    try {
      setLoading(true)
      setError(null)
      const updatedPartner = await partnerService.updatePartner(id, data)
      return updatedPartner
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update partner")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { updatePartner, loading, error }
}

export function useDeletePartner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deletePartner = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const result = await partnerService.deletePartner(id)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete partner")
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { deletePartner, loading, error }
}
