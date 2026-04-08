export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number | string
  category: string
  image?: string
  recommended?: boolean
  visible?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  icon?: string
  items: MenuItem[]
  visible?: boolean
  order: number
}

export interface Reservation {
  id: string
  name: string
  phone: string
  email?: string
  guests: number
  date: string
  time: string
  zone: 'interior' | 'terasa' | 'lounge'
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export interface OrderItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  customerName: string
  customerPhone: string
  customerEmail?: string
  type: 'ridicare' | 'livrare'
  address?: string
  notes?: string
  paymentMethod: 'numerar' | 'card' | 'online'
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  total: number
  createdAt: string
}

export interface BusinessInfo {
  name: string
  subtitle: string
  address: string
  city: string
  country: string
  phone: string
  whatsapp: string
  email?: string
  instagram?: string
  facebook?: string
  googleMaps: string
  mapEmbed: string
  openingHours: { day: string; hours: string }[]
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'interior' | 'food' | 'atmosphere' | 'branding'
  featured?: boolean
  order: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage: string
  locale: string
  siteName: string
  siteUrl: string
}
