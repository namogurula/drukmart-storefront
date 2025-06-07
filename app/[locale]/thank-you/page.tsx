// app/[locale]/thank-you/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrder(data))
    }
  }, [orderId])

  if (!order) return <p className="p-4">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-700 mb-2">✅ Order Placed!</h1>
      <p className="mb-4 text-gray-700">Order ID: <strong>{order.id}</strong></p>

      <div className="bg-white p-4 rounded shadow-sm space-y-2 mb-4">
        {order.items?.map((item: any) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.product.name} x {item.quantity}</span>
            <span>Nu. {item.total}</span>
          </div>
        ))}
      </div>

      <p>Delivery Method: <strong>{order.delivery_method === "pickup" ? "Store Pickup" : "Home Delivery"}</strong></p>
      
      <p>Payment Method:{" "}
        <strong className="capitalize">
          {order.payment_method === "qr" ? "QR Code Payment" : "Cash on Delivery"}
        </strong>
      </p>

      {order.payment_method === "qr" && (
        <>
          <p className="text-sm text-gray-600 mb-2">Reference/Journal ID:</p>
          <div className="bg-gray-50 border px-3 py-2 rounded text-sm text-gray-800 mb-4">
            {order.payment_reference || "Not Provided"}
          </div>

          {/* Optional QR Icons */}
          <div className="flex gap-3 mb-4">
            {["mbob", "mpay", "epay", "drukpay"].map((bank) => (
              <img
                key={bank}
                src={`/qrcodes/${bank}.png`}
                alt={bank}
                className="h-12 w-auto rounded shadow"
              />
            ))}
          </div>
        </>
      )}

      <p className="mt-6 text-center text-sm text-gray-500">
        Thank you for shopping at DrukMart! 🙏
      </p>
    </div>
  )
}
