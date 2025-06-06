// app/[locale]/checkout/page.tsx
//import { getGuestToken } from "@/utils/cart"

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [deliveryFee, setDeliveryFee] = useState(0)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data))
  }, [])

  useEffect(() => {
    if (deliveryMethod === "home") {
      setDeliveryFee(subtotal >= 2999 ? 0 : 20)
    } else {
      setDeliveryFee(0)
    }
  }, [deliveryMethod, subtotal])

  const total = subtotal + deliveryFee

  const handleSubmit = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        delivery_method: deliveryMethod,
        delivery_fee: deliveryFee,
        items: cart,
      }),
    })

    const { order_id } = await res.json()
    router.push(`/thank-you?order=${order_id}`)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <div className="mb-4">
        <label className="font-medium block mb-2">Delivery Method</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="pickup"
              checked={deliveryMethod === "pickup"}
              onChange={() => setDeliveryMethod("pickup")}
            />{" "}
            Store Pickup (Free)
          </label>
          <label>
            <input
              type="radio"
              value="home"
              checked={deliveryMethod === "home"}
              onChange={() => setDeliveryMethod("home")}
            />{" "}
            Home Delivery ({deliveryFee === 0 ? "Free" : `Nu. ${deliveryFee}`})
          </label>
        </div>
      </div>

      <div className="border-t pt-4 space-y-1">
        <p>Subtotal: Nu. {subtotal.toFixed(2)}</p>
        <p>Delivery Fee: Nu. {deliveryFee.toFixed(2)}</p>
        <p className="font-bold">Total: Nu. {total.toFixed(2)}</p>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  )
}
