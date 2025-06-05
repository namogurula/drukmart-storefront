// pages/thank-you.tsx
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ThankYouPage() {
  const router = useRouter()
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.order as string
      setOrderId(id)
    }
  }, [router.isReady, router.query])

  if (!orderId) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <p className="text-gray-500">Missing order ID...</p>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Order Placed Successfully!</h2>
      <p className="text-sm text-gray-700 mb-2">
        Thank you for shopping with us. Your order ID is:
      </p>
      <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm">{orderId}</code>

      <div className="mt-6">
        <a
          href={`/track/${orderId}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Track My Order →
        </a>
      </div>
    </div>
  )
}
