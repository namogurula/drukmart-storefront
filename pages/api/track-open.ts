// pages/api/track-open.ts
import type { NextApiRequest, NextApiResponse } from "next"

const pixel = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  "base64"
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query
  const userAgent = req.headers["user-agent"] || ""
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

  if (email && typeof email === "string") {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/email_opens`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user_agent: userAgent,
          ip_address: ip,
        }),
      })
    } catch (err) {
      console.error("Failed to log email open:", err)
    }
  }

  res.setHeader("Content-Type", "image/gif")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Expires", "0")
  res.status(200).send(pixel)
}
