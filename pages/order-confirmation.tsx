// pages/order-confirmation.tsx
import Link from "next/link"

export default function OrderConfirmation() {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
      <p className="mb-4 text-gray-700">Your order has been placed successfully.</p>
      <Link href="/" className="text-blue-600 underline">
        Return to shop
      </Link>
    </div>
  )
}
