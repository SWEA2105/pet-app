import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Heart } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  image_url: string
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPets() {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setPets(data || [])
      } catch (err) {
        console.error('Error loading pets:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPets()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">My Pets</h1>
            <p className="text-muted-foreground mt-1">
              Manage your lovely companions
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/pets/add">
              <Plus size={18} /> Add Pet
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : pets.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card/50 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart size={32} />
            </div>
            <h3 className="text-lg font-bold">No pets yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add your first pet to start tracking their health, reminders, and daily care.
            </p>
            <Button asChild className="mt-6 gap-2">
              <Link to="/pets/add">
                <Plus size={18} /> Add Your First Pet
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <div key={pet.id} className="group relative overflow-hidden rounded-3xl bg-card shadow-sm border transition-all hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden bg-muted">
                  {pet.image_url ? (
                    <img
                      src={pet.image_url}
                      alt={pet.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground">
                      <Heart size={48} className="opacity-20" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pet.species} {pet.breed ? `• ${pet.breed}` : ''}
                  </p>
                </div>
                <Link to={`/pets/${pet.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {pet.name}</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
