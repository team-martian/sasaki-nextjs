"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Home, Settings, Film, User, Tag, Star } from "lucide-react"

// Mock data for actresses
const actresses = [
  { id: '1', name: 'Emma Stone', imageUrl: '/placeholder.svg?height=300&width=300', movieCount: 25 },
  { id: '2', name: 'Scarlett Johansson', imageUrl: '/placeholder.svg?height=300&width=300', movieCount: 32 },
  { id: '3', name: 'Meryl Streep', imageUrl: '/placeholder.svg?height=300&width=300', movieCount: 45 },
  { id: '4', name: 'Viola Davis', imageUrl: '/placeholder.svg?height=300&width=300', movieCount: 28 },
  { id: '5', name: 'Cate Blanchett', imageUrl: '/placeholder.svg?height=300&width=300', movieCount: 37 },
  { id: '6', name: 'Lupita Nyong\'o', imageUrl: '/placeholder.svg?height=300&width=300', movieCount: 20 },
]

export default function ActressPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const filteredActresses = actresses.filter(actress =>
    actress.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" passHref>
                      <Button variant="ghost" className="justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                    </Link>
                    <Link href="/actress" passHref>
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Actress
                      </Button>
                    </Link>
                    <Link href="/tag" passHref>
                      <Button variant="ghost" className="justify-start">
                        <Tag className="mr-2 h-4 w-4" />
                        Tag
                      </Button>
                    </Link>
                    <Link href="/rating" passHref>
                      <Button variant="ghost" className="justify-start">
                        <Star className="mr-2 h-4 w-4" />
                        Rating
                      </Button>
                    </Link>
                    <Link href="/config" passHref>
                      <Button variant="ghost" className="justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Config
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Film className="h-6 w-6" />
              </Button>
              <span className="ml-2 text-lg font-bold hidden lg:block">VideoStream</span>
            </div>
            <div className="hidden lg:flex space-x-4">
              <Link href="/" passHref>
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/actress" passHref>
                <Button variant="ghost">Actress</Button>
              </Link>
              <Link href="/tag" passHref>
                <Button variant="ghost">Tag</Button>
              </Link>
              <Link href="/rating" passHref>
                <Button variant="ghost">Rating</Button>
              </Link>
              <Link href="/config" passHref>
                <Button variant="ghost">Config</Button>
              </Link>
            </div>
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <Input 
                  type="search" 
                  placeholder="Search actresses..." 
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" size="icon" className="absolute right-0 top-0">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Actresses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredActresses.map((actress) => (
            <Card key={actress.id}>
              <CardContent className="p-4">
                <img src={actress.imageUrl} alt={actress.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                <h2 className="text-xl font-semibold mb-2">{actress.name}</h2>
                <p className="text-sm text-muted-foreground">Movies: {actress.movieCount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">VideoStream</h3>
              <p className="text-sm text-muted-foreground">Your go-to platform for streaming amazing content</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} VideoStream. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}