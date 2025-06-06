// app/layout.tsx
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { dir } from "i18next"
import { headers } from "next/headers"
import { i18nConfig } from "@/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DrukMart",
  description: "Bhutan's Local Online Store",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || "/en"
  const locale = pathname.split("/")[1] || "en"

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        {/* 🔴 Blinking Banner visible on all pages */}
        <div className="w-full bg-red-600 text-white text-center py-2 animate-pulse text-sm font-semibold">
          🚚 Delivery Only @ Paro
        </div>
        {children}
      </body>
    </html>
  )
}
