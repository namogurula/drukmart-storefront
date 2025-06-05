pages/api/signup.ts

import { sendWelcomeEmail } from "@/lib/email"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const { email, source = "homepage" } = req.body

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/signups`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, source }),
    })

    if (!response.ok) {
      const error = await response.json()
      return res.status(400).json({ error })
    }

    await sendWelcomeEmail(email) // ✅ Send email after successful insert

    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" })
  }
}
