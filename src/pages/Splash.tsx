import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PawPrint } from 'lucide-react'


export default function Splash() {
  const navigate = useNavigate()


  useEffect(() => {
    navigate('/dashboard', { replace: true })
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-50">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse-soft rounded-full bg-primary/20 blur-xl"></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <PawPrint size={48} />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-brand-900">PetLush</h1>
        <p className="mt-2 text-lg font-medium text-brand-600">Elevating Pet Care with Love</p>
      </div>
    </div>
  )
}
