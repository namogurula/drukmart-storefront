// app/[locale]/thank-you/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default function ThankYouPage() {
  const params = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    const id = params.get("order")
    setOrderId(id)

    const clearCart = async () => {
      const guest = localStorage.getItem("guest_token")
      if (!guest) return

      const sessionRes = await fetch(
        `${API_URL}/items/cart_sessions?filter[guest_token][_eq]=${guest}`,
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      )
      const data = await sessionRes.json()
      const sessionId = data.data?.[0]?.id

      if (sessionId) {
        await fetch(`${API_URL}/items/cart_items?filter[cart_session][_eq]=${sessionId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${TOKEN}` },
        })
      }
    }

    clearCart()
  }, [params])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <h1 className="text-2xl font-bold text-green-700 mb-4">✅ Thank You!</h1>
      <p className="mb-2 text-lg">Your order has been placed successfully.</p>
      {orderId && (
        <p className="text-sm text-gray-600">Order ID: <strong>{orderId}</strong></p>
      )}
      <a
        href="/"
        className="inline-block mt-6 text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Continue Shopping
      </a>
    </div>
  )
}
