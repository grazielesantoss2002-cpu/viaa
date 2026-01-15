"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

export function RecentSearches() {
  const [searches, setSearches] = useState<any[]>([])

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const supabase = createBrowserClient()
        const { data } = await supabase
          .from("flight_searches")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5)

        setSearches(data || [])
      } catch (err) {
        console.error("[v0] Erro ao carregar pesquisas recentes:", err)
      }
    }

    fetchSearches()
  }, [])

  if (searches.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-4 w-4" />
          Pesquisas Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {searches.map((search) => (
            <div key={search.id} className="p-3 bg-slate-50 rounded-md text-sm">
              <div className="font-medium text-slate-900">
                {search.origin} → {search.destination}
              </div>
              <div className="text-slate-600">
                {new Date(search.departure_date).toLocaleDateString("pt-BR")} •
                {search.search_type === "cash" ? " Dinheiro" : " Milhas"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
