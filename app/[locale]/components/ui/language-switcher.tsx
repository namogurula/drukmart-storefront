/components/ui/language-switcher.tsx

"use client"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useTransition } from "react"

const locales = [
  { code: "en", label: "🇬🇧 English" },
  { code: "dz", label: "🇧🇹 Dzongkha" },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value
    const segments = pathname.split("/")
    segments[1] = newLocale // Replace locale segment
    const newPath = segments.join("/")
    startTransition(() => router.push(newPath))
  }

  const currentLocale = pathname.split("/")[1] || "en"

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      disabled={isPending}
      className="p-1 border rounded"
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  )
}
