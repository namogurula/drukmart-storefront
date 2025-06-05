// components/MobileNav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Grid,
  ShoppingCart,
  User,
} from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/categories", icon: Grid, label: "Categories" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/profile", icon: User, label: "Profile" },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon size={20} className="mb-1" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
