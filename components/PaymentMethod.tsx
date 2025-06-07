//components/PaymentMethod.tsx

"use client"

import { useState } from "react"

export default function PaymentMethod({
  onSelect,
}: {
  onSelect: (method: string, ref: string) => void
}) {
  const [method, setMethod] = useState("cod")
  const [reference, setReference] = useState("")

  const handleChange = (val: string) => {
    setMethod(val)
    setReference("")
    onSelect(val, "")
  }

  const handleReference = (val: string) => {
    setReference(val)
    onSelect(method, val)
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">💳 Payment Method</h2>

      <div className="space-y-2">
        <label className="block">
          <input
            type="radio"
            value="cod"
            checked={method === "cod"}
            onChange={() => handleChange("cod")}
          />
          <span className="ml-2">Cash on Delivery</span>
        </label>

        <label className="block">
          <input
            type="radio"
            value="qr"
            checked={method === "qr"}
            onChange={() => handleChange("qr")}
          />
          <span className="ml-2">
            QR Code Scan Pay (MBoB, MPay, ePay, DrukPay)
          </span>
        </label>
      </div>

      {method === "qr" && (
        <div className="mt-3">
          <p className="text-sm mb-1">
            Enter Transaction Reference No. or Screenshot Journal ID:
          </p>
          <input
            type="text"
            value={reference}
            onChange={(e) => handleReference(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Enter ref. no or note for verification"
          />
        </div>
      )}
    </div>
  )
}
