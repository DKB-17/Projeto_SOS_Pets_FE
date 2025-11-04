import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { PostResponseDto } from "@/api/types/post.type"


export function PostCard({id, title, text, date, category, images }: PostResponseDto) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {images && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={images != null ? images[0].path : "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge>{category.name}</Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">{text}</CardDescription>
      </CardContent>
    </Card>
  )
}
