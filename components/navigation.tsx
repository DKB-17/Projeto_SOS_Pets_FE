"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getAuthToken } from "@/api/utils/auth"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/success-stories", label: "Histórias de sucesso" },
  { href: "/contact", label: "Contatos e Doações" }
]

const authNavItems = [
  { href: "/", label: "Inicio" },
  { href: "/success-stories", label: "Histórias de sucesso " },
  { href: "/contact", label: "Contatos e Doações" },
  { href: "/management", label: "Gerenciamento" },
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

          <Link href="/" className="flex items-center">
            <img 
              src="/logo.jpg" 
              alt="SOS Pets" 
              className="h-10 w-auto object-contain"
            />
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
