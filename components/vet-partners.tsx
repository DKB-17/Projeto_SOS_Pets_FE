import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Globe } from "lucide-react"

const vetPartners = [
  {
    id: 1,
    name: "Caring Paws Veterinary Clinic",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    website: "www.caringpaws.com",
    specialties: "Emergency Care, Surgery",
  },
  {
    id: 2,
    name: "Happy Tails Animal Hospital",
    address: "456 Oak Avenue, Westside",
    phone: "(555) 234-5678",
    website: "www.happytails.com",
    specialties: "Dental, Wellness Exams",
  },
  {
    id: 3,
    name: "Pet Health Center",
    address: "789 Elm Road, Eastside",
    phone: "(555) 345-6789",
    website: "www.pethealthcenter.com",
    specialties: "Vaccinations, Spay/Neuter",
  },
  {
    id: 4,
    name: "Compassionate Care Vet",
    address: "321 Pine Street, Northside",
    phone: "(555) 456-7890",
    website: "www.compassionatecarevet.com",
    specialties: "Exotic Pets, Rehabilitation",
  },
]

export function VetPartners() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Veterinary Partners</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">
          We work with these trusted veterinary clinics to provide the best care for our rescued animals.
        </p>
        <div className="space-y-4">
          {vetPartners.map((vet) => (
            <div key={vet.id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{vet.name}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{vet.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{vet.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span>{vet.website}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                <span className="font-medium">Specialties:</span> {vet.specialties}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
