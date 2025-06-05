// pages/cart.tsx
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(items)
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const removeFromCart = (index: number) => {
    const updated = [...cart]
    updated.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(updated))
    setCart(updated)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">
          Cart is empty. <Link href="/">Go shopping</Link>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, i) => (
              <li key={i} className="flex items-center border rounded p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-2"
                />
                <div className="flex-1">
                  <h2 className="text-sm font-medium">{item.name}</h2>
                  <p className="text-xs text-gray-500">
                    Nu. {item.price / 100}
                  </p>
                </div>
                <button
                  className="text-red-600 text-sm"
                  onClick={() => removeFromCart(i)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <p className="text-sm font-medium">Total: Nu. {total / 100}</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded w-full"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
