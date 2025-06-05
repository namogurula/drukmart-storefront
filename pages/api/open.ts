//pages/api/open.ts

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query

  if (!email) return res.status(400).send("Missing email")

  // Send to Directus
  await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/email_opens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      user_agent: req.headers["user-agent"],
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    }),
  })

  // Return a 1x1 transparent pixel
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    "base64"
  )
  res.setHeader("Content-Type", "image/png")
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
  res.setHeader("Content-Length", pixel.length.toString())
  res.status(200).end(pixel)
}
