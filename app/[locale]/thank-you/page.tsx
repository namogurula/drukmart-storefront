// app/[locale]/thank-you/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default function ThankYouPage() {
  const params = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    const id = params.get("order")
    setOrderId(id)

    const fetchSummary = async () => {
      if (!id) return
      const res = await fetch(`${API_URL}/items/orders/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      const data = await res.json()
      setSummary(data.data)
    }

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

    fetchSummary()
    clearCart()
  }, [params])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <h1 className="text-2xl font-bold text-green-700 mb-4">✅ Thank You!</h1>
      <p className="mb-2 text-lg">Your order has been placed successfully.</p>
      {orderId && (
        <p className="text-sm text-gray-600">Order ID: <strong>{orderId}</strong></p>
      )}
      {summary && (
        <div className="mt-4 text-sm text-left">
          <p className="font-medium mb-1 text-gray-700">Order Summary:</p>
          <ul className="list-disc list-inside text-gray-600">
            {summary.items?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: Nu. {summary.total}</p>
          {summary.delivery_method && (
            <p className="mt-2">Delivery Method: <strong>{summary.delivery_method}</strong></p>
          )}
        </div>
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
