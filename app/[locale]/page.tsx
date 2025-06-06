"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"

type Product = {
  id: string
  name: string
  image?: string
}

export default function HomePage() {
  const { t } = useTranslation("common")
  const [products, setProducts] = useState<Product[]>([])
  const [countdown, setCountdown] = useState("")

  // 🟢 Countdown to this date
  const targetDate = new Date("2025-07-01T00:00:00")

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(interval)
        setCountdown("🎉 Offer expired!")
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* ✅ Hero image */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center mb-6 rounded-lg overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg"
          }}
        />
      </div>

      {/* ✅ Featured Slider */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">{t("featured")}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.slice(0, 6).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="min-w-[150px] bg-white rounded shadow text-center p-4 shrink-0"
            >
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                className="h-24 mx-auto object-contain mb-2"
              />
              <p className="text-sm">{product.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ Discount Countdown */}
      <div className="countdown mb-3 text-center">
        🕒 Discount ends in: {countdown}
      </div>

      {/* ✅ Discount Banners */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="relative overflow-hidden rounded-lg shadow">
          <img src="/discount10.jpg" alt="10% Off" className="w-full object-cover" />
          <span className="absolute top-4 left-4 bg-white px-2 py-1 text-sm font-semibold rounded shadow">
            10% Discount
          </span>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow">
          <img src="/discount25.jpg" alt="25% Off" className="w-full object-cover" />
          <span className="absolute top-4 left-4 bg-white px-2 py-1 text-sm font-semibold rounded shadow">
            25% Discount
          </span>
        </div>
      </section>
    </main>
  )
}
