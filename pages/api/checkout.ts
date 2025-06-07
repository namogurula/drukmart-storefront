// pages/api/checkout.ts
//import { v4 as uuidv4 } from "uuid"

import type { NextApiRequest, NextApiResponse } from "next"

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const {
    delivery_method,
    delivery_fee,
    payment_method,
    payment_reference,
    items = [],
  } = req.body

  try {
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )

    const total = subtotal + (delivery_fee || 0)

    const orderRes = await fetch(`${directusUrl}/items/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delivery_method,
        delivery_fee,
        payment_method,
        payment_reference,
        total,
        status: "placed",
      }),
    })

    const orderData = await orderRes.json()
    const orderId = orderData.data.id

    // Save line items
    for (const item of items) {
      await fetch(`${directusUrl}/items/order_items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: orderId,
          product: item.product.id,
          quantity: item.quantity,
          total: item.price * item.quantity,
        }),
      })
    }

    return res.status(200).json({ order_id: orderId })
  } catch (err) {
    console.error("Checkout error:", err)
    return res.status(500).json({ error: "Order failed" })
  }
}
