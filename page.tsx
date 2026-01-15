"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plane, MapPin, Calendar, Search, Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const whatsappNumber = "5511999999999" // Substitua pelo número real do WhatsApp
  const instagramHandle = "seuinstagram" // Substitua pelo @ do Instagram
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-sky-600" />
            <h1 className="text-2xl font-bold text-sky-900">Via Altitude</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl font-bold text-sky-900 text-balance leading-tight">
            Voe Mais Alto com as Melhores Ofertas de Passagens
          </h2>
          <p className="text-xl text-slate-600 text-pretty">
            Especialistas em milhas e passagens aéreas. Pesquisamos simultaneamente em todas as companhias para você
            viajar mais pagando menos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="text-lg">
              <a href="#cotacao">Solicitar Cotação</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg bg-transparent">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                Fale Conosco
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
              <Search className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-sky-900">Busca Inteligente com Romario e Leticia</h3>
            <p className="text-slate-600">
              Pesquisamos em todas as principais companhias aéreas para encontrar o melhor preço para sua viagem.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-sky-900">Ofertas Exclusivas</h3>
            <p className="text-slate-600">
              Encontramos as melhores ofertas exclusivas e o melhor para você em todas as companhias aéreas.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-sky-900">O Melhor Para Você</h3>
            <p className="text-slate-600">
              Acompanhamos as melhores promoções e oportunidades do momento para você economizar.
            </p>
          </Card>
        </div>
      </section>

      {/* Airlines */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-sky-900 mb-12">Companhias Parceiras</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {["LATAM", "Tudo Azul", "Azul pelo Mundo", "Smiles", "Iberia", "Qatar", "Azul"].map((airline) => (
            <Card key={airline} className="p-6 flex items-center justify-center hover:shadow-md transition-shadow">
              <span className="font-semibold text-slate-700 text-center">{airline}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section id="cotacao" className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-8">
          <h3 className="text-3xl font-bold text-sky-900 mb-6 text-center">Solicite uma Cotação</h3>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault()
              setSubmitting(true)

              const formData = new FormData(e.currentTarget)
              const origem = formData.get("origem") as string
              const destino = formData.get("destino") as string
              const data = formData.get("data") as string
              const passageiros = formData.get("passageiros") as string
              const nome = formData.get("nome") as string
              const email = formData.get("email") as string
              const telefone = formData.get("telefone") as string

              const message =
                `Olá! Gostaria de uma cotação:\n\n` +
                `Nome: ${nome}\n` +
                `Email: ${email}\n` +
                `Telefone: ${telefone}\n\n` +
                `Origem: ${origem}\n` +
                `Destino: ${destino}\n` +
                `Data: ${data}\n` +
                `Passageiros: ${passageiros}`

              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
              window.open(whatsappUrl, "_blank")

              setSubmitting(false)
              ;(e.target as HTMLFormElement).reset()
            }}
          >
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium text-slate-700">
                Nome Completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="telefone" className="text-sm font-medium text-slate-700">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="origem" className="text-sm font-medium text-slate-700">
                  Origem
                </label>
                <input
                  id="origem"
                  name="origem"
                  type="text"
                  placeholder="Ex: São Paulo (GRU)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="destino" className="text-sm font-medium text-slate-700">
                  Destino
                </label>
                <input
                  id="destino"
                  name="destino"
                  type="text"
                  placeholder="Ex: Rio de Janeiro (GIG)"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="data" className="text-sm font-medium text-slate-700">
                  Data da Viagem
                </label>
                <input
                  id="data"
                  name="data"
                  type="date"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="passageiros" className="text-sm font-medium text-slate-700">
                  Passageiros
                </label>
                <input
                  id="passageiros"
                  name="passageiros"
                  type="number"
                  min="1"
                  placeholder="1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar Cotação via WhatsApp"}
            </Button>
          </form>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6" />
              <span className="font-semibold text-lg">Via Altitude</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-sky-200">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-sky-200">
                <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="text-center text-sky-200 text-sm mt-6">
            © 2025 Via Altitude. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
