import { Navigation } from "@/components/navigation"
import { StoryCard } from "@/components/story-card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const successStories = [
  {
    id: 1,
    petName: "Max",
    ownerName: "Sarah Johnson",
    story:
      "Max was found abandoned on the streets, scared and malnourished. After months of rehabilitation, he found his forever home with me. Now he's the happiest dog, full of energy and love. He's become my best friend and I can't imagine life without him!",
    adoptionDate: "January 2024",
    petType: "Dog",
    image: "/happy-dog-max-with-owner.jpg",
  },
  {
    id: 2,
    petName: "Luna",
    ownerName: "Michael Chen",
    story:
      "Luna was rescued from a difficult situation and was very timid at first. With patience and love, she's blossomed into the most affectionate cat. She follows me everywhere and purrs constantly. Adopting her was the best decision I ever made.",
    adoptionDate: "February 2024",
    petType: "Cat",
    image: "/cat-luna-with-owner.jpg",
  },
  {
    id: 3,
    petName: "Buddy",
    ownerName: "The Martinez Family",
    story:
      "Buddy came into our lives when our kids were asking for a pet. He was a rescue who needed a loving family, and we needed him just as much. He's brought so much joy to our home and taught our children about compassion and responsibility.",
    adoptionDate: "December 2023",
    petType: "Dog",
    image: "/family-with-dog-buddy.jpg",
  },
  {
    id: 4,
    petName: "Whiskers",
    ownerName: "Emma Thompson",
    story:
      "I adopted Whiskers when I was going through a tough time. This sweet senior cat has been my companion through everything. Despite his age, he's playful and loving. Senior pets deserve love too, and Whiskers has given me so much more than I could give him.",
    adoptionDate: "November 2023",
    petType: "Cat",
    image: "/senior-cat-whiskers.jpg",
  },
  {
    id: 5,
    petName: "Rocky",
    ownerName: "David Park",
    story:
      "Rocky was labeled as 'difficult to adopt' because of his high energy. But that's exactly what I was looking for! He's my running partner, my hiking buddy, and my loyal companion. Every rescue dog just needs the right match.",
    adoptionDate: "March 2024",
    petType: "Dog",
    image: "/energetic-dog-rocky.jpg",
  },
  {
    id: 6,
    petName: "Mittens",
    ownerName: "Lisa Anderson",
    story:
      "Mittens was found as a tiny kitten, barely surviving. The rescue team nursed her back to health, and when I saw her, it was love at first sight. She's now a healthy, happy cat who loves to play and cuddle. Thank you for saving her life!",
    adoptionDate: "January 2024",
    petType: "Cat",
    image: "/kitten-mittens-playing.jpg",
  },
]

export default function SuccessStoriesPage() {
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
              {successStories.map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
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
