import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Return() {
  const [orderId, setOrderId] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container-app py-20 text-center">
        <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <RotateCcw size={28} className="text-green-400" />
        </div>
        <h2 className="font-syne text-2xl font-bold mb-2">Solicitud enviada</h2>
        <p className="text-zinc-400 mb-6">Tu solicitud de devolución ha sido registrada. Te contactaremos pronto.</p>
        <Link to="/devolucion/recogida">
          <Button>Programar recogida</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-syne text-2xl md:text-3xl font-bold mb-8">Solicitar Devolución</h1>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Número de orden</label>
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="ORD-001"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Motivo de devolución</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe el motivo de tu devolución..."
              rows={4}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none resize-none"
              required
            />
          </div>

          <Button type="submit" fullWidth size="lg">
            Enviar solicitud <ChevronRight size={16} />
          </Button>
        </form>
      </div>
    </div>
  )
}
