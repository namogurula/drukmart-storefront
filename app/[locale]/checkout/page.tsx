// app/[locale]/checkout/page.tsx
"use client"

import { useEffect, useState } from "react"
import { getGuestToken } from "@/utils/cart"
import { useRouter } from "next/navigation"

const CheckoutPage = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [delivery, setDelivery] = useState("store")
  const router = useRouter()

  useEffect(() => {
    const token = getGuestToken()
    fetch(`/api/cart?guest=${token}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [])

  const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const deliveryFee = delivery === "home" ? (subtotal >= 2999 ? 0 : 20) : 0
  const total = subtotal + deliveryFee

  const handleOrder = async () => {
    setLoading(true)
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: items, delivery_method: delivery, total }),
    })
    const data = await res.json()
    router.push(`/thank-you?order=${data.order_id}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Confirm Your Order</h1>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.product?.name} x {item.quantity}</span>
          <span>Nu. {item.product?.price * item.quantity}</span>
        </div>
      ))}

      <div className="mt-4">
        <p className="font-medium mb-2">Choose Delivery Method:</p>
        <label className="block mb-1">
          <input type="radio" name="delivery" value="store" checked={delivery === "store"} onChange={() => setDelivery("store")} />
          <span className="ml-2">🏪 Store Pickup (Free)</span>
        </label>
        <label>
          <input type="radio" name="delivery" value="home" checked={delivery === "home"} onChange={() => setDelivery("home")} />
          <span className="ml-2">🏠 Home Delivery (Nu. {subtotal >= 2999 ? "0" : "20"})</span>
        </label>
      </div>

      <div className="text-right font-bold mt-6 mb-6">
        Subtotal: Nu. {subtotal}<br />
        Delivery: Nu. {deliveryFee}<br />
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
