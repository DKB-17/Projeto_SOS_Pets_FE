"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Facebook, Instagram, Calendar, Trash2 } from "lucide-react"

interface ScheduledPost {
  id: number
  content: string
  platforms: string[]
  scheduledDate: string
  image?: string
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 1,
    content: "Join us this Saturday for our adoption event! Meet adorable pets looking for their forever homes.",
    platforms: ["facebook", "instagram"],
    scheduledDate: "2024-03-15 10:00 AM",
    image: "/adoption-event.jpg",
  },
  {
    id: 2,
    content: "Thank you to all our volunteers who helped at last week's fundraiser! Together we raised $5,000!",
    platforms: ["facebook"],
    scheduledDate: "2024-03-16 2:00 PM",
  },
]

export function ScheduledPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Scheduled Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockScheduledPosts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No scheduled posts</p>
        ) : (
          <div className="space-y-4">
            {mockScheduledPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <p className="text-sm line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="gap-1">
                          {platform === "facebook" ? (
                            <Facebook className="w-3 h-3" />
                          ) : (
                            <Instagram className="w-3 h-3" />
                          )}
                          {platform}
                        </Badge>
                      ))}
                      <span className="text-xs text-muted-foreground">{post.scheduledDate}</span>
                    </div>
                  </div>
                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post preview"
                      className="w-16 h-16 rounded object-cover"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
