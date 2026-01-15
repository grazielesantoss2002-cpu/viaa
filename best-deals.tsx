"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingDown, Plane, RefreshCw } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const airlines = [
  { id: "latam", name: "LATAM", logo: "/latam-logo.jpg" },
  { id: "azul", name: "Azul", logo: "/azul-airlines-logo.png" },
  { id: "tudo-azul", name: "Tudo Azul", logo: "/tudoazul-logo.jpg" },
  { id: "azul-pelo-mundo", name: "Azul pelo Mundo", logo: "/azul-pelo-mundo-logo.jpg" },
  { id: "smiles", name: "Smiles", logo: "/smiles-logo.jpg" },
  { id: "iberia", name: "Iberia", logo: "/iberia-airlines-logo.jpg" },
  { id: "qatar", name: "Qatar Airways", logo: "/qatar-airways-logo.png" },
]

export function BestDeals() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchDeals = async () => {
    setLoading(true)
    try {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from("flight_prices")
        .select(`
        *,
        airlines (name, code)
      `)
        .order("price_brl", { ascending: true })
        .limit(10)

      setDeals(data || [])
    } catch (err) {
      console.error("[v0] Erro ao carregar ofertas:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  const getAirlineLogo = (airlineCode: string) => {
    const airline = airlines.find((a) => a.id === airlineCode || a.name === airlineCode)
    return airline?.logo || "/placeholder.svg?height=32&width=64"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingDown className="h-6 w-6 text-green-600" />
              Voos Mais Baratos do Momento
            </CardTitle>
            <CardDescription className="mt-2">Top 10 melhores ofertas em tempo real</CardDescription>
          </div>
          <Button onClick={fetchDeals} disabled={loading} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deals.length === 0 ? (
            <p className="text-sm text-slate-600 text-center py-8">Nenhuma oferta disponível no momento</p>
          ) : (
            deals.map((deal, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm flex-shrink-0">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative h-10 w-20 bg-white rounded border border-green-200 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={getAirlineLogo(deal.airlines?.code) || "/placeholder.svg"}
                          alt={deal.airlines?.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="font-bold text-slate-900">{deal.airlines?.name}</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <Plane className="h-4 w-4" />
                      <span className="font-semibold">
                        {deal.origin} → {deal.destination}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-green-200">
                      <div>
                        <div className="text-xs text-slate-500 font-semibold mb-1">Preço</div>
                        <div className="text-2xl font-bold text-green-600">R$ {deal.price_brl?.toFixed(2)}</div>
                      </div>
                      {deal.miles_required && (
                        <div className="text-right">
                          <div className="text-xs text-slate-500 font-semibold mb-1">Milhas</div>
                          <div className="text-lg font-bold text-amber-600">{deal.miles_required.toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
