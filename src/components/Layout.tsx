import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <header className="bg-purple-700 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">Gratus</Link>
          <div className="flex-1 mx-4">
            <form className="flex">
              <Input type="search" placeholder="Search products..." className="w-full" />
              <Button type="submit" variant="secondary" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/cart" className="flex items-center">
              <ShoppingCart className="h-6 w-6 mr-2" />
              Cart
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>
      <footer className="bg-purple-800 text-white p-4">
        <div className="container mx-auto text-center">
          © 2024 Gratus. All rights reserved.
        </div>
      </footer>
    </div>
  )
}