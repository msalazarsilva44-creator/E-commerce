import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

const shippingSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  street: z.string().min(5, 'Dirección requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  state: z.string().min(2, 'Estado requerido'),
  zip: z.string().min(4, 'Código postal requerido'),
  phone: z.string().min(8, 'Teléfono requerido'),
})

type ShippingForm = z.infer<typeof shippingSchema>

const steps = ['Envío', 'Pago', 'Confirmación']

export default function CheckoutStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  })

  const onShippingSubmit = (_data: ShippingForm) => {
    setCurrentStep(1)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 16)
    return v.replace(/(\d{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 4)
    if (v.length >= 2) return `${v.slice(0, 2)}/${v.slice(2)}`
    return v
  }

  const handlePayment = () => {
    setCurrentStep(2)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-10">
        {steps.map((step, idx) => (
          <div key={step} className="flex-1 flex items-center">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  idx < currentStep
                    ? 'bg-green-500 text-white'
                    : idx === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {idx < currentStep ? <Check size={18} /> : idx + 1}
              </div>
              <span className="text-xs mt-2 text-zinc-400">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2">
                <div
                  className={`h-full transition-all duration-500 ${
                    idx < currentStep ? 'bg-green-500' : 'bg-zinc-700'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {currentStep === 0 && (
        <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-4">
          <h3 className="font-syne text-xl font-bold mb-4">Dirección de envío</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register('name')}
                placeholder="Nombre completo"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register('phone')}
                placeholder="Teléfono"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
            </div>
          </div>
          <div>
            <input
              {...register('street')}
              placeholder="Dirección"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
            />
            {errors.street && <p className="text-xs text-red-400 mt-1">{errors.street.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                {...register('city')}
                placeholder="Ciudad"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <input
                {...register('state')}
                placeholder="Estado"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <input
                {...register('zip')}
                placeholder="C.P."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              {errors.zip && <p className="text-xs text-red-400 mt-1">{errors.zip.message}</p>}
            </div>
          </div>
          <Button type="submit" fullWidth size="lg">
            Continuar al pago
          </Button>
        </form>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="font-syne text-xl font-bold mb-4">Información de pago</h3>
          <div>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="Número de tarjeta"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={cardExpiry}
              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              maxLength={5}
            />
            <input
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="CVC"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm focus:border-primary focus:outline-none"
              maxLength={3}
            />
          </div>
          <Button fullWidth size="lg" onClick={handlePayment}>
            Confirmar pago
          </Button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="text-center py-10">
          <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[draw_0.5s_ease-in-out_forwards]"
                style={{ strokeDasharray: 24, strokeDashoffset: 24, animation: 'draw 0.5s ease-in-out 0.3s forwards' }}
              />
            </svg>
          </div>
          <h3 className="font-syne text-2xl font-bold mb-2">¡Pedido confirmado!</h3>
          <p className="text-zinc-400">Tu pedido ha sido procesado exitosamente.</p>
          <p className="text-sm text-zinc-500 mt-2">Número de orden: #ORD-{Date.now().toString().slice(-6)}</p>
        </div>
      )}
    </div>
  )
}
