import { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink, Star } from "lucide-react"
import Image from "next/image"

// Sample data with added featured, popularity, and link fields
const tools = [
  { id: 1, name: "TensorFlow", category: "Machine Learning", description: "Open-source machine learning framework", image: "/placeholder.svg?height=200&width=200", featured: true, popularity: 95, link: "https://www.shivacruz.com" },
  { id: 2, name: "PyTorch", category: "Machine Learning", description: "Open source machine learning library", image: "/placeholder.svg?height=200&width=200", featured: true, popularity: 90, link: "https://www.shivacruz.com" },
  { id: 3, name: "NLTK", category: "Natural Language Processing", description: "Leading platform for building Python programs to work with human language data", image: "/placeholder.svg?height=200&width=200", featured: false, popularity: 80, link: "https://www.shivacruz.com" },
  { id: 4, name: "OpenCV", category: "Computer Vision", description: "Open source computer vision and machine learning software library", image: "/placeholder.svg?height=200&width=200", featured: true, popularity: 85, link: "https://www.shivacruz.com" },
  { id: 5, name: "ROS", category: "Robotics", description: "Flexible framework for writing robot software", image: "/placeholder.svg?height=200&width=200", featured: false, popularity: 75, link: "https://www.shivacruz.com" },
  { id: 6, name: "Pandas", category: "Data Analysis", description: "Fast, powerful, flexible and easy to use open source data analysis and manipulation tool", image: "/placeholder.svg?height=200&width=200", featured: false, popularity: 88, link: "https://www.shivacruz.com" },
  { id: 7, name: "DeepSpeech", category: "Speech Recognition", description: "Open-source Speech-To-Text engine", image: "/placeholder.svg?height=200&width=200", featured: false, popularity: 70, link: "https://www.shivacruz.com" },
  { id: 8, name: "Scikit-learn", category: "Machine Learning", description: "Machine learning library for Python", image: "/placeholder.svg?height=200&width=200", featured: true, popularity: 92, link: "https://www.shivacruz.com" },
]

// Color-coding for categories
const categoryColors = {
  "Machine Learning": "bg-blue-100 text-blue-800",
  "Natural Language Processing": "bg-green-100 text-green-800",
  "Computer Vision": "bg-purple-100 text-purple-800",
  "Robotics": "bg-red-100 text-red-800",
  "Data Analysis": "bg-yellow-100 text-yellow-800",
  "Speech Recognition": "bg-pink-100 text-pink-800",
}

export default function AIToolsDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("popularity")

  const categories = useMemo(() => {
    const categoryCount = tools.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1
      return acc
    }, {})
    return Object.entries(categoryCount).sort((a, b) => b[1] - a[1])
  }, [])

  const filteredTools = useMemo(() => {
    return tools.filter(tool => 
      (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tool.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || tool.category === selectedCategory)
    ).sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "popularity") return b.popularity - a.popularity
      return 0
    })
  }, [searchTerm, selectedCategory, sortBy])

  const featuredTools = useMemo(() => tools.filter(tool => tool.featured), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-purple-700 to-blue-600 text-white">
        {/* Header Banner */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">AI Tools Directory</h1>
            <p className="text-xl max-w-3xl">Discover and explore the most powerful AI tools to supercharge your projects and workflows</p>
          </div>
        </header>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Tools */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={400}
                    height={225}
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center">
                    {tool.name}
                    <Star className="w-4 h-4 ml-2 text-yellow-400 fill-current" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    <Badge className={`${categoryColors[tool.category]} text-xs`}>
                      {tool.category}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4">
                  <Button asChild className="w-full">
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      Try Now <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => setSelectedCategory("")}
                className="w-full justify-between"
              >
                All
                <Badge variant="secondary">{tools.length}</Badge>
              </Button>
              {categories.map(([category, count]) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="w-full justify-between"
                >
                  {category}
                  <Badge variant="secondary">{count}</Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search AI tools or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tools List */}
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Explore AI Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg flex flex-col">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      width={400}
                      height={225}
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">
                      <Badge className={`${categoryColors[tool.category]} text-xs`}>
                        {tool.category}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Quick View</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{tool.name}</DialogTitle>
                          <DialogDescription>{tool.category}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            width={400}
                            height={225}
                            className="w-full object-cover rounded-md"
                          />
                          <p className="mt-4 text-sm text-gray-600">{tool.description}</p>
                          <div className="mt-4 flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">{tool.popularity}% popularity</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button asChild variant="default" size="sm">
                      <a href={tool.link} target="_blank" rel="noopener noreferrer">
                        Try Now <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}