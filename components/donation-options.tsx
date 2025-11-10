"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const donationAmounts = [10, 25, 50, 100, 250, 500]

export function DonationOptions() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState("")

  const handleDonate = () => {
    const amount = customAmount || selectedAmount
    console.log("[v0] Donation initiated:", amount)
    alert(`Thank you for your donation of $${amount}!`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Faça uma doação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Sua doação nos ajuda a resgatar, reabilitar e encontrar lares amorosos para animais necessitados. 
          Cada contribuição faz a diferença!
        </p>

        {/* Preset Amounts */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Selecione o valor</p>
          <div className="grid grid-cols-3 gap-2">
            {donationAmounts.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount("")
                }}
                className={cn(
                  selectedAmount === amount && !customAmount ? "bg-primary text-primary-foreground" : "bg-transparent",
                )}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Ou insira um valor personalizado</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              placeholder="0"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm ring-offset-background",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
              min="1"
            />
          </div>
        </div>

        {/* Donate Button */}
        <Button onClick={handleDonate} disabled={!selectedAmount && !customAmount} className="w-full gap-2" size="lg">
          <CreditCard className="w-4 h-4" />
          Doe ${customAmount || selectedAmount || 0}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Processamento de pagamento seguro. Nenhum dado de cartão de crédito é armazenado em nossos servidores.
        </p>
      </CardContent>
    </Card>
  )
}
