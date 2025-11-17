"use client"

import { usePartners } from "@/api/hooks/usePartners"
import { PartnerResponseDto } from "@/api/types/partner.type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Globe } from "lucide-react"


export function VetPartners() {

  const { partners, loading, error } = usePartners()

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
          {partners.map((vet) => (
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
                  <span>{vet.siteUrl}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                <span className="font-medium">Especialidades:</span> {vet.specialties?.map(s => s.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
