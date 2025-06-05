// pages/receipt/[id].tsx
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import OrderReceiptPDF from "@/components/OrderReceiptPDF"

export default function ReceiptPage() {
  const router = useRouter()
  const { id } = router.query

  const [order, setOrder] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      const resOrder = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          },
        }
      )
      const resItems = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/order_items?filter[order][_eq]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
          },
        }
      )

      const orderData = await resOrder.json()
      const itemsData = await resItems.json()
      setOrder(orderData.data)
      setItems(itemsData.data)
      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) return <p className="p-4">Loading receipt...</p>
  if (!order) return <p className="p-4 text-red-500">Order not found.</p>

  return (
    <div className="p-4 max-w-lg mx-auto text-center">
      <h1 className="text-xl font-bold mb-2">📄 Receipt</h1>
      <p className="mb-4 text-sm text-gray-600">Order ID: {order.id}</p>

      <PDFDownloadLink
        document={<OrderReceiptPDF order={order} items={items} />}
        fileName={`drukmart-receipt-${order.id}.pdf`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {({ loading }) => (loading ? "Preparing..." : "Download Receipt")}
      </PDFDownloadLink>
    </div>
  )
}
