import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { DonationOptions } from "@/components/donation-options"
import { VetPartners } from "@/components/vet-partners"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react"
import { usePartners } from "@/api/hooks/usePartners"


export default function ContactPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-accent to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Tem dúvidas sobre adoção, voluntariado ou doações? Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">https://www.sospetsassis.org</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-sm text-muted-foreground">(18) 99999-9999</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="font-semibold">Endereço</h3>
                    <p className="text-sm text-muted-foreground">Assis/SP</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="font-semibold">Funcionamento</h3>
                    <p className="text-sm text-muted-foreground">Segunda á Sexta: 9h-18h</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Contact Form */}
              <ContactForm />

              {/* Donation Options */}
              <DonationOptions />
            </div>

            {/* Vet Partners */}
            <div className="mb-12">
              <VetPartners/>
            </div>

            {/* Social Media & Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Acompanhe nossa rees sociais</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fique por dentro dos nossos resgates mais recentes, eventos de adoção e histórias de sucesso nas redes sociais.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.facebook.com/sospetsassis/?locale=pt_BR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-[#1877F2]" />
                      <span className="text-sm font-medium">Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/sos.pets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-[#E4405F]" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Outras Formas de Ajudar</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Voluntário em nossos eventos de adoção</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Seja abrigo um animal de estimação temporariamente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Doe suprimentos (alimentos, brinquedos, cobertores)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Compartilhe nossas postagens nas redes sociais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Patrocine os cuidados médicos de um animal de estimação</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
