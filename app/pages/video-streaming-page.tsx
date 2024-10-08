"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Play, Pause, FastForward, Rewind, Menu, Search, Home, Compass, Film, User, Plus, X } from "lucide-react"

// Mock data
const initialVideo = {
  id: '1',
  title: 'The Adventure Begins',
  description: 'Join us on an epic journey through uncharted territories.',
  actors: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  tags: ['adventure', 'nature', 'exploration'],
  src: 'https://example.com/video.mp4',
  sourceUrls: {
    'Official Website': ['https://example.com/official'],
    'Streaming Platforms': ['https://netflix.com/video1', 'https://hulu.com/video1'],
    'Social Media': ['https://instagram.com/video1', 'https://twitter.com/video1']
  }
}

const relatedVideos = [
  { id: '2', title: 'Mountain Climbing Expedition', tags: ['adventure', 'sports'] },
  { id: '3', title: 'Underwater World Exploration', tags: ['nature', 'underwater'] },
  { id: '4', title: 'Urban Jungle Adventures', tags: ['adventure', 'city'] },
  { id: '5', title: 'Desert Safari', tags: ['nature', 'exploration'] },
]

export default function VideoStreamingPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [video, setVideo] = useState(initialVideo)
  const [newActor, setNewActor] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const router = useRouter()

  const handleAddActor = () => {
    if (newActor && !video.actors.includes(newActor)) {
      setVideo(prev => ({ ...prev, actors: [...prev.actors, newActor] }))
      setNewActor('')
    }
  }

  const handleRemoveActor = (actor: string) => {
    setVideo(prev => ({ ...prev, actors: prev.actors.filter(a => a !== actor) }))
  }

  const handleAddTag = () => {
    if (newTag && !video.tags.includes(newTag)) {
      setVideo(prev => ({ ...prev, tags: [...prev.tags, newTag] }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setVideo(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const handleRemoveSourceUrl = (category: string, url: string) => {
    setVideo(prev => ({
      ...prev,
      sourceUrls: {
        ...prev.sourceUrls,
        [category]: prev.sourceUrls[category].filter(u => u !== url)
      }
    }))
  }

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
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-gray-800 mb-4">
              <video 
                src={video.src} 
                className="w-full h-full"
                controls={false}
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => console.log('Rewind')}>
                  <Rewind className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => console.log('Fast Forward')}>
                  <FastForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <p className="text-muted-foreground mb-4">{video.description}</p>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Actors:</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {video.actors.map(actor => (
                  <Badge key={actor} variant="secondary">
                    {actor}
                    <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0" onClick={() => handleRemoveActor(actor)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newActor}
                  onChange={(e) => setNewActor(e.target.value)}
                  placeholder="Add new actor"
                  className="flex-grow"
                />
                <Button onClick={handleAddActor}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Tags:</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {video.tags.map(tag => (
                  <Badge key={tag}>
                    {tag}
                    <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0" onClick={() => handleRemoveTag(tag)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add new tag"
                  className="flex-grow"
                />
                <Button onClick={handleAddTag}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Source URLs:</h2>
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(video.sourceUrls).map(([category, urls]) => (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger>{category}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {urls.map((url, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{url}</a>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveSourceUrl(category, url)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="mt-6 lg:mt-0">
            <Tabs defaultValue="related" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="related">Related</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              <TabsContent value="related">
                <ScrollArea className="h-[calc(100vh-400px)] lg:h-[calc(100vh-200px)]">
                  <div className="space-y-4">
                    {relatedVideos.map(video => (
                      <div key={video.id} className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-muted" />
                        <div>
                          <h3 className="font-semibold">{video.title}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {video.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="trending">
                <div className="text-center py-4">
                  Trending videos would be displayed here.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}