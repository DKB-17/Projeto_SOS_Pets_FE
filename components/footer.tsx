'use client'

import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Clock } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#21A14A] text-white">
      {/* Main Footer Content */}
      <div className="border-t border-[#6BCF84]">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">SOS Pets</h3>
                <p className="text-white text-sm">
                  Resgatando vidas, transformando comunidades através do amor e compaixão pelos animais.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-white hover:text-white transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white hover:text-white transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Links Rápidos</h4>
              <ul className="space-y-2 text-white">
                <li><Link href="/" className="hover:text-white transition text-sm">Início</Link></li>
                <li><Link href="/success-stories" className="hover:text-white transition text-sm">Histórias de Sucesso</Link></li>
                <li><Link href="/contact" className="hover:text-white transition text-sm">Contato</Link></li>
                <li><Link href="/login" className="hover:text-white transition text-sm">Gerenciamento</Link></li>
              </ul>
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Localização</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <div className="text-white">
                    <p className="font-medium text-white mb-1">Sede Principal</p>
                    <p>Rua das Patas, 123</p>
                    <p>São Paulo, SP - 01234-567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Contato</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-white flex-shrink-0" />
                  <div>
                    <p className="text-white">(11) 3456-7890</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-white flex-shrink-0" />
                  <div>
                    <p className="text-white">contato@sospets.org.br</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-white flex-shrink-0" />
                  <div>
                    <p className="text-white">Seg-Sex: 9h-17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#6BCF84] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white text-sm">
            <p>
              © {currentYear} SOS Pets. Todos os direitos reservados. CNPJ: 12.345.678/0001-90
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition text-sm">Política de Privacidade</Link>
              <Link href="#" className="hover:text-white transition text-sm">Termos de Uso</Link>
              <Link href="#" className="hover:text-white transition text-sm">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
