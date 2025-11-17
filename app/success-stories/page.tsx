"use client"

import { Navigation } from "@/components/navigation"
import { StoryCard } from "@/components/story-card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useSuccessStories } from "@/api/hooks/useSuccessStories"
import Link from "next/link"
import { SuccessStoryRequestDto, SuccessStoryResponseDto } from "@/api/types/success-story.type"
import { useState } from "react"
import { StoryModal } from "@/components/story-modal"
import { Footer } from "@/components/footer"

export default function SuccessStoriesPage() {
  const { stories, loading, error } = useSuccessStories()

  const [selectedStory, setSelectedStory] = useState<SuccessStoryResponseDto | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleStoryClick = (story: SuccessStoryResponseDto) => {
    setSelectedStory(story)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-b from-accent to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Heart className="w-8 h-8 fill-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Casos de sucesso</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Toda adoção é uma linda história de segundas chances e amor incondicional. 
              Leia sobre as incríveis histórias de nossos animais resgatados e suas novas famílias.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Carregando historias...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-red-500">Erro ao carregar historias. Por favor tente mais tarde.</p>
                </div>
              ) : stories.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Nenhuma historia de sucesso ainda.</p>
                </div>
              ) : (
                stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    id={story.id}
                    petName={story.petName}
                    ownerName={story.ownerName}
                    story={story.text}
                    adoptionDate={story.date ? story.date : "" }
                    petType={story.petBreed}
                    image={story?.images?.[0]?.path}
                    onClick={() => handleStoryClick(story)}
                  />
                ))
              )}
            </div>

            {/* Call to Action */}
            <div className="bg-accent rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">Quer Compartilhar Sua História?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Se você adotou um animal de estimação por meio de nossa organização, gostaríamos 
                muito de ouvir sobre sua jornada e compartilhá-la com nossa comunidade.
              </p>
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  <Heart className="w-5 h-5" />
                  Envie sua história
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedStory(null)
          }}
        />
      )}
      
    </div>
  )
}
