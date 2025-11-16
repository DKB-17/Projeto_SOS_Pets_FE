"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { getAuthToken } from "@/api/utils/auth"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/success-stories", label: "Historia de Sucesso" },
  { href: "/contact", label: "Contato e Doação" },
]

const authNavItems = [
  { href: "/", label: "Inicio" },
  { href: "/success-stories", label: "Historia de Sucesso" },
  { href: "/contact", label: "Contato e Doação" },
  { href: "/management", label: "Gerenciar" },
  { href: "/login", label: "Sair" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = getAuthToken()
    setIsAuthenticated(!!token)
  }, [pathname])

  const items = isAuthenticated ? authNavItems : navItems

  if (!mounted) return null

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Image src="/logo.png" alt="SOS PETS Assis/SP" width={40} height={40} />
            <span className="text-foreground">SOS PETS Assis/SP</span>
          </Link>

          <div className="flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
