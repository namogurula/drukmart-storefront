// app/[locale]/cart/page.tsx
"use client"

import { useEffect, useState } from "react"
import { getGuestToken } from "@/utils/cart"

const CartPage = () => {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchCart = async () => {
      const token = getGuestToken()
      const res = await fetch(`/api/cart?guest=${token}`)
      const data = await res.json()
      setItems(data)
    }
    fetchCart()
  }, [])

  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.product?.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-green-700 font-semibold">
                Nu. {item.product?.price * item.quantity}
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">
            Total: Nu. {total}
          </div>
          <a
            href="/checkout"
            className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </a>
        </div>
      )}
    </div>
  )
}

export default CartPage
