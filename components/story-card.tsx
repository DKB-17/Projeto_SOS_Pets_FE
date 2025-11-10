import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar } from "lucide-react"

interface StoryCardProps {
  petName: string
  ownerName: string
  story: string
  adoptionDate: string
  image?: string
  videoUrl?: string
  petType: string
}

export function StoryCard({ petName, ownerName, story, adoptionDate, image, videoUrl, petType }: StoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden bg-muted relative">
        {videoUrl ? (
          <video src={videoUrl} controls className="w-full h-full object-cover">
            Seu navegador não suporta a tag de vídeo.
          </video>
        ) : (
          <img src={image || "/placeholder.svg"} alt={petName} className="w-full h-full object-cover" />
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {petType}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-foreground">{petName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{adoptionDate}</span>
          </div>
        </div>
        <CardTitle className="text-lg">Adotado por {ownerName}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">{story}</CardDescription>
      </CardContent>
    </Card>
  )
}
