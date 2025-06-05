//pages/api/categories.ts

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"
    const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

    const response = await fetch(`${directusUrl}/items/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const json = await response.json()
    const categories = json.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      translations: item.translations || [],
    }))

    res.status(200).json(categories)
  } catch (error) {
    console.error("Categories API error:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
