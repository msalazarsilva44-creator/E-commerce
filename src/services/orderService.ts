import type { Order } from '@/types/order'

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    status: 'delivered',
    items: [],
    total: 234.0,
    shipping: {
      id: 'addr-1',
      name: 'María García',
      street: 'Calle Luna 42',
      city: 'Madrid',
      state: 'Madrid',
      zip: '28001',
      country: 'España',
      phone: '+34 612 345 678',
      isDefault: true,
    },
    trackingNumber: 'ES1234567890',
  },
  {
    id: 'ORD-002',
    date: '2024-04-02',
    status: 'shipped',
    items: [],
    total: 145.0,
    shipping: {
      id: 'addr-1',
      name: 'María García',
      street: 'Calle Luna 42',
      city: 'Madrid',
      state: 'Madrid',
      zip: '28001',
      country: 'España',
      phone: '+34 612 345 678',
      isDefault: true,
    },
    trackingNumber: 'ES9876543210',
  },
]

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders), 300)
    })
  },

  getById: async (id: string): Promise<Order | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders.find((o) => o.id === id)), 200)
    })
  },
}
