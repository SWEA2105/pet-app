import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import { Search, Filter, Info, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  { id: 'dogs', name: 'Dogs', icon: '🐶' },
  { id: 'cats', name: 'Cats', icon: '🐱' },
  { id: 'rabbits', name: 'Rabbits', icon: '🐰' },
  { id: 'hamsters', name: 'Hamsters', icon: '🐹' },
  { id: 'birds', name: 'Birds', icon: '🐦' },
  { id: 'fish', name: 'Fish', icon: '🐠' },
  { id: 'reptiles', name: 'Reptiles', icon: '🦎' },
]

const MOCK_PETS = [
  {
    id: '1',
    name: 'Golden Retriever',
    species: 'Dog',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    description: 'Friendly, intelligent, and devoted.',
    careLevel: 'Moderate'
  },
  {
    id: '2',
    name: 'Persian Cat',
    species: 'Cat',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    description: 'Quiet and sweet-tempered companion.',
    careLevel: 'High'
  },
  {
    id: '3',
    name: 'Holland Lop',
    species: 'Rabbit',
    image: 'https://images.unsplash.com/photo-1585110396000-c9faf4e4818b?auto=format&fit=crop&q=80&w=800',
    description: 'Small, sweet, and highly sociable.',
    careLevel: 'Moderate'
  },
  {
    id: '4',
    name: 'Beagle',
    species: 'Dog',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
    description: 'Merry, friendly, and curious.',
    careLevel: 'Moderate'
  }
]

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('dogs')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Explore Pets</h1>
          <p className="text-muted-foreground mt-1">
            Discover different breeds and learn how to care for them.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search pets or breeds..."
              className="pl-10 h-12 rounded-2xl bg-card shadow-sm border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-card border-0 shadow-sm">
            <Filter size={20} />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl p-3 min-w-[80px] transition-all ${
                activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                  : 'bg-card text-foreground hover:bg-secondary'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {MOCK_PETS.map((pet) => (
            <div key={pet.id} className="group overflow-hidden rounded-3xl bg-card shadow-sm border hover:shadow-md transition-all">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg text-brand-800">
                  {pet.species}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {pet.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    <Info size={14} /> Care: {pet.careLevel}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary p-0 hover:bg-transparent hover:text-primary/80">
                    Details <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
