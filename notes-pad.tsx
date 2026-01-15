"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { NotebookPen, Save } from "lucide-react"

export function NotesPad() {
  const [notes, setNotes] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedNotes = localStorage.getItem("via_altitude_notes")
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("via_altitude_notes", notes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <NotebookPen className="h-5 w-5" />
          Bloco de Notas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          placeholder="Anote aqui informações importantes, lembretes, observações sobre cotações..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[200px] resize-none"
        />
        <Button onClick={handleSave} className="w-full" variant={saved ? "default" : "outline"}>
          <Save className="h-4 w-4 mr-2" />
          {saved ? "Salvo!" : "Salvar Anotações"}
        </Button>
      </CardContent>
    </Card>
  )
}
