// pages/api/cart.ts
import type { NextApiRequest, NextApiResponse } from "next"

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const guest = req.query.guest as string

  if (!guest) return res.status(400).json({ error: "Missing guest token" })

  try {
    const sessionRes = await fetch(
      `${API_URL}/items/cart_sessions?filter[guest_token][_eq]=${guest}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    )
    const sessions = await sessionRes.json()
    if (!sessions.data.length) return res.status(200).json([])

    const sessionId = sessions.data[0].id

    const itemsRes = await fetch(
      `${API_URL}/items/cart_items?filter[cart_session][_eq]=${sessionId}&fields=id,quantity,product.id,product.name,product.price`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    )
    const items = await itemsRes.json()

    res.status(200).json(items.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load cart" })
  }
}
