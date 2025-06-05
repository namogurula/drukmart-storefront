// components/StickyCartButton.tsx
//LocalStorage: For Testing Mode
// LocalStorage version: cart saved in browser only
//example:
//localStorage.setItem("cart", JSON.stringify([...existing, product]))
//For Production (Commented):
// TODO: Replace with global cart context or fetch from backend (Directus)
// Example:
// const { cart, addToCart, removeFromCart } = useCartContext()



import { useEffect, useState } from "react"
import CartDrawer from "./CartDrawer"

export default function StickyCartButton() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]")
    setCount(items.length)
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 hover:bg-blue-700"
      >
        🛒 Cart ({count})
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
