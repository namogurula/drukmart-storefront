// context/CartContext.tsx
//global cart 
// Replace these two lines in your CartProvider

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("cart") || "[]")
  setCart(stored)
}, [])

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart))
}, [cart])

/* 
🧠 Production Option (Directus):
---------------------------------
useEffect(() => {
  // 1. Fetch current open order from Directus (if any)
  // 2. Load items into `setCart` from `order_items`
}, [])

const addToCart = async (product: Product) => {
  setCart((prev) => [...prev, product])

  // await fetch(`${DIRECTUS_URL}/items/order_items`, {
  //   method: "POST",
  //   headers: { "Authorization": "Bearer YOUR_TOKEN", "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     order: currentOrderId,
  //     product_id: product.id,
  //     product_name: product.name,
  //     price: product.price
  //   })
  // })
}
*/




import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}



//Usage in your CartContext.tsx (when ready for production):
//import { createOrderSession, addOrderItem, updateOrderTotal } from "@/lib/directus-cart"

// On checkout submit
//const orderId = await createOrderSession("Chogyel", "Paro")
//for (let item of cart) {
 // await addOrderItem(orderId, item)
}
//await updateOrderTotal(orderId, total)



