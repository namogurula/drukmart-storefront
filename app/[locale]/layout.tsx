//app/[locale]/layout.tsx

"use client"

import { dir } from "i18next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DrukMart",
  description: "Bhutan-first eCommerce platform",
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

