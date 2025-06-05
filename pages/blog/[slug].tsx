// pages/blog/[slug].tsx
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  image?: string
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    slug: "bhutan-food-guide",
    title: "Top Foods to Try in Bhutan",
    content: `Bhutanese cuisine is deeply tied to culture... Ema Datshi, momos, suja tea...`,
    image: "/placeholder.png",
  },
  {
    id: "2",
    slug: "tigers-nest-hike",
    title: "Visiting Paro Taktsang",
    content: `The Tiger's Nest Monastery is perched on a cliff...`,
    image: "/placeholder.png",
  },
]

export default function BlogPostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    if (slug) {
      const found = samplePosts.find((p) => p.slug === slug)
      if (found) setPost(found)
    }
  }, [slug])

  if (!post) return <p className="p-4">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4 rounded" />
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-gray-700 text-sm whitespace-pre-line">{post.content}</div>
    </div>
  )
}
