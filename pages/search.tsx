//pages/search.tsx

import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

const SearchPage = () => {
  const router = useRouter()
  const { t } = useTranslation("common")
  const { q } = router.query
  const [results, setResults] = useState([])

  useEffect(() => {
    if (typeof q === "string" && q.trim()) {
      // Replace with actual API fetch
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
    }
  }, [q])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {t("search_results")} "{q}"
      </h1>
      {results.length === 0 ? (
        <p>{t("no_results")}</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((item) => (
            <li key={item.id} className="border p-2 rounded">
              <Link href={`/product/${item.slug}`}>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm">{item.price} Nu</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchPage
