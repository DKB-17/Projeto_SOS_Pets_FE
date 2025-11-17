import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { PostRequestDto } from "@/api/types/post.type"
import { formatDate } from "@/api/utils/format-date"


export function PostCard({id, title, text, date, category, images }: PostRequestDto) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {images && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={images?.[0]?.path ?? "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-teal-600">{category.name}</Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(date)}</span>
          </div>
        </div>
        <CardTitle className="text-xl break-words">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed break-words">{text}</CardDescription>
      </CardContent>
    </Card>
  )
}
