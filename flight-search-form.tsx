"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingDown, Loader2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import Image from "next/image"

const airlines = [
  { id: "latam", name: "LATAM", logo: "/latam-logo.jpg", website: "https://www.latamairlines.com/br/pt" },
  { id: "azul", name: "Azul", logo: "/azul-airlines-logo.png", website: "https://www.voeazul.com.br" },
  { id: "tudo-azul", name: "Tudo Azul", logo: "/tudoazul-logo.jpg", website: "https://www.tudoazul.com" },
  {
    id: "azul-pelo-mundo",
    name: "Azul pelo Mundo",
    logo: "/azul-pelo-mundo-logo.jpg",
    website: "https://azulpelomundo.voeazul.com.br/",
  },
  { id: "smiles", name: "Smiles", logo: "/smiles-logo.jpg", website: "https://www.smiles.com.br/home" },
  { id: "iberia", name: "Iberia", logo: "/iberia-airlines-logo.jpg", website: "https://www.iberia.com/br/" },
  {
    id: "qatar",
    name: "Qatar Airways",
    logo: "/qatar-airways-logo.png",
    website: "https://www.qatarairways.com/pt-br/homepage.html",
  },
]

export function FlightSearchForm() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [cheapest, setCheapest] = useState<{ cash: any; miles: any } | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResults([])
    setCheapest(null)

    try {
      const supabase = createBrowserClient()

      await supabase.from("flight_searches").insert({
        origin,
        destination,
        departure_date: date,
      })

      const { data: prices, error } = await supabase
        .from("flight_prices")
        .select(`
          *,
          airlines (name, code)
        `)
        .eq("origin", origin.toUpperCase())
        .eq("destination", destination.toUpperCase())
        .gte("departure_date", date)
        .order("price_brl", { ascending: true })

      if (error) throw error

      const priceData = prices || []
      setResults(priceData)

      if (priceData.length > 0) {
        const cheapestCash = priceData.reduce((min, curr) =>
          curr.price_brl && (!min.price_brl || curr.price_brl < min.price_brl) ? curr : min,
        )
        const cheapestMiles = priceData.reduce((min, curr) =>
          curr.miles_required && (!min.miles_required || curr.miles_required < min.miles_required) ? curr : min,
        )
        setCheapest({ cash: cheapestCash, miles: cheapestMiles })
      } else {
        setError("Nenhum voo encontrado para esta rota. Tente outra data ou aeroportos diferentes.")
      }
    } catch (err: any) {
      console.error("[v0] Erro na busca:", err)
      setError(err.message || "Erro ao realizar busca. Verifique a configuração do Supabase.")
    } finally {
      setLoading(false)
    }
  }

  const getAirlineLogo = (airlineCode: string) => {
    const airline = airlines.find((a) => a.id === airlineCode || a.name === airlineCode)
    return airline?.logo || "/placeholder.svg?height=40&width=80"
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-2xl text-sky-900">
            <Search className="h-6 w-6" />
            Busca Inteligente com Romario e Leticia
          </CardTitle>
          <CardDescription className="text-base text-slate-700 font-medium">
            Ofertas exclusivas e o melhor para você. Pesquisamos simultaneamente em 7 companhias aéreas: LATAM • Azul •
            Tudo Azul • Azul pelo Mundo • Smiles • Iberia • Qatar Airways
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border-2 border-sky-200">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">✈️ Nossas Companhias Parceiras</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {airlines.map((airline) => (
                <a
                  key={airline.id}
                  href={airline.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border-2 border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group"
                >
                  <div className="relative h-12 w-20 flex items-center justify-center">
                    <Image
                      src={airline.logo || "/placeholder.svg"}
                      alt={airline.name}
                      width={80}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-sky-600">{airline.name}</span>
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-3 text-center font-medium">
              🔍 Comparamos preços e milhas em todas essas companhias para você
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-base font-semibold text-slate-800">
                  ✈️ Origem (Aeroporto)
                </Label>
                <Input
                  id="origin"
                  placeholder="Ex: GRU, CGH, GIG"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="text-lg h-12 border-2"
                  required
                />
                <p className="text-xs text-slate-500">💡 Use o código IATA de 3 letras</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-base font-semibold text-slate-800">
                  🌍 Destino (Aeroporto)
                </Label>
                <Input
                  id="destination"
                  placeholder="Ex: MIA, LIS, MAD"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="text-lg h-12 border-2"
                  required
                />
                <p className="text-xs text-slate-500">💡 Use o código IATA de 3 letras</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-base font-semibold text-slate-800">
                📅 Data de Partida
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-lg h-12 border-2"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-700 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <strong>⚠️ Atenção:</strong> {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Pesquisando nas 7 companhias aéreas...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Melhor Preço em Todas as Companhias
                </>
              )}
            </Button>
          </form>

          {cheapest && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-green-900">
                    <TrendingDown className="h-5 w-5" />💰 Mais Barato em Dinheiro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative h-10 w-20 bg-white rounded border-2 border-green-300 flex items-center justify-center">
                      <Image
                        src={getAirlineLogo(cheapest.cash.airlines?.code) || "/placeholder.svg"}
                        alt={cheapest.cash.airlines?.name}
                        width={80}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="font-semibold text-green-900">{cheapest.cash.airlines?.name}</div>
                  </div>
                  <div className="text-4xl font-bold text-green-600">R$ {cheapest.cash.price_brl?.toFixed(2)}</div>
                  <p className="text-xs text-green-700 mt-2 font-medium">⭐ Melhor opção para pagamento em reais</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-900">
                    <TrendingDown className="h-5 w-5" />🎯 Menos Milhas Necessárias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative h-10 w-20 bg-white rounded border-2 border-amber-300 flex items-center justify-center">
                      <Image
                        src={getAirlineLogo(cheapest.miles.airlines?.code) || "/placeholder.svg"}
                        alt={cheapest.miles.airlines?.name}
                        width={80}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="font-semibold text-amber-900">{cheapest.miles.airlines?.name}</div>
                  </div>
                  <div className="text-4xl font-bold text-amber-600">
                    {cheapest.miles.miles_required?.toLocaleString()} milhas
                  </div>
                  <p className="text-xs text-amber-700 mt-2 font-medium">⭐ Melhor opção para resgate de milhas</p>
                </CardContent>
              </Card>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-lg border-2 border-sky-300">
                <h3 className="text-xl font-bold text-slate-900">📋 Comparação Completa de Todas as Companhias</h3>
                <span className="text-sm font-bold text-sky-700 bg-white px-4 py-2 rounded-full shadow-sm">
                  {results.length} voos disponíveis
                </span>
              </div>
              <div className="grid gap-4">
                {results.map((result, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all border-2 hover:border-sky-400 hover:scale-[1.01]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <a
                            href={airlines.find((a) => a.id === result.airlines?.code)?.website || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative h-14 w-28 bg-white rounded-lg border-2 border-slate-300 flex items-center justify-center shadow-sm hover:border-sky-400 hover:shadow-md transition-all"
                          >
                            <Image
                              src={getAirlineLogo(result.airlines?.code) || "/placeholder.svg"}
                              alt={result.airlines?.name}
                              width={112}
                              height={56}
                              className="object-contain p-1"
                            />
                          </a>
                          <div>
                            <div className="text-xl font-bold text-slate-900">{result.airlines?.name}</div>
                            <div className="text-sm text-slate-600 font-semibold bg-slate-100 px-3 py-1 rounded mt-1">
                              ✈️ {result.origin} → {result.destination}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-4 border-t-2 border-slate-200">
                        <div className="space-y-1 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
                          <div className="text-xs font-bold text-green-700 uppercase tracking-wide">
                            💵 Preço em Reais
                          </div>
                          <div className="text-3xl font-bold text-green-600">
                            {result.price_brl ? `R$ ${result.price_brl.toFixed(2)}` : "Indisponível"}
                          </div>
                        </div>
                        <div className="space-y-1 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg text-right border-2 border-amber-200">
                          <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                            🎫 Milhas Necessárias
                          </div>
                          <div className="text-3xl font-bold text-amber-600">
                            {result.miles_required ? `${result.miles_required.toLocaleString()}` : "Indisponível"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
