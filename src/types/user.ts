export interface ShippingAddress {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  addresses: ShippingAddress[]
}
