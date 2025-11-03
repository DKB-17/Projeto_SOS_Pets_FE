import { Navigation } from "@/components/navigation"
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Heart, Users, DollarSign } from "lucide-react"

const newsItems = [
  {
    id: 1,
    title: "Successful Adoption Drive in Downtown",
    description:
      "Last weekend's adoption event was a huge success! We helped 12 rescued pets find their forever homes. Thank you to all the volunteers and adopters who made this possible.",
    date: "March 15, 2024",
    type: "news" as const,
    image: "/happy-adopted-dogs-with-families.jpg",
  },
  {
    id: 2,
    title: "Upcoming Vaccination Camp",
    description:
      "Join us on April 5th for a free vaccination camp for rescued animals. Our partner veterinarians will be providing essential vaccines and health checkups.",
    date: "April 5, 2024",
    type: "event" as const,
    image: "/veterinarian-with-pets.jpg",
  },
  {
    id: 3,
    title: "New Partnership with City Vet Clinic",
    description:
      "We're excited to announce our partnership with City Vet Clinic, who will be providing discounted medical care for all our rescued animals.",
    date: "March 10, 2024",
    type: "news" as const,
    image: "/veterinary-clinic-exterior.png",
  },
  {
    id: 4,
    title: "Volunteer Training Workshop",
    description:
      "Learn how to care for rescued animals and become part of our volunteer network. Workshop scheduled for April 12th at Community Center.",
    date: "April 12, 2024",
    type: "event" as const,
    image: "/people-training-with-animals.jpg",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-accent to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">Every Pet Deserves a Loving Home</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              We connect rescued animals with caring families through community support, volunteer networks, and
              compassionate care. Together, we make a difference.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Heart className="w-5 h-5" />
                Donate Now
              </Button>
              <Button size="lg" variant="outline">
                Become a Volunteer
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
              <div className="text-3xl font-bold text-foreground mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Pets Rescued</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Active Volunteers</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">$50K+</div>
              <div className="text-sm text-muted-foreground">Financial Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Latest News & Events</h2>
              <p className="text-muted-foreground">Stay updated with our rescue efforts and upcoming activities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
