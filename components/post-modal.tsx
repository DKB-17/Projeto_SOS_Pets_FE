"use client"

import { PostRequestDto } from "@/api/types/post.type"
import { X } from 'lucide-react'
import { formatDate } from "@/api/utils/format-date"
import { Badge } from "@/components/ui/badge"

interface PostModalProps {
  post: PostRequestDto
  isOpen: boolean
  onClose: () => void
}

export function PostModal({ post, isOpen, onClose }: PostModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6 text-slate-600" />
        </button>

        {/* Featured Image */}
        {post.images && post.images.length > 0 && (
          <div className="w-full aspect-video bg-slate-200 overflow-hidden">
            <img
              src={post.images[0].path || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-teal-600 hover:bg-teal-700">
              {post.category?.name || "Geral"}
            </Badge>
            <span className="text-sm text-slate-500">
              {formatDate(post.date)}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-balance mb-4">
              {post.title}
            </h2>
          </div>

          {/* Description/Text */}
          <div className="prose prose-sm max-w-none">
            <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap break-words">
              {post.text}
            </p>
          </div>

          {/* Additional Images Gallery */}
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              {post.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-slate-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={image.path || "/placeholder.svg"}
                    alt={`${post.title} - ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
