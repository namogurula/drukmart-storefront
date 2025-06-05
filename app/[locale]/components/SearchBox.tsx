// components/SearchBox.tsx


"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function SearchBox() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = pathname.split("/")[1] || "en"

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 2) {
        fetch(`/api/search?q=${query}&locale=${currentLocale}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data)
            setShowDropdown(true)
          })
      } else {
        setResults([])
        setShowDropdown(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query, currentLocale])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${currentLocale}/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex items-center border rounded px-2 py-1 bg-white">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 outline-none text-sm w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
          {results.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                setShowDropdown(false)
                setQuery("")
                router.push(`/${currentLocale}/products/${item.id}`)
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full text-sm text-center bg-white border rounded shadow z-50 py-2">
          No results found
        </div>
      )}
    </div>
  )
}
