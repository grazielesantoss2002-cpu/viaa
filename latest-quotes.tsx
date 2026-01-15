"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar } from "lucide-react"

export function LatestQuotes() {
  const quotes = [
    {
      id: 1,
      client: "João Silva",
      destination: "São Paulo → Miami",
      date: "15/01/2026",
      status: "Pendente",
    },
    {
      id: 2,
      client: "Maria Santos",
      destination: "Rio → Lisboa",
      date: "14/01/2026",
      status: "Respondido",
    },
    {
      id: 3,
      client: "Pedro Costa",
      destination: "Brasília → Paris",
      date: "13/01/2026",
      status: "Pendente",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          Últimas Cotações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-900">{quote.client}</div>
                  <div className="text-sm text-sky-700 font-medium">{quote.destination}</div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    quote.status === "Respondido" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {quote.status}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <Calendar className="h-3 w-3" />
                {quote.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
