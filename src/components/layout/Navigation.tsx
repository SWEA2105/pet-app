import { NavLink } from 'react-router-dom'
import { Home, Search, Heart, Bell, Calendar, BookOpen, Image as ImageIcon, User, Settings, PawPrint } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Explore Pets', path: '/explore' },
  { icon: PawPrint, label: 'My Pets', path: '/pets' },
  { icon: Heart, label: 'Health', path: '/health' },
  { icon: Bell, label: 'Reminders', path: '/reminders' },
  { icon: Calendar, label: 'Appointments', path: '/appointments' },
  { icon: BookOpen, label: 'Pet Care', path: '/care' },
  { icon: ImageIcon, label: 'Memories', path: '/memories' },
]

const bottomNavItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Search, label: 'Explore', path: '/explore' },
  { icon: PawPrint, label: 'Pets', path: '/pets' },
  { icon: BookOpen, label: 'Care', path: '/care' },
  { icon: User, label: 'Profile', path: '/profile' },
]

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <PawPrint size={24} />
        </div>
        <span className="text-xl font-bold text-foreground">PetLush</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )
          }
        >
          <User size={20} />
          Profile
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </div>
    </aside>
  )
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-card px-2 pb-safe md:hidden">
      {bottomNavItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )
          }
        >
          <item.icon size={22} className={cn("mb-0.5")} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
