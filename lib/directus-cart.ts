// lib/directus-cart.ts
const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN // Use static or login-based token

export async function createOrderSession(customer_name: string, dzongkhag: string) {
  const res = await fetch(`${API_URL}/items/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_name,
      dzongkhag,
      status: "draft",
      total: 0,
    }),
  })
  const data = await res.json()
  return data.data.id
}

export async function addOrderItem(orderId: string, product: any) {
  await fetch(`${API_URL}/items/order_items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: orderId,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
    }),
  })
}

export async function updateOrderTotal(orderId: string, total: number, metadata?: any) {
  await fetch(`${API_URL}/items/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total,
      status: "confirmed",
      payment_method: metadata?.payment_method || "cod",
      txn_ref: metadata?.txn_ref || "",
    }),
  })
}

