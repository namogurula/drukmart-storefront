// app/layout.tsx
//import { dir } from "i18next"
//import { headers } from "next/headers"
//import { i18nConfig } from "@/i18n"

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DrukMart',
  description: 'Bhutan’s Local Online Store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 🚚 Delivery Location Banner */}
        <div className="w-full bg-red-600 text-white text-center py-2 animate-pulse text-sm font-semibold">
          🚚 Delivery Only @ Paro
        </div>

        {/* 🎁 Free Delivery Eligibility Banner */}
        <div className="w-full text-center py-1 text-red-600 font-semibold text-sm bg-yellow-50 animate-pulse">
          📦 Get <span className="underline">FREE Home Delivery</span> on orders over <strong>Nu.2999/-</strong>!
        </div>

        {children}
      </body>
    </html>
  )
}
