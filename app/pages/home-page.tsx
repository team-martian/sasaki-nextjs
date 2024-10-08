"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Home, Settings, Film, Play, User, Tag, Star } from "lucide-react"

// Mock data (unchanged)
const featuredContent = [
  { id: '1', title: 'The Adventure Begins', description: 'Join us on an epic journey through uncharted territories.', image: '/placeholder.svg?height=400&width=600' },
  { id: '2', title: 'Mountain Climbing Expedition', description: 'Scale the highest peaks with expert climbers.', image: '/placeholder.svg?height=400&width=600' },
  { id: '3', title: 'Underwater World Exploration', description: 'Dive into the depths of the ocean and discover marine life.', image: '/placeholder.svg?height=400&width=600' },
]

const categories = [
  { id: '1', name: 'Adventure', count: 120 },
  { id: '2', name: 'Nature', count: 85 },
  { id: '3', name: 'Science', count: 64 },
  { id: '4', name: 'Technology', count: 72 },
  { id: '5', name: 'History', count: 53 },
  { id: '6', name: 'Art', count: 41 },
]

const recentVideos = [
  { id: '1', title: 'Urban Jungle Adventures', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: '2', title: 'Desert Safari', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: '3', title: 'Space Exploration Documentary', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: '4', title: 'Ancient Civilizations Unearthed', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: '5', title: 'The Future of AI', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: '6', title: 'Culinary Journey Around the World', thumbnail: '/placeholder.svg?height=200&width=300' },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

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
                  placeholder="Search videos..."
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
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredContent.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category.id} variant="secondary" className="text-sm py-1 px-3">
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {recentVideos.map((video) => (
              <Card key={video.id} className="w-[250px] flex-shrink-0">
                <div className="relative aspect-video">
                  <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm">{video.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
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