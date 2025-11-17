"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CreditCard, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

const donationAmounts = [10, 25, 50, 100, 250, 500]
const CNPJ = "21.139.000/0001-47" 

export function DonationOptions() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState("")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CNPJ)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDonate = () => {
    const amount = customAmount || selectedAmount
    console.log("[v0] Donation initiated:", amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-destructive" />
          Faça uma doação
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Sua doação nos ajuda a resgatar, reabilitar e encontrar lares amorosos para animais necessitados. 
          Cada contribuição faz a diferença!
        </p>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="/donation-qrcode.png" 
            alt="QR Code para doação" 
            className="w-48 h-48 rounded-md border"
          />

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-medium">{CNPJ}</span>
            <Button size="icon" variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {copied && (
            <p className="text-xs text-green-600">CNPJ copiado!</p>
          )}
        </div>

      </CardContent>
    </Card>
  )
}
