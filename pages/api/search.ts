//pages/api/search.ts

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q = "", locale = "en" } = req.query
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"
  const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Missing query" })
  }

  const isDz = locale === "dz"

  const url = new URL(`${directusUrl}/items/products`)
  url.searchParams.set("limit", "10")
  url.searchParams.set("fields", "id,name,translations")

  if (isDz) {
    url.searchParams.set("filter[translations][value][_contains]", q)
    url.searchParams.set("filter[translations][locale][_eq]", "dz")
  } else {
    url.searchParams.set("filter[name][_contains]", q)
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    const products = data?.data?.map((item: any) => ({
      id: item.id,
      name: isDz
        ? item.translations?.find((t: any) => t.locale === "dz")?.value || item.name
        : item.name,
    })) || []

    res.status(200).json(products)
  } catch (error) {
    console.error("Search error:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
