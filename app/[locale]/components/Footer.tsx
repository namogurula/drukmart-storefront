// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10 border-t">
      © {new Date().getFullYear()} DrukMart. All rights reserved.
    </footer>
  )
}
