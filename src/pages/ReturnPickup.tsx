import { useState } from 'react'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ReturnPickup() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="container-app py-20 text-center">
        <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CalendarDays size={28} className="text-green-400" />
        </div>
        <h2 className="font-syne text-2xl font-bold mb-2">Recogida programada</h2>
        <p className="text-zinc-400">
          La recogida está confirmada para el {date} entre las {time}.
        </p>
        <p className="text-sm text-zinc-500 mt-2">Recibirás un email con los detalles.</p>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-syne text-2xl md:text-3xl font-bold mb-8">Programar Recogida</h1>

      <div className="max-w-lg">
        <div className="bg-dark-surface rounded-xl border border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={18} className="text-primary" />
            <span className="text-sm font-medium">Dirección de recogida</span>
          </div>
          <p className="text-sm text-zinc-300">Calle Luna 42</p>
          <p className="text-sm text-zinc-400">Madrid, Madrid 28001, España</p>
        </div>

        <form onSubmit={handleConfirm} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <CalendarDays size={14} /> Fecha de recogida
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Clock size={14} /> Franja horaria
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              required
            >
              <option value="">Seleccionar horario</option>
              <option value="9:00 - 12:00">9:00 - 12:00</option>
              <option value="12:00 - 15:00">12:00 - 15:00</option>
              <option value="15:00 - 18:00">15:00 - 18:00</option>
              <option value="18:00 - 21:00">18:00 - 21:00</option>
            </select>
          </div>

          <Button type="submit" fullWidth size="lg">
            Confirmar recogida
          </Button>
        </form>
      </div>
    </div>
  )
}
