// utils/cart.ts
import { v4 as uuidv4 } from "uuid"

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN

export const getGuestToken = () => {
  let token = localStorage.getItem("guest_token")
  if (!token) {
    token = uuidv4()
    localStorage.setItem("guest_token", token)
  }
  return token
}

export const createCartSession = async () => {
  const guest_token = getGuestToken()

  const res = await fetch(`${API_URL}/items/cart_sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ guest_token }),
  })

  const data = await res.json()
  return data.data?.id
}

export const getOrCreateSession = async () => {
  const guest_token = getGuestToken()

  const check = await fetch(
    `${API_URL}/items/cart_sessions?filter[guest_token][_eq]=${guest_token}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )

  const found = await check.json()

  if (found.data.length > 0) return found.data[0].id

  return await createCartSession()
}

export const addToCart = async (productId: string, quantity = 1) => {
  const sessionId = await getOrCreateSession()

  const res = await fetch(`${API_URL}/items/cart_items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      cart_session: sessionId,
      product: productId,
      quantity,
    }),
  })

  const data = await res.json()
  return data
}
