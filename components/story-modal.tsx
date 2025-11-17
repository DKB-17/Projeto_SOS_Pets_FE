"use client"

import { SuccessStoryRequestDto, SuccessStoryResponseDto } from "@/api/types/success-story.type"
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from "@/api/utils/format-date"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface StoryModalProps {
  story: SuccessStoryRequestDto
  isOpen: boolean
  onClose: () => void
}

export function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  if (!isOpen) return null

  const images = story.images || []
  const hasImages = images.length > 0
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6 text-slate-600" />
        </button>

        {/* Image Gallery with Navigation */}
        {hasImages && (
          <div className="w-full aspect-video bg-slate-200 overflow-hidden relative group">
            <img
              src={images[currentImageIndex].path || "/placeholder.svg"}
              alt={`${story.petName} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{story.petName}</h2>
              <p className="text-lg text-[#21A14A] font-semibold">Adotado por {story.ownerName}</p>
            </div>
            <Badge className="bg-teal-100 text-[#21A14A]">{story.petBreed}</Badge>
          </div>

          <div className="text-sm text-slate-500">
            {formatDate(story.date)}
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap break-words">
              {story.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
