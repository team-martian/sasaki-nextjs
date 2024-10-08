"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Home, Settings, Film, User, Tag, Star } from "lucide-react"

// Mock data for rated movies
const ratedMovies = [
  { id: '1', title: 'The Shawshank Redemption', rating: 9.3, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '2', title: 'The Godfather', rating: 9.2, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '3', title: 'The Dark Knight', rating: 9.0, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '4', title: 'Pulp Fiction', rating: 8.9, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '5', title: 'Forrest Gump', rating: 8.8, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '6', title: 'Inception', rating: 8.8, imageUrl: '/placeholder.svg?height=300&width=200' },
]

export default function RatingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const filteredMovies = ratedMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                  placeholder="Search movies..." 
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
        <h1 className="text-3xl font-bold mb-6">Top Rated Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id}>
              <CardContent className="p-4">
                <img src={movie.imageUrl} alt={movie.title} className="w-full h-64 object-cover mb-4 rounded-md" />
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-lg font-medium">{movie.rating.toFixed(1)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-background border-t py-6