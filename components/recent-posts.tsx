"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Facebook, Instagram, Heart, MessageCircle, Share2 } from "lucide-react"

interface RecentPost {
  id: number
  content: string
  platforms: string[]
  postedDate: string
  image?: string
  stats: {
    likes: number
    comments: number
    shares: number
  }
}

const mockRecentPosts: RecentPost[] = [
  {
    id: 1,
    content:
      "Meet Luna! This sweet 2-year-old cat is looking for a loving home. She's gentle, playful, and great with kids!",
    platforms: ["facebook", "instagram"],
    postedDate: "2 hours ago",
    image: "/cute-cat-luna.jpg",
    stats: { likes: 124, comments: 18, shares: 12 },
  },
  {
    id: 2,
    content: "Success story alert! Max found his forever home today! Thank you to everyone who shared his story.",
    platforms: ["facebook", "instagram"],
    postedDate: "5 hours ago",
    image: "/happy-adopted-dog.jpg",
    stats: { likes: 256, comments: 34, shares: 28 },
  },
  {
    id: 3,
    content:
      "Reminder: Our monthly adoption event is this Saturday from 10 AM to 4 PM. Come meet your new best friend!",
    platforms: ["facebook"],
    postedDate: "1 day ago",
    stats: { likes: 89, comments: 12, shares: 45 },
  },
]

export function RecentPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecentPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="gap-1">
                        {platform === "facebook" ? <Facebook className="w-3 h-3" /> : <Instagram className="w-3 h-3" />}
                        {platform}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">{post.postedDate}</span>
                  </div>
                  <p className="text-sm">{post.content}</p>
                </div>
                {post.image && (
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-20 h-20 rounded object-cover" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.stats.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span>{post.stats.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
