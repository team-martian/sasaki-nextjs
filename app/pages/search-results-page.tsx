"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Home, Compass, Film, User } from "lucide-react"

// Mock search results data
const mockSearchResults = [
  { id: '1', title: 'The Adventure Begins', description: 'Join us on an epic journey through uncharted territories.', tags: ['adventure', 'nature', 'exploration'] },
  { id: '2', title: 'Mountain Climbing Expedition', description: 'Scale the highest peaks with expert climbers.', tags: ['adventure', 'sports'] },
  { id: '3', title: 'Underwater World Exploration', description: 'Dive into the depths of the ocean and discover marine life.', tags: ['nature', 'underwater'] },
  { id: '4', title: 'Urban Jungle Adventures', description: 'Navigate through bustling cityscapes and hidden urban gems.', tags: ['adventure', 'city'] },
  { id: '5', title: 'Desert Safari', description: 'Experience the thrill of traversing vast desert landscapes.', tags: ['nature', 'exploration'] },
]

export default function SearchResultsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(mockSearchResults)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
      // In a real application, you would fetch search results here
      setSearchResults(mockSearchResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ))
    }
  }, [searchParams])

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
                    <Button variant="ghost" className="justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Compass className="mr-2 h-4 w-4" />
                      Explore
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Film className="mr-2 h-4 w-4" />
                      Library
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Film className="h-6 w-6" />
              </Button>
              <span className="ml-2 text-lg font-bold hidden lg:block">VideoStream</span>
            </div>
            <div className="hidden lg:flex space-x-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Explore</Button>
              <Button variant="ghost">Library</Button>
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
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{searchParams.get('q')}"</h1>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {searchResults.map(result => (
              <div key={result.id} className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-48 h-32 bg-muted" />
                <div className="flex-grow">
                  <Link href={`/video/${result.id}`} className="text-xl font-semibold hover:underline">{result.title}</Link>
                  <p className="text-muted-foreground mt-1">{result.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}