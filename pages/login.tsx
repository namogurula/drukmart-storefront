// pages/login.tsx
import { getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Login() {
  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov || {}))
  }, [])

  return (
    <div className="p-6 max-w-sm mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Login / Register</h1>
      <p className="mb-4 text-sm text-gray-600">Choose a provider to continue:</p>

      {Object.values(providers).length === 0 && (
        <p className="text-sm text-red-500">No providers available. Check NextAuth config.</p>
      )}

      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="mb-3">
          <button
            onClick={() => signIn(provider.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}
