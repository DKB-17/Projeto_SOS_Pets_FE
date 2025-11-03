"use client"

import { Navigation } from "@/components/navigation"
import { SocialPostComposer } from "@/components/social-post-composer"
import { ScheduledPosts } from "@/components/scheduled-posts"
import { RecentPosts } from "@/components/recent-posts"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, TrendingUp, Users } from "lucide-react"

export default function SocialMediaPage() {
  const handlePost = (post: { content: string; platforms: string[]; image?: string }) => {
    console.log("[v0] New post created:", post)
    // In a real app, this would send to an API
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-accent to-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">Social Media Manager</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Manage your Facebook and Instagram posts from one central dashboard
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Followers</p>
                      <p className="text-2xl font-bold">12,458</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Facebook</p>
                      <p className="text-2xl font-bold">8,234</p>
                    </div>
                    <Facebook className="w-8 h-8 text-[#1877F2]" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <p className="text-2xl font-bold">4,224</p>
                    </div>
                    <Instagram className="w-8 h-8 text-[#E4405F]" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="text-2xl font-bold">+24%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <SocialPostComposer onPost={handlePost} />
                <ScheduledPosts />
              </div>

              {/* Right Column */}
              <div>
                <RecentPosts />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
