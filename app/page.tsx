"use client"

import { Navigation } from "@/components/navigation"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Heart, Users, DollarSign } from "lucide-react"
import { usePosts } from "@/api/hooks/usePosts"

export default function HomePage() {
  const { posts, loading, error } = usePosts()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-accent to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">Todo animal de estimação merece um lar amoroso</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              Nossa missão é unir corações. Com a ajuda da comunidade e de voluntários incríveis, 
              encontramos lares cheios de amor para animais resgatados, cuidando de cada um com 
              muito carinho. Juntos, transformamos a vida deles e a nossa.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Heart className="w-5 h-5" />
                Doe agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">+500</div>
              <div className="text-sm text-muted-foreground">Animais resgatados</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">+150</div>
              <div className="text-sm text-muted-foreground">Voluntários ativos</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">+50mil</div>
              <div className="text-sm text-muted-foreground">Suporte financeiro</div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos e novidades */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Últimas notícias e eventos</h2>
              <p className="text-muted-foreground">Acompanhe de perto a nossa jornada! Siga-nos para conhecer as histórias emocionantes dos nossos resgates e fique por dentro de todas as novidades.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">Loading posts...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-red-500">Error loading posts. Please try again later.</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No posts available yet.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id ? post.id : 0}
                    title={post.title}
                    text={post.text}
                    date={post.date || new Date().toLocaleDateString()}
                    category={post.category}
                    images={post.images ? post.images : undefined}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
