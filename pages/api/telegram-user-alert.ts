// pages/api/telegram-user-alert.ts
import type { NextApiRequest, NextApiResponse } from "next"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed")

  const user = req.body?.data
  if (!user) return res.status(400).send("No user data provided")

  const message = `
👤 New User Registered!
Name: ${user.first_name || "N/A"} ${user.last_name || ""}
Email: ${user.email || "No email"}
Role: ${user.role || "default"}
ID: ${user.id}
`

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    })

    return res.status(200).send("Telegram alert sent.")
  } catch (err) {
    console.error("Telegram webhook failed:", err)
    return res.status(500).send("Failed to send alert")
  }
}
