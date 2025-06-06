/app/[locale]/track/[id].tsx

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const steps = ["Order Placed", "Packed", "Out for Delivery", "Delivered"]

export default function TrackOrderPage() {
  const { id } = useParams()
  const [status, setStatus] = useState("placed")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data)
        setStatus(data.status || "placed")
      })
  }, [id])

  const getStepIndex = (status: string) => {
    switch (status) {
      case "placed":
        return 0
      case "packed":
        return 1
      case "out_for_delivery":
        return 2
      case "delivered":
        return 3
      default:
        return 0
    }
  }

  const currentStep = getStepIndex(status)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">📦 Track Order</h1>
      <p className="mb-4 text-gray-700">Order ID: <strong>{id}</strong></p>

      <ol className="relative border-l border-gray-200 ml-4">
        {steps.map((step, index) => (
          <li key={step} className="mb-8 ml-4">
            <div
              className={`absolute w-3 h-3 rounded-full -left-1.5 top-1.5 ${
                index <= currentStep ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <h3 className="font-semibold text-gray-800">{step}</h3>
            {index === currentStep && (
              <p className="text-sm text-green-600">Currently here</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
