"use client"

import { useState } from "react"
import { Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void
  maxImages?: number
}

export function ImageUpload({ onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/png"]
      return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024
    })

    if (validFiles.length + selectedFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    const newFiles = [...selectedFiles, ...validFiles]
    setSelectedFiles(newFiles)
    onImagesChange(newFiles)

    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviews((prev) => [...prev, event.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
    onImagesChange(newFiles)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="images">Upload Images (JPG or PNG)</Label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">JPG or PNG (Max 5MB each)</p>
            </div>
            <input
              id="images"
              type="file"
              multiple
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="space-y-2">
          <Label>Preview ({previews.length}/{maxImages})</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img src={preview || "/placeholder.svg"} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
