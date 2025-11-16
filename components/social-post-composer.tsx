"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialPostComposerProps {
  onPost?: (post: { content: string; platforms: string[]; image?: string }) => void
}

export function SocialPostComposer({ onPost }: SocialPostComposerProps) {
  const [content, setContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["facebook", "instagram"])
  const [imagePreview, setImagePreview] = useState<string>("")

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePost = () => {
    if (content.trim() && selectedPlatforms.length > 0) {
      onPost?.({ content, platforms: selectedPlatforms, image: imagePreview })
      setContent("")
      setImagePreview("")
    }
  }

  const characterCount = content.length
  const maxCharacters = 2200

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar nova postagem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platform Selection */}
        <div className="space-y-2">
          <Label>Selecione a plataformas</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={selectedPlatforms.includes("facebook") ? "default" : "outline"}
              size="sm"
              onClick={() => togglePlatform("facebook")}
              className="gap-2"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </Button>
            <Button
              type="button"
              variant={selectedPlatforms.includes("instagram") ? "default" : "outline"}
              size="sm"
              onClick={() => togglePlatform("instagram")}
              className="gap-2"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </Button>
          </div>
        </div>

        {/* Content Input */}
        <div className="space-y-2">
          <Label htmlFor="post-content">Postar conteúdo</Label>
          <Textarea
            id="post-content"
            placeholder="Share your message with the community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="resize-none"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Escreva uma postagem interessante sobre adoções, eventos ou histórias de sucesso.</span>
            <span className={cn(characterCount > maxCharacters && "text-destructive")}>
              {characterCount}/{maxCharacters}
            </span>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="post-image">Adicionar imagem (opcional)</Label>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <label htmlFor="post-image" className="cursor-pointer">
                <ImageIcon className="w-4 h-4" />
                Carregar imagem
                <input id="post-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </Button>
            {imagePreview && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setImagePreview("")} className="gap-2">
                <X className="w-4 h-4" />
                Remover
              </Button>
            )}
          </div>
          {imagePreview && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Post Button */}
        <Button
          onClick={handlePost}
          disabled={!content.trim() || selectedPlatforms.length === 0 || characterCount > maxCharacters}
          className="w-full"
          size="lg"
        >
          Postar em {selectedPlatforms.length} Plataforma{selectedPlatforms.length !== 1 ? "s" : ""}
        </Button>
      </CardContent>
    </Card>
  )
}
