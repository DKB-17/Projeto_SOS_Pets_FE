"use client"

import { Navigation } from "@/components/navigation"
import { StoryCard } from "@/components/story-card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useSuccessStories } from "@/api/hooks/useSuccessStories"

export default function SuccessStoriesPage() {
  const { stories, loading, error } = useSuccessStories()

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
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Success Stories</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Every adoption is a beautiful story of second chances and unconditional love. Read about the amazing
              journeys of our rescued pets and their new families.
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
                  <p className="text-muted-foreground">Loading stories...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-red-500">Error loading stories. Please try again later.</p>
                </div>
              ) : stories.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No success stories available yet.</p>
                </div>
              ) : (
                stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    petName={story.petName}
                    ownerName={story.ownerName}
                    story={story.text}
                    adoptionDate={story.date ? story.date : "" }
                    petType={story.petBreed}
                    image={story.images ? story.images[0].path : undefined}
                  />
                ))
              )}
            </div>

            {/* Call to Action */}
            <div className="bg-accent rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">Want to Share Your Story?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you've adopted a pet through our organization, we'd love to hear about your journey and share it with
                our community.
              </p>
              <Button size="lg" className="gap-2">
                <Heart className="w-5 h-5" />
                Submit Your Story
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
