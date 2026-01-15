"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, Plane } from "lucide-react"

export function CurrentDeals() {
  const deals = [
    {
      id: 1,
      route: "São Paulo → Buenos Aires",
      price: "R$ 890",
      airline: "LATAM",
      discount: "35% OFF",
    },
    {
      id: 2,
      route: "Rio → Salvador",
      price: "R$ 450",
      airline: "Azul",
      discount: "40% OFF",
    },
    {
      id: 3,
      route: "Brasília → Fortaleza",
      price: "R$ 520",
      airline: "Smiles",
      discount: "28% OFF",
    },
    {
      id: 4,
      route: "São Paulo → Lisboa",
      price: "R$ 2.890",
      airline: "Qatar Airways",
      discount: "25% OFF",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingDown className="h-5 w-5 text-green-600" />
          Cotações do Momento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-2">
                  <Plane className="h-4 w-4 text-green-600 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">{deal.route}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{deal.airline}</div>
                  </div>
                </div>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {deal.discount}
                </span>
              </div>
              <div className="text-2xl font-bold text-green-700 mt-2">{deal.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
