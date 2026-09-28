
import AppLayout from '@/components/layout/AppLayout'
import { useAuthStore } from '@/store/useAuthStore'
import { Plus, Bone, Syringe, Scissors, Stethoscope, Clock, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const { user } = useAuthStore()
  const userName = user?.user_metadata?.full_name || 'Friend'
  const firstName = userName.split(' ')[0]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              How are your pets doing today?
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button className="gap-2 shadow-md">
              <Plus size={18} /> Add Pet
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="Total Pets" value="0" icon={<Heart size={20} className="text-primary" />} />
          <StatCard title="Today's Tasks" value="0" icon={<Clock size={20} className="text-amber-500" />} />
          <StatCard title="Vaccinations" value="Up to date" icon={<Syringe size={20} className="text-emerald-500" />} />
          <StatCard title="Appointments" value="None" icon={<Stethoscope size={20} className="text-blue-500" />} />
        </div>

        {/* My Pets */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">My Pets</h2>
            <Button variant="ghost" className="text-primary h-auto py-1 px-3">View All</Button>
          </div>
          <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed bg-card/50 p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Plus size={24} />
              </div>
              <p className="text-sm font-medium">No pets added yet</p>
              <p className="text-xs text-muted-foreground">Add your first pet to get started</p>
            </div>
          </div>
        </div>

        {/* Today's Care */}
        <div>
          <h2 className="text-xl font-bold mb-4">Today's Care</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <CareCard title="Feeding" icon={<Bone size={24} />} color="bg-orange-100 text-orange-600" />
            <CareCard title="Medicine" icon={<Activity size={24} />} color="bg-rose-100 text-rose-600" />
            <CareCard title="Exercise" icon={<Clock size={24} />} color="bg-blue-100 text-blue-600" />
            <CareCard title="Grooming" icon={<Scissors size={24} />} color="bg-purple-100 text-purple-600" />
            <CareCard title="Vet" icon={<Stethoscope size={24} />} color="bg-emerald-100 text-emerald-600" />
          </div>
        </div>

      </div>
    </AppLayout>
  )
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-card p-4 shadow-sm border">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function CareCard({ title, icon, color }: { title: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-card p-4 text-center shadow-sm border transition-transform hover:scale-105 hover:shadow-md">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  )
}

import { Heart } from 'lucide-react' // Added here to fix missing import above
