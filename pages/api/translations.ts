//pages/api/translations.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const locale = req.query.locale || 'en'

  const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/translations`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
    },
  })

  const json = await response.json()
  const dictionary: Record<string, string> = {}

  json.data.forEach((item: any) => {
    dictionary[item.key] = item[locale as string] || item.en
  })

  res.status(200).json(dictionary)
}
