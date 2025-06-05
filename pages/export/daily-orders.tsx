// pages/export/daily-orders.tsx
import { useEffect, useState } from "react"
import { format } from "date-fns"

export default function DailyOrdersExportPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const today = format(new Date(), "yyyy-MM-dd")
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/orders?filter[date_created][_gte]=${today}T00:00:00`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          },
        }
      )
      const data = await res.json()
      setOrders(data.data || [])
      setLoading(false)
    }

    fetchOrders()
  }, [])

  const downloadCSV = () => {
    const header = ["Order ID", "Customer", "Dzongkhag", "Total (Nu.)", "Status"]
    const rows = orders.map((o) => [
      o.id,
      o.customer_name,
      o.dzongkhag,
      (o.total / 100).toFixed(2),
      o.status,
    ])

    const csv = [header, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `drukmart-orders-${format(new Date(), "yyyy-MM-dd")}.csv`
    link.click()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">📤 Export Today’s Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders placed today.</p>
      ) : (
        <>
          <p className="mb-2">Orders found: {orders.length}</p>
          <button
            onClick={downloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download CSV
          </button>
        </>
      )}
    </div>
  )
}
