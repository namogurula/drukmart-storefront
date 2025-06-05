// pages/_app.tsx

//import { CartProvider } from "@/context/CartContext"
import StickyCartButton from "@/components/StickyCartButton"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <StickyCartButton />
      <Footer />
    </>
  )
}
