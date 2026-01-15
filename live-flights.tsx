"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock } from "lucide-react"

export function LiveFlights() {
  const flights = [
    {
      id: 1,
      flight: "LA3090",
      airline: "LATAM",
      route: "GRU → EZE",
      departure: "14:30",
      status: "Disponível",
      seats: 12,
    },
    {
      id: 2,
      flight: "AD4521",
      airline: "Azul",
      route: "GIG → SSA",
      departure: "16:45",
      status: "Últimos Assentos",
      seats: 3,
    },
    {
      id: 3,
      flight: "QR8740",
      airline: "Qatar",
      route: "GRU → DOH",
      departure: "23:15",
      status: "Disponível",
      seats: 28,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-sky-600" />
          Voos do Momento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-sky-900">{flight.flight}</div>
                  <div className="text-xs text-slate-600">{flight.airline}</div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    flight.seats <= 5 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {flight.status}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">{flight.route}</div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Partida: {flight.departure}</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <AlertCircle className="h-3 w-3" />
                  {flight.seats} assentos
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
