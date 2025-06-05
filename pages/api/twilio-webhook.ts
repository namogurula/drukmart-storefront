// pages/api/twilio-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: true,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed")

  const incomingMsg = req.body.Body?.toLowerCase()
  const from = req.body.From
  const match = req.body.Body?.match(/id[: ]?([\w-]+)/i)
  const orderId = match?.[1]

  if (incomingMsg.includes("confirm") && orderId) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "confirmed", // or "processing"
        }),
      })

      return res.status(200).send("Order confirmed.")
    } catch (error) {
      return res.status(500).send("Error updating order.")
    }
  }

  return res.status(200).send("Message received.")
}
