// pages/admin.tsx
//Replace your-directus-url.com with your actual Directus admin URL 
//(e.g., https://backend.drukmart.com/admin)
//Replace https://your-directus-url.com/admin 
//with your real backend URL (e.g. Railway, Render, or VPS).


import Head from "next/head"

export default function AdminLogin() {
  return (
    <div className="p-8 text-center">
      <Head>
        <title>Admin Login – DrukMart</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">🔐 DrukMart Admin Panel</h1>
      <p className="mb-4 text-gray-600">Click below to access the backend.</p>
      <a
        href="https://your-directus-url.com/admin"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Open Admin Panel →
      </a>
    </div>
  )
}