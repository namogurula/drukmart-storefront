// pages/track/[id].tsx
////To Enable Tracking:
//Ensure your Directus orders collection has:
// id (UUID)
// status, customer_name, dzongkhag, payment_method, total

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import OrderStatusTimeline from "@/components/OrderStatusTimeline"

export default function TrackOrderPage() {
  const router = useRouter()
  const { id } = router.query

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
            },
          }
        )
        const data = await res.json()
        setOrder(data.data)
      } catch (err) {
        console.error("Failed to load order", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return <p className="p-4">Loading order info...</p>
  }

  if (!order) {
    return <p className="p-4 text-red-600">Order not found.</p>
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-3">📦 Track Your Order</h1>

      <p className="text-sm mb-1">
        <strong>Order ID:</strong> <code>{order.id}</code>
      </p>
      <p className="text-sm mb-1">
        <strong>Customer:</strong> {order.customer_name}
      </p>
      <p className="text-sm mb-1">
        <strong>Dzongkhag:</strong> {order.dzongkhag}
      </p>
      <p className="text-sm mb-3">
        <strong>Payment:</strong> {order.payment_method}
      </p>

      <OrderStatusTimeline status={order.status} />

      <p className="text-sm mt-6">
        <strong>Total:</strong> Nu. {(order.total / 100).toFixed(2)}
      </p>
    </div>
  )
}
