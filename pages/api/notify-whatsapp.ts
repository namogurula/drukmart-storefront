// pages/api/notify-whatsapp.ts
import type { NextApiRequest, NextApiResponse } from "next"
import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { customer_name, dzongkhag, payment_method, total, phone } = req.body

  try {
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox or business number
      to: `whatsapp:${phone}`, // e.g. whatsapp:+97517xxxxxx
      body: `🧾 New Order\n👤 ${customer_name}\n📍 ${dzongkhag}\n💳 ${payment_method}\n💰 Nu. ${total / 100}`,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "WhatsApp notification failed" })
  }
}
