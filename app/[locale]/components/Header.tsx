// components/Header.tsx

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "next-i18next"
import LanguageSwitcher from "@/components/ui/language-switcher"
import SearchBox from "@/components/SearchBox"

const Header = () => {
  const pathname = usePathname()
  const { t } = useTranslation("common")

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-green-700">
          DrukMart
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-4 text-sm font-medium">
          <Link href="/trending">{t("trending")}</Link>
          <Link href="/featured">{t("featured")}</Link>
          <Link href="/discounts">{t("discounts")}</Link>
          <Link href="/deals">{t("deals")}</Link>
          <Link href="/blog">{t("blog")}</Link>
        </nav>

        {/* Search */}
        <SearchBox />

        {/* Language + Cart */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/cart" className="text-green-700 font-medium">
            🛒 {t("cart")}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
