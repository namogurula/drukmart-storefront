// components/ProductCard.tsx
"use client"

import Image from "next/image"
import { addToCart } from "@/utils/cart"

export default function ProductCard({ product }: { product: any }) {
  const handleAdd = async () => {
    await addToCart(product.id)
    alert("Added to cart ✅")
  }

  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <Image
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        width={150}
        height={150}
        className="mx-auto object-contain mb-2"
      />
      <p className="text-sm font-medium mb-1">{product.name}</p>
      <p className="text-green-600 font-semibold mb-2">Nu. {product.price}</p>
      <button
        onClick={handleAdd}
        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  )
}
