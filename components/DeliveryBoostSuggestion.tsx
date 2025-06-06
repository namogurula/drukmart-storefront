/components/DeliveryBoostSuggestion.tsx

"use client"

import { useEffect, useState } from "react"

export default function DeliveryBoostSuggestion({ subtotal }: { subtotal: number }) {
  const [products, setProducts] = useState<any[]>([])

  const missingAmount = 2999 - subtotal

  useEffect(() => {
    if (subtotal >= 2999) return
    fetch("/api/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [subtotal])

  if (subtotal >= 2999) return null

  return (
    <div className="mt-6 border-t pt-4">
      <p className="mb-2 text-sm text-red-600 font-medium">
        🛍 Add Nu. {missingAmount.toFixed(2)} more to unlock FREE Home Delivery!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((item) => (
          <div key={item.id} className="border rounded p-2 text-center">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="h-24 w-full object-contain mb-2"
            />
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">Nu. {item.price}</p>
            <button
              className="mt-1 text-xs text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
              onClick={() =>
                fetch("/api/cart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ product_id: item.id, quantity: 1 }),
                })
              }
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
