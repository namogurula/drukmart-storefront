// pages/products/[id].tsx

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/products/${id}?fields=name,description,price,image.filename_disk`)
      .then((res) => res.json())
      .then((data) => {
        const img = data.data.image
          ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.data.image.filename_disk}`
          : "/placeholder.png"
        setProduct({ ...data.data, image: img })
      })
  }, [id])

  const addToCart = () => {
    if (!product) return
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...cart, product]))
    alert("Added to cart")
    router.push("/cart")
  }

  if (!product) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4 max-w-md mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded mb-4" />
      <h1 className="text-xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 text-sm mb-2">Nu. {product.price / 100}</p>
      <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap">{product.description}</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded w-full"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  )
}
