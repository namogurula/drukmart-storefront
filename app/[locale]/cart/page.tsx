// app/[locale]/cart/page.tsx
//import { getGuestToken } from "@/utils/cart"

"use client"

import { useEffect, useState } from "react"
import DeliveryBoostSuggestion from "@/components/DeliveryBoostSuggestion"

export default default function CartPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart")
      const data = await res.json()
      setItems(data)
    }

    fetchCart()
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-green-700 font-semibold">
                  Nu. {item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right font-bold text-lg mt-6">
            Subtotal: Nu. {subtotal}
          </div>

          <a
            href="/checkout"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </a>

          <DeliveryBoostSuggestion subtotal={subtotal} />
        </>
      )}
    </div>
  )
}
