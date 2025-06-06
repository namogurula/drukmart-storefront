// /pages/api/products.ts

import type { NextApiRequest, NextApiResponse } from "next"

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      `${directusUrl}/items/products?filter[status][_eq]=published&limit=10&fields=id,name,price,image.filename_disk`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    const products = data?.data?.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image?.filename_disk
        ? `${directusUrl}/assets/${product.image.filename_disk}`
        : null,
    })) ?? []

    res.status(200).json(products)
  } catch (err) {
    console.error("Error fetching products:", err)
    res.status(500).json({ error: "Unable to fetch products" })
  }
}
