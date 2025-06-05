// pages/api/daily-sales-summary.ts
import { format } from "date-fns"
import emailjs from "@emailjs/browser"

const getTodayISO = () => {
  const now = new Date()
  return format(new Date(now.setHours(0, 0, 0, 0)), "yyyy-MM-dd'T'00:00:00")
}

export default async function handler(req: any, res: any) {
  const today = getTodayISO()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/orders?filter[date_created][_gte]=${today}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
      },
    }
  )
  const { data } = await response.json()

  const total = data.reduce((sum: number, o: any) => sum + o.total, 0)

  const templateParams = {
    today_date: today.split("T")[0],
    total_sales: (total / 100).toFixed(2),
    orders_list: data
      .map(
        (o: any) =>
          `• ${o.customer_name || "Unknown"} — Nu. ${(o.total / 100).toFixed(2)}`
      )
      .join("\n"),
  }

  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_SUMMARY!, // Use a separate summary template
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )

  return res.status(200).json({ success: true })
}
