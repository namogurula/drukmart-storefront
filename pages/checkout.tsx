//pages/checkout.tsx

//Excellent, Chogyel! Here's your Directus-powered Checkout Flow — this handles:

//Customer details form
// Payment method metadata (COD / QR / reference number)
// Creating an orders record in Directus
// Creating order_items for each product in the cart

import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { useRouter } from "next/router"
import {
  createOrderSession,
  addOrderItem,
  updateOrderTotal,
} from "@/lib/directus-cart"
import { sendTelegramOrderNotification } from "@/lib/notify-telegram"
import { sendEmailOrderNotification } from "@/lib/notify-email"

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const router = useRouter()

  const [name, setName] = useState("")
  const [dzongkhag, setDzongkhag] = useState("Paro")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [txnRef, setTxnRef] = useState("")
  const [loading, setLoading] = useState(false)
//const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderId = await createOrderSession(name, dzongkhag)

      for (let item of cart) {
        await addOrderItem(orderId, item)
      }

      await updateOrderTotal(orderId, total, {
        payment_method: paymentMethod,
        txn_ref: txnRef,
      })

      // Notify via Telegram
      await sendTelegramOrderNotification({
        customer_name: name,
        dzongkhag,
        payment_method: paymentMethod,
        txn_ref: txnRef,
        total,
      })

      // Notify via EmailJS
      await sendEmailOrderNotification({
        customer_name: name,
        dzongkhag,
        payment_method: paymentMethod,
        txn_ref: txnRef,
        total,
      })

      // WhatsApp Notification (serverless trigger)
      await fetch("/api/notify-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          dzongkhag,
          payment_method: paymentMethod,
          total,
          phone: "+97517XXXXXX", // Optional: make this dynamic
        }),
      })

      // 🔔 High-value order alert (Nu. 5000 and above)
      const isHighValue = total >= 500000
      if (isHighValue) {
        const message = `
🚨 *High-Value Order Alert!*
👤 ${name}
📍 ${dzongkhag}
💳 ${paymentMethod}
💰 Total: Nu. ${(total / 100).toFixed(2)}
🧾 Order ID: ${orderId}
        `
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        })
      }

      clearCart()
      router.push(`/thank-you?order=${orderId}`)
    } catch (err) {
      console.error("Checkout failed:", err)
    }

    setLoading(false)
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🧾 Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={dzongkhag}
          onChange={(e) => setDzongkhag(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Paro</option>
          <option>Thimphu</option>
          <option>Wangdue</option>
          <option>Bumthang</option>
        </select>

        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="qr_mbob">QR Pay - mBoB</option>
            <option value="qr_bnb">QR Pay - BNB</option>
            <option value="qr_bdbl">QR Pay - BDBL</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Transaction Reference (optional)"
          value={txnRef}
          onChange={(e) => setTxnRef(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  )
}
