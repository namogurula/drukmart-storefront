// pages/discounts.tsx
import { useEffect, useState } from "react"

export default function Discounts() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/products?filter[is_discounted][_eq]=true&fields=id,name,price,image.filename_disk`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.data.map((p: any) => ({
          ...p,
          image: p.image
            ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${p.image.filename_disk}`
            : "/placeholder.png",
        }))
        setProducts(formatted)
      })
  }, [])

  const addToCart = (product: any) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...existing, product]))
    alert("Added to cart!")
  }

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏷️ Discount Offers</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-2 bg-white shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-sm font-semibold mt-1">{product.name}</h2>
            <p className="text-xs text-gray-500">Nu. {product.price / 100}</p>
            <button
              onClick={() => addToCart(product)}
              className="block text-center bg-green-600 text-white text-sm mt-2 py-1 rounded w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
