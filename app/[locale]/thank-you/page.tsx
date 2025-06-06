// app/[locale]/thank-you/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ThankYouPage() {
  const params = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    const id = params.get("order")
    setOrderId(id)
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
