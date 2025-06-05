// pages/thank-you.tsx
//thank you after signups

import Head from "next/head"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You – DrukMart</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ You're on the list!</h1>
        <p className="text-gray-600 max-w-md">
          Thank you for signing up. We'll notify you as soon as we expand our delivery
          to your Dzongkhag.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          ← Back to Home
        </Link>
      </section>
    </>
  )
}
