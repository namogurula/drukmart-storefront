/app/[locale]/page.tsx

"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "next-i18next"

export default function HomePage() {
  const { t } = useTranslation("common")

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* ✅ Hero Image with Fallback */}
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

      {/* ✅ Featured Slider (simple horizontal scroll) */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">{t("featured")}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[150px] bg-white rounded shadow text-center p-4 shrink-0"
            >
              <img
                src={`/products/sample${i}.jpg`}
                alt={`Product ${i}`}
                className="h-24 mx-auto object-contain mb-2"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
              />
              <p className="text-sm">Sample Product {i}</p>
            </div>
          ))}
        </div>
      </section>

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
