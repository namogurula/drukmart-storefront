// /pages/api/products.ts

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"
  const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

  try {
    const response = await fetch(`${directusUrl}/items/products?limit=100&fields=id,name,translations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const json = await response.json()

    const products = json.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      translations: item.translations || [],
    }))

    res.status(200).json(products)
  } catch (error) {
    console.error("Products API error:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
