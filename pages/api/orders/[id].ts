// /pages/api/orders/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    const response = await fetch(
      `${directusUrl}/items/orders/${id}?fields=id,total,delivery_method,items.id,items.quantity,items.total,items.product.id,items.product.name`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      return res.status(404).json({ error: "Order not found" })
    }

    const data = await response.json()
    res.status(200).json(data?.data)
  } catch (err) {
    console.error("Error fetching order:", err)
    res.status(500).json({ error: "Failed to fetch order details" })
  }
}
