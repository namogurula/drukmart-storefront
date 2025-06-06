/app/[locale]/page.tsx

import Link from "next/link"
import { useTranslation } from "next-i18next"

export default function HomePage() {
  const { t } = useTranslation("common")

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-4">{t("welcome")}</h1>
      <p className="text-gray-700 mb-6">{t("tagline")}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/trending" className="bg-white p-4 rounded shadow hover:shadow-md text-center">
          {t("trending")}
        </Link>
        <Link href="/featured" className="bg-white p-4 rounded shadow hover:shadow-md text-center">
          {t("featured")}
        </Link>
        <Link href="/discounts" className="bg-white p-4 rounded shadow hover:shadow-md text-center">
          {t("discounts")}
        </Link>
        <Link href="/deals" className="bg-white p-4 rounded shadow hover:shadow-md text-center">
          {t("deals")}
        </Link>
      </div>
    </main>
  )
}
