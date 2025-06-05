// pages/index.tsx
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("🚀 We're live nationwide!")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const mins = Math.floor((diff / (1000 * 60)) % 60)
      setTimeLeft(`${days}d ${hours}h ${mins}m remaining`)
    }

    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [targetDate])

  return <p className="mt-2 text-sm text-gray-600">{timeLeft}</p>
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setError("")
    if (!email) return

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setSubmitted(true)
      setEmail("")
    } else {
      const result = await res.json()
      setError(result?.error?.message || "Something went wrong.")
    }
  }

  return (
    <>
      <Head>
        <title>DrukMart – Bhutan’s Online Grocery</title>
        <meta
          name="description"
          content="Shop local products delivered to Paro. Pay with QR or Cash on Delivery."
        />
        <meta property="og:title" content="DrukMart – Bhutan’s Local Online Store" />
        <meta
          property="og:description"
          content="Explore Bhutanese groceries, snacks, and household goods online."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://drukmart.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* 🚚 Delivery Banner */}
      <div className="bg-yellow-100 text-yellow-800 text-center py-2 font-semibold animate-pulse">
        🚚 Now Delivering to Paro Only – More Dzongkhags Coming Soon!
      </div>

      <section className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🛒 Welcome to DrukMart</h1>
        <p className="mb-6 text-gray-600">
          Explore fresh local groceries, snacks, and household goods — delivered right to your doorstep.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Link href="/trending" className="block bg-white border rounded-lg p-4 shadow hover:shadow-md">
            <p className="font-medium">🔥 Trending</p>
          </Link>
          <Link href="/featured" className="block bg-white border rounded-lg p-4 shadow hover:shadow-md">
            <p className="font-medium">🌟 Featured</p>
          </Link>
          <Link href="/discounts" className="block bg-white border rounded-lg p-4 shadow hover:shadow-md">
            <p className="font-medium">💸 Discounts</p>
          </Link>
          <Link href="/deals" className="block bg-white border rounded-lg p-4 shadow hover:shadow-md">
            <p className="font-medium">🧧 Top Deals</p>
          </Link>
        </div>

        <div className="mt-2 mb-8">
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Browse All Products →
          </Link>
        </div>

        {/* Email Signup Section */}
        <section className="mt-12 bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-lg font-bold mb-2">📢 Get Notified When We Deliver Nationwide!</h2>
          <p className="text-sm mb-4 text-gray-600">
            Be the first to know when we expand to your Dzongkhag.
          </p>

          {!submitted ? (
            <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="px-4 py-2 rounded border w-full max-w-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-medium mt-3">✅ You're signed up!</p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Countdown */}
          <Countdown targetDate="2025-07-01T00:00:00" />

          {/* Share Buttons */}
          <div className="flex justify-center mt-6 gap-3">
            <a
              href="https://wa.me/?text=Check%20out%20DrukMart%20Bhutan's%20new%20store:%20https://drukmart.vercel.app"
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Share on WhatsApp
            </a>
            <a
              href="https://t.me/share/url?url=https://drukmart.vercel.app&text=Bhutan's%20new%20online%20grocery%20store!"
              target="_blank"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Share on Telegram
            </a>
          </div>
        </section>
      </section>
    </>
  )
}
