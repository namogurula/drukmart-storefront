// /app/[locale]/products/[id].tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { addToCart } from "@/utils/cart"

const ProductDetail = () => {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
    }
  }, [id])

  if (!product) return <p className="text-center py-10">Loading...</p>

  const handleAdd = async () => {
    await addToCart(product.id)
    alert("Added to cart ✅")
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="rounded shadow object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-green-700 font-semibold mb-4">
            Nu. {product.price}
          </p>
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
