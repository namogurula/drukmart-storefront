// components/CartDrawer.tsx
//import { useCart } from "@/context/CartContext"

import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(items)
  }, [isOpen])

  const removeItem = (index: number) => {
    const updated = [...cartItems]
    updated.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(updated))
    setCartItems(updated)
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg border-l transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-xl">×</button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-160px)]">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <img src={item.image} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-500">Nu. {item.price / 100}</p>
              </div>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-red-500"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-3 border-t">
        <div className="flex justify-between text-sm mb-2">
          <span>Total</span>
          <span>Nu. {total / 100}</span>
        </div>
        <a
          href="/checkout"
          className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </a>
      </div>
    </div>
  )
}
