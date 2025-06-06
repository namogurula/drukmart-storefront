// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { cart } = req.body
    const order_id = uuidv4()
    const total = cart.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0)

    // 1. Create order
    await fetch(`${API_URL}/items/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        id: order_id,
        status: "pending",
        total,
        items: cart.map((item: any) => `${item.product.name} x ${item.quantity}`),
      }),
    })

    // 2. Optionally: clear cart
    // (you can delete cart_items here if you want)

    res.status(200).json({ order_id })
  } catch (err) {
    console.error("Checkout error", err)
    res.status(500).json({ error: "Order failed" })
  }
}
