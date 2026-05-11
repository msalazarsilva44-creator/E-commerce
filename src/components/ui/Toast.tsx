import { useEffect } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: 'border-green-500 text-green-400',
  error: 'border-red-500 text-red-400',
  info: 'border-primary text-primary-light',
}

export default function Toast() {
  const { toastMessage, toastType, hideToast } = useUIStore()

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(hideToast, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, hideToast])

  if (!toastMessage) return null

  const Icon = icons[toastType]

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-slide-up">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-surface border ${colors[toastType]} shadow-2xl`}
      >
        <Icon size={20} />
        <span className="text-sm text-white">{toastMessage}</span>
        <button onClick={hideToast} className="ml-2 hover:opacity-70 transition-opacity">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
