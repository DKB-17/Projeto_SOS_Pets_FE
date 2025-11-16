import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Globe } from "lucide-react"

const vetPartners = [
  {
    id: 1,
    name: "Hospital Veterinário Vet House",
    address: "Av. Otto Ribeiro, 2318 - Jardim Canada",
    phone: "(18) 3322-3776",
    website: "www.vethouse.com",
    specialties: "Clínica Geral, Cirurgia, Emergência",
  },
  {
    "id": 2,
    "name": "Agropecuária Tuiuiú (Casa de Ração)",
    "address": "Av. Nove de Julho, 850 - Vila Xavier, Assis - SP",
    "phone": "(18) 3323-2020",
    "website": "www.tuiuiu.com",
    "specialties": "Rações, Acessórios, Medicamentos"
  },
  {
    "id": 3,
    "name": "Rei dos Animais Pet Shop (Casa de Ração)",
    "address": "R. Floriano Peixoto, 400 - Centro, Assis - SP",
    "phone": "(18) 3324-9090",
    "website": "www.reidosanimias.com",
    "specialties": "Rações, Banho e Tosa, Acessórios"
  },
  {
    "id": 4,
    "name": "Clínica Veterinária Animed",
    "address": "Av. Rui Barbosa, 1500 - Centro, Assis - SP",
    "phone": "(18) 3322-5678",
    "website": "www.animed.com",
    "specialties": "Clínica Geral, Dermatologia, Odontologia"
  }
]

export function VetPartners() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nossos Parceiros Veterinários</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">
          Trabalhamos com essas clínicas veterinárias de confiança para oferecer o melhor atendimento aos nossos animais resgatados.
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
                <span className="font-medium">Especialidades:</span> {vet.specialties}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
