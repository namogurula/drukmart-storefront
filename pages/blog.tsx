// pages/blog.tsx
//<Link href={`/blog/${post.slug}`} className="text-blue-600 text-xs mt-2 block">


import { useEffect, useState } from "react"

interface BlogPost {
  id: string
  title: string
  content: string
  image?: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Replace with your Directus blog fetch or static data
    setPosts([
      {
        id: "1",
        title: "Healthy snacks to try this week",
        content: "Snacking doesn’t have to be unhealthy...",
        image: "/placeholder.png",
      },
      {
        id: "2",
        title: "Why local products are better",
        content: "Bhutanese local produce supports small business...",
        image: "/placeholder.png",
      },
    ])
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Blog Posts */}
      <div className="md:col-span-3 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-sm bg-white">
            <img src={post.image} className="w-full md:w-1/3 h-48 object-cover" />
            <div className="p-4 flex-1">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{post.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ad Column */}
      <div className="hidden md:block md:col-span-1 border p-4 bg-gray-50 rounded">
        {/* Place Google AdSense script or widget here */}
        <p className="text-center text-sm text-gray-500">Ad space</p>
      </div>
    </div>
  )
}
