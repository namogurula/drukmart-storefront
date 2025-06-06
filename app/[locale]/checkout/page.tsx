// app/[locale]/checkout/page.tsx
"use client"

import { useEffect, useState } from "react"
import { getGuestToken } from "@/utils/cart"
import { useRouter } from "next/navigation"

const CheckoutPage = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getGuestToken()
    fetch(`/api/cart?guest=${token}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [])

  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  const handleOrder = async () => {
    setLoading(true)
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: items }),
    })
    const data = await res.json()
    router.push(`/thank-you?order=${data.order_id}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Confirm Your Order</h1>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>
            {item.product?.name} x {item.quantity}
          </span>
          <span>
            Nu. {item.product?.price * item.quantity}
          </span>
        </div>
      ))}
      <div className="text-right font-bold mt-4 mb-6">
        Total: Nu. {total}
      </div>
      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  )
}

export default CheckoutPage
